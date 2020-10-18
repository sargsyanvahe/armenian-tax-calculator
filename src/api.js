class Api {

    base_url = 'https://api.exchangerate.host/';
    usd = 'USD';
    eur = 'EUR';
    rub = 'RUB';
    gbp = 'GBP';

    fetchCurrencyRate(currency) {
        return fetch(`${this.base_url}latest?base=${currency}`)
            .then(res => res.json())
            .then(data => ({ [currency]: data.rates.AMD.toFixed(2) }))
    }

    //- Transforming rates data -
    outputData() {

        // - 4 fetchs , because API not allowed to fetch 4 currencies immediately
        return Promise.all([
            this.fetchCurrencyRate(this.usd),
            this.fetchCurrencyRate(this.eur),
            this.fetchCurrencyRate(this.rub),
            this.fetchCurrencyRate(this.gbp),
        ]).then(data => data.reduce((acc, curr) => ({ ...acc, ...curr }), {}))
    }
    // -------------------

}

export const api = new Api();