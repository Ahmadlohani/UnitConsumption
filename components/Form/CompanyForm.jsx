import React from "react";
import { colors } from "@/components/color";
import {
	Box,
	Button,
	Paper,
	TextField,
} from "@mui/material";
const CompanyForm = ({
	data,
	handleChange,
	handleSubmit,
	loading,
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
						label="Notes *"
						name="note"
						value={data.note}
						onChange={handleChange}
						type={"number"}
						variant="outlined"
						fullWidth
						sx={{ marginLeft: 1 }}
					/>
				</Box>
				<TextField
					id="outlined-basic"
					label="Address"
					variant="outlined"
					fullWidth
					multiline
					maxRows={2}
					name="address"
					value={data.address}
					onChange={handleChange}
					sx={{ marginBottom: 1 }}
				/>
				<Box display={"flex"} marginBottom={1}>
					<TextField
						id="outlined-basic"
						label="Contact"
						name="contact"
						value={data.contact}
						onChange={handleChange}
						variant="outlined"
						fullWidth
					/>
					<TextField
						id="outlined-basic"
						label="Contact Person"
						variant="outlined"
						name="contactPerson"
						value={data.contactPerson}
						onChange={handleChange}
						fullWidth
						sx={{ marginLeft: 1 }}
					/>
				</Box>
				<Box display={"flex"} marginBottom={1}>
					<TextField
						id="outlined-basic"
						label="Fax"
						variant="outlined"
						fullWidth
						name="fax"
						value={data.fax}
						onChange={handleChange}
					/>
					<TextField
						id="outlined-basic"
						label="Email"
						variant="outlined"
						fullWidth
						name="email"
						value={data.email}
						onChange={handleChange}
						sx={{ marginLeft: 1 }}
					/>
				</Box>
				<Box display={"flex"} marginBottom={1}>
					<TextField
						id="outlined-basic"
						label="GST"
						name="gst"
						value={data.gst}
						onChange={handleChange}
						variant="outlined"
						fullWidth
					/>
					<TextField
						id="outlined-basic"
						label="NTN"
						name="ntn"
						value={data.ntn}
						onChange={handleChange}
						variant="outlined"
						fullWidth
						sx={{ marginLeft: 1 }}
					/>
				</Box>
				<TextField
					id="outlined-basic"
					label="Description"
					variant="outlined"
					name="desc"
					value={data.desc}
					onChange={handleChange}
					fullWidth
					multiline
					maxRows={2}
					sx={{ marginBottom: 1 }}
				/>
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

export default CompanyForm;
