import WebCompanies from "@/models/WebCompany";
export default async function handler(req, res) {
	const { method } = req;
	const {
		name,
		note,
		address,
		contact,
		contactPerson,
		fax,
		email,
		gst,
		ntn,
		desc,
	} = req.body;
	switch (method) {
		case "POST":
			const createData = {
				name,
				note,
				address,
				contact,
				contactPerson,
				fax,
				email,
				gst,
				ntn,
				desc,
			};
			try {
				await WebCompanies.create(createData);
				res.json({
					success: true,
					message: "Company added successfully!",
				});
			} catch (error) {
				res.json({
					success: false,
					message: "Company not added!",
					error,
				});
			}
			break;
		case "GET":
			try {
				const result = await WebCompanies.findAll();
				res.json({
					success: true,
					message: "Companies found!",
					data: result,
				});
			} catch (error) {
				res.json({
					success: false,
					message: "Company not found!",
					error,
				});
			}
			break;
		case "PUT":
			const updateData = {
				name,
				note,
				address,
				contact,
				contactPerson,
				fax,
				email,
				gst,
				ntn,
				desc,
			};
			const { updateId } = req.query;
			try {
				await WebCompanies.update(updateData, {
					where: {
						id: updateId,
					},
				});
				res.json({
					success: true,
					message: "Company updated successfully!",
				});
			} catch (error) {
				res.json({
					success: false,
					message: "Company not Updated!",
					error,
				});
			}
			break;
		case "DELETE":
			const { deleteId } = req.query;
			try {
				await WebCompanies.destroy({
					where: {
						id: deleteId,
					},
				});
				res.json({
					success: true,
					message: "Company deleted successfully!",
				});
			} catch (error) {
				res.json({
					success: false,
					message: "Company not Deleted!",
					error,
				});
			}
			break;
		default:
			break;
	}
}
