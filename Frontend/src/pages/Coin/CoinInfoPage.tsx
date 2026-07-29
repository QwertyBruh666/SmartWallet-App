import { useOutletContext, useParams } from "react-router-dom";
import { LoadingPage } from "../Loading/LoadingPage.tsx";
import { ChartSection } from "./sections/ChartSection/ChartSection.tsx";
import { NewsSection } from "./sections/NewsSection/NewsSection.tsx";
import { DynamicsSection } from "./sections/DynamicsSection/DynamicsSection.tsx";
import { exchnageService } from "../../services/ExchangeService.ts";
import { GeneralInfoSection } from "./sections/GeneralInfoSection/GeneralInfoSection.tsx";
import { SummarySection } from "./sections/SummarySection/SummarySection.tsx";
import { useQuery } from "@tanstack/react-query";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection.tsx";
import { Coin } from "../../types/Coin.ts";
import { useEffect, useState } from "react";
export { CoinInfoPage }

function CoinInfoPage() {
    const coin = useParams()
    const { data: coinInfo, isPending } = useQuery({
        queryKey: ["coinInfo", coin.Id],
        queryFn: async () => exchnageService.getCoin(coin.Id),
        staleTime: 0,
        gcTime: 0,
        throwOnError: true
    })

    const setHeader = useOutletContext<Function>()

    if (isPending)
        return <LoadingPage />

    if (!isPending)
        setHeader(<HeaderSection coin={coinInfo}/>)

    return (
        <>
            <SummarySection coin={ coinInfo }/>
            <ChartSection coin={coinInfo}/>
            <GeneralInfoSection coin={coinInfo}/>
            <DynamicsSection coin={coinInfo}/>
            <NewsSection coinId={coin.Id}/>
        </>
    )
}


