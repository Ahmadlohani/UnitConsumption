import database from "@/lib/db";
import { DataTypes } from "sequelize";
const HistoryTable = database.define(
	"HistoryTable",
	{
		HistoryTableId: {
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		TableName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
		tableName: "HistoryTable",
	}
);
database.sync();
export default HistoryTable;
