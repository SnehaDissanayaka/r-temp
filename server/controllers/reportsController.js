import AsyncHandler from "express-async-handler";
import { getTodaypReports } from "../models/reportsModel.js";

const getTodayPReports = AsyncHandler(async (req, res) => {
    const posts = await getTodaypReports();

    if (posts) {
        res.status(200).json(posts);
    } else {
        res.status(404);
        throw new Error("Posts not found");
    }
});

export { getTodayPReports };