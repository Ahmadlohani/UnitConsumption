import { colors } from "@/components/color";
import ResponsiveDrawer from "@/components/Drawer/ResponsiveDrawer";
import Switches from "@/components/Switches";
import {
	Box,
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
	Add,
	DeleteOutline,
	UpdateOutlined,
} from "@mui/icons-material";
import { height } from "@mui/system";
import Link from "next/link";
const View = () => {
	const [position, setPosition] = useState("");
	const [userId, setUserId] = useState("");
	const [allRoles, setAllRoles] = useState([]);
	const [selectedRoles, setSelectedRoles] = useState("");
	const [dataBack, setDataBack] = useState(false);
	const [readMode, setReadMode] = useState(true);
	const [company, setCompany] = useState({
		view: 0,
		create: 0,
		update: 0,
		delete: 0,
		print: 0,
	});
	const [floor, setFloor] = useState({
		view: 0,
		create: 0,
		update: 0,
		delete: 0,
		print: 0,
	});
	const [customer, setCustomer] = useState({
		view: 0,
		create: 0,
		update: 0,
		delete: 0,
		print: 0,
	});
	const [user, setUser] = useState({
		view: 0,
		create: 0,
		update: 0,
		delete: 0,
		print: 0,
	});
	const [role, setRole] = useState({
		view: 0,
		create: 0,
		update: 0,
		delete: 0,
		print: 0,
	});
	const [graph, setGraph] = useState({
		view: 0,
		create: 0,
		update: 0,
		delete: 0,
		print: 0,
	});
	const [billing, setBilling] = useState({
		view: 0,
		create: 0,
		update: 0,
		delete: 0,
		print: 0,
	});
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		getRoles();
	}, []);
	const getRoles = async () => {
		try {
			const { data } = await axios.get(
				"permissions/allRoles"
			);
			setAllRoles(data.data);
		} catch (error) {
			console.log(error);
		}
	};
	const handleDelete = async () => {
		try {
			const { data } = await axios.delete("permissions/", {
				params: {
					deleteId: userId,
				},
			});
			if (data.success) {
				toast.error(data.message);
				setDataBack(false);
				await getRoles();
			} else {
				toast.error(data.message);
				console.log(data.error);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleChange = async (e) => {
		const selection = e.target.value;
		setSelectedRoles(selection);
		try {
			setLoading(true);
			const { data } = await axios.get(
				"permissions/getSingleRole",
				{
					params: {
						selection,
					},
				}
			);
			if (data.success) {
				const {
					id,
					billing,
					role,
					company,
					floor,
					customer,
					user,
					graph,
				} = data.data;
				setUserId(id);
				let billingValues = await fetchValues(billing);
				setBilling({
					...billing,
					view: billingValues[0],
					create: billingValues[1],
					update: billingValues[2],
					delete: billingValues[3],
					print: billingValues[4],
				});
				let roleValues = await fetchValues(role);
				setRole({
					...role,
					view: roleValues[0],
					create: roleValues[1],
					update: roleValues[2],
					delete: roleValues[3],
					print: roleValues[4],
				});
				let companyValues = await fetchValues(company);
				setCompany({
					...company,
					view: companyValues[0],
					create: companyValues[1],
					update: companyValues[2],
					delete: companyValues[3],
					print: companyValues[4],
				});
				let floorValues = await fetchValues(floor);
				setFloor({
					...floor,
					view: floorValues[0],
					create: floorValues[1],
					update: floorValues[2],
					delete: floorValues[3],
					print: floorValues[4],
				});
				let customerValues = await fetchValues(customer);
				setCustomer({
					...customer,
					view: customerValues[0],
					create: customerValues[1],
					update: customerValues[2],
					delete: customerValues[3],
					print: customerValues[4],
				});
				let userValues = await fetchValues(user);
				setUser({
					...user,
					view: userValues[0],
					create: userValues[1],
					update: userValues[2],
					delete: userValues[3],
					print: userValues[4],
				});
				let graphValues = await fetchValues(graph);
				setGraph({
					...graph,
					view: graphValues[0],
					create: graphValues[1],
					update: graphValues[2],
					delete: graphValues[3],
					print: graphValues[4],
				});
				setDataBack(true);
			} else {
				toast.error("Failed");
				console.log(data.error);
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	const fetchValues = async (value) => {
		let arr = [];
		arr = value.match(/(\d+)(,\s*\d+)*/g);
		return arr;
	};
	return (
		<div>
			<ResponsiveDrawer page={"Roles"}>
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
							flexDirection={"column"}
							justifyContent={"center"}
							alignItems={"center"}
							padding={2}
						>
							<Paper
								elevation={5}
								sx={{
									padding: 2,
									marginBottom: 2,
									width: "60ch",
								}}
							>
								<Grid
									container
									alignItems={"center"}
									spacing={2}
								>
									<Grid item xs={8}>
										<div>
											<FormControl fullWidth>
												<InputLabel id="demo-simple-select-label">
													Roles
												</InputLabel>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													value={selectedRoles}
													label="Roles"
													onChange={handleChange}
												>
													{allRoles &&
														allRoles?.map((item) => (
															<MenuItem
																key={item.user_role}
																value={`${item.user_role}`}
															>
																{item.user_role}
															</MenuItem>
														))}
												</Select>
											</FormControl>
										</div>
									</Grid>
									<Grid item xs={4}>
										<Link
											className="link"
											href={"/user/Role/roles"}
										>
											<Button
												variant="contained"
												startIcon={<Add />}
												sx={{
													width: "20ch",
													height: "7ch",
													backgroundColor: `${colors.bg}`,
													color: "white",
												}}
											>
												Add Role
											</Button>
										</Link>
									</Grid>
								</Grid>
							</Paper>
							{dataBack ? (
								loading ? (
									"Loading..."
								) : (
									<>
										<Paper
											elevation={5}
											sx={{
												padding: 2,
												marginBottom: 2,
												width: "60ch",
											}}
										>
											<Grid
												container
												alignItems={"center"}
												spacing={2}
											>
												<Grid
													item
													xs={6}
													display={"flex"}
													justifyContent={"center"}
												>
													<Link
														href={`/user/Role/edit/${userId}`}
														className="link"
													>
														<Button
															variant="contained"
															color="warning"
															startIcon={<UpdateOutlined />}
															sx={{
																width: "20ch",
																height: "6ch",
															}}
														>
															Update Role
														</Button>
													</Link>
												</Grid>
												<Grid
													item
													xs={6}
													display={"flex"}
													justifyContent={"center"}
												>
													<Button
														variant="contained"
														color="error"
														startIcon={<DeleteOutline />}
														sx={{
															width: "20ch",
															height: "6ch",
														}}
														onClick={handleDelete}
													>
														Delete Role
													</Button>
												</Grid>
											</Grid>
										</Paper>
										<div>
											<Paper
												elevation={5}
												sx={{
													padding: 2,
													marginBottom: 2,
													width: "60ch",
												}}
											>
												<div
													style={{
														display: "flex",
														justifyContent: "space-between",
														alignItems: "center",
													}}
												>
													<div>
														<span>Company</span>
													</div>
													<div
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
														}}
													>
														<div>
															<Switches
																text={"view"}
																data={company.view}
																context={"company"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"create"}
																data={company.create}
																context={"company"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"update"}
																data={company.update}
																context={"company"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"delete"}
																data={company.delete}
																context={"company"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"print"}
																data={company.print}
																context={"company"}
																readMode={readMode}
															/>
														</div>
													</div>
												</div>
												<div
													style={{
														display: "flex",
														justifyContent: "space-between",
														alignItems: "center",
													}}
												>
													<div>
														<span>Floor</span>
													</div>
													<div
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
														}}
													>
														<div>
															<Switches
																text={"view"}
																data={floor.view}
																context={"floor"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"create"}
																data={floor.create}
																context={"floor"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"update"}
																data={floor.update}
																context={"floor"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"delete"}
																data={floor.delete}
																context={"floor"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"print"}
																data={floor.print}
																context={"floor"}
																readMode={readMode}
															/>
														</div>
													</div>
												</div>
												<div
													style={{
														display: "flex",
														justifyContent: "space-between",
														alignItems: "center",
													}}
												>
													<div>
														<span>Customer</span>
													</div>
													<div
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
														}}
													>
														<div>
															<Switches
																text={"view"}
																data={customer.view}
																context={"customer"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"create"}
																data={customer.create}
																context={"customer"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"update"}
																data={customer.update}
																context={"customer"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"delete"}
																data={customer.delete}
																context={"customer"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"print"}
																data={customer.print}
																context={"customer"}
																readMode={readMode}
															/>
														</div>
													</div>
												</div>
												<div
													style={{
														display: "flex",
														justifyContent: "space-between",
														alignItems: "center",
													}}
												>
													<div>
														<span>User</span>
													</div>
													<div
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
														}}
													>
														<div>
															<Switches
																text={"view"}
																data={user.view}
																context={"user"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"create"}
																data={user.create}
																context={"user"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"update"}
																data={user.update}
																context={"user"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"delete"}
																data={user.delete}
																context={"user"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"print"}
																data={user.print}
																context={"user"}
																readMode={readMode}
															/>
														</div>
													</div>
												</div>
												<div
													style={{
														display: "flex",
														justifyContent: "space-between",
														alignItems: "center",
													}}
												>
													<div>
														<span>Roles</span>
													</div>
													<div
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
														}}
													>
														<div>
															<Switches
																text={"view"}
																data={role.view}
																context={"role"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"create"}
																data={role.create}
																context={"role"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"update"}
																data={role.update}
																context={"role"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"delete"}
																data={role.delete}
																context={"role"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"print"}
																data={role.print}
																context={"role"}
																readMode={readMode}
															/>
														</div>
													</div>
												</div>
												<div
													style={{
														display: "flex",
														justifyContent: "space-between",
														alignItems: "center",
													}}
												>
													<div>
														<span>Graphs</span>
													</div>
													<div
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
														}}
													>
														<div>
															<Switches
																text={"view"}
																data={graph.view}
																context={"graph"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"create"}
																data={graph.create}
																context={"graph"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"update"}
																data={graph.update}
																context={"graph"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"delete"}
																data={graph.delete}
																context={"graph"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"print"}
																data={graph.print}
																context={"graph"}
																readMode={readMode}
															/>
														</div>
													</div>
												</div>
												<div
													style={{
														display: "flex",
														justifyContent: "space-between",
														alignItems: "center",
													}}
												>
													<div>
														<span>Billing</span>
													</div>
													<div
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
														}}
													>
														<div>
															<Switches
																text={"view"}
																data={billing.view}
																context={"billing"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"create"}
																data={billing.create}
																context={"billing"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"update"}
																data={billing.update}
																context={"billing"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"delete"}
																data={billing.delete}
																context={"billing"}
																readMode={readMode}
															/>
														</div>
														<div>
															<Switches
																text={"print"}
																data={billing.print}
																context={"billing"}
																readMode={readMode}
															/>
														</div>
													</div>
												</div>
											</Paper>
										</div>
									</>
								)
							) : (
								"Nothing to show here. Please select any role!"
							)}
						</Grid>
					</Grid>
				</div>
			</ResponsiveDrawer>
		</div>
	);
};

export default View;
