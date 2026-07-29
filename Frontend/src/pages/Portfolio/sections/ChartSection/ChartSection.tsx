import "./ChartSection.css"
import { useState, useCallback } from "react";
import {Chart} from "chart.js";
import { FilterMenu } from "../../../../components/FilterMenu/FilterMenu.tsx";
import { usePortfolioChart } from "../../hooks/usePortfolioChart.ts";
import { Doughnut, Line } from "react-chartjs-2";


export function ChartSection({ chartType, listView }) {
    const [chartObj, setChartObj] = useState<Chart>(null)
    const chartRef = useCallback((chart) => {
        if(chart)
            setChartObj(chart)
        console.log(chart?.data.datasets)
    }, [])
    const { data, options } = usePortfolioChart(chartType.val, chartObj, listView.val)

    return (
        <section>
            { chartType.val === "composition" ? 
                <Doughnut ref={chartRef} data = { data } options={ options }/> : 
                <Line ref={chartRef} data = { data } options={ options }/> }  
            <div style={{ margin: "1rem 0" }}>
                <FilterMenu filterItems={["wallets", "coins"]} currState={listView.val } stateChangeFunc={listView.setListView}/>
                <FilterMenu filterItems={["composition", "balance"]} currState={chartType.val} stateChangeFunc={chartType.setChartType}/>
            </div>
        </section>
    )
}