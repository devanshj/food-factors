import React, { useContext, useEffect } from "react";
import SurveyDataContext from "../../contexts/SurveyDataContext";
import { categories, factors, getFactorCategory, mean, precision, SurveyDataRow } from "../../survey-data";
import BarChart from "../BarChart";
import { lighten } from "polished";
import { useWindowEvent } from "../../utils";

import "./index.css";
import { css } from "linaria";
import HighChart from "../HighChart";

const Document = () => {
	let data = useContext(SurveyDataContext);
	let influenceRange = [0, 1, 2, 3, 4, 5];
	
	const dispatchResize =
		() => window.dispatchEvent(new Event("resize"));

	useWindowEvent("beforeprint", () => {
		document.body.classList.add("is-print");
		dispatchResize();
	});

	useWindowEvent("afterprint", () => {
		document.body.classList.remove("is-print");
		dispatchResize();
	});

	return <>{
		[
			...categories.map(
				(categoryName, c) => ({
					name: categoryName,
					getFactor: (f: number) => getFactorCategory(f, c)
				})
			),
			{
				name: "Averaged",
				getFactor: (f: number) => 
					(row: SurveyDataRow) => {
						let foo = mean(
							categories
							.map((_, c) => getFactorCategory(f, c)(row))
						)
						if (Number.isNaN(foo)) console.log(row);
						return foo;
					}
			}
		]
		.map(({ name, getFactor }, i) =>
			<div key={i} className={css`page-break-inside: avoid;`}>
				<h1>{name}</h1>
				{i !== categories.length && <BarChart
					yAxisLabel="% of votes"
					xAxisLabels={factors}
					series={
						influenceRange.map(vote => ({
							//color: lighten((5 - vote)/6, "#000"),
							name: vote.toString(),
							data: factors.map((_, f) =>
								data
								.map(getFactor(f))
								.filter(s => s === vote)
								.length * 100 / data.length
							).map(precision(4))
						}))
					}
					height={cm(9)}
					className={css`margin-top: ${cm(1)}px`}/>}
				<BarChart
					yAxisLabel="Influence (0-5)"
					xAxisLabels={factors}
					series={[{ data: 
						factors
						.map((_, f) => data.map(getFactor(f)))
						.map(mean)
						.map(precision(4))
					}]}
					focusDifference={true}
					width={cm(8)}
					height={cm(8)}
					className={css`margin-top: ${cm(1)}px`}/>
				{[
					tuple(
						0, "Gender",
						["Male", "Female"],
						[1, 2]
					),
					tuple(
						1, "Age",
						["13 - 19", "20 - 29", "30 - 39", "40 - 49", "≥ 50"],
						[1, 2, 3, 4, 5]
					),
					tuple(
						3, "Family income per month",
						["< 15K", "16K - 30K", "31K - 80K", "81K - 1.2L", "> 1.2L"],
						[1, 2, 3, 4, 5]
					),
					tuple(
						39, "Loyalty",
						["0", "1", "2", "3", "4", "5"],
						[0, 1, 2, 3, 4, 5],
						(x: number) => 5 - x
					),
					tuple(
						40, "Health Consciousness",
						["0", "1", "2", "3", "4", "5"],
						[0, 1, 2, 3, 4, 5]
					),
					tuple(
						41, "Belief in Food News",
						["0", "1", "2", "3", "4", "5"],
						[0, 1, 2, 3, 4, 5]
					)
				].map(([columnIndex, columnName, categories, values, transform], i) =>
					<HighChart
						title={{ text: "" }}
						chart={{ type: "line", height: cm(9) }}
						yAxis={{ title: { text: "Influence (0-5)" } }}
						xAxis={{ title: { text: columnName }, categories }}
						legend={{ enabled: false }}
						series={
							factors.map((factorName, f) =>
								({
									name: factorName,
									data:
										values
										.map(v =>
											data
											.filter(row => row[columnIndex] === v)
											.map(getFactor(f))
										)
										.map(mean)
										.map(transform || ((x: number) => x)),
									type: "line"
								})
							)
						}
						divProps={{
							className: css`margin-top: ${cm(1)}px`
						}}
						key={i}/>
				)}
			</div>
		)
	}</>
}
export default Document;

const cm = (x: number) => x * 37;
const tuple = <T extends any[]>(...xs: T): T => xs;