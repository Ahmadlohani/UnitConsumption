import HistoryTable from "@/models/HistoryTable";

export default async function handler(req, res) {
	const { method } = req;
	switch (method) {
		case "GET":
			try {
				const result = await HistoryTable.findAll();
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
