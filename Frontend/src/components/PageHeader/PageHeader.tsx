import "./PageHeader.css"

export function PageHeader({ pageName }: { pageName: string }) {
    return (
        <div className="header">
            <span className = "header__title"> {pageName} </span>
        </div>
    )
}