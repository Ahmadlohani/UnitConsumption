import database from "@/lib/db";
import { DataTypes } from "sequelize";
const JS_CENTRE_FLOOR15_MBTU_PER_MIN = database.define(
	"JS_CENTRE_FLOOR15_MBTU_PER_MIN",
	{
		ID: {
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		TIMESTAMP: {
			type: DataTypes.DATE,
		},
		TRENDFLAGS: {
			type: DataTypes.INTEGER,
		},
		STATUS: {
			type: DataTypes.INTEGER,
		},
		VALUE: {
			type: DataTypes.FLOAT,
		},
		TRENDFLAGS_TAG: {
			type: DataTypes.STRING,
		},
		STATUS_TAG: {
			type: DataTypes.STRING,
		},
		TotalValue: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
		tableName: "JS_CENTRE_FLOOR15_MBTU_PER_MIN",
	}
);
database.sync();
export default JS_CENTRE_FLOOR15_MBTU_PER_MIN;
