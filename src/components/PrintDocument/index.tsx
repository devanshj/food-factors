import React, { useState, useEffect } from "react";
import HighChart from "../HighChart";
import { factors, getFactor, precision, categories, fetchSurveyData, getCategory } from "../../survey-data";
import { SeriesColumnOptions } from "highcharts";
import { css } from "linaria";
import { rem } from "polished";

import "./index.css"

const PrintableDocument = () => {
	let [data, setData] = useState(null as (number|null)[][] | null);

    useEffect(() => {
		fetchSurveyData().then(setData);
	}, []);

	return data && <>{
		factors.map((factorName, f) => {
			let categoryScores = getFactor(f, data!).map(precision(4))

			return <div className={css`float: left; page-break-inside: avoid;`}>
				<h2 className={css`font-weight: 400;`}>{factorName}</h2>
				<HighChart
					title={{ text: "" }}
					chart={{ type: "column", width: 300, height: 275 }}
					xAxis={{ categories }}
					yAxis={{
						title: { text: "Influence (0-5)" },
						breaks: [{
							from: 0,
							to: Math.min(...categoryScores) - 0.05,
							breakSize: 0
						}, {
							from: Math.max(...categoryScores),
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
						[{ data: categoryScores }] as SeriesColumnOptions[]
					}
					divProps={{
						className: css`margin-top: ${rem(20)}`
					}}/>
				</div>
		})
	}{
		categories.map((categoryName, c) => {
			let factorScores = 
				getCategory(c, data!)
				.map(precision(4));
				
			return <div className={css`float: left; page-break-inside: avoid;`}>
				<h2 className={css`font-weight: 400;`}>{categoryName}</h2>
				<HighChart
					title={{ text: "" }}
					chart={{ type: "column", width: 300, height: 275 }}
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
		})
	}</>
}
export default PrintableDocument;