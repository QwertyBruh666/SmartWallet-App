export function HeaderSection({ setWalletProps }) {
    return (
        <div className="header">
            <span className="header__title"> Wallet </span>
            <img onClick={() => { setWalletProps(true) }} style={{ height: "2.5rem" }} src="../../cogwheel.png"/>
        </div>
    )
}