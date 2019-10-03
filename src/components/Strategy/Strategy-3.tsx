import React, { useState, useContext } from "react";
import { factors, categories } from "../../survey-data";
import Select from "../Select";
import { lighten } from "polished";
import SurveyDataContext from "../../contexts/SurveyDataContext";
import BarChart from "../BarChart";

const Strategy3 = () => {
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
export default Strategy3;