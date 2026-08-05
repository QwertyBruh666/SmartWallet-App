export const user = {
    getAccountInfo: `users/me`,
    getFavCoins: `users/favorites`,
    addFavCoin: (coinId: string, symbol: string) => `users/favorites?coinId=${coinId}&symbol=${symbol}`,
    removeFavCoin: (coinName: string) => `users/favorites/${coinName}`,
}