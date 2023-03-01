import { comparePassword } from "@/lib/helper/auth";
import jwt from "jsonwebtoken";
import WebUsers from "@/models/WebUser";
export default async function handler(req, res) {
	const { method } = req;
	const { email, password, selectedRole } = req.body;
	switch (method) {
		case "POST":
			const user = await WebUsers.findOne({
				where: {
					email,
				},
			});

			if (user) {
				if (selectedRole === user.selectedRole) {
					const psw = await comparePassword(
						password,
						user.password
					);
					if (!psw) {
						return res.json({
							success: false,
							message: "Password does not match",
							error: "Password does not match",
						});
					} else {
						const token = jwt.sign(
							{ id: user.id },
							process.env.JWT_SECRET,
							{
								expiresIn: "7d",
							}
						);
						user.password = undefined;
						res.json({
							success: true,
							message: "Login Success",
							data: [token, user],
						});
					}
				} else {
					return res.json({
						success: false,
						message: "User not found with this role",
						error: "User not found with this role",
					});
				}
			} else {
				return res.json({
					success: false,
					message: "User not found",
					error: "User not found",
				});
			}
			break;
		default:
			break;
	}
}
