import "./Button.css"

export function Button({ children, bttnHandler, className } : { children, bttnHandler: Function, className?: string }) {
    return (
        <div className={`button ${className}`} onClick={() => bttnHandler()}>
            { children }
        </div>
    )
}