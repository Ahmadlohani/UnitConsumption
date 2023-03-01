import React from "react";
import { colors } from "@/components/color";
import {
	Button,
	Checkbox,
	Paper,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
const FloorForm = ({
	data,
	handleChange,
	handleSubmit,
	histTables,
	loading,
}) => {
	return (
		<div>
			<Paper
				elevation={5}
				sx={{ padding: 2, width: "60ch" }}
			>
				<TextField
					id="outlined-basic"
					label="Name *"
					name="name"
					value={data.name}
					variant="outlined"
					fullWidth
					onChange={handleChange}
					sx={{ marginBottom: 1 }}
				/>
				<TextField
					id="outlined-basic"
					label="Description"
					name="desc"
					value={data.desc}
					onChange={handleChange}
					variant="outlined"
					fullWidth
					multiline
					maxRows={2}
					sx={{ marginBottom: 1 }}
				/>
				<div>
					<FormControl
						variant="outlined"
						sx={{ width: "60ch", marginBottom: 2 }}
					>
						<InputLabel id="demo-simple-select-label">
							Link DB *
						</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={data.link}
							name="link"
							label="Link DB *"
							onChange={handleChange}
						>
							{histTables &&
								histTables?.map((item) => (
									<MenuItem
										key={item.TableName}
										value={`${item.HistoryTableId}`}
									>
										{item.TableName}
									</MenuItem>
								))}
						</Select>
					</FormControl>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Checkbox
						id="peak"
						name="peak"
						checked={data.peak === 1 ? true : false}
						color="success"
						onChange={handleChange}
					/>
					<label htmlFor="peak">Peak Hours</label>
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

export default FloorForm;
