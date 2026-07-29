import { Coin } from "../types/Coin"

export function isFavorite(coinsList:Array<Coin>, id: string) {
    for(let c of coinsList) {
            if(c.id.toLowerCase() === id.toLowerCase()) {
                return true
            }
    }
    return false
}