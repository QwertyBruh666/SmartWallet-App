export const user = {
    getUser: `User/GetUser`,
    getFavCoins: `User/GetFavCoins`,
    addFavCoin: (coinId: string, symbol: string) => `User/SetFavCoin?coinId=${coinId}&symbol=${symbol}`,
    removeFavCoin: (coinName: string) => `User/RemoveFavCoin/${coinName}`,
}