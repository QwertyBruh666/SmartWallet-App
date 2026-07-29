import { useEffect, useState } from "react"
import { Coin } from "../../../../types/Coin"
import { useQuery } from "@tanstack/react-query"
import { userService } from "../../../../services/UserServices"
import { CoinCard, SkeletonCoin } from "../../../../components/CoinCard/CoinCard"
import { Button } from "../../../../ui/Button/Button"

type CoinsListProps = {
    viewCoins: Array<Coin>,
    loadCoins: Function,
    setError: Function,
    isLoading: boolean
}

export function CoinsListSection(props: CoinsListProps) {
    const { viewCoins, loadCoins, isLoading } = props
    const { data: favCoins, isPending } = useQuery({
        queryKey: ["favCoins"],
        queryFn: userService.getFavCoins
    })

    return (
        <>
            <section>
                <div className="list">
                    {viewCoins && !isPending ? viewCoins.map(c => <CoinCard coin={c} isFav={favCoins.filter(coin => coin.id === c.id).length !== 0} />)
                        : Array.from({ length: 20 }).map(() => <SkeletonCoin />)}
                </div>
                { !isLoading && <Button bttnHandler={() => { loadCoins(); }}> Show More </Button> }
            </section>
        </>
    )
}