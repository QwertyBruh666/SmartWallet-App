import "./FavCoinsSection.css"
import { useState } from "react";
import { Coin } from "../../../../types/Coin.ts";
import { CoinCard, SkeletonCoin } from "../../../../components/CoinCard/CoinCard.tsx";
import { getCookie } from "../../../../utils/cookieHandle.ts";
import { Button } from "../../../../ui/Button/Button.tsx";

export function FavCoinsSection({ favCoins, isPending }: { favCoins: Array<Coin>, isPending: boolean }) {
    const [ showAll, setShowAll ] = useState<boolean>(false)

    return (
        <section className="favs">
            <div className="section__title"> Favorites </div>
            <div className="favs__list">
                { favCoins && favCoins.length === 0 && <div className = "card" style={{ justifyContent: "center" }}> <span style={{ fontSize: "1.2rem", fontWeight: "500" }}> You dont have fav-coins </span> </div> }
                { !isPending ? favCoins.sort((a, b) => a["market_cap_rank"] - b["market_cap_rank"]).slice(0, showAll ? favCoins.length : 3).map(c => <CoinCard coin={c} isFav={true} />) : Array.from({ length: Number(getCookie("favCount")) }).map(() => <SkeletonCoin/>)}
            </div>
            { !isPending && favCoins.length > 3 ? 
            <Button bttnHandler={ () => { setShowAll(!showAll) } }> 
                <span> Show All </span>
                <img className="show-more-button__image" style={{ transform: showAll ? "rotate(180deg)" : "", marginLeft: "1rem" }} src="../arrow-down-sign-to-navigate-3.png"/> 
            </Button> : null }
        </section>)
}
