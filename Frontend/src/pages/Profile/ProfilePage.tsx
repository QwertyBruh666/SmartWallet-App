import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../../services/UserServices.ts";
import { LoadingPage } from "../Loading/LoadingPage.tsx";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection.tsx";
import { ProfileInfoSection } from "./sections/ProfileSection/ProfileInfoSection.tsx";

export function ProfilePage() {
    const { data: accountInfo, error, isPending } = useQuery({ queryKey: ["accountInfo"], queryFn: userService.getUserInfo })
    const setHeader = useOutletContext<Function>()

    useEffect(() => { setHeader(<HeaderSection/>) }, [])

    if (isPending)
        return <LoadingPage/>

    if(error)
        return <> { error.message } </>

    return (
        <>
            <ProfileInfoSection account={accountInfo}/>
        </>
    )
}