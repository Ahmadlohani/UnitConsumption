import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";
const Chart = ({ mode, data }) => {
	return (
		<LineChart
			width={700}
			height={400}
			data={data}
			// margin={{
			// 	top: 5,
			// 	right: 30,
			// 	left: 20,
			// 	bottom: 5,
			// }}
			style={{
				padding: 5,
			}}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="TIMESTAMP" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Line
				type="monotone"
				dataKey="TotalValue"
				stroke="#8884d8"
				activeDot={{ r: 8 }}
			/>
		</LineChart>
	);
};

export default Chart;
