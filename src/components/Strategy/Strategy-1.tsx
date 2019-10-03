import React, { useState, useContext } from "react";
import HighChart from "../HighChart";
import { categories, getCategory, precision, factors, getFactorCategory, mean } from "../../survey-data";
import Select from "../Select";
import { css } from "linaria";
import { rem } from "polished";
import SurveyDataContext from "../../contexts/SurveyDataContext";
import { SeriesColumnOptions } from "highcharts";
import BarChart from "../BarChart";
import { fromKeyValues } from "../../utils";

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