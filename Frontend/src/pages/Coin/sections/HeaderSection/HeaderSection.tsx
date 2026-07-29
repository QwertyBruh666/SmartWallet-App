import "./HeaderSection.css"
import { Coin } from "../../../../types/Coin"
import { isFavorite } from "../../../../utils/IsFavorite"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { userService } from "../../../../services/UserServices"
import { Skeleton } from "../../../../ui/Skeleton/Skeleton"
import { round } from "../../../../utils/round"

type HeaderInfoProps = {
    coin: Coin
}

function SkeletonCoinHeader() {
    return (
        <div className="coin-header">
            <div className="coin-header__id-info">
                <Skeleton height="3.5rem" width="3.5rem" />
                <div className="coin-header__names-wrap">
                    <Skeleton height = "1.6rem" width="4rem"/>
                    <Skeleton height = "1.6rem" width="2rem"/>
                </div>
            </div>
            <div className="coin-header__price-info" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Skeleton width="5rem" height="1.5rem"/>
                <Skeleton width="2rem" height="2rem"/>
            </div>
        </div>)
}

export function HeaderSection(props: HeaderInfoProps) {
    const { coin } = props
    const { data: favCoins, isPending, error } = useQuery({
        queryKey: ["favCoins"],
        queryFn: userService.getFavCoins
    })
    const queryClient = useQueryClient()
    const updateFavs = useMutation({
        mutationFn: () => isFavorite(favCoins, coin.id) ? userService.removeFavCoin(coin.id) : userService.addFavCoin(coin.id),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["favCoins"] });
            queryClient.setQueryData(["favCoins"], (oldData: Array<Coin>) => {
                if (isFavorite(favCoins, coin.id))
                    return oldData.filter(c => c.id !== coin.id)
                return [...oldData, coin]
            })
        }
    })

    return (
        <>
            {!isPending ?
                <div className="coin-header">
                    <div className="coin-header__id-info">
                        <img className="coin-header__image" src={coin.image} />
                        <div className="coin-header__names-wrap">
                            <div className="coin-header__id"> {coin.id} </div>
                            <div className="coin-header__symbol"> {coin.symbol} </div>
                        </div>
                    </div>
                    <div className="coin-header__price-info" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div className="coin-header__usd-price">
                            {"$" + round(coin.current_price, 2)}
                        </div>
                        <svg className="coin__fav-icon" onClick={(e) => { updateFavs.mutateAsync(); e.stopPropagation() }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="favorite">
                            <title>Favorite</title>
                            <polygon
                                fill={isFavorite(favCoins, coin.id) ? "#c9a94f" : "none"}
                                stroke="#000000"
                                stroke-width={isFavorite(favCoins, coin.id) ? "0" : "1.2"}
                                stroke-linejoin="round"
                                points="12 17.3 18.2 21 16.5 14 22 9.3 14.8 8.6 12 2 9.2 8.6 2 9.3 7.5 14 5.8 21 12 17.3"
                            />
                        </svg>
                    </div>
                </div> :
                <SkeletonCoinHeader />}
        </>
    )
}