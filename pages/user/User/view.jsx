import ResponsiveDrawer from "@/components/Drawer/ResponsiveDrawer";
import { Button, Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import {
	AddOutlined,
	DeleteOutline,
	EditOutlined,
} from "@mui/icons-material";
import Link from "next/link";

const columns = [
	{ id: "id", label: "ID", minWidth: 100 },
	{
		id: "role",
		label: "Role",
		minWidth: 170,
	},
	{ id: "name", label: "Name", minWidth: 170 },
	{ id: "email", label: "Email", minWidth: 170 },
	{ id: "action", label: "Action", minWidth: 170 },
];

const View = () => {
	const [users, setUsers] = useState([]);
	function createData(id, role, name, email) {
		return { id, role, name, email };
	}
	const row = users?.map((item) =>
		createData(
			item.id,
			item.selectedRole,
			item.name,
			item.email
		)
	);
	const rows = row;
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	useEffect(() => {
		fetchUsers();
	}, []);
	const fetchUsers = async () => {
		try {
			const { data } = await axios.get("User/");
			if (data.success) {
				setUsers(data.data);
			} else {
				console.log(data.error);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	const handleDelete = async (id) => {
		const confirm = window.confirm(
			"Are you sure to delete?"
		);
		if (!confirm) {
			return;
		}
		try {
			const { data } = await axios.delete("User/", {
				params: {
					deleteId: id,
				},
			});
			if (data.success) {
				toast.error(data.message);
				await fetchUsers();
			} else {
				toast.error(data.message);
				console.log(data.error);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<ResponsiveDrawer page={"Users"}>
			<div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<h1>Users</h1>
					<Link className="link" href={"/user/User/users"}>
						<Button
							variant="outlined"
							startIcon={<AddOutlined />}
						>
							Add User
						</Button>
					</Link>
				</div>
				<Grid container>
					<Grid item xs={12}>
						<Paper
							sx={{ width: "100%", overflow: "hidden" }}
						>
							<TableContainer sx={{ maxHeight: 440 }}>
								<Table
									stickyHeader
									aria-label="sticky table"
								>
									<TableHead>
										<TableRow>
											{columns.map((column) => (
												<TableCell
													key={column.id}
													align={column.align}
													style={{
														minWidth: column.minWidth,
													}}
												>
													{column.label}
												</TableCell>
											))}
										</TableRow>
									</TableHead>
									<TableBody>
										{rows
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
											)
											.map((row) => {
												return (
													<TableRow
														hover
														role="checkbox"
														tabIndex={-1}
														key={row.id}
													>
														{columns.map((column) => {
															const value = row[column.id];
															const special = row["id"];
															return (
																<TableCell
																	key={column.id}
																	align={column.align}
																>
																	{column.id == "action" ? (
																		<>
																			<IconButton
																				aria-label="delete"
																				onClick={() =>
																					handleDelete(
																						special
																					)
																				}
																				color="error"
																			>
																				<DeleteOutline />
																			</IconButton>
																			<Link
																				className="link"
																				href={`/user/User/edit/${special}`}
																			>
																				<IconButton
																					aria-label="delete"
																					color="primary"
																				>
																					<EditOutlined />
																				</IconButton>
																			</Link>
																		</>
																	) : column.format &&
																	  typeof value ===
																			"number" ? (
																		column.format(value)
																	) : (
																		value
																	)}
																</TableCell>
															);
														})}
													</TableRow>
												);
											})}
									</TableBody>
								</Table>
							</TableContainer>
							<TablePagination
								rowsPerPageOptions={[10, 25, 100]}
								component="div"
								count={rows.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={
									handleChangeRowsPerPage
								}
							/>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</ResponsiveDrawer>
	);
};

export default View;
