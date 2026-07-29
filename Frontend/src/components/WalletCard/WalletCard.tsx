import { useNavigate } from "react-router-dom"
import { Wallet } from "../../types/Wallet"
import { Card } from "../../ui/Card/Card"
import { Skeleton } from "../../ui/Skeleton/Skeleton"
import { round } from "../../utils/round"

type WalletElementProps = {
    wallet: Wallet,
}

export function WalletCard(props: WalletElementProps) {
    const { wallet } = props
    const navigate = useNavigate()

    return (
        <Card cardHandlerFunc={() => { navigate(`/app/walletinfo/${wallet.exchangeName}`) }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <img className="wallet__image" src={`../exchangeLogos/${wallet.exchangeName}.png`} />
                <div style={{ fontSize: "1.2rem", fontWeight: "500" }}> {wallet.exchangeName} </div>
            </div>
            <div className="wallet__balance">
                {"$" + round(wallet.totalWalletBalance, 2)}
            </div>
        </Card>
    )
}

export function SkeletonWallet() {
    return (
        <Card>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <Skeleton height="3rem" width="3rem" />
                    <Skeleton width="5rem" height="1.5rem" />
                </div>
                <Skeleton height="2rem" width="2rem"/>
        </Card>
    )
}