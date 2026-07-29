import "./GeneralInfoSection.css"
import { useState } from "react";
import { Coin } from "../../../../types/Coin.ts";
import { CoinExtraModal } from "../../modals/CoinExtraModal.tsx";
import { getShortNumber } from "../../../../utils/getShortNumber.ts";

type GeneralStatsProps = {
    coin: Coin
}

export function GeneralInfoSection(props: GeneralStatsProps) {
    const { coin } = props
    const [extra, setExtra] = useState<boolean>(false)

    return (
        <>
            {extra ? <CoinExtraModal coin={coin} show={setExtra} /> : null}
            <section>
                <div className="section__title"> Stats </div>
                <div className="stats-list">
                    <div className="stat">
                        <span className="stat__name"> Volume </span>
                        <span className="stat__value"> {getShortNumber(coin.total_volume)} </span>
                    </div>
                    <div className="stat">
                        <span className="stat__name"> Circulating supply </span>
                        <span className="stat__value"> {getShortNumber(coin.circulating_supply)} </span>
                    </div>
                    <div className="stat">
                        <span className="stat__name"> Market cap </span>
                        <span className="stat__value"> {getShortNumber(coin.market_cap)} </span>
                    </div>
                </div>
                <div className="button" onClick={() => { setExtra(!extra) }}> View Extra </div>
            </section>
        </>
    )
}