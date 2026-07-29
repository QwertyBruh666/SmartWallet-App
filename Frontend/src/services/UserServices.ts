import { user } from "../api/endpoints/user.ts"
import { apiClient } from "../api/apiClient.ts"
import { User } from "../types/User.ts"
import { Coin } from "../types/Coin.ts"
import { Wallet } from "../types/Wallet.ts"
import { CredentialsDTO } from "../dtos/CredentialsDTO.ts"
import { WalletDTO } from "../dtos/WalletDTO.ts"

type UserService = {
    getUserInfo(): Promise<User>,
    getFavCoins(): Promise<Array<Coin>>,
    addFavCoin(coinId: string, symbol: string): Promise<void>,
    removeFavCoin(coinName: string): Promise<void>
}

export const userService: UserService = {
    async getUserInfo() {
        return await (await apiClient(user.getUser, { method:"GET" })).json()
    },
    async getFavCoins() {
        return await (await apiClient(user.getFavCoins, { method:"GET" })).json()
    },
    async addFavCoin(coinId, symbol) {
        await apiClient(user.addFavCoin(coinId, symbol), { method:"POST" })
    },
    async removeFavCoin(coinName) {
        await apiClient(user.removeFavCoin(coinName), { method:"DELETE" })
    }
}