import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

const BarGraph = ({ mode, data }) => {
	return (
		<BarChart
			width={700}
			height={400}
			data={data}
			style={{
				padding: 5,
			}}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="TIMESTAMP" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="TotalValue" fill="#8884d8" />
			{/* <Bar dataKey="uv" fill="#82ca9d" /> */}
		</BarChart>
	);
};
export default BarGraph;
