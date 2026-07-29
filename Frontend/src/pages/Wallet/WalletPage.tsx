import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { ChartSection } from "./sections/ChartSection/ChartSection";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CoinsSection} from "./sections/CoinsSection/CoinsSection";
import { LoadingPage } from "../Loading/LoadingPage";
import { WalletOptionsModal } from "./modals/WalletOptionsModal";
import { useQuery } from "@tanstack/react-query";
import { walletService } from "../../services/WalletService";
import { ActivitiesSection } from "./sections/ActivitiesSection/ActivitiesSection";

export function WalletPage() {
    const params = useParams()
    const setHeader = useOutletContext<Function>()
    const { data: wallet, isPending } = useQuery({
        queryKey: ["wallet", params.ExchangeName],
        queryFn: () => walletService.getWallet(params.ExchangeName)
    })
    const [walletProps, setWalletProps] = useState<boolean>(false)

    useEffect(() => {
        setHeader(<HeaderSection setWalletProps={setWalletProps}/>)
    }, [])

    return (
        <>
            { walletProps && <WalletOptionsModal wallet={wallet} setWalletProps={setWalletProps}/> }
            <ChartSection walletName={params.ExchangeName} />
            <CoinsSection wallet={wallet}/>
            <ActivitiesSection wallet={wallet}/>
        </>
    )
}