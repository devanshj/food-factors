import React, { useState, useContext } from "react";
import { categories, precision, factors, getFactorCategory, mean } from "../../survey-data";
import Select from "../Select";
import SurveyDataContext from "../../contexts/SurveyDataContext";
import BarChart from "../BarChart";

const Strategy1 = () => {
	let data = useContext(SurveyDataContext);
	let [category, setCategory] = useState(0);

	return <div>
		<Select
			value={category}
			onChange={setCategory}
			options={categories}
			label="Category"
		/>
		<BarChart
			yAxisLabel="Influence (0-5)"
			xAxisLabels={factors}
			series={[{ data: 
				factors
				.map((_, f) => data.map(getFactorCategory(f, category)))
				.map(mean)
				.map(precision(4))
			}]}
			focusDifference={true}/>
	</div>
}
export default Strategy1;