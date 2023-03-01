import { colors } from "@/components/color";
import ResponsiveDrawer from "@/components/Drawer/ResponsiveDrawer";
import Switches from "@/components/Switches";
import {
	Button,
	Grid,
	Paper,
	TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Update = () => {
	const route = useRouter();
	const [userId, setUserId] = useState("");
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
		if (route.isReady && route.query != null) {
			const { id } = route.query;
			setUserId(id);
			fetchRole(id);
		}
	}, [route.isReady]);
	const fetchRole = async (id) => {
		try {
			const { data } = await axios.get(
				"permissions/roleForUpdate",
				{
					params: {
						id: id,
					},
				}
			);
			fillData(data);
		} catch (error) {
			console.log(error);
		}
	};
	const fetchValues = async (value) => {
		let arr = [];
		arr = value.match(/(\d+)(,\s*\d+)*/g);
		return arr;
	};
	const fillData = async (data) => {
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
		} else {
			toast.error("Failed to fetch");
			console.log(data.error);
		}
	};
	const handleSubmit = async () => {
		const rolep = `view:${role.view},create:${role.create},update:${role.update},delete:${role.delete},print:${role.print}`;
		const companyp = `view:${company.view},create:${company.create},update:${company.update},delete:${company.delete},print:${company.print}`;
		const floorp = `view:${floor.view},create:${floor.create},update:${floor.update},delete:${floor.delete},print:${floor.print}`;
		const customerp = `view:${customer.view},create:${customer.create},update:${customer.update},delete:${customer.delete},print:${customer.print}`;
		const userp = `view:${user.view},create:${user.create},update:${user.update},delete:${user.delete},print:${user.print}`;
		const graphp = `view:${graph.view},create:${graph.create},update:${graph.update},delete:${graph.delete},print:${graph.print}`;
		const billingp = `view:${billing.view},create:${billing.create},update:${billing.update},delete:${billing.delete},print:${billing.print}`;
		try {
			setLoading(true);
			let payload = {
				id: userId,
				role: rolep,
				company: companyp,
				floor: floorp,
				customer: customerp,
				user: userp,
				graph: graphp,
				billing: billingp,
			};
			const { data } = await axios.put(
				"permissions/",
				payload
			);
			if (data.success) {
				toast.success(data.message);
				route.push("/user/Role/view");
			} else {
				toast.error(data.message);
				console.log(data.error);
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	const handleChange = async (e, context) => {
		if (context === "company") {
			const name = e.target.name;
			const isChecked = e.target.checked;
			if (name === "view") {
				setCompany(
					isChecked
						? { ...company, view: 1 }
						: { ...company, view: 0 }
				);
			} else if (name === "create") {
				setCompany(
					isChecked
						? { ...company, create: 1 }
						: { ...company, create: 0 }
				);
			} else if (name === "update") {
				setCompany(
					isChecked
						? { ...company, update: 1 }
						: { ...company, update: 0 }
				);
			} else if (name === "delete") {
				setCompany(
					isChecked
						? { ...company, delete: 1 }
						: { ...company, delete: 0 }
				);
			} else {
				setCompany(
					isChecked
						? { ...company, print: 1 }
						: { ...company, print: 0 }
				);
			}
		}
		if (context === "floor") {
			const name = e.target.name;
			const isChecked = e.target.checked;
			if (name === "view") {
				setFloor(
					isChecked
						? { ...floor, view: 1 }
						: { ...floor, view: 0 }
				);
			} else if (name === "create") {
				setFloor(
					isChecked
						? { ...floor, create: 1 }
						: { ...floor, create: 0 }
				);
			} else if (name === "update") {
				setFloor(
					isChecked
						? { ...floor, update: 1 }
						: { ...floor, update: 0 }
				);
			} else if (name === "delete") {
				setFloor(
					isChecked
						? { ...floor, delete: 1 }
						: { ...floor, delete: 0 }
				);
			} else {
				setFloor(
					isChecked
						? { ...floor, print: 1 }
						: { ...floor, print: 0 }
				);
			}
		}
		if (context === "customer") {
			const name = e.target.name;
			const isChecked = e.target.checked;
			if (name === "view") {
				setCustomer(
					isChecked
						? { ...customer, view: 1 }
						: { ...customer, view: 0 }
				);
			} else if (name === "create") {
				setCustomer(
					isChecked
						? { ...customer, create: 1 }
						: { ...customer, create: 0 }
				);
			} else if (name === "update") {
				setCustomer(
					isChecked
						? { ...customer, update: 1 }
						: { ...customer, update: 0 }
				);
			} else if (name === "delete") {
				setCustomer(
					isChecked
						? { ...customer, delete: 1 }
						: { ...customer, delete: 0 }
				);
			} else {
				setCustomer(
					isChecked
						? { ...customer, print: 1 }
						: { ...customer, print: 0 }
				);
			}
		}
		if (context === "user") {
			const name = e.target.name;
			const isChecked = e.target.checked;
			if (name === "view") {
				setUser(
					isChecked
						? { ...user, view: 1 }
						: { ...user, view: 0 }
				);
			} else if (name === "create") {
				setUser(
					isChecked
						? { ...user, create: 1 }
						: { ...user, create: 0 }
				);
			} else if (name === "update") {
				setUser(
					isChecked
						? { ...user, update: 1 }
						: { ...user, update: 0 }
				);
			} else if (name === "delete") {
				setUser(
					isChecked
						? { ...user, delete: 1 }
						: { ...user, delete: 0 }
				);
			} else {
				setUser(
					isChecked
						? { ...user, print: 1 }
						: { ...user, print: 0 }
				);
			}
		}
		if (context === "role") {
			const name = e.target.name;
			const isChecked = e.target.checked;
			if (name === "view") {
				setRole(
					isChecked
						? { ...role, view: 1 }
						: { ...role, view: 0 }
				);
			} else if (name === "create") {
				setRole(
					isChecked
						? { ...role, create: 1 }
						: { ...role, create: 0 }
				);
			} else if (name === "update") {
				setRole(
					isChecked
						? { ...role, update: 1 }
						: { ...role, update: 0 }
				);
			} else if (name === "delete") {
				setRole(
					isChecked
						? { ...role, delete: 1 }
						: { ...role, delete: 0 }
				);
			} else {
				setRole(
					isChecked
						? { ...role, print: 1 }
						: { ...role, print: 0 }
				);
			}
		}
		if (context === "graph") {
			const name = e.target.name;
			const isChecked = e.target.checked;
			if (name === "view") {
				setGraph(
					isChecked
						? { ...graph, view: 1 }
						: { ...graph, view: 0 }
				);
			} else if (name === "create") {
				setGraph(
					isChecked
						? { ...graph, create: 1 }
						: { ...graph, create: 0 }
				);
			} else if (name === "update") {
				setGraph(
					isChecked
						? { ...graph, update: 1 }
						: { ...graph, update: 0 }
				);
			} else if (name === "delete") {
				setGraph(
					isChecked
						? { ...graph, delete: 1 }
						: { ...graph, delete: 0 }
				);
			} else {
				setGraph(
					isChecked
						? { ...graph, print: 1 }
						: { ...graph, print: 0 }
				);
			}
		}
		if (context === "billing") {
			const name = e.target.name;
			const isChecked = e.target.checked;
			if (name === "view") {
				setBilling(
					isChecked
						? { ...billing, view: 1 }
						: { ...billing, view: 0 }
				);
			} else if (name === "create") {
				setBilling(
					isChecked
						? { ...billing, create: 1 }
						: { ...billing, create: 0 }
				);
			} else if (name === "update") {
				setBilling(
					isChecked
						? { ...billing, update: 1 }
						: { ...billing, update: 0 }
				);
			} else if (name === "delete") {
				setBilling(
					isChecked
						? { ...billing, delete: 1 }
						: { ...billing, delete: 0 }
				);
			} else {
				setBilling(
					isChecked
						? { ...billing, print: 1 }
						: { ...billing, print: 0 }
				);
			}
		}
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
													handleChange={handleChange}
													context={"company"}
												/>
											</div>
											<div>
												<Switches
													text={"create"}
													data={company.create}
													handleChange={handleChange}
													context={"company"}
												/>
											</div>
											<div>
												<Switches
													text={"update"}
													data={company.update}
													handleChange={handleChange}
													context={"company"}
												/>
											</div>
											<div>
												<Switches
													text={"delete"}
													data={company.delete}
													handleChange={handleChange}
													context={"company"}
												/>
											</div>
											<div>
												<Switches
													text={"print"}
													data={company.print}
													handleChange={handleChange}
													context={"company"}
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
													handleChange={handleChange}
													context={"floor"}
												/>
											</div>
											<div>
												<Switches
													text={"create"}
													data={floor.create}
													handleChange={handleChange}
													context={"floor"}
												/>
											</div>
											<div>
												<Switches
													text={"update"}
													data={floor.update}
													handleChange={handleChange}
													context={"floor"}
												/>
											</div>
											<div>
												<Switches
													text={"delete"}
													data={floor.delete}
													handleChange={handleChange}
													context={"floor"}
												/>
											</div>
											<div>
												<Switches
													text={"print"}
													data={floor.print}
													handleChange={handleChange}
													context={"floor"}
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
													handleChange={handleChange}
													context={"customer"}
												/>
											</div>
											<div>
												<Switches
													text={"create"}
													data={customer.create}
													handleChange={handleChange}
													context={"customer"}
												/>
											</div>
											<div>
												<Switches
													text={"update"}
													data={customer.update}
													handleChange={handleChange}
													context={"customer"}
												/>
											</div>
											<div>
												<Switches
													text={"delete"}
													data={customer.delete}
													handleChange={handleChange}
													context={"customer"}
												/>
											</div>
											<div>
												<Switches
													text={"print"}
													data={customer.print}
													handleChange={handleChange}
													context={"customer"}
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
													handleChange={handleChange}
													context={"user"}
												/>
											</div>
											<div>
												<Switches
													text={"create"}
													data={user.create}
													handleChange={handleChange}
													context={"user"}
												/>
											</div>
											<div>
												<Switches
													text={"update"}
													data={user.update}
													handleChange={handleChange}
													context={"user"}
												/>
											</div>
											<div>
												<Switches
													text={"delete"}
													data={user.delete}
													handleChange={handleChange}
													context={"user"}
												/>
											</div>
											<div>
												<Switches
													text={"print"}
													data={user.print}
													handleChange={handleChange}
													context={"user"}
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
													handleChange={handleChange}
													context={"role"}
												/>
											</div>
											<div>
												<Switches
													text={"create"}
													data={role.create}
													handleChange={handleChange}
													context={"role"}
												/>
											</div>
											<div>
												<Switches
													text={"update"}
													data={role.update}
													handleChange={handleChange}
													context={"role"}
												/>
											</div>
											<div>
												<Switches
													text={"delete"}
													data={role.delete}
													handleChange={handleChange}
													context={"role"}
												/>
											</div>
											<div>
												<Switches
													text={"print"}
													data={role.print}
													handleChange={handleChange}
													context={"role"}
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
													handleChange={handleChange}
													context={"graph"}
												/>
											</div>
											<div>
												<Switches
													text={"create"}
													data={graph.create}
													handleChange={handleChange}
													context={"graph"}
												/>
											</div>
											<div>
												<Switches
													text={"update"}
													data={graph.update}
													handleChange={handleChange}
													context={"graph"}
												/>
											</div>
											<div>
												<Switches
													text={"delete"}
													data={graph.delete}
													handleChange={handleChange}
													context={"graph"}
												/>
											</div>
											<div>
												<Switches
													text={"print"}
													data={graph.print}
													handleChange={handleChange}
													context={"graph"}
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
													handleChange={handleChange}
													context={"billing"}
												/>
											</div>
											<div>
												<Switches
													text={"create"}
													data={billing.create}
													handleChange={handleChange}
													context={"billing"}
												/>
											</div>
											<div>
												<Switches
													text={"update"}
													data={billing.update}
													handleChange={handleChange}
													context={"billing"}
												/>
											</div>
											<div>
												<Switches
													text={"delete"}
													data={billing.delete}
													handleChange={handleChange}
													context={"billing"}
												/>
											</div>
											<div>
												<Switches
													text={"print"}
													data={billing.print}
													handleChange={handleChange}
													context={"billing"}
												/>
											</div>
										</div>
									</div>
								</Paper>
							</div>
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
									<Button
										variant="contained"
										fullWidth
										sx={{ backgroundColor: `${colors.bg}` }}
										onClick={handleSubmit}
										disabled={loading}
									>
										{loading ? "Loading..." : "Update"}
									</Button>
								</div>
							</Paper>
						</Grid>
					</Grid>
				</div>
			</ResponsiveDrawer>
		</div>
	);
};

export default Update;
