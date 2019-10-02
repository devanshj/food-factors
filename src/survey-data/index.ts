import { use, isNotNull } from "../utils";

export const factors = [
	"Quality",
	"Quantity",
	"Cost",
	"Brand",
	"Advertisement",
	"Convenience"
];

export const categories = [
	"Vegetables & Fruits", 
	"Meat, Eggs & Seafood",
	"Dairy",
	"Sweets",
	"Staple (flour, oil, etc)",
	"Snacks & Beverages"
];

export type SurveyData = (number|null)[][];

export const getFactor =
	(f: number, data: SurveyData) => 
		categories.map((_, c) => data[3 + f + c]);

export const getCategory =
	(c: number, data: SurveyData) =>
		factors.map((_, f) => data[3 + c * factors.length + f])

export const sum = (xs: SurveyData[number]) =>
	xs
	.filter(isNotNull)
	.reduce((a, b) => a + b, 0)

export const mean = (xs: SurveyData[number]) =>
	use(xs.filter(isNotNull))
	.as(xs => sum(xs) / xs.length)

export const percentagify = (xs: SurveyData[number]) =>
	use(sum(xs))
	.as(t => xs.map(x => x !== null ? x * 100 / t : null))

export const precision = (p: number) => (n: number) => Number(n.toPrecision(p))

const LOCAL_STORAGE_KEY = "surveyData";
export const fetchSurveyData = (useCached = false) => {	
	let localData =
		use(localStorage.getItem(LOCAL_STORAGE_KEY))
		.as(data =>
			data === null
				? null
				: JSON.parse(data)
		) as SurveyData | null;

	const fetchFromSpreadSheet = () =>
		fetch("https://docs.google.com/spreadsheets/d/18ZbIPHpoysP6GZJ8ZxcyrQqw4JiQCMLJWrQ9bsAh0nw/export?format=csv")
		.then(resp => resp.text())
		.then(text =>
			text
			.split("\n")
			.slice(2, 332)
			.map(row =>
				row
				.split(",")
				.map(x => x === "" ? null : Number(x))
			)
		).then(data => {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
			return data;
		})

	return (
		localData === null
			? fetchFromSpreadSheet()
			: useCached
				? Promise.resolve(localData)
				: fetchFromSpreadSheet()
	);
}