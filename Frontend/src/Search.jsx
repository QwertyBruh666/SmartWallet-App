import React from "react";
import { useEffect } from "react";
import { Context } from "./App";
import { useContext } from "react";
export { Search }

let allCurrencies;

function Search() {

    let allCurrencies = useContext(Context)

    let [copy, setCopy] = React.useState(allCurrencies.allCurr)

    function Currencies({list}) {

        let nwList = list.slice(0, 100);

        return (
            <div className = "pork search">
                { nwList.map(( (val, idx, arr) => <div className = "valute">  <div> {val.symbol} </div>  <div className = "usdValue"> {val.lastPrice} </div>  </div> )) }
            </div>
        )
    }

    function onChangeSearch(e) {
        let string = e.target.value;
        console.log(string);
        let regExp = new RegExp(`(${string.toUpperCase()}|${string.toLowerCase()})`)
        let resultList = allCurrencies.filter( (val) => regExp.test(val.symbol) );
        if (resultList)
            setCopy( resultList )
    }

    return ( 
        <div>
            <div className = "searchInputhWrap"><input onChange = { onChangeSearch } className = "searchInput" /></div>
            <Currencies list = { copy } />
        </div>
    )
}
