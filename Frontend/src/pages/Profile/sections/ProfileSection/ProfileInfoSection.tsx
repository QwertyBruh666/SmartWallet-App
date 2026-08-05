import "./ProfileInfoSection.css"
import { useQuery } from "@tanstack/react-query";
import { authService } from "../../../../services/AuthService";
import { walletService } from "../../../../services/WalletService";
import { useNavigate } from "react-router-dom";
import { userService } from "../../../../services/UserServices";
import { LoadingPage } from "../../../Loading/LoadingPage";

export function ProfileInfoSection() {
    const { data: wallets, isPending: walletsPending } = useQuery({
        queryKey: ["wallets"],
        queryFn: walletService.getWallets
    })
    const { data: account, isPending: accountInfoPending } = useQuery({ queryKey: ["accountInfo"], queryFn: userService.getAccountInfo })

    const navigate = useNavigate()

    if(walletsPending || accountInfoPending)
        return <LoadingPage/>

    return (
        <>
            <section className="account">
                <div>
                    <div>
                        <div className="account-prop">
                            <label className="account-prop__name"> Login </label>
                            <span className="account-prop__value"> {account.userName} </span>
                        </div>
                            <div className="account-prop">
                                <label className="account-prop__name"> Password </label>
                                <span className="account-prop__value"> ********* </span>
                            </div>
                        <div className="account-prop">
                            <label className="account-prop__name"> Login Method </label>
                            <span className="account-prop__value"> { "Unknown" } </span>
                        </div>
                        {wallets && wallets.length !== 0 &&
                            <div className="account-prop">
                                <label className="account-prop__name"> Connected Wallets </label>
                                <span className="account-prop__value">
                                    {
                                        wallets.map(
                                            (w) =>
                                                <div className="card"> { w.exchangeName } ({ wallets.filter( (wf) => wf.exchangeName === w.exchangeName).length }) </div>
                                        )
                                    }
                                </span>
                            </div>}
                    </div>
                </div>
                <div className="card logoutbttn" onClick={() => { navigate("/login"); authService.logOut(); }}> Log Out </div>
            </section>
        </>
    )
}