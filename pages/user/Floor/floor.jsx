import ResponsiveDrawer from "@/components/Drawer/ResponsiveDrawer";
import FloorForm from "@/components/Form/FloorForm";
import { CancelOutlined } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Floor = () => {
	const route = useRouter();
	const [histTables, setHistTables] = useState([]);
	const [floors, setFloors] = useState([]);
	const [detail, setDetail] = useState({
		name: "",
		desc: "",
		link: "",
		peak: 0,
	});
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		fetchFloors();
	}, []);
	const fetchFloors = async () => {
		try {
			const { data } = await axios.get("Floor/");
			if (data.success) {
				setFloors(data.data);
				fetchTables(data.data);
			} else {
				toast.error("Floors not found");
				console.log(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const fetchTables = async (fl) => {
		try {
			const { data } = await axios.get(
				"Floor/getHistoryTables"
			);
			if (data.success) {
				filteredHistTables(data.data, fl);
			} else {
				toast.error("History Table not found");
				console.log(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const filteredHistTables = async (data, fl) => {
		const res = await data.filter((el1) => {
			return !fl.some(
				(el2) => el1.HistoryTableId == el2.HistoryTableId
			);
		});
		setHistTables(res);
	};
	const handleChange = async (e) => {
		const name = e.target.name;
		if (name == "peak") {
			const isChecked = e.target.checked;
			if (isChecked) {
				setDetail({ ...detail, peak: 1 });
			} else {
				setDetail({ ...detail, peak: 0 });
			}
		} else {
			setDetail({
				...detail,
				[e.target.name]: e.target.value,
			});
		}
	};
	const handleSubmit = async () => {
		const confirm = window.confirm(
			"Are you sure to submit?"
		);
		if (!confirm) {
			return;
		}
		const stop = detail.name == "" || detail.link == "";
		if (stop) {
			toast.error("Name and link are required");
			return;
		}
		try {
			setLoading(true);
			const { data } = await axios.post("Floor/", detail);
			if (data.success) {
				toast.success(data.message);
				route.push("/user/Floor/view");
			} else {
				toast.error(data.message);
				console.log(data.error);
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<ResponsiveDrawer>
			<div>
				{/* {JSON.stringify(histTables, null, 4)} */}
				{/* {JSON.stringify(floors, null, 4)} */}
				<Grid
					container
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<Grid
						item
						xs={8}
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
					>
						<Box
							display={"flex"}
							justifyContent="space-between"
							alignItems={"center"}
							width="60ch"
						>
							<h3>Add Floor</h3>
							<Link
								className="link"
								href={"/user/Floor/view"}
							>
								<Button
									variant="outlined"
									color="error"
									startIcon={<CancelOutlined />}
									size="small"
								>
									Cancel Creation
								</Button>
							</Link>
						</Box>
					</Grid>
				</Grid>
				<Grid
					container
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<Grid
						item
						xs={8}
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
					>
						<FloorForm
							data={detail}
							histTables={histTables}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
							loading={loading}
						/>
					</Grid>
				</Grid>
			</div>
		</ResponsiveDrawer>
	);
};

export default Floor;
