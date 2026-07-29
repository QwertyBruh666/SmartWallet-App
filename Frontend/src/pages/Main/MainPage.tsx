import { FavCoinsSection } from "./sections/FavCoinsSection/FavCoinsSection.tsx";
import { WalletsSection } from "./sections/WalletsSection/WalletsSection.tsx";
import { TopGainersSection } from "./sections/TopGainersSection/TopGainersSection.tsx";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../../services/UserServices.ts";
import { NewsSection } from "./sections/NewsSection/NewsSection.tsx";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { PageHeader } from "../../components/PageHeader/PageHeader.tsx";
import { createCookie } from "../../utils/cookieHandle.ts";

export function MainPage() {
    const { data: favCoins, isPending, error } = useQuery({
        queryKey: ["favCoins"],
        queryFn: userService.getFavCoins
    })
    const setHeader = useOutletContext<Function>()

    useEffect(() => {
        setHeader(<PageHeader pageName="SmartWallet"/>)
    }, [])

    useEffect(() => {
        if(!isPending)
            createCookie("favCount", favCoins.length.toString())
    }, [favCoins])

    return (
        <>
            <WalletsSection />
            <FavCoinsSection favCoins = { favCoins } isPending={isPending}/>
            <TopGainersSection favCoins = {favCoins}/>
            <NewsSection />
        </>
    )
}
