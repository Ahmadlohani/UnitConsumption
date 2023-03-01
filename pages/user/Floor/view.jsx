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
	{ id: "floorId", label: "FloorId", minWidth: 100 },
	{ id: "floorName", label: "FloorName", minWidth: 170 },
	{
		id: "historyTableId",
		label: "HistoryTableId",
		minWidth: 100,
	},
];

const View = () => {
	const [floors, setFloors] = useState([]);
	function createData(floorId, floorName, historyTableId) {
		return { floorId, floorName, historyTableId };
	}
	const row = floors?.map((item) =>
		createData(
			item.FloorId,
			item.FloorName,
			item.HistoryTableId
		)
	);
	const rows = row;
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	useEffect(() => {
		fetchFloors();
	}, []);
	const fetchFloors = async () => {
		try {
			const { data } = await axios.get("Floor/");
			if (data.success) {
				setFloors(data.data);
			} else {
				toast.error(data.message);
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
			const { data } = await axios.delete("Company/", {
				params: {
					deleteId: id,
				},
			});
			if (data.success) {
				toast.error(data.message);
				await fetchCompanies();
			} else {
				toast.error(data.message);
				console.log(data.error);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<ResponsiveDrawer page={"Floors"}>
			<div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<h1>Floors</h1>
					<Link className="link" href={"/user/Floor/floor"}>
						<Button
							variant="outlined"
							startIcon={<AddOutlined />}
						>
							Add Floor
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
														key={row.floorId}
													>
														{columns.map((column) => {
															const value = row[column.id];
															const special =
																row["floorId"];
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
																				href={`/user/Company/edit/${special}`}
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
