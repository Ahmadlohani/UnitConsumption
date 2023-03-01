import database from "@/lib/db";
import { DataTypes } from "sequelize";
const WebCompany = database.define(
	"WebCompany",
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
		note: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
		},
		contact: {
			type: DataTypes.STRING,
		},
		contactPerson: {
			type: DataTypes.STRING,
		},
		fax: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		gst: {
			type: DataTypes.STRING,
		},
		ntn: {
			type: DataTypes.STRING,
		},
		desc: {
			type: DataTypes.STRING,
		},
	},
	{
		// Other model options go here
		freezeTableName: true,
	}
);
database.sync();
export default WebCompany;
