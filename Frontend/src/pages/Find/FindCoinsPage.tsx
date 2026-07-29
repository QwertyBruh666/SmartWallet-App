import { useState, useEffect, useMemo, useRef } from "react";
import { LoadingPage } from "../Loading/LoadingPage.tsx";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection.tsx";
import { FindCoinSection } from "./sections/FindCoinSection/FindCoinSection.tsx";
import { CoinsListSection } from "./sections/CoinListSection/CoinsListSection.tsx";
import { exchnageService } from "../../services/ExchangeService.ts";
import { Coin } from "../../types/Coin.ts";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
export { FindCoinsPage }

function FindCoinsPage() {
    const [page, setPage] = useState<number>(1)
    const [coins, setCoins] = useState<Array<Coin>>([])
    const { data: newCoins, isPending } = useQuery({
        queryKey: ["coins", page],
        queryFn: () => exchnageService.getCoins(page),
        gcTime: 0,
        staleTime: 0
    })
    const [filterExp, setFilterExp] = useState<(c:Coin) => boolean>(() => () => true)
    const [sortExp, setSortExp] = useState<(a: Coin, b: Coin) => number>(() => (a, b) => a.market_cap_rank - b.market_cap_rank)

    const setHeader = useOutletContext<Function>()

    useEffect(() => {
        setHeader(<HeaderSection/>)
    }, [])
    
    useEffect(() => {
        if(!isPending) {
            setCoins(prev => [...prev, ...newCoins].sort((a, b) => a.market_cap_rank - b.market_cap_rank))
        }
    }, [isPending, newCoins])

    const filteredCoins = useMemo(
        () => {
            if(coins.length === 0)
                return null
            return coins.filter(filterExp).sort(sortExp)
        }, [coins, filterExp, sortExp])

    return (
        <>
            <FindCoinSection coins={coins} setSortExp = {setSortExp} setFilterExp = {setFilterExp}/>
            <CoinsListSection viewCoins={filteredCoins ?? newCoins} isLoading={isPending} loadCoins={ () => setPage(page + 1) } setError={() => {}}/>
        </>
    )
}
