import { ReactElement } from "react"
import "./Card.css"

export function Card({ children, className, cardHandlerFunc } : { children, className?: string, cardHandlerFunc: Function }) {
    return (
        <div className={`card ${className}`} onClick={() => {cardHandlerFunc()}}>
            { children }
        </div>
    )
}