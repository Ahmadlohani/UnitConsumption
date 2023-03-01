import database from "@/lib/db";
import { DataTypes } from "sequelize";
const WebCustomer = database.define(
	"WebCustomer",
	{
		id: {
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		cc: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		combo: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		claim: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
		},
		mobile: {
			type: DataTypes.STRING,
		},
		note: {
			type: DataTypes.STRING,
		},
		status: {
			type: DataTypes.INTEGER,
		},
	},
	{
		// Other model options go here
		freezeTableName: true,
	}
);
database.sync();
export default WebCustomer;
