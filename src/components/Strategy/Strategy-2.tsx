import React, { useContext } from "react";
import HighChart from "../HighChart";
import { mean, factors, getFactor, precision } from "../../survey-data";
import { css } from "linaria";
import { rem } from "polished";
import SurveyDataContext from "../../contexts/SurveyDataContext";
import { SeriesColumnOptions } from "highcharts";

const Strategy2 = () => {
	let data = useContext(SurveyDataContext);

	let factorScores =
		factors
		.map((_, f) => getFactor(f, data))
		.map(mean)
		.map(precision(4))

	return <div>
		<HighChart
			title={{ text: "" }}
			chart={{ type: "column" }}
			xAxis={{ categories: factors }}
			yAxis={{
				title: { text: "Influence (0-5)" },
				breaks: [{
					from: 0,
					to: Math.min(...factorScores) - 0.05,
					breakSize: 0
				}, {
					from: Math.max(...factorScores),
					to: 5,
					breakSize: 0
				}],
				tickInterval: 0.01
			}}
			legend={{ enabled: false }}
			plotOptions={{
				series: { dataLabels: { enabled: true }, animation: false }
			}}
			series={
				[{ data: factorScores }] as SeriesColumnOptions[]
			}
			divProps={{
				className: css`margin-top: ${rem(20)}`
			}}/>
	</div>
}
export default Strategy2;