import ResponsiveDrawer from "@/components/Drawer/ResponsiveDrawer";
import React from "react";
import Dashboard from "./user/dashboard";
import Roles from "./user/Role/roles";

const Home = () => {
	return (
		<div>
			<ResponsiveDrawer page={"Dashboard"}>
				<Dashboard />
			</ResponsiveDrawer>
		</div>
	);
};

export default Home;
