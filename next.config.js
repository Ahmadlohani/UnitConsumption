/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		MSSQL_HOST: "localhost",
		MSSQL_INSTANCENAME: "SQLEXPRESS2012",
		MSSQL_PORT: "1433",
		MSSQL_DATABASE: "JS_Billing",
		MSSQL_USER: "sa",
		MSSQL_PASSWORD: "root",
		NEXT_PUBLIC_API_URL: "http://localhost:3000/api/",
		JWT_SECRET: "jskhfsdjkfhsfjksd1234561231sdjkfhsdjkfsdj",
	},
};

module.exports = nextConfig;
