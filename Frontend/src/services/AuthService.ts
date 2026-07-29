import { apiClient } from "../api/apiClient"
import { auth } from "../api/endpoints/auth"
import { CredentialsDTO } from "../dtos/CredentialsDTO"
import { User } from "../types/User"

type AuthService = {
    signUp(user: CredentialsDTO): Promise<void>,
    signIn(userCredentials: CredentialsDTO): Promise<void>,
    logOut(): Promise<void>,
    getWithGoogle(): string
}

export const authService : AuthService = {
    async signIn(user: CredentialsDTO) {
        return await (await apiClient(auth.signIn, { method: "POST", headers: { "Content-Type": "Application/json" }, body: JSON.stringify(user) })).json()
    },
    async signUp(user: CredentialsDTO) {
        await apiClient(auth.signUp, { method: "POST", headers: { "Content-Type": "Application/json" }, body: JSON.stringify(user) })
        return
    },
    async logOut() {
        await apiClient(auth.logOut, { method: "POST" })
        return
    },
    getWithGoogle() {
        const params = new URLSearchParams({
            client_id: '486038955548-dttmtov3clvakgio11gbdlf0c9fa0pn9.apps.googleusercontent.com',
            scope: [
                'openid',
                'profile',
                'email'
            ].join(' '),
            redirect_uri: "http://localhost:5004/Auth/GetWithGoogle",
            response_type: 'code',
            access_type: 'offline',
        })
        const path = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
        return path
    }
}