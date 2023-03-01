import WebCustomers from "@/models/WebCustomer";
export default async function handler(req, res) {
	const { method } = req;
	switch (method) {
		case "POST":
			try {
				await WebCustomers.create(req.body);
				res.json({
					success: true,
					message: "Customer added successfully!",
				});
			} catch (error) {
				res.json({
					success: false,
					message: "Customer not added!",
					error,
				});
			}
			break;
		case "GET":
			try {
				const result = await WebCustomers.findAll();
				res.json({
					success: true,
					message: "Customer found!",
					data: result,
				});
			} catch (error) {
				res.json({
					success: false,
					message: "Customer not found!",
					error,
				});
			}
			break;
		case "PUT":
			const { updateId } = req.query;
			try {
				await WebCustomers.update(req.body, {
					where: {
						id: updateId,
					},
				});
				res.json({
					success: true,
					message: "Customer updated successfully!",
				});
			} catch (error) {
				res.json({
					success: false,
					message: "Customer not Updated!",
					error,
				});
			}
			break;
		case "DELETE":
			const { deleteId } = req.query;
			try {
				await WebCustomers.destroy({
					where: {
						id: deleteId,
					},
				});
				res.json({
					success: true,
					message: "Customer deleted successfully!",
				});
			} catch (error) {
				res.json({
					success: false,
					message: "Customer not Deleted!",
					error,
				});
			}
			break;
		default:
			break;
	}
}
