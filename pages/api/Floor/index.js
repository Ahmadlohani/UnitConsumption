import Floor from "@/models/Floor";
export default async function handler(req, res) {
	const { method } = req;
	const { name, link } = req.body;
	switch (method) {
		case "POST":
			const table = {
				HistoryTableId: link,
				FloorName: name,
			};
			try {
				await Floor.create(table);
				res.json({
					success: true,
					message: "Floor added successfully!",
				});
			} catch (error) {
				res.json({
					success: false,
					message: "Floor not added!",
					error,
				});
			}
			break;
		case "GET":
			try {
				const result = await Floor.findAll();
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
