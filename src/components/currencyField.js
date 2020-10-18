import React  from "react";
import { TextField, MenuItem } from "@material-ui/core";

export default function CurrencyField({currency,setCurrency}) {

    const currencies = [
        {
            value: 'AMD',
            label: '֏  AMD',
        },
        {
            value: 'USD',
            label: '$  USD',
        },
        {
            value: 'EUR',
            label: '€  EUR',
        },
        {
            value: 'RUB',
            label: '₽  RUB'
        },
        {
            value: 'GBP',
            label: '£  GBP'
        }
    ];

    const handleChange = (event) => {
        setCurrency(event.target.value)
    };


    return (
        <TextField
            id="outlined-select-currency"
            select
            className='currency'
            label="Ընտրել"
            value={currency}
            onChange={handleChange}
            helperText="Արժույթ"
            variant="outlined"
        >
            {currencies.map((currency) => (
                <MenuItem key={currency.value} value={currency.value}>
                    <p>{currency.label}</p>
                </MenuItem>
            ))}
        </TextField>
    )
}
