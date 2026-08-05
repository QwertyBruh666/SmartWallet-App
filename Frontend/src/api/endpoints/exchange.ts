export const exchange = {
    getChart: (coinName: string, interval: string, timeStamp: string) => {
        return `coins/${coinName}/chart?timeInterval=${interval}&timeStamp=${!timeStamp ? 0 : timeStamp}`
    },
    getCoin: (coinName: string) => `coins/${coinName}`,
    getCoins: (page: number) => `coins?page=${page}`,
    getTopGainers: "coins/top-gainers"
}