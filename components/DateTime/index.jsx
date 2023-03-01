import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function DateTime({
	label,
	handleChange,
	data,
	context,
}) {
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<Stack spacing={3}>
				<DateTimePicker
					label={label}
					value={data}
					onChange={(val) => handleChange(val, context)}
					renderInput={(params) => (
						<TextField {...params} />
					)}
				/>
			</Stack>
		</LocalizationProvider>
	);
}
