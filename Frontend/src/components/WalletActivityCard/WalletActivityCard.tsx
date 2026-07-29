import "./WalletActivityCard.css"
import { ConvertActivityDTO, DepositActivityDTO, TradeActivityDTO, WalletActivityDTO, WithdrawalActivityDTO } from "../../dtos/WalletActivityDTO"
import { Card } from "../../ui/Card/Card"
import { ReactElement } from "react"
import { Skeleton } from "../../ui/Skeleton/Skeleton"
import { round } from "../../utils/round"

function convertDate(stringDate: string): string {
    const activityDate = new Date(stringDate)
    const currDate = new Date()
    if (activityDate.toDateString() === currDate.toDateString())
        return `Today \u2022 ${activityDate.getHours()}:${activityDate.getMinutes()}`
    if (activityDate.getFullYear() === currDate.getFullYear() && activityDate.getMonth() === currDate.getMonth() && activityDate.getDay() === currDate.getDay() - 1)
        return `Tomorrow \u2022 ${activityDate.getHours()}:${activityDate.getMinutes()}`
    if (activityDate.getFullYear() === currDate.getFullYear())
        return `${activityDate.toDateString().substring(3, 10)} \u2022 ${activityDate.getHours()}:${activityDate.getMinutes()}`
    return `${activityDate.toDateString().substring(3)} \u2022 ${activityDate.getHours()}:${activityDate.getMinutes()}`
}

function ConvertActivityCard({ activity }: { activity: ConvertActivityDTO }) {
    return (
        <div className="activity-card__main">
            <div className="activity-card__header">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="#1A73E8"
                >
                    <path d="M17.65 6.35A8 8 0 0 0 4 12h2a6 6 0 0 1 10.24-4.24L14 10h6V4l-2.35 2.35z" />
                    <path d="M6.35 17.65A8 8 0 0 0 20 12h-2a6 6 0 0 1-10.24 4.24L10 14H4v6l2.35-2.35z" />
                </svg>
                <span className="activity-card__title"> Convert </span>
            </div>
            <span className="activity-card__content">
                {round(activity.fromAmount, 4)} {activity.fromCoin} {"\u2192"} {round(activity.toAmount, 4)} {activity.toCoin}
            </span>
        </div>
    )
}

function TradeActivityCard({ activity }: { activity: TradeActivityDTO }) {
    return (
        <div className="activity-card__main">
            <div className="activity-card__header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill={activity.orderSide === "Buy" ? "#16C784" : "#EA3943"}>
                    <circle cx="12" cy="12" r="10" />
                </svg>
                <span className="activity-card__title"> {activity.orderSide} </span>
            </div>
            <span className="activity-card__content">
                {round(activity.quantity, 4)} {activity.symbol} {"$" + round(activity.price, 2)}
            </span>
        </div>
    )
}

function DepositActivityCard({ activity }: { activity: DepositActivityDTO }) {
    return (
        <div className="activity-card__main">
            <div className="activity-card__header">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="#16C60C"
                >
                    <path d="M11 3h2v12h4l-5 6-5-6h4z" />
                </svg>
                <span className="activity-card__title"> Deposit </span>
            </div>
            <span className="activity-card__content"> {round(activity.quantity, 4)} {activity.coin} </span>
        </div>
    )
}

function WithdraActivityCard({ activity }: { activity: WithdrawalActivityDTO }) {
    return (
        <div className="activity-card__main">
            <div className="activity-card__header">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="#E81123"
                >
                    <path d="M13 21h-2V9H7l5-6 5 6h-4z" />
                </svg>
                <span className="activity-card__title"> Withdraw </span>
            </div>
            <span className="activity-card__content">
                {round(activity.quantity, 4)} {activity.coin}
            </span>
        </div>
    )
}

export function WalletActivityCard({ activity, showDetails }: { activity: WalletActivityDTO, showDetails: Function }) {
    let activityCard: ReactElement;
    switch (activity.type) {
        case "convert":
            activityCard = <ConvertActivityCard activity={activity} />
            break
        case "trade":
            activityCard = <TradeActivityCard activity={activity} />
            break
        case "withdrawal":
            activityCard = <WithdraActivityCard activity={activity} />
            break
        case "deposit":
            activityCard = <DepositActivityCard activity={activity} />
            break
    }

    return (
        <Card cardHandlerFunc={showDetails}>
            {activityCard}
            <span className="activity-card__date">{convertDate(activity.time)}</span>
        </Card>
    )
}

export function SkeletonWalletActivity() {
    return (
        <Card className="skeleton">
            <div className="activity-card__main">
                <div className="activity-card__header">
                    <Skeleton width="28px" height="28px"/>
                    <Skeleton width="3.5rem" height="1.2rem"/>
                </div>
                <span className="activity-card__content">
                    <Skeleton width="8rem" height="1.2rem"/>
                </span>
            </div>
            <Skeleton width="5rem" height="1rem"/>
        </Card>
    )
} 