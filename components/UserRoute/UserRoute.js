import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";

const UserRoute = ({ children }) => {
	const route = useRouter();
	const [ok, setOk] = useState(false);
	const { state } = useContext(AuthContext);
	useEffect(() => {
		if (state && state.token) getCurrentUser();
	}, [state && state.token]);

	const getCurrentUser = async () => {
		try {
			const { data } = await axios.get(`User/currentUser`);
			if (data.ok) setOk(true);
		} catch (error) {
			route.push("/login");
		}
	};

	process.browser &&
		state === null &&
		setTimeout(() => {
			getCurrentUser();
		}, 1000);

	return !ok ? (
		<div style={{ fontSize: 20 }}>Loading...</div>
	) : (
		<>{children}</>
	);
};
export default UserRoute;
