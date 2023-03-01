import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
	const [state, setState] = useState({
		user: {},
		token: "",
	});
	const [permissions, setPermissions] = useState({
		role: [],
		company: [],
		floor: [],
		customer: [],
		user: [],
		graph: [],
		billing: [],
	});
	const route = useRouter();
	useEffect(() => {
		setState(
			JSON.parse(window.localStorage.getItem("auth"))
		);
		setPermissions(
			JSON.parse(window.localStorage.getItem("permissions"))
		);
	}, []);
	const token = state && state.token ? state.token : "";
	axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${token}`;
	axios.interceptors.response.use(
		function (response) {
			// Do something before request is sent
			return response;
		},
		function (error) {
			// Do something with request error
			let res = error.response;
			if (
				res.status === 401 &&
				res.config &&
				!res.config.__isRetryRequest
			) {
				setState(null);
				setPermissions(null);
				window.localStorage.removeItem("auth");
				window.localStorage.removeItem("permissions");
				route.push("/login");
			}
		}
	);
	return (
		<AuthContext.Provider
			value={{
				state,
				setState,
				permissions,
				setPermissions,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
export { AuthContext, AuthProvider };
