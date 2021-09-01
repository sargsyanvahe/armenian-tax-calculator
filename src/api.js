class Api {

    base_url = 'https://cb.am/latest.json.php';

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

        if (date === this.getToday()) {
            return Promise.resolve(JSON.parse(localStorage.getItem('rates')))
        }

        return this.fetchCurrencyRate().then(data => {

            const rates = {
                'EUR': data.EUR,
                'USD': data.USD,
                'RUB': data.RUB,
                'GBP': data.GBP,
            }

            localStorage.setItem('rates', JSON.stringify(rates));
            localStorage.setItem('date', this.getToday());

            return {
                'EUR': +data.EUR,
                'USD': +data.USD,
                'RUB': +data.RUB,
                'GBP': +data.GBP,
            }
        })
    }

    // -------------------

}

export const api = new Api();