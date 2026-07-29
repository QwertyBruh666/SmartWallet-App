export const wallet = {
    getWallets: `Wallet/GetWallets`,
    addWallet: `Wallet/AddWallet`,
    removeWallet: (walletName: string) => `Wallet/RemoveWallet/${walletName}`,
    getWallet: (exchangeName: string) => `Wallet/GetWallet/${exchangeName}`,
    getAllWalletsBalanceStats: "Wallet/GetAllWalletsBalanceStats",
    getWalletBalanceStats: (exchangeName: string) => `Wallet/GetWalletBalanceStats?exchangeName=${exchangeName}`,
    getWalletActivities: (walletName: string) => `Wallet/GetWalletActivities?exchangeName=${walletName}`
}