import { apiClient } from "../api/apiClient"
import { wallet } from "../api/endpoints/wallet"
import { BalanceHistoryPointDTO } from "../dtos/BalanceHistoryPointDTO"
import { WalletActivityDTO } from "../dtos/WalletActivityDTO"
import { WalletDTO } from "../dtos/WalletDTO"
import { Wallet } from "../types/Wallet"

type WalletService = {
    addWallet(walletInfo:WalletDTO): Promise<void>,
    removeWallet(exchangeName: string): Promise<void>,
    getWallets(): Promise<Array<Wallet>>,
    getWallet(walletName:string): Promise<Wallet>,
    getBalanceHistory(): Promise<Array<BalanceHistoryPointDTO>>,
    getBalanceHistoryByWallet(exchangeName: string): Promise<Array<BalanceHistoryPointDTO>>
    getActivitiesByWallet(exchangeName: string): Promise<Array<WalletActivityDTO>>
}

export const walletService: WalletService = {
    async getWallets() {
        return await (await apiClient(wallet.getWallets, { method: "GET" })).json();
    },
    async getWallet(walletName: string) {
        return await (await apiClient(wallet.getWallet(walletName), { method: "GET" })).json();
    },
    async addWallet(walletInfo) {
        await apiClient(wallet.addWallet, { method: "POST", headers: { "Content-Type": "Application/json" }, body: JSON.stringify(walletInfo) })
    },
    async removeWallet(walletName: string) {
        await apiClient(wallet.removeWallet(walletName), { method: "DELETE" })
    },
    async getBalanceHistory() {
        return await (await apiClient(wallet.getBalanceHistory, { method: "GET" })).json()
    },
    async getBalanceHistoryByWallet(exchangeName: string) {
        return await (await apiClient(wallet.getBalanceHistoryByWallet(exchangeName), { method: "GET" })).json()
    },
    async getActivitiesByWallet(exchangeName: string) {
        return await (await apiClient(wallet.getActivitiesByWallet(exchangeName), { method: "GET" })).json()
    }   
}