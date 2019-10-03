import React, { useState, useContext, useEffect } from "react";
import HighChart from "../HighChart";
import { precision, factors, getFactor, mean, SurveyData, SurveyDataRow, categories } from "../../survey-data";
import Select from "../Select";
import { css } from "linaria";
import { rem, lighten } from "polished";
import SurveyDataContext from "../../contexts/SurveyDataContext";
import { SeriesColumnOptions, attr, SeriesLineDataOptions, SeriesLineOptions } from "highcharts";
import BarChart from "../BarChart";
import { fromKeyValues } from "../../utils";

const attributes = [
	{
		label: "Gender",
		columnIndex: 0,
		categories: [{
			label: "Male",
			value: 1
		}, {
			label: "Female",
			value: 2
		}]
	}
]


const Strategy1 = () => {
	let data = useContext(SurveyDataContext);
	let [category, setCategory] = useState(0);

	return <div>
		<Select
			value={category}
			options={categories}
			onChange={setCategory}/>
		<BarChart
			yAxisLabel="Votes"
			xAxisLabels={[0, 1, 2, 3, 4, 5].map(String)}
			series={
				[0, 1, 2, 3, 4, 5].map(vote => ({
					color: lighten((5 - vote)/5, "#000"),
					name: vote.toString(),
					data: factors.map((_, f) =>
						data.filter(row => 
							row[3 + f * factors.length + category] === vote
						).length
					),
					type: "column"
				}))
			}/>
	</div>
}
export default Strategy1;