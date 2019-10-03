import React from "react";
import HighChart from "../HighChart";
import { SeriesColumnOptions } from "highcharts";

const BarChart = ({
	series,
	yAxisLabel,
	xAxisLabels,
	focusDifference,
	height,
	width,
	...props
}: { 
	series: (Omit<SeriesColumnOptions, "type" | "data"> & { data: number[] })[],
	xAxisLabels: string[],
	yAxisLabel: string,
	focusDifference?: boolean,
	height?: number | string,
	width?: number | string
} & React.AllHTMLAttributes<HTMLDivElement>) => {

	let values = series.flatMap(s => s.data)

	return <HighChart
		title={{ text: "" }}
		chart={{ type: "column", height, width }}
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
		legend={{ enabled: series.length > 1, padding: 0 }}
		plotOptions={{
			series: { dataLabels: { enabled: true }, animation: false }
		}}
		series={series.map(s =>
			({ ...s, type: "column" })
		)}
		divProps={props}/>
}
export default BarChart;