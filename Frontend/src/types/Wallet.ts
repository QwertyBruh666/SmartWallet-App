export type WalletCoin = {
    logoPath: string,
    coinUsdPrice: number,
    coinsNumber: number,
    symbol: string,
    id: string
}

export type Wallet = {
    totalWalletBalance: number,
    coins: Array<WalletCoin>,
    exchangeName: string,
}