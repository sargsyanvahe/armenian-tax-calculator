class Api {

    base_url = 'https://freecurrencyapi.net/api/v2/latest?apikey=68301e90-9de8-11ec-a3cf-b132fb73a648&base_currency=AMD';

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

            console.log(res)

            const rates = {
                'EUR': (1/res.data.EUR).toFixed(2),
                'USD': (1/res.data.USD).toFixed(2),
                'RUB': (1/res.data.RUB).toFixed(2),
                'GBP': (1/res.data.GBP).toFixed(2),
            }

            localStorage.setItem('rates', JSON.stringify(rates));
            localStorage.setItem('date', this.getToday());
            // localStorage.setItem('hour', String(new Date().getHours()));

            return rates
        })
    }

    // -------------------

}

export const api = new Api();