import { userService } from "../services/UserServices"

export async function updateFavs(isFav: Boolean, coinName: string, getData: Function) {
    if (isFav)
        await userService.removeFavCoin(coinName)
    else
        await userService.addFavCoin(coinName)
    await getData()
}