import "./ProfileInfoSection.css"
import { useQuery } from "@tanstack/react-query";
import { authService } from "../../../../services/AuthService";
import { walletService } from "../../../../services/WalletService";
import { useNavigate } from "react-router-dom";

export function ProfileInfoSection({ account }) {
    const { data: wallets, isPending, error } = useQuery({
        queryKey: ["wallets"],
        queryFn: walletService.getWallets
    })

    const navigate = useNavigate()

    return (
        <>
            <section className="account">
                <div>
                    <div>
                        <div className="account-prop">
                            <label className="account-prop__name"> Login </label>
                            <span className="account-prop__value"> {account.userName} </span>
                        </div>
                        {account.password &&
                            <div className="account-prop">
                                <label className="account-prop__name"> Password </label>
                                <span className="account-prop__value"> ********* </span>
                            </div>
                        }
                        <div className="account-prop">
                            <label className="account-prop__name"> Login Method </label>
                            <span className="account-prop__value"> { account.password ? "password authentitication" : "Google Account" } </span>
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