export class BaseWalletActivityDTO {
    time: string
    walletName: string
    type: string
};

export class ConvertActivityDTO extends BaseWalletActivityDTO {
    fromCoin: string
    toCoin: string
    fromAmount: number
    toAmount: number
};

export class TradeActivityDTO extends BaseWalletActivityDTO {
    orderSide: string
    symbol: string
    quantity: number
    price: number
}

export class DepositActivityDTO extends BaseWalletActivityDTO {
    quantity: number
    coin: string
}

export class WithdrawalActivityDTO extends BaseWalletActivityDTO {
    quantity: number
    coin: string
}

export type WalletActivityDTO = 
DepositActivityDTO | 
TradeActivityDTO | 
WithdrawalActivityDTO | 
ConvertActivityDTO