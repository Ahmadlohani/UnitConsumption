import models from "@/models";
import { Op } from "sequelize";

export default async function handler(req, res) {
	const { method } = req;
	switch (method) {
		case "POST":
			const { ID, toDateTime, fromDateTime } = req.body;
			console.log(toDateTime, fromDateTime);
			const db = models[ID];
			try {
				const result = await db.findAll({
					order: [["TIMESTAMP", "ASC"]],
					where: {
						TIMESTAMP: {
							[Op.and]: {
								[Op.gte]: fromDateTime,
								[Op.lte]: toDateTime,
							},
						},
					},
					attributes: ["TIMESTAMP", "TotalValue"],
				});
				// const result = await db.findOne();
				res.json({
					success: true,
					message: "Data found!",
					data: result,
				});
			} catch (error) {
				res.json({
					success: false,
					message: "Data not found!",
					error,
				});
			}
			break;
		default:
			break;
	}
}
