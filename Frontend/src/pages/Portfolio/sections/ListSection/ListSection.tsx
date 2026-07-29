import { Wallet, WalletCoin } from "../../../../types/Wallet"
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { userService } from "../../../../services/UserServices"
import { Coin } from "../../../../types/Coin"
import { WalletCoinCard } from "../../../../components/WalletCoinCard/WalletCoinCard"
import { WalletCard } from "../../../../components/WalletCard/WalletCard"
import { Button } from "../../../../ui/Button/Button"

export type CoinsListProps = {
    wallets: Array<Wallet>,
    favCoins: Array<Coin>
}

function CoinsList(props: CoinsListProps) {
    let { wallets, favCoins } = props
    const coins: Array<WalletCoin> = []
    for (let wallet of wallets)
        for (let coin of wallet.coins) {
            let foundCoin = coins.find(c => c.symbol === coin.symbol)
            if (foundCoin) {
                foundCoin.coinsNumber += coin.coinsNumber
                foundCoin.coinUsdPrice += coin.coinUsdPrice
            }
            else {
                coins.push(coin)
            }
        }

    return (
        <div className="list">
            {coins.map((c: WalletCoin) =>
                <WalletCoinCard isFav={ favCoins.filter(coin => coin.id === c.id).length !== 0 } coin={c} />
            )}
        </div>
    )
}

function WalletsList({ wallet, favCoins }) {
    const [show, setShow] = useState(false)

    return (
        <div className="list">
            <div className = "wallet"> <WalletCard wallet={wallet} /> <Button bttnName={"Show Coins"} bttnHandler={() => { setShow(!show) }}/> </div>
            <div className="wallet-coins__list list"> {show ?
                wallet.coins.map(c => <WalletCoinCard isFav={ favCoins.filter(coin => coin.id === c.id).length !== 0 } coin={c} />) : null}
            </div>
        </div>
    )
}

export function ListSection({ wallets, listView }) {
    const [totalBalance, setTotalBalance] = useState<number>(0)
    const { data: favCoins, isPending, error } = useQuery({
        queryKey: ["favCoins"],
        queryFn: userService.getFavCoins
    })
    useEffect(() => { 
        let totalBalance = 0;
        wallets.forEach(w => totalBalance += w.totalWalletBalance) 
        setTotalBalance(totalBalance)
    }, [])



    return (
        <section>
            <div className="section__title"> Total Balance: ${totalBalance.toFixed(2)} </div>
            {listView === "wallets" ? wallets.map(w => <WalletsList favCoins={favCoins} wallet={w} />) : <CoinsList favCoins={favCoins} wallets={wallets} />}
        </section>
    )
}