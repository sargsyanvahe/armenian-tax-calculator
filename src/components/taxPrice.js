import React from "react";

import { TextField } from "@material-ui/core";

export default function TaxPrice({taxPrice, totalPrice}) {

    let textColor = 'tax-price';

    if (isNaN(+taxPrice.split(',').join(''))) {
        textColor += ' no-tax';
    } else if (taxPrice) {
        taxPrice = `${taxPrice} դր`
    }

    if (totalPrice === 0) {
        totalPrice = null
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column"
        }}>
            <TextField
                className={textColor}
                id="outlined-helperText"
                value={taxPrice}
                helperText="Մաքսազերծման արժեք"
                variant="outlined"
                disabled
            />
            {totalPrice && <TextField
                id="outlined-helperText"
                value={totalPrice + " դր"}
                helperText="Ընդհանուր"
                variant="outlined"
                disabled
            />}
        </div>
    )
}