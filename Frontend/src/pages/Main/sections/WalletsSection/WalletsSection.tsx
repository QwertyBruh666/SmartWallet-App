import "./WalletsSection.css"
import "../../../../layout.css"
import { useEffect, useState } from "react";
import { AddWalletModal } from "../../modals/AddWalletModal/AddWalletModal";
import { Wallet } from "../../../../types/Wallet";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { walletService } from "../../../../services/WalletService";
import { SkeletonWallet, WalletCard } from "../../../../components/WalletCard/WalletCard";
import { Button } from "../../../../ui/Button/Button";
import { createCookie, getCookie } from "../../../../utils/cookieHandle";
import { round } from "../../../../utils/round";
import { getAllWalletsBalance } from "../../../../utils/getAllWalletsBalance";

type BalanceProps = {
    wallets: Array<Wallet>
}

function BalanceBlock(props: BalanceProps) {
    const { wallets } = props

    return (
        <div className="balance">
            <div className="balance__title"> Balance </div>
            <div className="balance__count"> {"$" + round(getAllWalletsBalance(wallets), 2)} </div>
        </div>)
}

export function WalletsSection() {
    const { data: wallets, isPending, error } = useQuery({
        queryKey: ["wallets"],
        queryFn: walletService.getWallets
    })
    const [showAddWallet, setShowAddWallet] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if(!isPending)
            createCookie("walletsCount", wallets.length.toString())
    }, [wallets])

    return (
        <>
            {showAddWallet && <AddWalletModal cancelShow={setShowAddWallet} />}
            <BalanceBlock wallets={!isPending ? wallets : []} />
            <section className="wallets">
                <div className="section__title">
                    Wallets
                </div>
                <div className="list wallets__list">
                    { !isPending? wallets.map(w => <WalletCard wallet={w} />) : Array.from({ length: Number(getCookie("walletsCount")) }).map(() => <SkeletonWallet/>)}
                    { !isPending && wallets.length === 0 && <div className="card" style={wallets.length === 0 && { flexGrow: "1" }}> <span style={{ flexGrow:"1", textAlign: "center", fontSize: "1.2rem", fontWeight: "500" }}> You don`t have any wallets yet </span> </div> }
                </div>
                <div className="wallets-controls">
                    <Button className="left-button" bttnHandler={() => { setShowAddWallet(!showAddWallet) }}>
                        + Add Wallet
                    </Button>
                    {wallets && wallets.length !== 0 ?
                        <>
                            <div style={{ height: "inherit", backgroundColor: "#f4f6f8", width: "1px" }}></div>
                            <Button className="right-button" bttnHandler={() => navigate("/app/AllWallets")}>
                                {"View Portfolio " + "\u2192"}
                            </Button>
                        </>
                        : null}
                </div>
            </section>
        </>
    )
}