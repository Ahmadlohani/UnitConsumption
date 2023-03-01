import React, {
	useContext,
	useEffect,
	useState,
} from "react";
import { useRouter } from "next/router";
import {
	Typography,
	Container,
	Paper,
	Grid,
} from "@mui/material";
import { colors } from "@/components/color";
import axios from "axios";
import AuthForm from "@/components/Form/AuthForm";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";

const Login = () => {
	const [detail, setDetail] = useState({
		email: "",
		password: "",
		selectedRole: "",
	});
	const [error, setError] = useState({
		emailErr: "",
		passwordErr: "",
	});
	const { state, setState, permissions, setPermissions } =
		useContext(AuthContext);
	const [roles, setRoles] = useState([]);
	const [loading, setLoading] = useState(false);
	const route = useRouter();
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
	const handleSubmit = async () => {
		const confirm = window.confirm(
			"Are you sure to Submit?"
		);
		if (!confirm) {
			return;
		}
		const stop =
			detail.selectedRole == "" ||
			detail.email == "" ||
			detail.password == "";
		if (stop) {
			toast.error("Fields with * are required");
			return;
		}
		const err =
			error.emailErr == "" && error.passwordErr == "";

		if (!err) {
			toast.error("Please clear errors first");
			return;
		}
		try {
			setLoading(true);
			const { data } = await axios.post("login", detail);
			if (data.success) {
				await fillAuth(data.data);
				await fillPermissions(data.data[1].selectedRole);
			} else {
				toast.error(data.message);
				console.log(data.error);
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	const fillAuth = async (data) => {
		const user = data[1];
		const token = data[0];
		const authData = { user, token };
		setState({
			user,
			token,
		});
		window.localStorage.setItem(
			"auth",
			JSON.stringify(authData)
		);
	};
	const fillPermissions = async (role) => {
		try {
			const { data } = await axios.get(
				"permissions/getSingleRole",
				{
					params: {
						selection: role,
					},
				}
			);
			if (data.success) {
				const {
					billing,
					role,
					company,
					floor,
					customer,
					user,
					graph,
				} = data.data;
				let billingValues = await fetchValues(billing);
				let roleValues = await fetchValues(role);
				let companyValues = await fetchValues(company);
				let floorValues = await fetchValues(floor);
				let customerValues = await fetchValues(customer);
				let userValues = await fetchValues(user);
				let graphValues = await fetchValues(graph);
				const perm = {
					billingValues,
					roleValues,
					companyValues,
					floorValues,
					customerValues,
					userValues,
					graphValues,
				};
				setPermissions({
					role: roleValues,
					company: companyValues,
					floor: floorValues,
					customer: customerValues,
					user: userValues,
					graph: graphValues,
					billing: billingValues,
				});
				window.localStorage.setItem(
					"permissions",
					JSON.stringify(perm)
				);
				setLoading(false);
				route.push("/");
			} else {
				console.log("Error Permissions");
			}
		} catch (error) {
			console.log(error);
		}
	};
	const fetchValues = async (value) => {
		let arr = [];
		arr = value.match(/(\d+)(,\s*\d+)*/g);
		return arr;
	};
	const handleChange = async (e) => {
		const name = e.target.name;
		if (name == "role") {
			setDetail({
				...detail,
				selectedRole: e.target.value,
			});
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
	state && state.user && state.token && route.push("/");
	return (
		<div>
			<Container>
				<Grid container spacing={2} marginTop={5}>
					<Grid
						item
						bgcolor={colors.bg}
						xs={0}
						sm={12}
						md={12}
						lg={6}
						display={{ xs: "none", sm: "block" }}
					>
						<Paper
							sx={{
								backgroundColor: `${colors.bg}`,
								margin: 10,
								padding: 10,
								boxShadow: `0.5rem 0.5rem ${colors.color}, -0.5rem -0.5rem ${colors.border}`,
							}}
						>
							<Typography
								variant="h2"
								component="h2"
								color={"white"}
							>
								Electro
							</Typography>
							;
							<Typography
								variant="p"
								component="p"
								color={"white"}
							>
								<span
									style={{
										color: `${colors.color}`,
										marginRight: 5,
										fontSize: 17,
										cursor: "pointer",
									}}
								>
									Login Now
								</span>
								to get details of consumption
							</Typography>
							;
						</Paper>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={12}
						lg={6}
						bgcolor="#F5F5F5"
						display={"flex"}
						justifyContent={"center"}
						alignItems={"center"}
					>
						<AuthForm
							loading={loading}
							roles={roles}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
							detail={detail}
							error={error}
							page={"login"}
						/>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Login;
