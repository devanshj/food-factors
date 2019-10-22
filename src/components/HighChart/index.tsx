import React, { useEffect } from "react";
import Highcharts, { Options, XAxisOptions } from "highcharts"
import loadBrokenAxis from "highcharts/modules/broken-axis";
import loadSerieslabel from "highcharts/modules/series-label";
import { rem } from "polished";

loadBrokenAxis(Highcharts);
loadSerieslabel(Highcharts);

Highcharts.setOptions({
	// colors: ["#000"],
	colors: ["#106BA3", "#0D8050", "#BF7326", "#C23030", "#634DBF", "#00998C"],
	...((axis: XAxisOptions) => ({ xAxis: axis, yAxis: axis }))(
		{
			lineWidth: 1,
			lineColor: "#000",
			labels: {
				style: {
					color: "#000",
					fontSize: rem("12px")
				}
			},
			title: {
				style: {
					color: "#000",
					fontSize: rem("14px")
				}
			}
		}
	),
	tooltip: { enabled: false }
})

const HighChart = (props: Options & { divProps?: React.AllHTMLAttributes<HTMLDivElement> }) => {
	let containerRef = React.createRef<HTMLDivElement>();
	useEffect(() => {
		new Highcharts.Chart(containerRef.current!, props);

		containerRef.current!.querySelector(".highcharts-credits")!.remove();
	}, [containerRef, props]);

	return <div ref={containerRef} {...props.divProps}></div>
}
export default HighChart;