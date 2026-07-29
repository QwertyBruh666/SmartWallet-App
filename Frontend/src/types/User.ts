import { WalletCredentials } from "./WalletCredentials"

export type User = {
    userName: string
    apiList: Array<WalletCredentials>
}