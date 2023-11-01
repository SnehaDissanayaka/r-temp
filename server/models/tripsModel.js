import { query } from '../config/db.js'
import asyncHandler from 'express-async-handler';

// find badge by id
const addNewType = asyncHandler(async (type) => {
    const sql = 'INSERT INTO trip_type (type_id, name) VALUES ($1, $2)';
    const result = await query(sql, [type.type_id, type.name]);
    // console.log(result);
    return result.rowCount;
})

// get all types
const getAlltypes = asyncHandler(async () => {
    const sql = 'SELECT * FROM trip_type ORDER BY type_id ASC';
    const result = await query(sql);
    // console.log(result.rows);

    return result.rows;
})

// get all badges by user
const editCurrentType = asyncHandler(async (typeID, type) => {
    const sql = 'UPDATE trip_type SET name = $1 WHERE type_id = $2';

    const result = await query(sql, [type.name, typeID]);
    // console.log("came here 2");
    return result.rows;
})

// get last 5 badges by user
const deleteCurrentType = asyncHandler(async (typeID) => {
    const sql = 'DELETE FROM trip_type WHERE type_id = $1';

    const result = await query(sql, [typeID]);

    return result.rows;
}
)

export {
    addNewType,
    getAlltypes,
    editCurrentType,
    deleteCurrentType
}