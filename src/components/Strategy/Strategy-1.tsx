import React, { useState, useContext } from "react";
import HighChart from "../HighChart";
import { categories, getCategory, mean, precision, factors } from "../../survey-data";
import Select from "../Select";
import { css } from "linaria";
import { rem } from "polished";
import SurveyDataContext from "../../contexts/SurveyDataContext";
import { SeriesColumnOptions } from "highcharts";

const Strategy1 = () => {
	let data = useContext(SurveyDataContext);
	let [category, setCategory] = useState(0);

	let factorScores = 
		getCategory(category, data)
		.map(mean)
		.map(precision(4));

	return <div>
		<Select
			value={category}
			onChange={setCategory}
			options={categories}
			label="Category"
		/>
		<HighChart
			title={{ text: "" }}
			chart={{ type: "column" }}
			xAxis={{ categories: factors }}
			yAxis={{
				title: { text: "Influence (0-5)" },
				breaks: [{
					from: 0,
					to: Math.min(...factorScores),
					breakSize: 0.1
				}, {
					from: Math.max(...factorScores),
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
				[{ data: factorScores }] as SeriesColumnOptions[]
			}
			divProps={{
				className: css`margin-top: ${rem(20)}`
			}}/>
	</div>
}
export default Strategy1;