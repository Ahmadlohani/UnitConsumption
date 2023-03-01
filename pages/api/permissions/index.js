import WebPermissions from "@/models/WebPermission";

export default async function handler(req, res) {
	const { method } = req;
	const {
		id,
		role,
		company,
		floor,
		customer,
		user,
		graph,
		billing,
		position,
	} = req.body;
	switch (method) {
		case "POST":
			// console.log(req.body);
			const createData = {
				user_role: position,
				company,
				role,
				floor,
				customer,
				user,
				graph,
				billing,
			};
			try {
				const result = await WebPermissions.create(
					createData
				);
				res.json({
					success: true,
					message: "Role created successfully!",
				});
			} catch (error) {
				res.json({
					success: false,
					message: "Role not created!",
					error,
				});
			}
			break;
		case "PUT":
			// console.log(req.body);
			const updateData = {
				company,
				role,
				floor,
				customer,
				user,
				graph,
				billing,
			};
			try {
				const result = await WebPermissions.update(
					updateData,
					{
						where: {
							id,
						},
					}
				);
				res.json({
					success: true,
					message: "Role updated successfully!",
				});
			} catch (error) {
				res.json({
					success: false,
					message: "Role not Updated!",
					error,
				});
			}
			break;
		case "DELETE":
			const { deleteId } = req.query;
			try {
				const result = await WebPermissions.destroy({
					where: {
						id: deleteId,
					},
				});
				res.json({
					success: true,
					message: "Role deleted successfully!",
				});
			} catch (error) {
				res.json({
					success: false,
					message: "Role not Deleted!",
					error,
				});
			}
			break;
		default:
			break;
	}
}
