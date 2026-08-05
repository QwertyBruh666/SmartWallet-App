export const wallet = {
    getWallets: `wallets`,
    addWallet: `wallets`,
    removeWallet: (walletName: string) => `wallets/${walletName}`,
    getWallet: (walletName: string) => `wallets/${walletName}`,
    getBalanceHistory: "wallets/history",
    getBalanceHistoryByWallet: (walletName: string) => `wallets/${walletName}/history`,
    getActivitiesByWallet: (walletName: string) => `wallets/${walletName}/activities`
}