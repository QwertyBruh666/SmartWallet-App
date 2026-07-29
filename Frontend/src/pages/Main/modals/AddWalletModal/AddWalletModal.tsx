import "./AddWalletModal.css"
import { useState } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { walletService } from "../../../../services/WalletService.ts";
import { Modal } from "../../../../ui/Modal/Modal.tsx";

type AddWalletProps = {
    cancelShow: Function
}

function SelectExchanges({ exchangeProp, setExchangeName }) {
    const [show, setShow] = useState<boolean>(false)
    const [exchanges] = useState(["Binance", "Bybit", "OKX"])

    return (
        <div className="select">

            <div className="select__selected-wrap card" style={{ boxShadow: show ? "0px 0px 5px black" : "none" }} onClick={() => { setShow(!show) }}>
                <div className="select__selected" >
                    <img className="select__img" src={`../exchangeLogos/${exchangeProp}.png`} />
                    <span className="select__name"> {exchangeProp} </span>
                </div>
                <img className="select__arrow-direct" style={{ transform: show ? "rotate(180deg)" : "" }} src={`../arrow-down-sign-to-navigate-2.png`} />
            </div>

            <div className={`select__dropdown ${show ? "select__dropdown_open" : ""}`} style={{ backgroundColor: "white", marginTop: "0.5rem" }}>
                {show ?
                    exchanges.map((v, i) => {
                        return (
                            <div className={`select__dropdown-element-wrap ${i === exchanges.length - 1 ? "none-underline" : null}`} onClick={() => { setExchangeName(v); setShow(false) }}>
                                <div className="select__dropdown-element">
                                    <img className="select__dropdown-element-img" src={`../exchangeLogos/${v}.png`} />
                                    <span className="select__dropdown-element-name"> {v} </span>
                                </div>
                            </div>)
                    }
                    )
                    : null}
            </div>

        </div>
    )
}

export function AddWalletModal(props: AddWalletProps) {
    const { cancelShow } = props
    const [apiKey, setApiKey] = useState<string>("")
    const [secretKey, setSecretKey] = useState<string>("")
    const [passPhrase, setPassPhrase] = useState<string>("")
    const [exchangeName, setExchangeName] = useState<string>("Binance")
    const queryClient = useQueryClient()

    const updateWallets = useMutation({
        mutationFn: () => walletService.addWallet({ apiKey, secretKey, type: "spot", passPhrase, exchangeName }),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["wallets"] }) }
    })

    return (
        <Modal header="Add Wallet" showFunc={() => { cancelShow(false) }}>
            <form onClick={e => { e.stopPropagation() }}
                onSubmit={(e) => {
                    updateWallets.mutateAsync(); cancelShow(false); e.preventDefault()
                }}>
                <div className="add-wallet__prop">
                    <SelectExchanges exchangeProp={exchangeName} setExchangeName={setExchangeName} />
                </div>
                <div className="add-wallet__prop">
                    <label className="add-wallet__label"> Api Key </label>
                    <input type="password" className="add-wallet__input" onChange={e => setApiKey(e.target.value)} />
                </div>
                <div className="add-wallet__prop">
                    <label className="add-wallet__label"> Secret Key </label>
                    <input type="password" className="add-wallet__input" onChange={e => setSecretKey(e.target.value)} />
                </div>
                {exchangeName === "OKX" ? <div className="add-wallet__prop">
                    <label className="add-wallet__label"> Pass Phrase </label>
                    <input type="password" className="add-wallet__input" onChange={e => setPassPhrase(e.target.value)} />
                </div> : null}
                <div className="add-wallet__buttons">
                    <button className="button add-wallet__submit-btn" type="submit"> Add Wallet </button>
                    <button className="button add-wallet__cancel-btn" type="reset" onClick={() => {
                        cancelShow(false)
                    }}> Cancel </button>
                </div>
            </form>
        </Modal>
    )
}