import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"
import { authService } from "../../services/AuthService"

async function formHandler(page: string, userCredentials: { login: string, password: string }, navigate: Function) {
    let query;
    if(page === "Login")
        query = await authService.signIn({ password: userCredentials.password, userName: userCredentials.login })
    if (page === "Registration")
        query = await authService.signUp({ password: userCredentials.password, userName: userCredentials.login })
    navigate("/app/main")
}

export function AuthPage({ page }: { page: string }) {
    const navigate = useNavigate()
    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    return (
        <div className="page">
            <div className="login__header">
                <div className="app-name"> SmartWallet </div>
                <div className="hello-text"> Welcome Back </div>
            </div>
            <div className="page__content">
                <div className="login-wrap">
                    <form className="login" onSubmit={e => { e.preventDefault(); formHandler(page, { login, password }, navigate) }}>
                        <label className="loginreg-label"> Login </label>
                        <input className="loginreg-input" onChange={e => { setLogin(e.currentTarget.value) }} />
                        <label className="loginreg-label"> Password </label>
                        <input type="password" className="loginreg-input" onChange={e => { setPassword(e.currentTarget.value) }} />
                        <button className="loginreg-button" type="submit"> { page === "Login" ? "Sign In" : "Create Account" } </button>
                        { page === "Login" && <div className="loginreg-forgot"> Forgot password? </div> }
                        <div className="divider">
                            <span> OR </span>
                        </div>
                        <div className="list">
                            <a href={ authService.getWithGoogle() } className="card account-enter-card">
                                <img className="account-enter-card-image" src="./googleLogo.png" /> Continue with Google
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}