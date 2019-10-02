import React from "react";
import { css } from "linaria";
import { rem } from "polished"
import downArrow from "./down-arrow.svg";

const Select = ({ options, onChange, value, label }: {
	options: string[],
	onChange: (value: number) => void,
	value: number,
	label?: string
}) => {
	return <div>
		{label && <label className={css`
			display: block;
			font-weight: 500;
			margin-bottom: ${rem(6)};
		`}>{label}</label>}
		<select
			className={css`
				padding: ${rem(6)} ${rem(8)};
				font: inherit;
				appearance: none;
				min-width: calc(var(--max-chars) * 1ch + 30px);
				background: url(${downArrow}) no-repeat;
				background-size: 10px;
				background-position: calc(100% - 8px) 65%;
				border: 2px solid #000;
				border-radius: 4px;
				margin-bottom: ${rem(10)};
			`}
			style={{"--max-chars": Math.max(...options.map(l => l.length))}}
			value={value}
			onChange={e => onChange(Number(e.target.value))}>{
				options.map((label, i) =>
					<option value={i} key={i}>{label}</option>
				)
		}</select>
	</div>
}
export default Select;