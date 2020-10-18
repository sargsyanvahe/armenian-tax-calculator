import React from "react";

import { TextField } from "@material-ui/core";

export default function TaxPrice({ taxPrice }) {

    let textColor = 'tax-price';

    if (isNaN(+taxPrice.split(',').join(''))) {
        textColor += ' no-tax';
    } else if (taxPrice) {
        taxPrice = `${taxPrice} դր.`
    }

    return (
        <TextField
            className={textColor}
            id="outlined-helperText"
            value={taxPrice}
            helperText="Մաքսազերծման արժեք"
            variant="outlined"
            disabled
        />
    )
}