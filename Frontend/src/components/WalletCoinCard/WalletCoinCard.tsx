import "./WalletCoinCard.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { WalletCoin } from "../../types/Wallet"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { userService } from "../../services/UserServices"
import { Card } from "../../ui/Card/Card"
import { round } from "../../utils/round"

type WalletCoinsProps = {
    coin: WalletCoin,
    isFav: boolean
}

export function WalletCoinCard(props: WalletCoinsProps) {
    const { coin } = props
    const [isFav, setIsFav] = useState(props.isFav)
    const queryClient = useQueryClient()
    const updateFavs = useMutation({
        mutationFn: (isFav: boolean) => isFav? userService.removeFavCoin(coin.id) : userService.addFavCoin(coin.id, coin.symbol),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["favCoins"] })
        }
    })
    const navigate = useNavigate() 

    return (
        <Card cardHandlerFunc={() => { navigate(`/app/CoinInfo/${coin.id}`) }}>
            <div className="coin__content">
                <img className="coin__image" src={coin.logoPath} />
                <div className="coin__exchange-info">
                    <span className="coin__name">{coin.id}</span>
                    <div className="coin__balance-block">
                        <span className="coin__balance"> {round(coin.coinsNumber, 4)}  </span>
                        <span className="coin__balance-price"> { "$" + round(coin.coinUsdPrice, 2) }  </span>
                    </div>
                </div>
            </div>
            <svg className="coin__fav-icon" onClick={(e) => { updateFavs.mutateAsync(isFav); setIsFav(!isFav); e.stopPropagation() }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="favorite">
                <title>Favorite</title>
                <polygon
                    fill={isFav ? "#c9a94f" : "none"}
                    stroke="#000000"
                    stroke-width={isFav ? "0" : "1.2"}
                    stroke-linejoin="round"
                    points="12 17.3 18.2 21 16.5 14 22 9.3 14.8 8.6 12 2 9.2 8.6 2 9.3 7.5 14 5.8 21 12 17.3"
                />
            </svg>
        </Card>
    )
}