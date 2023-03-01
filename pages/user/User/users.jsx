import ResponsiveDrawer from "@/components/Drawer/ResponsiveDrawer";
import AuthForm from "@/components/Form/AuthForm";
import { CancelOutlined } from "@mui/icons-material";
import { nanoid } from "nanoid";
import { Box, Button, Grid } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Users = () => {
	const route = useRouter();
	const [detail, setDetail] = useState({
		username: nanoid(5),
		name: "",
		email: "",
		password: "",
		selectedRole: "",
	});
	const [error, setError] = useState({
		emailErr: "",
		nameErr: "",
		passwordErr: "",
		selectedRoleErr: "",
	});
	const [roles, setRoles] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		fetchAllRoles();
	}, []);
	const fetchAllRoles = async () => {
		try {
			const { data } = await axios.get(
				"permissions/allRoles"
			);
			if (data.success) {
				setRoles(data.data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleChange = async (e) => {
		const name = e.target.name;
		if (name == "role") {
			setDetail({
				...detail,
				selectedRole: e.target.value.toLocaleUpperCase(),
			});
		}
		if (name == "name") {
			const value = e.target.value;
			setDetail({ ...detail, name: value });
			if (value.length < 3) {
				setError({
					...error,
					nameErr: "Characters greater than 2 allowed",
				});
			} else {
				setError({ ...error, nameErr: "" });
			}
		}
		if (name == "email") {
			handleEmail(e);
		}
		if (name == "psw") {
			handlePassword(e);
		}
	};
	const handlePassword = async (e) => {
		const pswValue = e.target.value;
		setDetail({ ...detail, password: pswValue });
		if (pswValue.length < 6 || pswValue.length > 14) {
			setError({
				...error,
				passwordErr:
					"Password length allowed (6 < Password < 12)",
			});
		} else {
			setError({ ...error, passwordErr: "" });
		}
	};
	const handleEmail = async (e) => {
		var emailVal = e.target.value;
		setDetail({ ...detail, email: emailVal });
		const regex =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		if (regex.test(emailVal) === false) {
			setError({
				...error,
				emailErr: "Email format is invalid",
			});
		} else {
			setError({ ...error, emailErr: "" });
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
			detail.selectedRole == "" ||
			detail.name == "" ||
			detail.email == "" ||
			detail.password == "";
		if (stop) {
			toast.error("Fields with * are required");
			return;
		}
		const err =
			error.emailErr == "" &&
			error.passwordErr == "" &&
			error.nameErr == "" &&
			error.selectedRoleErr == "";

		if (!err) {
			toast.error("Please clear errors first");
			return;
		}
		try {
			setLoading(true);
			const { data } = await axios.post("User/", detail);
			if (data.success) {
				toast.success(data.message);
				route.push("/user/User/view");
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
							<h3>Add User</h3>
							<Link
								className="link"
								href={"/user/User/view"}
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
						<AuthForm
							loading={loading}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
							detail={detail}
							error={error}
							roles={roles}
						/>
					</Grid>
				</Grid>
			</div>
		</ResponsiveDrawer>
	);
};

export default Users;
