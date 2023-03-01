import { hashPassword } from "@/lib/helper/auth";
import WebUsers from "@/models/WebUser";
export default async function handler(req, res) {
	const { method } = req;
	const { username, name, email, password, selectedRole } =
		req.body;
	switch (method) {
		case "POST":
			const exist = await WebUsers.findOne({
				where: {
					selectedRole,
				},
			});
			if (exist) {
				return res.json({
					success: false,
					message: "User with this Role already exists",
					error: "User with this Role already exists",
				});
			}
			const hashedPassword = await hashPassword(password);
			const userData = {
				username,
				name,
				email,
				password: hashedPassword,
				selectedRole,
			};
			try {
				await WebUsers.create(userData);
				res.json({
					success: true,
					message: "User added successfully!",
				});
			} catch (error) {
				res.json({
					success: false,
					message: "User not added!",
					error,
				});
			}
			break;
		case "GET":
			try {
				const result = await WebUsers.findAll();
				res.json({
					success: true,
					message: "Users found!",
					data: result,
				});
			} catch (error) {
				res.json({
					success: false,
					message: "Users not found!",
					error,
				});
			}
			break;
		case "PUT":
			const { updateId } = req.query;
			let data = { name, email, selectedRole };
			if (password) {
				const hashedPassword = await hashPassword(password);
				data = { ...data, password: hashedPassword };
			}
			try {
				await WebUsers.update(data, {
					where: {
						id: updateId,
					},
				});
				res.json({
					success: true,
					message: "User updated successfully!",
				});
			} catch (error) {
				res.json({
					success: false,
					message: "User not Updated!",
					error,
				});
			}
			break;
		case "DELETE":
			const { deleteId } = req.query;
			try {
				await WebUsers.destroy({
					where: {
						id: deleteId,
					},
				});
				res.json({
					success: true,
					message: "User deleted successfully!",
				});
			} catch (error) {
				res.json({
					success: false,
					message: "User not Deleted!",
					error,
				});
			}
			break;
		default:
			break;
	}
}
