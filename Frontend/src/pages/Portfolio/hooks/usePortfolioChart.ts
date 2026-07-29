import { useQuery } from "@tanstack/react-query";
import { walletService } from "../../../services/WalletService";
import { useEffect, useState } from "react";
import { Wallet, WalletCoin } from "../../../types/Wallet";
import { ChartData, ChartOptions, Chart, ArcElement } from "chart.js";

import {
    Tooltip,
    Legend,
    Colors
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(
    ArcElement,
    Tooltip,
    Legend,
    ChartDataLabels,
    Colors
);

const baseData: ChartData<"line" | "doughnut"> = {
    labels: [],
    datasets: [
        {
            data: []
        }
    ]
}

const baseOptions: ChartOptions<"doughnut"> = {
    plugins: {
        datalabels: {
            color: '#fff',
            anchor: 'center',
            align: 'center',
            formatter: (_, ctx) => {
                return ctx.chart.data.labels[ctx.dataIndex];
            },
            font: {
                weight: 'bold',
                size: 16
            }
        },
        colors: {
            forceOverride: true
        },
        legend: {
            display: false
        }
    },
    elements: {
        line: {
            
        }
    }
}

const baseOptionsLinear: ChartOptions<"line"> = {
    interaction: {
        mode: "nearest",
        intersect: true,
        axis: "x"
    },
    plugins: {
        legend: { display: false },
        datalabels: {
            formatter: () => {
                return "";
            },
        },
        zoom: {
            pan: {
                enabled: true,
                mode: "x",
            },
            zoom: {
                wheel: {
                    enabled: true,
                    speed: 0.01
                },
                mode: "x"
            }
        },
        tooltip: {
            enabled: true,
            callbacks: {
                label: function (ctx) {
                    return `Баланс: ` + ctx.raw.y + "$";
                }
            }
        },
    },
    scales: {
        x: {
            type: "time",
            time: { unit: "day" },
            ticks: { color: "black", maxTicksLimit: 8 },
            min: Date.now() - 20 * 1000 * 60 * 1440,
            max: Date.now()
        },
        y: {
            ticks: { color: "black", maxTicksLimit: 4 },
        }
    }
}

function getCoinsForChart(wallets: Array<Wallet>) {
    const coins: Array<WalletCoin> = []
    for (let wallet of wallets)
        for (let coin of wallet.coins) {
            let foundCoin = coins.find(c => c.symbol === coin.symbol)
            if (foundCoin) {
                foundCoin.coinsNumber += coin.coinsNumber
                foundCoin.coinUsdPrice += coin.coinUsdPrice
            }
            else {
                coins.push(coin)
            }
        }
    let sorted = coins.sort((a, b) => b.coinUsdPrice - a.coinUsdPrice)

    if (coins.length < 6)
        return sorted

    for (let i = 7; i < sorted.length; i++) {
        sorted[6].coinUsdPrice += sorted[i].coinUsdPrice
    }

    return sorted.slice(0, 6)
}

export function usePortfolioChart(chartType: string, chartObj: Chart, listView?: string) {
    const { data: stats } = useQuery({
        queryKey: ["wallets-stats"],
        queryFn: walletService.getAllWalletsBalanceStats
    })
    const { data: wallets } = useQuery({
        queryKey: ["wallets"],
        queryFn: walletService.getWallets
    })

    useEffect(() => {
        if (!(wallets && stats && chartObj !== null)) 
            return
        let coins
        if (listView === "wallets" && chartType === "composition") {
            chartObj.data.labels = wallets.map(w => w.exchangeName)
            chartObj.data.datasets[0].data = wallets.map(w => w.totalWalletBalance)
        }
        else if (listView === "coins" && chartType == "composition") {
            coins = getCoinsForChart(wallets)
            chartObj.data.labels = coins.map(c => c.symbol)
            chartObj.data.datasets[0].data = coins.map(c => c.coinUsdPrice)
        }
        else if (chartType == "balance") {
            chartObj.data.datasets[0].data = stats.map(s => { return { x: s.timeStamp, y: s.value } })
            chartObj.options = { ...baseOptionsLinear }
        }
        chartObj.update()
    }, [wallets, stats, chartObj, listView])

    return { data: baseData, options: baseOptions }
}