import { useEffect, useState } from "react";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { useOutletContext } from "react-router-dom";
import { ChartSection } from "./sections/ChartSection/ChartSection";
import { ListSection } from "./sections/ListSection/ListSection";
import { LoadingPage } from "../Loading/LoadingPage";
import { useQuery } from "@tanstack/react-query";
import { walletService } from "../../services/WalletService";


export function PortfolioPage() {
    const { data: wallets, isPending, error } = useQuery({
        queryKey: ["wallets"],
        queryFn: walletService.getWallets
    })
    const [chartType, setChartType] = useState<string>("composition")
    const [listView, setListView] = useState<string>("wallets")
    const setHeader = useOutletContext<Function>()

    useEffect(() => {
        setHeader(<HeaderSection />)
    }, [])

    if (isPending)
        return <LoadingPage/>

    return (
        <>
            <ChartSection chartType={{ val: chartType, setChartType }} listView={{ val: listView, setListView }} />
            <ListSection wallets={wallets} listView={listView} />
        </>
    )
}