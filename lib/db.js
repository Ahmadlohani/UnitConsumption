// db.js
import { Sequelize } from "sequelize";
Sequelize.DATE.prototype._stringify = function _stringify(
	date,
	options
) {
	date = this._applyTimezone(date, options);
	// Z here means current timezone, _not_ UTC
	// return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
	return date.format("YYYY-MM-DD HH:mm:ss.SSS");
};
const database = new Sequelize(
	process.env.MSSQL_DATABASE,
	process.env.MSSQL_USER,
	process.env.MSSQL_PASSWORD,
	{
		dialect: "mssql",
		host: process.env.MSSQL_HOST,
		port: process.env.MSSQL_PORT,
		dialectOptions: {
			options: {
				instanceName: process.env.MSSQL_INSTANCENAME,
			},
			useUTC: false,
		},
		timezone: "+05:00",
	}
);
async function connectDB() {
	try {
		await database.authenticate();
		console.log("DB Connected successfully!");
	} catch (error) {
		console.error(
			"Unable to connect to the database:",
			error
		);
	}
}
connectDB();
export default database;
