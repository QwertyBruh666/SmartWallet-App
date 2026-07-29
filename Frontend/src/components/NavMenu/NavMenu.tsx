import "./NavMenu.css"
import { NavLink } from "react-router-dom"

export function NavMenu() {
    const menu = ["home", "search", "newspaper", "portrait" ]
    return (
    <nav className="menu">
        { [ "main", "findCoins", "news", "account" ].map( (e, idx) => <NavLink to={ `/app/${e}` } className = { ({isActive}) => isActive? "menu__item menu__item--active" : "menu__item" } > <img className = "menu__picture" src={`../menuPictures/${menu[idx]}.png`}/> </NavLink> ) }
    </nav>
    )
}