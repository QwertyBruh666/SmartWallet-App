import "./SummarySection.css"
import { Coin } from "../../../../types/Coin"
import { round } from "../../../../utils/round"

type SummaryProps = { coin: Coin }

export function SummarySection(props: SummaryProps) {
    const { coin } = props

    console.log(coin)

    return (
        <div className="summary">
            <div className="summary__stats">
                <span className="summary__stat" style={{ color: (coin.price_change_percentage_24h > 0) ? "green" : "red" }}> {`${round(coin.price_change_percentage_24h, 2)}% ($${round(coin.price_change_24h, 2)})`} </span>
                <div className="summary__stat"> High 24h: <span style={{ color: "green" }}> {"$" + round(coin.high_24h, 2)} </span> </div>
                <div className="summary__stat"> Low 24h: <span style={{ color: "red" }}> {"$" + round(coin.low_24h, 2)} </span> </div>
            </div>
        </div>
    )
}