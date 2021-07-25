class Api {

    base_url = 'https://cb.am/latest.json.php';

    fetchCurrencyRate() {
        return fetch(`${this.base_url}`)
            .then(res => res.json())
    }


    //- Transforming rates data -
    outputData() {

        // - 2 fetches , because API not allowed to fetch 4 currencies immediately
        return this.fetchCurrencyRate().then(data => {

            const rates = {
                'EUR': data.EUR,
                'USD': data.USD,
                'RUB': data.RUB,
                'GBP': data.GBP,
            }

            console.log(rates)

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