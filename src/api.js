class Api {

    base_url = 'https://free.currconv.com/api/v7';
    api_key = '9c07a318af1a771a0a73';
    usd = 'USD_AMD';
    eur = 'EUR_AMD';
    rub = 'RUB_AMD';
    gbp = 'GBP_AMD';

    fetchCurrencyRate(pair1,pair2) {
        return fetch(`${this.base_url}/convert?q=${pair1},${pair2}&compact=ultra&apiKey=${this.api_key}`)
            .then(res => res.json())
    }


    //- Transforming rates data -
    outputData() {

        // - 2 fetches , because API not allowed to fetch 4 currencies immediately
        return Promise.all([
            this.fetchCurrencyRate(this.usd,this.eur),
            this.fetchCurrencyRate(this.rub,this.gbp),
        ]).then(data => {
            const data_ = data.reduce((acc, curr) => ({...acc, ...curr}), {})
            const obj = {}
            for(let [key,value] of Object.entries(data_)){
                obj[key.replace('_AMD','')] = value.toFixed(2)
            }
            return obj
        })
    }
    // -------------------

}

export const api = new Api();