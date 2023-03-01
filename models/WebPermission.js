import database from "@/lib/db";
import { DataTypes } from "sequelize";
const WebPermission = database.define(
	"WebPermission",
	{
		id: {
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		user_role: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		company: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		floor: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		customer: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		graph: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		billing: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		// Other model options go here
		freezeTableName: true,
	}
);
database.sync();
export default WebPermission;
