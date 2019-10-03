import React from "react";
import HighChart from "../HighChart";
import { SeriesColumnOptions } from "highcharts";

const BarChart = ({ series, yAxisLabel, xAxisLabels, focusDifference }: { 
	series: (Omit<SeriesColumnOptions, "type" | "data"> & { data: number[] })[],
	xAxisLabels: string[],
	yAxisLabel: string,
	focusDifference?: boolean
}) => {

	let values = series.flatMap(s => s.data)

	return <HighChart
		title={{ text: "" }}
		chart={{ type: "column", alignTicks: false }}
		xAxis={{ categories: xAxisLabels }}
		yAxis={{
			title: { text: yAxisLabel },
			...(focusDifference
				? {
					breaks: [{
						from: 0,
						to: Math.min(...values) * 0.99,
						breakSize: 0
					}],
					max: Math.max(...values),
					endOnTick: false,
					labels: { enabled: false }
				}
				: {})
		}}
		legend={{ enabled: series.length > 1 }}
		plotOptions={{
			series: { dataLabels: { enabled: true }, animation: false }
		}}
		series={series.map(s =>
			({ ...s, type: "column" })
		)}/>
}
export default BarChart;