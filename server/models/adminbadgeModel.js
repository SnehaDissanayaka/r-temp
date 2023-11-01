import { query } from '../config/db.js'
import asyncHandler from 'express-async-handler';

// find badge by id
const addNewBadge = asyncHandler(async (badge) => {
    const sql = 'INSERT INTO badge_details (badge_id, badge_name, badge_desc, badge_img, badge_color, badge_type, badge_constraint) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const result = await query(sql, [badge.badge_id, badge.badge_name, badge.badge_description, badge.badge_link, badge.badge_color, badge.badge_type, badge.badge_constraints]);
    // console.log(result);
    return result.rowCount;
})

// get all badges
const getAllbadges = asyncHandler(async () => {
    const sql = 'SELECT * FROM badge_details';
    const result = await query(sql);
    return result.rows;
})

// get all badges by user
const editCurrentBadge = asyncHandler(async (badgeID, badge) => {
    const sql = 'UPDATE badge_details SET badge_name = $1, badge_desc = $2, badge_img = $3, badge_color = $4, badge_type = $5, badge_constraint = $6 WHERE badge_id = $7';

    const result = await query(sql, [badge.badge_name, badge.badge_description, badge.badge_link, badge.badge_color, badge.badge_type, badge.badge_constraints, badgeID]);

    return result.rows;
})

// get last 5 badges by user
const deleteCurrentBadge = asyncHandler(async (badgeID) => {
    const sql = 'DELETE FROM badge_details WHERE badge_id = $1';

    const result = await query(sql, [badgeID]);

    return result.rows;
}
)

export {
    addNewBadge,
    getAllbadges,
    editCurrentBadge,
    deleteCurrentBadge
}