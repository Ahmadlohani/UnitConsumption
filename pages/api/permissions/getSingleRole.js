import WebPermissions from "@/models/WebPermission";

export default async function handler(req, res) {
	const { method } = req;
	switch (method) {
		case "GET":
			const { selection } = req.query;
			try {
				const result = await WebPermissions.findOne({
					where: {
						user_role: selection,
					},
				});
				res.json({
					success: true,
					message: "Data Found",
					data: result,
				});
			} catch (error) {
				res.json({
					success: false,
					message: "Data not Found",
					error,
				});
			}
			break;
		default:
			break;
	}
}
