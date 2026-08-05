import { exchange } from "../api/endpoints/exchange.ts"
import { apiClient } from "../api/apiClient.ts"
import { Coin } from "../types/Coin.ts"
import { CoinChartPointDTO } from "../dtos/CoinChartPointDTO.ts"

type ExchangeService = {
    getCoinChart(symbol: string, interval: string): Promise<Array<CoinChartPointDTO>>,
    getCoin(symbol: string): Promise<Coin>,
    getCoins(page: number): Promise<Array<Coin>>,
    getTopGainers(): Promise<Array<Coin>>
}

export const exchnageService: ExchangeService = {
    async getCoinChart(symbol, interval, ...extra) {
        return await (await apiClient(exchange.getChart(symbol, interval, extra[0]), { method: "GET" })).json()
    },
    async getCoin(symbol: string) {
        return await (await apiClient(exchange.getCoin(symbol), {method: "GET"})).json()
    },
    async getCoins(page: number) {
        return await (await apiClient(exchange.getCoins(page), {method:"GET"})).json()
    },
    async getTopGainers() {
        return await (await apiClient(exchange.getTopGainers, { method: "GET" })).json()
    }
}