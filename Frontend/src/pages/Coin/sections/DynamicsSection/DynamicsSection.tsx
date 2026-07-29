import { Coin } from "../../../../types/Coin"
import { round } from "../../../../utils/round"


export function DynamicsSection({ coin } : { coin: Coin }) {

    return (
        <section>
            <div className="section__title"> Coin dynamics </div>
            <div className="stats-list">
                <div className="stat">
                    <span className="stat__name"> {"24h"} </span>
                    <span style={{ color: (Number(coin["price_change_percentage_24h"] < 0)) ? "red" : "green" }} className="stat__value"> {round(coin["price_change_percentage_24h"], 2) + "%"} </span>
                </div>
                {["7d", "30d", "1y"].map((interval) =>
                    <div className="stat">
                        <span className="stat__name"> {interval} </span>
                        <span style={{ color: (Number(coin["price_change_percentage_" + interval + "_in_currency"] < 0)) ? "red" : "green" }} className="stat__value"> {round((coin["price_change_percentage_" + interval + "_in_currency"]), 2) + "%"} </span>
                    </div>)}
            </div>
        </section>
    )
}