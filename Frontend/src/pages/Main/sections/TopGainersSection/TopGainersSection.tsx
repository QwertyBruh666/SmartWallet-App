import { exchnageService } from "../../../../services/ExchangeService"
import { Coin } from "../../../../types/Coin"
import { useQuery } from "@tanstack/react-query"
import { CoinCard, SkeletonCoin } from "../../../../components/CoinCard/CoinCard"
import { useEffect } from "react"

export function TopGainersSection({ favCoins }: { favCoins: Array<Coin> }) {
    const { data: coins, error, isPending } = useQuery({
        queryKey: ["topGainers"],
        queryFn: () => exchnageService.getTop24hCoins()
    })

    return (
        <section>
            <div className="section__title"> Top Gainers </div>
            <div className = "list">
                {!isPending && favCoins ? [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 3).map((c) => {
                    return <CoinCard coin={c} isFav={ favCoins.includes(c) }/>
                }) : Array.from({ length: 3 }).map( () => <SkeletonCoin/> )}
            </div>
        </section>
    )
}

