import "./FindCoinSection.css"
import { Coin } from "../../../../types/Coin.ts"
import { useState } from "react"
import { SortOptionsModal } from "../../modals/SortOptionsModal/SortOptionsModal.tsx"

function showFoundCoins(value: string, viewCoins: Array<Coin>, setFilterExp: Function) {
    console.log(value, viewCoins)
    setFilterExp(() => c => c.id?.toLowerCase().startsWith(value.toLowerCase()) || c.symbol?.toLowerCase().startsWith(value.toLowerCase()) )
}

type FindCoinProps = {
    coins: Array<Coin>,
    setFilterExp:Function, 
    setSortExp:Function
}

export function FindCoinSection(props: FindCoinProps) {
    const { coins, setFilterExp, setSortExp  } = props
    const [viewFilter, setViewFilter] = useState<boolean>(false)

    return (
        <section className = "find-coin">
            <div className="find-coin__form-wrap">
                <form className="find-coin__form">
                    <input placeholder="Search..." className="find-coin__form-input" onChange={ (e) => { showFoundCoins(e.target.value, coins, setFilterExp) } } />
                </form>
                <img onClick={ () => { setViewFilter(true) } } className = "find-coin__filter-image" src="../options.png"/>
            </div>
            {viewFilter && <SortOptionsModal sortFilterExps={{setFilterExp, setSortExp}} setView={setViewFilter}/>}
        </section>
    )
}