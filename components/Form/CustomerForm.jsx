import React from "react";
import { colors } from "@/components/color";
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
} from "@mui/material";
const CustomerForm = ({
	data,
	handleChange,
	handleSubmit,
	loading,
	floors,
}) => {
	return (
		<div>
			<Paper
				elevation={5}
				sx={{ padding: 2, width: "60ch" }}
			>
				<Box display={"flex"} marginBottom={1}>
					<TextField
						id="outlined-basic"
						label="Name *"
						name="name"
						value={data.name}
						variant="outlined"
						fullWidth
						onChange={handleChange}
					/>
					<TextField
						id="outlined-basic"
						label="Customer Code *"
						name="cc"
						value={data.cc}
						onChange={handleChange}
						variant="outlined"
						fullWidth
						sx={{ marginLeft: 1 }}
					/>
				</Box>
				<Box display={"flex"} marginBottom={1}>
					<TextField
						id="outlined-basic"
						label="Telephone"
						name="phone"
						value={data.phone}
						onChange={handleChange}
						variant="outlined"
						fullWidth
					/>
					<TextField
						id="outlined-basic"
						label="Mobile"
						variant="outlined"
						name="mobile"
						value={data.mobile}
						onChange={handleChange}
						fullWidth
						sx={{ marginLeft: 1 }}
					/>
				</Box>
				<Box display={"flex"} marginBottom={1}>
					<TextField
						id="outlined-basic"
						label="Notes"
						variant="outlined"
						fullWidth
						type={"number"}
						name="note"
						value={data.note}
						onChange={handleChange}
					/>
					<div>
						<FormControl
							variant="outlined"
							sx={{ width: "30ch", marginLeft: 1 }}
						>
							<InputLabel id="demo-simple-select-label">
								Floor Combo *
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={data.combo}
								name="combo"
								label="Floor Combo *"
								onChange={handleChange}
							>
								{floors &&
									floors?.map((item) => (
										<MenuItem
											key={item.FloorName}
											value={`${item.FloorName}`}
										>
											{item.FloorName}
										</MenuItem>
									))}
							</Select>
						</FormControl>
					</div>
				</Box>
				<Box display={"flex"} marginBottom={1}>
					<TextField
						id="outlined-basic"
						label="Claimed Percentage *"
						name="claim"
						value={data.claim}
						type="number"
						onChange={handleChange}
						variant="outlined"
						fullWidth
					/>
				</Box>
				<div
					style={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Checkbox
						id="status"
						name="status"
						checked={data.status === 1 ? true : false}
						color="success"
						onChange={handleChange}
					/>
					<label htmlFor="status">Status</label>
				</div>
				<Button
					variant="contained"
					sx={{
						backgroundColor: `${colors.bg}`,
						color: "white",
					}}
					fullWidth
					// disabled={loading}
					onClick={handleSubmit}
				>
					{loading ? "Adding.." : "Submit"}
				</Button>
			</Paper>
		</div>
	);
};

export default CustomerForm;
