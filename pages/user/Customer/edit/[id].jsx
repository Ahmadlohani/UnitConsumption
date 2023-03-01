import ResponsiveDrawer from "@/components/Drawer/ResponsiveDrawer";
import CustomerForm from "@/components/Form/CustomerForm";
import { CancelOutlined } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Edit = () => {
	const route = useRouter();
	const [customerId, setCustomerId] = useState("");
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
		if (route.isReady && route.query !== null) {
			const { id } = route.query;
			setCustomerId(id);
			fetchCustomer(id);
			fetchFloors();
		}
	}, [route.isReady]);
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
	const fetchCustomer = async (id) => {
		try {
			const { data } = await axios.get(
				"Customer/customerForUpdate",
				{
					params: {
						id: id,
					},
				}
			);
			if (data.success) {
				fillData(data.data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const fillData = async (fields) => {
		setDetail(fields);
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
			const { data } = await axios.put(
				"Customer/",
				detail,
				{
					params: {
						updateId: customerId,
					},
				}
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
							<h3>Update Company</h3>
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
									Cancel Update
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

export default Edit;
