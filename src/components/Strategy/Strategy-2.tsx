import React, { useContext } from "react";
import { mean, factors, precision, categories, getFactorCategory } from "../../survey-data";
import SurveyDataContext from "../../contexts/SurveyDataContext";
import BarChart from "../BarChart";

const Strategy2 = () => {
	let data = useContext(SurveyDataContext);

	return <BarChart
		yAxisLabel="Influence (0-5)"
		xAxisLabels={factors}
		series={[{ data:
			factors
			.map((_, f) => 
				categories
				.map((_, c) => data.map(getFactorCategory(f, c)))
				.map(mean)
			)
			.map(mean)
			.map(precision(4))
		}]}
		focusDifference={true}/>
}
export default Strategy2;