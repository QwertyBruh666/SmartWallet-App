export const exchange = {
    getChart: (coinName: string, interval: string, timeStamp: string) => {
        return `StockExchange/GetChart/${coinName}?timeInterval=${interval}&timeStamp=${!timeStamp ? 0 : timeStamp}`
    },
    getCoin: (coinName: string) => `StockExchange/GetCoin/${coinName}`,
    getBybitCoin: (coinName: string) => `StockExchange/GetBybitCoin/${coinName}`,
    getCoins: (page: number) => `StockExchange/GetCoins?page=${page}`,
    getTop24hCoins: "StockExchange/GetTop24hCoins"
}