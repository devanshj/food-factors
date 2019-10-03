import React, { useContext, useState } from "react";
import SurveyDataContext from "../../contexts/SurveyDataContext";
import { factors, categories, mean, precision, getFactorCategory } from "../../survey-data";
import Select from "../Select";
import { fromKeyValues } from "../../utils";
import BarChart from "../BarChart";

const Strategy0 = () => {
	let data = useContext(SurveyDataContext);
	let [factor, setFactor] = useState(0);

    return <div>
		<Select
			value={factor}
			onChange={setFactor}
			options={factors}
			label="Factor"
		/>
		<BarChart
			yAxisLabel="Influence (0-5)"
			xAxisLabels={categories}
			series={[{ data:
				categories
				.map((_, c) => data.map(getFactorCategory(factor, c)))
				.map(mean)
				.map(precision(4))
			}]}
			focusDifference={true}/>
	</div>
}
export default Strategy0;