import { query } from "../config/db.js";
import asyncHandler from "express-async-handler";

const getAdsRequested = asyncHandler(async () => {
    const sql = "SELECT COUNT(ad_id) FROM advertisement WHERE created_at = CURRENT_DATE;";
    const result = await query(sql);
    return result.rows;
});

const getReportRequested = asyncHandler(async () => {
    const sql = "SELECT COUNT(report_id) FROM report WHERE date = CURRENT_DATE AND reported_user_id IS NOT NULL;";
    const result = await query(sql);
    return result.rows;
});

const getPostRequested = asyncHandler(async () => {
    const sql = "SELECT COUNT(report_id) FROM report WHERE date = CURRENT_DATE AND reported_post_id IS NOT NULL;";
    const result = await query(sql);
    return result.rows;
});

// View Admins
const getUadminD = asyncHandler(async () => {
    const sql = "SELECT * FROM admin_user";
    const result = await query(sql);
    return result.rows;
});

// View Travellers
const getTD = asyncHandler(async () => {
    const sql = "SELECT * FROM users WHERE user_type = 'Traveller'";
    const result = await query(sql);
    return result.rows;
});

// View Guides
const getGD = asyncHandler(async () => {
    const sql = "SELECT * FROM users WHERE user_type = 'Guide'";
    const result = await query(sql);
    return result.rows;
});

// View Taxis
const getTaxD = asyncHandler(async () => {
    const sql = "SELECT * FROM users WHERE user_type = 'Taxi'";
    const result = await query(sql);
    return result.rows;
});

// View Hotels
const getHD = asyncHandler(async () => {
    const sql = "SELECT * FROM users WHERE user_type = 'Hotel'";
    const result = await query(sql);
    return result.rows;
});

// View Other Services
const getOtherSD = asyncHandler(async () => {
    const sql = "SELECT * FROM service_provider";
    const result = await query(sql);
    return result.rows;
});

const getAdsSubmitted = asyncHandler(async () => {
    const sql = "SELECT COUNT(ad_id) FROM advertisement WHERE status = 'submitted';";
    const result = await query(sql);
    return result.rows;
});

const getAdsPublished = asyncHandler(async () => {
    const sql = "SELECT COUNT(ad_id) FROM advertisement WHERE status = 'published';";
    const result = await query(sql);
    return result.rows;
});

const getAdsReturned = asyncHandler(async () => {
    const sql = "SELECT COUNT(ad_id) FROM advertisement WHERE status = 'returned';";
    const result = await query(sql);
    return result.rows;
});

const getAdvD = asyncHandler(async () => {
    const sql = "SELECT * FROM advertisement;";
    const result = await query(sql);
    return result.rows;
});

const getAdvFD = asyncHandler(async () => {
    const sql = "SELECT advertisement.*,  FROM advertisement;";
    const result = await query(sql);
    return result.rows;
});

const saveAdmin = asyncHandler(async (firstname, lastname, email, contact_no, gender, username, password) => {

    // Retrieve the current maximum admin_id from the database
    const getMaxAdminIdSql = "SELECT MAX(admin_id) FROM admin_user";
    const maxAdminIdResult = await query(getMaxAdminIdSql);
    
    // Calculate the new admin_id by adding 1 to the current maximum
    const currentMaxAdminId = maxAdminIdResult.rows[0].max || 0; // Default to 0 if there are no existing admins
    const admin_id = currentMaxAdminId + 1;

    // Insert the new admin with the calculated admin_id
    const sql =
        "INSERT INTO admin_user (admin_id, firstname, lastname, email, contact_no, gender, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
    const result = await query(sql, [
        admin_id,
        firstname,
        lastname,
        email,
        contact_no,
        gender,
        username,
        password,
    ]);

    return result;
});

const getTraMonthC = asyncHandler(async () => {
    const sql = "SELECT COUNT(*) FROM users WHERE user_type = 'Traveller' ;";
    const result = await query(sql);
    return result.rows;
});

const getCreTable = asyncHandler(async () => {
    //const sql = "SELECT badges.*, users.firstname, users.profile_pic, badge_details.badge_img FROM badges INNER JOIN users ON users.user_id = badges.user_id INNER JOIN badge_details ON badges.badge_id = badge_details.badge_id";
    //const sql = "SELECT badges.*, users.firstname, users.profile_pic, badge_details.badge_img, badge_counts.badge_count FROM badges INNER JOIN users ON users.user_id = badges.user_id INNER JOIN badge_details ON badges.badge_id = badge_details.badge_id INNER JOIN ( SELECT users.user_id, COUNT(badges.badge_id) AS badge_count FROM badges INNER JOIN users ON users.user_id = badges.user_id GROUP BY users.user_id ) AS badge_counts ON users.user_id = badge_counts.user_id ORDER BY badge_counts.badge_count DESC";
    const sql = `SELECT badges.*, users.firstname, users.profile_pic, badge_details.badge_img FROM badges INNER JOIN users ON users.user_id = badges.user_id INNER JOIN badge_details ON badges.badge_id = badge_details.badge_id ORDER BY badges.date_column ASC; -- Replace "date_column" with the actual date column name`;
    const result = await query(sql);
    return result.rows;
});

export { getAdsRequested, getReportRequested, getPostRequested, getUadminD, getAdsSubmitted, getAdsPublished, getAdsReturned, getAdvD, getAdvFD, getTD, getGD, getTaxD, getHD, getOtherSD, saveAdmin, getTraMonthC, getCreTable};