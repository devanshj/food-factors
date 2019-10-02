import React, { useContext, useState, useMemo } from "react";
import SurveyDataContext from "../../contexts/SurveyDataContext";
import { factors, getFactor, categories, mean, precision } from "../../survey-data";
import HighChart from "../HighChart";
import { SeriesColumnOptions } from "highcharts";
import Select from "../Select";
import { css } from "linaria";
import { rem } from "polished";

const Strategy0 = () => {
	let data = useContext(SurveyDataContext);
	let [factor, setFactor] = useState(0);

	let categoryScores = 
		getFactor(factor, data)
		.map(mean)
		.map(precision(4));
	
    return <div>
		<Select
			value={factor}
			onChange={setFactor}
			options={factors}
			label="Factor"
		/>
		<HighChart
			title={{ text: "" }}
			chart={{ type: "column" }}
			xAxis={{ categories }}
			yAxis={{
				title: { text: "Influence (0-5)" },
				breaks: [{
					from: 0,
					to: Math.min(...categoryScores),
					breakSize: 0.1
				}, {
					from: Math.max(...categoryScores),
					to: 5,
					breakSize: 0
				}],
				tickInterval: 0.1
			}}
			legend={{ enabled: false }}
			plotOptions={{
				series: { dataLabels: { enabled: true }, animation: false }
			}}
			series={
				[{ data: categoryScores }] as SeriesColumnOptions[]
			}
			divProps={{
				className: css`margin-top: ${rem(20)}`
			}}/>
	</div>
}
export default Strategy0;