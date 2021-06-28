import React, { PureComponent, createRef } from 'react';

import { Grid, Paper, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { api } from "./api";
import Author from "./components/Author";
import CurrencyField from "./components/currencyField";

import './App.css';
import TaxPrice from "./components/taxPrice";

// - Formatting Price

Number.prototype.format = function (n, x) {
    let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

// ------------------

class App extends PureComponent {

    kgRef = createRef();

    state = {
        kgLimit: 31,
        percent: 15,
        currency: 'AMD',
        limit: null,
        price: '',
        rates: {
            USD: null,
            EUR: null,
            RUB: null,
            GBP: null
        },
        kg: '',
        isHeavy: false,
        tax: ''
    };

    componentDidMount() {
        this.getRates()
    }

    getRates = () => {
        api.outputData()
            .then(data => {
                this.setState({
                    rates: data,
                    limit: +data.EUR * 200
                });
            })
    };

    // - Final Calculate/Validate function

    calculateTax = () => {

        let tax = +this.calculateTaxPrice();

        if (tax <= 0) {
            tax = 'Մաքսավճար չկա';
        } else {
            tax = tax.format(2)
        }

        this.setState({tax})
    };

    // -------------------------

    calculateTaxPrice = () => {

        const {price, limit, percent, currency, rates, isHeavy, kg, kgLimit} = this.state;

        let kgTax = 0;
        let priceTax = 0;

        if (isHeavy) {
            kgTax = calculateKg(kg)
        }

        function calculateValue(price) {
            return (price - limit) * percent / 100;
        }

        function calculateKg(kg) {
            return (kg - kgLimit) * 2 * rates.EUR;
        }

        if (currency === "AMD") {
            priceTax = calculateValue(price)
        } else {
            const exchangedPrice = price * rates[currency];
            priceTax = calculateValue(exchangedPrice);
        }

        return kgTax < priceTax ? priceTax : kgTax;

    };

    onCurrencyChange = async (currency) => {
        await this.setState({currency});
        this.calculateTax();
    };


    onPriceChange = async (e) => {

        let price = e.target.value

        // - Allow only numbers
        const re = /^[0-9\b]+$/;

        if (price === '' || re.test(price)) {
            if (price.length < 10) {
                price = +price;
                await this.setState({
                    price,
                });

                this.calculateTax();
            }
        }

    };

    onKgChange = async (e) => {

        let kg = e.target.value;
        // - Allow only numbers
        const re = /^[0-9\b]+$/;

        if (kg === '' || re.test(kg)) {
            if (kg.length < 4) {
                await this.setState({kg: +kg});
                this.calculateTax()
            }
        }

    };

    render() {

        const {price, tax, isHeavy, currency, rates, kg} = this.state;

        const totalPrice = () => {

            const tax = this.calculateTaxPrice();

            return (currency === "AMD" ? tax + price : tax + price * rates[currency]).format()
        }

        return (
            <div className="App">
                <Grid container
                      className='container'
                      justify="center"
                      alignItems="center">

                    <Grid xs={11} md={7} item>
                        <h1>Մաքսազերծման հաշվիչ</h1>
                        <p className='tax-law'>«Եթե տեղափոխվող ապրանքների ընդհանուր քաշը գերազանցում է 31 կիլոգրամը, կամ
                            արժեքը գերազանցում
                            է 200 եվրոյին համարժեք ՀՀ դրամը, ապա պետք է վճարվեն մաքսատուրք և հարկեր գերազանցող մասի
                            համար՝ 15% դրույքաչափով, սակայն ոչ պակաս, քան 31 կիլոգրամը գերազանցող յուրաքանչյուր
                            կիլոգրամի համար 2 եվրոյին համարժեք ՀՀ դրամով:»</p>
                        <Paper className='paper' elevation={2}>
                            <div className='first-line'>
                                <div className='input'>
                                    <TextField
                                        onChange={this.onPriceChange}
                                        value={price}
                                        className='value-input'
                                        id="outlined-basic"
                                        label="Արժեք"
                                        variant="outlined"
                                        type='tel'
                                    />
                                    <div className='selects'>
                                        <CurrencyField
                                            currency={currency}
                                            setCurrency={this.onCurrencyChange}/>
                                        <div className='weight-input'>
                                            <input value={kg}
                                                   onChange={this.onKgChange}
                                                   disabled={!isHeavy}
                                                   ref={this.kgRef}
                                                   type="tel"/>
                                        </div>
                                    </div>
                                </div>
                                <TaxPrice taxPrice={tax} totalPrice={price && totalPrice()}/>
                            </div>
                            <div className='checkbox-weight'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={async () => {
                                                await this.setState(state => ({
                                                    isHeavy: !state.isHeavy
                                                }));
                                                this.calculateTax();
                                                setTimeout(() => this.kgRef.current.focus())
                                            }}
                                            checked={isHeavy}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Ապրանքի քաշը գերազանցում է 31կգ"
                                />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <Author/>
            </div>
        );
    }
}

export default App;
