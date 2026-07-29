import { useNavigate } from "react-router-dom"
import { Wallet } from "../../../types/Wallet"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { walletService } from "../../../services/WalletService"
import { Modal } from "../../../ui/Modal/Modal"

export function WalletOptionsModal(props: { wallet: Wallet, setWalletProps: Function }) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { wallet, setWalletProps } = props

    const deleteWallet = useMutation({
        mutationFn: (wallet: Wallet) => walletService.removeWallet(wallet.exchangeName),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["wallets"] })
            navigate("/app/main")
        }
    })

    return (
        <Modal header="Wallet Options" showFunc={() => setWalletProps(false)}>
            <div style={{ backgroundColor: "rgb(222, 33, 33)", padding: "1rem", display: "flex", alignItems: "center", gap: "1rem", borderRadius: "2rem" }} onClick={() => { deleteWallet.mutateAsync(wallet) }}>
                <img style={{ height: "1.5rem" }} src="../../trash-can.png" /> <span style={{ color: "white", fontSize: "1.2rem", fontWeight: "600" }}> Delete Wallet </span>
            </div>
        </Modal>
    )
}