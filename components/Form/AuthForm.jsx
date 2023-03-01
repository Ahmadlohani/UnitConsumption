import React from "react";
import Link from "next/link";
import {
	Button,
	Box,
	TextField,
	styled,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Paper,
} from "@mui/material";
import {
	RotateLeftOutlined,
	Send,
} from "@mui/icons-material";
import { colors } from "@/components/color";

const AuthForm = ({
	loading,
	handleChange,
	handleSubmit,
	roles,
	detail,
	error,
	page,
}) => {
	const SubmitButton = styled(Button)(({ theme }) => ({
		marginTop: 10,
		marginBottom: 10,
		width: "50ch",
		borderRadius: 20,
		backgroundColor: `${colors.bg}`,
		color: "white",
		"&:hover": {
			backgroundColor: `${colors.color}`,
		},
	}));
	return (
		<div>
			<Paper
				elevation={5}
				sx={{
					padding: 1,
					width: "60ch",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Box component="form">
					<div
						style={{
							paddingTop: 10,
							paddingBottom: 10,
							display: "flex",
							justifyContent: "center",
							flexDirection: "column",
						}}
					>
						<div>
							<FormControl
								variant="filled"
								sx={{ width: "50ch", marginBottom: 2 }}
							>
								<InputLabel id="demo-simple-select-label">
									Role
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={detail.selectedRole}
									name="role"
									label="Role *"
									onChange={handleChange}
								>
									{roles &&
										roles?.map((item) => (
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
						{page !== "login" && (
							<div>
								<TextField
									variant="filled"
									sx={{ width: "50ch", marginBottom: 2 }}
									color="success"
									label="Name *"
									error={
										detail.name != ""
											? error.nameErr != ""
												? true
												: false
											: false
									}
									helperText={
										detail.name != "" && error.nameErr != ""
											? error.nameErr
											: ""
									}
									name="name"
									value={detail.name}
									onChange={handleChange}
								/>
							</div>
						)}
						<div>
							<TextField
								variant="filled"
								sx={{ width: "50ch", marginBottom: 2 }}
								color="success"
								label="Email *"
								error={
									detail.email != ""
										? error.emailErr != ""
											? true
											: false
										: false
								}
								helperText={
									detail.email != "" && error.emailErr != ""
										? error.emailErr
										: ""
								}
								name="email"
								value={detail.email}
								onChange={handleChange}
							/>
						</div>
						<div>
							<TextField
								variant="filled"
								sx={{ width: "50ch", marginBottom: 2 }}
								color="success"
								label="Password *"
								error={
									detail.password != ""
										? error.passwordErr != ""
											? true
											: false
										: false
								}
								helperText={
									detail.password != "" &&
									error.passwordErr != ""
										? error.passwordErr
										: ""
								}
								name="psw"
								value={detail.password}
								onChange={handleChange}
							/>
						</div>

						<div>
							<SubmitButton
								variant="contained"
								endIcon={
									loading ? (
										<RotateLeftOutlined />
									) : (
										<Send />
									)
								}
								onClick={handleSubmit}
								// disabled={loading}
							>
								{page == "login" ? "Login" : "Submit"}
							</SubmitButton>
						</div>
						{page == "login" && (
							<div>
								Forgot Password?
								<Link className="link" href="/forgot">
									<Button
										variant="outlined"
										color="primary"
										sx={{
											borderRadius: 10,
											marginLeft: 2,
										}}
									>
										Click Here
									</Button>
								</Link>
							</div>
						)}
					</div>
				</Box>
			</Paper>
		</div>
	);
};

export default AuthForm;
