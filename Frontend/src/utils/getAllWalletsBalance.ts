import { Wallet } from "../types/Wallet";

export function getAllWalletsBalance(wallets: Array<Wallet>) {
    let allWalletsBalance = 0;
    wallets.forEach(w => {
        allWalletsBalance += w.totalWalletBalance
    });
    return allWalletsBalance
}