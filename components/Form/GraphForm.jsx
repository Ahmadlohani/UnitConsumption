import React from "react";
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
} from "@mui/material";
import DateTime from "../DateTime";
import {
	AddOutlined,
	PendingOutlined,
} from "@mui/icons-material";
import { colors } from "../color";

const GraphForm = ({
	data,
	handleChange,
	handleSubmit,
	histTables,
	loading,
}) => {
	return (
		<div>
			<Paper elevation={5} sx={{ padding: 2 }}>
				<Grid
					container
					spacing={1}
					marginBottom={1}
					display={"flex"}
					alignItems={"center"}
					justifyContent={"center"}
				>
					<Grid item xs={12} md={4}>
						<div>
							<FormControl variant="outlined" fullWidth>
								<InputLabel id="demo-simple-select-label">
									Floor
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={data.floor}
									name="floor"
									label="Floor *"
									onChange={handleChange}
								>
									{histTables &&
										histTables?.map((item) => (
											<MenuItem
												key={item.TableName}
												value={`${item.TableName}`}
											>
												{item.TableName}
											</MenuItem>
										))}
								</Select>
							</FormControl>
						</div>
					</Grid>
					<Grid item xs={12} md={4}>
						<div>
							<DateTime
								data={data.fromDateTime}
								handleChange={handleChange}
								label={"From DateTime"}
								context={"from"}
							/>
						</div>
					</Grid>
					<Grid item xs={12} md={4}>
						<div>
							<DateTime
								data={data.toDateTime}
								handleChange={handleChange}
								label={"To DateTime"}
								context={"to"}
							/>
						</div>
					</Grid>
				</Grid>
				<Grid container spacing={1} marginBottom={1}>
					<Grid item xs={12} md={4}>
						<div>
							<FormControl variant="outlined" fullWidth>
								<InputLabel id="demo-simple-select-label">
									Graph Style *
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={data.style}
									name="style"
									label="Graph Style *"
									onChange={handleChange}
								>
									<MenuItem value={"line"}>
										Line Graph
									</MenuItem>
									<MenuItem value={"bar"}>
										Bar Graph
									</MenuItem>
								</Select>
							</FormControl>
						</div>
					</Grid>
					<Grid item xs={12} md={4}>
						<div>
							<FormControl variant="outlined" fullWidth>
								<InputLabel id="demo-simple-select-label">
									Graph Purpose *
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={data.purpose}
									name="purpose"
									label="Graph Purpose *"
									onChange={handleChange}
								>
									<MenuItem value={"day"}>
										Day Wise
									</MenuItem>
									<MenuItem value={"monthly"}>
										Monthly Comparison
									</MenuItem>
								</Select>
							</FormControl>
						</div>
					</Grid>
					<Grid item xs={12} md={4}>
						<div
							style={{
								display: "flex",
								alignItems: "center",
							}}
						>
							<Checkbox
								id="mbtu"
								name="mbtu"
								checked={data.mbtu === 1 ? true : false}
								color="success"
								onChange={handleChange}
							/>
							<label htmlFor="mbtu">MBTU</label>
						</div>
					</Grid>
				</Grid>
				<Box display={"flex"} justifyContent={"center"}>
					<Button
						variant="contained"
						startIcon={
							loading ? (
								<PendingOutlined />
							) : (
								<AddOutlined />
							)
						}
						size={"small"}
						sx={{
							backgroundColor: `${colors.bg}`,
							color: "white",
						}}
						disabled={loading}
						onClick={handleSubmit}
					>
						Add Graph
					</Button>
				</Box>
			</Paper>
		</div>
	);
};

export default GraphForm;
