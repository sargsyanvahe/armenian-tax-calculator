class Api {

    base_url = 'https://v6.exchangerate-api.com/v6/4f8b1becffc544c6dba9cdc2/latest/AMD';

    fetchCurrencyRate() {
        return fetch(`${this.base_url}`)
            .then(res => res.json())
    }

    getToday() {
        return new Date().toISOString().slice(0, 10)
    }


    //- Transforming rates data -
    outputData() {

        const date = localStorage.getItem('date');
        // const hour = localStorage.getItem('hour');
        const rates = localStorage.getItem('rates');

        if ((date === this.getToday())) {
            return Promise.resolve(JSON.parse(rates))
        }

        return this.fetchCurrencyRate().then(res => {

            const rates = {
                'EUR': (1/res.conversion_rates.EUR).toFixed(2),
                'USD': (1/res.conversion_rates.USD).toFixed(2),
                'RUB': (1/res.conversion_rates.RUB).toFixed(2),
                'GBP': (1/res.conversion_rates.GBP).toFixed(2),
            }

            localStorage.setItem('rates', JSON.stringify(rates));
            localStorage.setItem('date', this.getToday());
            // localStorage.setItem('hour', String(new Date().getHours()));

            return rates
        }).catch(() => {
            alert('Something Went Wrong, Please try again later')
        })
    }

    // -------------------

}

export const api = new Api();