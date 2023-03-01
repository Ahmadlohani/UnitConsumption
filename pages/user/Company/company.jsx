import ResponsiveDrawer from "@/components/Drawer/ResponsiveDrawer";
import CompanyForm from "@/components/Form/CompanyForm";
import { CancelOutlined } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Company = () => {
	const route = useRouter();
	const [detail, setDetail] = useState({
		name: "",
		note: "",
		address: "",
		contact: "",
		contactPerson: "",
		fax: "",
		email: "",
		gst: "",
		ntn: "",
		desc: "",
	});
	const [loading, setLoading] = useState(false);
	const handleChange = async (e) => {
		setDetail({
			...detail,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = async () => {
		const confirm = window.confirm(
			"Are you sure to submit?"
		);
		if (!confirm) {
			return;
		}
		const stop = detail.name == "" || detail.note == "";
		if (stop) {
			toast.error("Name and notes are required");
			return;
		}
		try {
			setLoading(true);
			const { data } = await axios.post("Company/", detail);
			if (data.success) {
				toast.success(data.message);
				route.push("/user/Company/view");
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
							<h3>Add Company</h3>
							<Link
								className="link"
								href={"/user/Company/view"}
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
						<CompanyForm
							data={detail}
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

export default Company;
