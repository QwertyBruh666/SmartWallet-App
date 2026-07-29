import { Coin } from "../../../types/Coin"
import { Modal } from "../../../ui/Modal/Modal"
import { round } from "../../../utils/round";
import { getShortNumber } from "../../../utils/getShortNumber";

type ExtentedCoinInfoProps = {
    coin: Coin,
    show: Function
}

export function CoinExtraModal(props: ExtentedCoinInfoProps) {
    const { coin, show } = props
    return (
        <Modal header="Extra" showFunc={show}>
            <div className="list">
                <div className="stat" >
                    <span className="stat__name"> Market cap rank </span>
                    <span className="stat__value">  {coin.market_cap_rank}  </span>
                </div>
                <div className="stat">
                    <span className="stat__name"> All time high </span>
                    <span className="stat__value">  {"$" + round(coin.ath, 4)}  </span>
                </div>
                <div className="stat">
                    <span className="stat__name"> All time low </span>
                    <span className="stat__value">  {"$" + round(coin.atl, 4)}  </span> </div>
                <div className="stat">
                    <span className="stat__name"> Fully diluted valuation </span>
                    <span className="stat__value">  {getShortNumber(coin.fully_diluted_valuation)} </span>
                </div>
            </div>
        </Modal>
    )
}
