import { exchnageService } from "../../../services/ExchangeService";
import { ChartInfoObject } from "../../../types/ChartTypes";
import { Chart, ChartData, ChartOptions } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import zoomPlugin from 'chartjs-plugin-zoom'
import "chartjs-adapter-date-fns"
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";
import { Chart as ChartJS, CategoryScale, LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Tooltip,
    Legend,
    Filler
} from "chart.js";
import { CoinChartPointDTO } from "../../../dtos/CoinChartPointDTO";

ChartJS.register(
    CandlestickController,
    CandlestickElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Tooltip,
    Legend,
    zoomPlugin,
    Filler
);

const baseData: ChartData<"line"> = {
    labels: [],
    datasets: [
        {
            data: [],
            label: "",
            fill:false,
            borderColor: "rgb(44, 44, 44)",
            pointRadius: 0
        }
    ]
}

const baseOptions: ChartOptions<"line"> = {
    interaction: {
        mode: "nearest",
        intersect: false,
        axis: "x"
    },
    plugins: {
        legend: { display: false },
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
                pinch: {
                    enabled: true
                },
                mode: "x"
            }
        },
        tooltip: {
            enabled: true,
            callbacks: {
                label: function (ctx) {
                    return `Цена ` + ctx.raw.y + "$";
                }
            },
        },
        datalabels: {
            formatter() { return "" }
        }
    },
    scales: {
        x: {
            type: "time",
            ticks: { color: "black", maxTicksLimit: 4 },
        },
        y: {
            ticks: { color: "black", maxTicksLimit: 4 },
        }
    }
}

function formatChartInfo(chartInfo: Array<CoinChartPointDTO>): Array<ChartInfoObject> {
    let formated = chartInfo.map(c => { return { x: c.timeStamp, o: c.open, h: c.high, l: c.low, c: c.close } })
    return formated
}

function getTimeOptions(timeDigit: string) {
    let timeOptions = { min: 60, digit: "60" };

    switch (timeDigit) {
        case "1h":
            timeOptions = { min: 60, digit: "60" }
            break
        case "4h":
            timeOptions = { min: 240, digit: "240" }
            break
        case "1d":
            timeOptions = { min: 1440, digit: "D" }
            break
        case "7d":
            timeOptions = { min: 10080, digit: "W" }
            break
        case "30d":
            timeOptions = { min: 1440 * 30, digit: "M" }
            break
    }

    return timeOptions
}

function updateChartView(data: Array<CoinChartPointDTO>, chartObj: Chart, chartType: string, chartTime: string, setAddExtra: Function) {
    const timeOptions = getTimeOptions(chartTime)
    const formatted = formatChartInfo(data)
    if (chartType === "Linear")
        chartObj.data.datasets[0].data = formatted.map(i => { return { x: i.x, y: i.c } })
    else
        chartObj.data.datasets[0].data = formatted
    chartObj.options.plugins.zoom.pan.onPan = ({ chart }) => {
        const data = chart.data.datasets[0].data
        if (chart.scales.x.min <= data[data.length - 1].x) {
            setAddExtra(data[data.length - 1].x)
        }
    }
    chartObj.options.scales.x.min = formatted[0].x - 100 * 1000 * 60 * timeOptions.min
    chartObj.options.scales.x.max = formatted[0].x
    chartObj.update()
}

async function addExtraPart(chartObj: Chart, symbol: string, chartType: string, chartTime: string, timeStamp: number) {
    const timeOptions = getTimeOptions(chartTime)
    const extraData =  await exchnageService.getCoinChart(symbol, timeOptions.digit, timeStamp)
    const formatted = formatChartInfo(extraData)
    if (chartType === "Linear")
        chartObj.data.datasets[0].data.push(...formatted.map(i => { return { x: i.x, y: i.h } }) )
    else
        chartObj.data.datasets[0].data.push(...formatted)
    chartObj.update()
} 

export function useCoinChart(symbol: string, chartType: string, chartTime: string, chartObj: Chart) {
    const [emptyData, setEmptyData] = useState<boolean>(false)
    const [addExtra, setAddExtra] = useState<number>(0)
    const { data: newData, error } = useQuery({
        queryKey: [symbol, chartType, chartTime],
        queryFn: async () => {
            const timeOptions = getTimeOptions(chartTime)
            return await exchnageService.getCoinChart(symbol, timeOptions.digit)
        },
        staleTime: 0,
        gcTime: 0,
        throwOnError: false
    })

    useEffect(() => {
        if(error)
            setEmptyData(true)
    }, [error])

    useEffect(() => {
        if(chartObj)
            addExtraPart(chartObj, symbol, chartType, chartTime, addExtra)
    }, [addExtra])

    useEffect(() => { 
        if(!(newData && chartObj))
            return
        updateChartView(newData, chartObj, chartType, chartTime, setAddExtra)
    }, [newData, chartObj])

    return { baseData, baseOptions, emptyData }
}