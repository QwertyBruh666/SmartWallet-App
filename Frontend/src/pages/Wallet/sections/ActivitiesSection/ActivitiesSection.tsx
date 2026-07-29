import { useQuery } from "@tanstack/react-query";
import { walletService } from "../../../../services/WalletService";
import { useState } from "react";
import { FilterMenu } from "../../../../components/FilterMenu/FilterMenu";
import { SkeletonWalletActivity, WalletActivityCard } from "../../../../components/WalletActivityCard/WalletActivityCard";
import { ActivityDetailsModal } from "../../../../components/ActivityDetailsModal/ActivityDetailsModal";
import { Wallet } from "../../../../types/Wallet";
import { WalletActivityDTO } from "../../../../dtos/WalletActivityDTO";

export function ActivitiesSection({ wallet }: { wallet: Wallet }) {
    const { data: activities, error, isPending } = useQuery({
        queryKey: ["walletActivities", wallet?.exchangeName],
        queryFn: () => {console.log(wallet); return walletService.getWalletActivities(wallet.exchangeName)},
        enabled: wallet !== null
    })
    const [activityType, setActivityType] = useState<string>("All")
    const [showDetails, setShowDetails] = useState<boolean>(false)
    const [activityDetails, setActivityDetails] = useState<WalletActivityDTO>()

    return (
        <>
            {showDetails && activityDetails && <ActivityDetailsModal activity={activityDetails} showFunc={() => setShowDetails(false)}/>}
            <section className="activities">
                <div className="section__title activities__title"> Wallet Activity </div>
                <FilterMenu filterItems={["All", "Trade", "Deposit", "Withdrawal", "Convert"]} currState={activityType} stateChangeFunc={setActivityType} />
                <div className="list activities__list">
                    {!isPending ?
                        activities.map(
                            a => {
                                let criterion = activityType.toLowerCase()
                                if (criterion === "all")
                                    return <WalletActivityCard showDetails={() => {setShowDetails(true); setActivityDetails(a)}} activity={a} />
                                if (a.type === criterion)
                                    return <WalletActivityCard showDetails={() => {setShowDetails(true); setActivityDetails(a)}} activity={a} />
                                return null
                            }): Array.from({ length: 5 }).map(
                                () => <SkeletonWalletActivity/>
                            )}
                </div>
            </section>
        </>
    )
}