import "./SortOptionsModal.css"
import { useEffect, useState } from "react"
import { Coin } from "../../../../types/Coin"

function resetFilterSort(setFilterExp: Function, setSortExp: Function, setPriceDirect: Function, setPercentDirect: Function) {
    setFilterExp( () => () => true ); 
    setSortExp(() => () => 0);
    setPercentDirect("up");
    setPriceDirect("up");
}

function SortBy(direct:string, propName: string, setSort: Function) {
    if (direct == "up") {
        setSort(() => (a: Coin, b:Coin) => b[propName] - a[propName] )
    }
    else {
        setSort(() => (a:Coin, b:Coin) => a[propName] - b[propName] )
    }
}

function SortByPrice(direct, setSort) {
    SortBy(direct, "current_price",setSort)
}

function SortBy24hChange(direct, setSort) {
    SortBy(direct, "price_change_percentage_24h", setSort)
}

type SortOptionsProps = {
    sortFilterExps: { setFilterExp: Function, setSortExp: Function },
    setView: Function
}

export function SortOptionsModal({ sortFilterExps, setView }: SortOptionsProps) {
    const [maxCost, setMaxCost] = useState<number>()
    const [minCost, setMinCost] = useState<number>(0)
    const [priceDirect, setPriceDirect] = useState<string>("up")
    const [percentDirect, setPercentDirect] = useState<string>("up")

    //Фильтрация
    useEffect(() => {
        if (minCost && maxCost) {
            sortFilterExps.setFilterExp(() => c => c.current_price >= minCost && c.current_price <= maxCost)
        }
        else if (minCost || maxCost) {
            minCost ? sortFilterExps.setFilterExp(() => c => c.current_price >= minCost) : sortFilterExps.setFilterExp(() => c => c.current_price <= maxCost)
        }
    }, [minCost, maxCost])

    return (
        <div className = "filter-sort-wrap" style={ {display: "flex"} } onClick={() => { setView(false) }}>
            <div className = "filter-sort" onClick={e => { e.stopPropagation() }}>
                <div className="block__title filter-sort__title"> Filter & Sort </div>
                <div className="filter-sort__price-range">
                    <div className="filter-name filter-sort__filter-name"> Price Range </div>
                    <div className="filter-sort__price-container">
                        <div className="filter-sort__price">
                            <input value={minCost} className="filter-sort__price-value" onChange={
                                e => {
                                    if (e.target.value === "")
                                        setMinCost(0)
                                    else
                                        setMinCost(Number(e.target.value))
                                }} />
                            <span> $ </span>
                        </div>
                        <div className="filter-sort__price">
                            <input value={maxCost} className="filter-sort__price-value"
                                onChange={
                                    e => {
                                            setMaxCost(Number(e.target.value) <= 0 ? null : Number(e.target.value))
                                    }} />
                            <span> $ </span>
                        </div>
                    </div>
                    <div className="filter-sort__price-range-names"> 
                        <div className="filter-sort__price-range-name"> Min price </div> 
                        <div className="filter-sort__price-range-name"> Max price </div> 
                    </div>
                </div>
                <div className="filter-sort__sorts">
                    <div className="filter-sort__sort-name"> Sort by </div>
                    <div className="filter-sort__sorts-container">
                        <div className="filter-sort__sort-type" onClick={ () => { SortByPrice(priceDirect, sortFilterExps.setSortExp); setPriceDirect( (priceDirect == "up") ? "down" : "up" ); } }> 
                            Price 
                            <img className="filter-sort__sort-direct-image" style={{ transform: (priceDirect === "up") ? "rotate(180deg)" : null }} src="../down.png"/> 
                        </div>
                        <div className="filter-sort__sort-type" onClick={ () => { SortBy24hChange(percentDirect, sortFilterExps.setSortExp); setPercentDirect( (percentDirect == "up") ? "down" : "up" );  } }> 
                            24 Change 
                            <img className="filter-sort__sort-direct-image" style={{ transform: (percentDirect === "up") ? "rotate(180deg)" : null }} src="../down.png"/> 
                        </div>
                    </div>
                </div>
                <div className="button filter-sort__reset" onClick={ () => resetFilterSort(sortFilterExps.setFilterExp, sortFilterExps.setSortExp, setPriceDirect, setPercentDirect) }>
                     Reset
                </div>
            </div>
        </div>)
}