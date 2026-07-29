import "./CoinCard.css"
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { userService } from "../../services/UserServices";
import { useQueryClient } from "@tanstack/react-query";
import { Coin } from "../../types/Coin";
import { Card } from "../../ui/Card/Card";
import { Skeleton } from "../../ui/Skeleton/Skeleton";
import { round } from "../../utils/round";

export function CoinCard({ coin, isFav }: { coin: Coin, isFav: boolean }) {
    const queryClient = useQueryClient()
    const updateFavs = useMutation({
        mutationFn: () => isFav ? userService.removeFavCoin(coin.id) : userService.addFavCoin(coin.id, coin.symbol),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["favCoins"] });
            queryClient.setQueryData(["favCoins"], (oldData: Array<Coin>) => {
                if (isFav)
                    return oldData.filter(c => c.id !== coin.id)
                return [...oldData, coin]
            })
        }
    })
    const navigate = useNavigate()

    return (
        <Card cardHandlerFunc={() => { navigate(`/app/CoinInfo/${coin.id}`) }}>
            <div className="coin__content">
                <img className="coin__image" src={coin.image} />
                <div className="coin__exchange-info">
                    <div>
                        <span className="coin__name"> {coin.id} </span>
                        <span> {coin.symbol} </span>
                    </div>
                    <div className="coin__price-block">
                        <div className="coin__price"> {"$" + round(coin.current_price, 3)} </div>
                        <span className="coin__price-change" style={{ color: (coin.price_change_percentage_24h >= 0) ? "green" : "red" }}>{round(coin.price_change_percentage_24h, 2)}</span>
                        <svg className="coin__price-arrow" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 40 80"
                            preserveAspectRatio="xMidYMid meet"
                            role="img"
                            aria-label="Up arrow">
                            {(coin.price_change_percentage_24h >= 0) ? (<polygon points="20,0 40,30 28,30 28,80 12,80 12,30 0,30" fill="#27ae60" />) : (<polygon points="20,80 40,50 28,50 28,0 12,0 12,50 0,50" fill="#e74c3c" />)}
                        </svg>
                    </div>
                </div>
            </div>
            <svg className="coin__fav-icon" onClick={(e) => { updateFavs.mutateAsync(); e.stopPropagation() }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="favorite">
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

export function SkeletonCoin() {
    return (
        <Card>
            <div className="coin__content">
                <Skeleton height="3rem" width="3rem" />
                <div className="coin__exchange-info">
                    <div>
                        <Skeleton width="3rem" height="1.2rem" />
                    </div>
                    <div className="coin__price-block">
                        <Skeleton width="4.5rem" height="1rem" />
                        <Skeleton width="1rem" height="1rem" />
                    </div>
                </div>
            </div>
            <Skeleton width="2rem" height="2rem"/>
        </Card>
    )
}