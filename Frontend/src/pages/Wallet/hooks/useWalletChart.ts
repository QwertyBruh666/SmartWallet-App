import { useQuery } from "@tanstack/react-query";
import { walletService } from "../../../services/WalletService";
import { useEffect } from "react";
import { ChartData, ChartOptions, Chart } from "chart.js";
import {
    ArcElement,
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
            data: [],
            label: "",
            fill: false,
            pointRadius: 0
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
    }
}

const baseOptionsLinear: ChartOptions<"line"> = {
    interaction: {
        mode: "nearest",
        intersect: false,
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
            ticks: { color: "black", maxTicksLimit: 4 },
        },
        y: {
            ticks: { color: "black", maxTicksLimit: 4 },
        }
    }
}

export function useWalletChart(walletName: string, chartType: string, chartObj: Chart) {
    const { data: wallet } = useQuery({
        queryKey: ["wallet", walletName],
        queryFn: () => walletService.getWallet(walletName)
    })
    const { data: stats } = useQuery({
        queryKey: ["wallet", "stats", walletName],
        queryFn: () => walletService.getWalletBalanceStats(walletName)
    })

    useEffect(() => {
        if (!(wallet && stats && chartObj))
            return
        console.log(stats)
        if (chartType === "Composition") {
            chartObj.data.labels = wallet.coins.map(c => c.symbol)
            chartObj.data.datasets[0].data = wallet.coins.map(c => c.coinUsdPrice)
        }
        else if (chartType == "Balance") {
            console.log(stats)
            chartObj.data.datasets[0].data = stats.map(s => { return { x: s.timeStamp, y: s.value } })
            chartObj.options = { ...baseOptionsLinear }
            chartObj.options.scales.x.max = 1742073600000
        }
        chartObj.update()
    }, [wallet, stats, chartObj])

    return { data: baseData, options: baseOptions }
}