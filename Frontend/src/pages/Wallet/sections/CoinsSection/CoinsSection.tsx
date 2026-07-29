import { useQuery } from "@tanstack/react-query"
import { userService } from "../../../../services/UserServices"
import { LoadingPage } from "../../../Loading/LoadingPage"
import { WalletCoinCard } from "../../../../components/WalletCoinCard/WalletCoinCard"
import { SkeletonCoin } from "../../../../components/CoinCard/CoinCard"

export function CoinsSection({ wallet }) {
    const { data: favCoins, isPending, error } = useQuery({
        queryKey: ["favCoins"],
        queryFn: userService.getFavCoins,
        enabled: wallet !== null
    })

    console.log(wallet)

    return (
        <section>
            <div className="section__title">
                <span className="wallet-coins__title" > Total balance: { wallet ? "$" + Number(wallet.totalWalletBalance ).toFixed(2) : 0} </span>
            </div>
            <div className="list">
                {!isPending && wallet ? wallet.coins.map(c => <WalletCoinCard coin={c} isFav={ favCoins.filter(coin => coin.id === c.id).length !== 0 } />) : Array.from({length: 3}).map(() => <SkeletonCoin/>)}
            </div>
        </section>
    )
}