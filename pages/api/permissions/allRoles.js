import WebPermissions from "@/models/WebPermission";

export default async function handler(req, res) {
	const { method } = req;
	switch (method) {
		case "GET":
			try {
				const result = await WebPermissions.findAll({
					attributes: ["user_role"],
				});
				res.json({
					success: true,
					message: "Data Found",
					data: result,
				});
			} catch (error) {
				res.json({
					success: false,
					message: "Roles not Found",
					error,
				});
			}
			break;
		default:
			break;
	}
}
