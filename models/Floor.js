import database from "@/lib/db";
import { DataTypes } from "sequelize";
const Floor = database.define(
	"Floor",
	{
		FloorId: {
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.BIGINT,
			allowNull: false,
		},
		FloorName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		HistoryTableId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
		tableName: "Floor",
	}
);
database.sync();
export default Floor;
