import { useCallback, useState } from "react";
import { Chart } from "chart.js";
import { Wallet } from "../../../../types/Wallet";
import { FilterMenu } from "../../../../components/FilterMenu/FilterMenu";
import { useWalletChart } from "../../hooks/useWalletChart";
import { Doughnut, Line } from "react-chartjs-2";

export function ChartSection({ walletName }: { walletName: string }) {
    const [chartObj, setChartObj] = useState<Chart>(null)
    const chartRef = useCallback((chart) => {
        if(chart)
            setChartObj(chart)
    }, [])
    const [chartType, setChartType] = useState<string>("Composition")
    const { data, options } = useWalletChart(walletName, chartType, chartObj)

    return (
        <section>
            { (chartType === "Composition") ? <Doughnut ref={ chartRef } data={ data } options={options}/> : <Line ref={ chartRef } data={data} options={options}/> }
            <FilterMenu filterItems={["Composition", "Balance"]} currState={chartType} stateChangeFunc={setChartType}/>
        </section>
    )
}