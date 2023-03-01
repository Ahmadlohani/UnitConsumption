import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
	AccessibilityNewOutlined,
	AccountCircleOutlined,
	ApartmentOutlined,
	Dashboard,
	EqualizerOutlined,
	HouseSidingOutlined,
	Logout,
	PersonOutlineOutlined,
	ReceiptOutlined,
} from "@mui/icons-material";
import { colors } from "../color";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
const drawerWidth = 240;

function ResponsiveDrawer(props) {
	const { setState, setPermissions } =
		React.useContext(AuthContext);
	const route = useRouter();
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const handleLogOut = async () => {
		if (window === undefined) {
			alert("Ohh sheet");
			return;
		}
		// window.localStorage.removeItem("auth");
		// window.localStorage.removeItem("permissions");
		// setState(null);
		// setPermissions(null);
		// route.push("/login");
	};
	const drawer = (
		<div>
			<Image
				src={"/images/logo.png"}
				width={50}
				height={50}
				style={{ borderRadius: 50, padding: 4 }}
				alt={"Logo"}
			/>
			{/* <Toolbar /> */}
			<Divider />
			<List>
				{[
					"Dashboard",
					"Roles",
					"Companies",
					"Floors",
					"Customers",
					"Users",
					"Graphs",
					"Billings",
				].map((text, index) => (
					<Link
						className="link"
						href={
							index === 0
								? "/"
								: index === 1
								? "/user/Role/view"
								: index === 2
								? "/user/Company/view"
								: index === 3
								? "/user/Floor/view"
								: index === 4
								? "/user/Customer/view"
								: index === 5
								? "/user/User/view"
								: index === 6
								? "/user/Graph/view"
								: "/user/Billing/view"
						}
						key={text}
					>
						<ListItem
							key={text}
							disablePadding
							className={
								text === props.page ? "active" : ""
							}
						>
							<ListItemButton>
								<ListItemIcon>
									{index === 0 && (
										<Dashboard style={{ color: "white" }} />
									)}
									{index === 1 && (
										<AccessibilityNewOutlined
											style={{ color: "white" }}
										/>
									)}
									{index === 2 && (
										<ApartmentOutlined
											style={{ color: "white" }}
										/>
									)}
									{index === 3 && (
										<HouseSidingOutlined
											style={{ color: "white" }}
										/>
									)}
									{index === 4 && (
										<PersonOutlineOutlined
											style={{ color: "white" }}
										/>
									)}
									{index === 5 && (
										<AccountCircleOutlined
											style={{ color: "white" }}
										/>
									)}
									{index === 6 && (
										<EqualizerOutlined
											style={{ color: "white" }}
										/>
									)}
									{index === 7 && (
										<ReceiptOutlined
											style={{ color: "white" }}
										/>
									)}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					</Link>
				))}
			</List>
			<Divider />
			<List>
				{["Logout"].map((text) => (
					<ListItem key={text} disablePadding>
						<ListItemButton onClick={handleLogOut}>
							<ListItemIcon>
								<Logout style={{ color: "white" }} />
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</div>
	);

	const container =
		window !== undefined
			? () => window().document.body
			: undefined;

	return (
		<Box sx={{ display: "flex" }}>
			{/* <CssBaseline /> */}
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar sx={{ backgroundColor: `${colors.bg}` }}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Meter Consumption Analysis
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{
					width: { sm: drawerWidth },
					flexShrink: { sm: 0 },
				}}
				aria-label="mailbox folders"
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: {
							xs: "block",
							sm: "none",
						},
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar />
				{props.children}
			</Box>
		</Box>
	);
}

ResponsiveDrawer.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default ResponsiveDrawer;
