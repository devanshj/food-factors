import React from "react";
import Strategy0 from "./Strategy-0";
import Strategy1 from "./Strategy-1";
import Strategy2 from "./Strategy-2";

const Strategy = ({ value }: { value: number }) => {
	return (
		value === 0 ? <Strategy0/> :
		value === 1 ? <Strategy1/> :
		value === 2 ? <Strategy2/> :
		null
	)
}

export default Strategy;