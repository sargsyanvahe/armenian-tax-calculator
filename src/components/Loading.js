import React from "react";

import '../App.css'

export function Loading() {
    return (
    <div className='loading-container'>
        <h1>Բեռնվում են կենտրոնական բանկի տարադրամի փոխարժեքները</h1>
    <div className="lds-ring"><div/><div/><div/><div/></div>
    </div>
    )
}