import ResponsiveDrawer from "@/components/Drawer/ResponsiveDrawer";
import CustomerForm from "@/components/Form/CustomerForm";
import { CancelOutlined } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Customer = () => {
	const route = useRouter();
	const [detail, setDetail] = useState({
		name: "",
		note: "",
		cc: "",
		phone: "",
		mobile: "",
		combo: "",
		claim: "",
		status: 1,
	});
	const [floors, setFloors] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		fetchFloors();
	}, []);
	const fetchFloors = async () => {
		try {
			const { data } = await axios.get("Floor/");
			if (data.success) {
				setFloors(data.data);
			} else {
				toast.error("Floors not found");
				console.log(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleChange = async (e) => {
		if (e.target.name == "status") {
			const isChecked = e.target.checked;
			if (isChecked) {
				setDetail({ ...detail, status: 1 });
			} else {
				setDetail({ ...detail, status: 0 });
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
		const stop =
			detail.name == "" ||
			detail.cc == "" ||
			detail.combo == "" ||
			detail.claim == "";
		if (stop) {
			toast.error("Fields with * are required");
			return;
		}
		try {
			setLoading(true);
			const { data } = await axios.post(
				"Customer/",
				detail
			);
			if (data.success) {
				toast.success(data.message);
				route.push("/user/Customer/view");
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
							<h3>Add Customer</h3>
							<Link
								className="link"
								href={"/user/Customer/view"}
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
						<CustomerForm
							data={detail}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
							loading={loading}
							floors={floors}
						/>
					</Grid>
				</Grid>
			</div>
		</ResponsiveDrawer>
	);
};

export default Customer;
