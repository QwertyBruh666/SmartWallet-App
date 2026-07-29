import "./ChartSection.css"
import { useCallback, useState } from "react"
import { Coin } from "../../../../types/Coin.ts";
import { Chart as ChartJs } from "chart.js";
import { Line, Doughnut, Chart } from "react-chartjs-2"
import { useCoinChart } from "../../hooks/useCoinChart.ts";

type CoinChartBlockProps = {
    coin: Coin
}

export function ChartSection(props: CoinChartBlockProps) {
    const { coin } = props
    const [chartObj, setChartObj] = useState<ChartJs>()
    const chartObjRef = useCallback((chart) => {
        if (chart)
            setChartObj(chart)
    }, [])
    const [error, setError] = useState<boolean>(false)
    const [chartTime, setChartTime] = useState<string>("1h")
    const [chartType, setChartType] = useState<string>("Linear")
    const { baseData, baseOptions, emptyData } = useCoinChart(coin.symbol, chartType, chartTime, chartObj)

    let activeChartView = { color: "white", backgroundColor: "rgb(32, 32, 32)" }

    if (error)
        return <div className="card" style={{ justifyContent: "center" }}><span style={{ fontSize: "1.2rem", fontWeight: "600" }}> No data for this coin chart </span></div>

    return (
        <div className="coin-info">
            <div className="coin-info__chart-wrap">
                {!emptyData && (chartType === "Linear" ?
                    <Line ref={chartObjRef} data={baseData} options={baseOptions} /> :
                    <Chart ref={chartObjRef} type="candlestick" data={baseData} options={baseOptions} />)}
                {!emptyData &&
                    <div className="coin-info__chart-controls">
                        <div className="coin-info__type">
                            {["Candle", "Linear"].map((view) => <div onClick={() => { setChartType(view); }} className="coin-info__type-element" style={(chartType === view) ? activeChartView : {}}> {view} </div>)}
                        </div>
                        <div className="coin-info__time">
                            {["1h", "4h", "1d", "7d", "30d"].map(e => <div onClick={() => { setChartTime(e); }} className={(chartTime === e) ? "chart-info__time-element chart-info__time-element_active" : "chart-info__time-element"}> {e} </div>)}
                        </div>
                    </div>}
            </div>
        </div>
    )
}