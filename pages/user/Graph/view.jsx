import BarGraph from "@/components/Chart/Bar";
import Chart from "@/components/Chart/Chart";
import ResponsiveDrawer from "@/components/Drawer/ResponsiveDrawer";
import GraphForm from "@/components/Form/GraphForm";
import { Grid } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const View = () => {
	const [details, setDetails] = useState({
		floor: "",
		style: "",
		purpose: "",
		toDateTime: null,
		fromDateTime: null,
		mbtu: 1,
	});
	const [histTables, setHistTables] = useState([]);
	const [units, setUnits] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		fetchHistTables();
	}, []);
	const fetchUnits = async () => {
		const filter = {
			ID: details.floor,
			toDateTime: details.toDateTime,
			fromDateTime: details.fromDateTime,
		};
		try {
			const { data } = await axios.post("Graph/", filter);
			if (data.success) {
				await convertData(data.data);
			} else {
				console.log(data.message);
				console.log(data.error);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const convertData = async (data) => {
		let newArray = [];
		let months = [];
		let nextHour,
			nextMin,
			currentHour,
			currentMin,
			currentMonth;
		nextMin = moment(data[0].TIMESTAMP).utc().minutes();
		nextHour = moment(data[0].TIMESTAMP).utc().hours();
		months.push(
			moment(
				data[0].TIMESTAMP,
				"YYYY-MM-DDTHH:mm:ss.SSS[Z]"
			).format("MMMM")
		);
		await data.map((val) => {
			currentMin = moment(val.TIMESTAMP).utc().minutes();
			currentHour = moment(val.TIMESTAMP).utc().hours();
			currentMonth = moment(
				val.TIMESTAMP,
				"YYYY-MM-DDTHH:mm:ss.SSS[Z]"
			).format("MMMM");
			if (
				nextMin === currentMin &&
				nextHour === currentHour
			) {
				newArray.push(val);
				if (currentHour == 23) {
					if (months.indexOf(currentMonth) < 0) {
						months.concat(currentMonth);
					}
					nextHour = 1;
				} else {
					nextHour = nextHour + 1;
				}
			}
		});
		console.log(months);
		newArray.map((val, i) => {
			var value = val.TotalValue;
			var time = val.TIMESTAMP;
			if (i <= 23) {
				if (details.mbtu == 0) {
					val.TotalValue = (12000 / 1000000) * value;
				} else {
					val.TotalValue = value;
				}
			} else if (i <= 46) {
				if (details.mbtu == 0) {
					val.TotalValue2 = (12000 / 1000000) * value;
				} else {
					val.TotalValue2 = value;
				}
			} else {
				if (details.mbtu == 0) {
					val.TotalValue3 = (12000 / 1000000) * value;
				} else {
					val.TotalValue3 = value;
				}
			}
			val.TIMESTAMP = moment(time).utc().format("h:mma");
		});
		setUnits(newArray);
	};
	const fetchHistTables = async () => {
		try {
			const { data } = await axios.get(
				"Floor/getHistoryTables"
			);
			if (data.success) {
				setHistTables(data.data);
			} else {
				console.log(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleChange = async (e, cont) => {
		if (cont == "to" || cont == "from") {
			cont == "from"
				? setDetails({
						...details,
						fromDateTime: moment(e).format(
							"YYYY-MM-DD HH:mm:ss.SSS"
						),
				  })
				: setDetails({
						...details,
						toDateTime: moment(e).format(
							"YYYY-MM-DD HH:mm:ss.SSS"
						),
				  });
		} else {
			const name = e.target.name;
			if (name == "mbtu") {
				const isChecked = e.target.checked;
				if (isChecked) {
					setDetails({ ...details, [e.target.name]: 1 });
				} else {
					setDetails({ ...details, [e.target.name]: 0 });
				}
			} else {
				setDetails({
					...details,
					[e.target.name]: e.target.value,
				});
			}
		}
	};
	const handleSubmit = async () => {
		const empty =
			details.floor == "" ||
			details.toDateTime == "" ||
			details.fromDateTime == "" ||
			details.style == "" ||
			details.purpose == "";
		if (empty) {
			toast.error("Please fill all the fields properly");
			return;
		}
		fetchUnits();
	};
	return (
		<ResponsiveDrawer page={"Graphs"}>
			<div>
				{/* {JSON.stringify(units, null, 4)} */}
				<Grid
					container
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<Grid
						item
						xs={12}
						// display={"flex"}
						// justifyContent={"center"}
						// alignItems={"center"}
					>
						<GraphForm
							data={details}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
							histTables={histTables}
							loading={loading}
						/>
					</Grid>
				</Grid>
				{Object.keys(units).length != 0 && (
					<Grid
						container
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
					>
						<Grid
							item
							xs={12}
							display={"flex"}
							justifyContent={"center"}
							alignItems={"center"}
							width={"100%"}
						>
							{details.style == "line" ? (
								<Chart
									data={units}
									mode={details.purpose}
								/>
							) : (
								<BarGraph
									data={units}
									mode={details.purpose}
								/>
							)}
						</Grid>
					</Grid>
				)}
			</div>
		</ResponsiveDrawer>
	);
};

export default View;
