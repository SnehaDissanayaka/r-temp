import { query } from "../config/db.js";
import asyncHandler from "express-async-handler";

const getTodaypReports = asyncHandler(async () => {
    const sql = "SELECT COUNT(Report_id) FROM report WHERE date = CURRENT_DATE;";
    const result = await query(sql);
    return result.rows;
});

export { getTodaypReports };