import { query } from '../config/db.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

// find user is exists by email
const isUserExists = asyncHandler(async (email) => {
    const sql = 'SELECT * FROM admin_user WHERE email = $1';
    const result = await query(sql, [email]);

    return result.rowCount > 0;
});

// find user is verified by email
const isUserVerified = asyncHandler(async (email) => {
    const sql = 'SELECT * FROM admin_user WHERE email = $1';
    const result = await query(sql, [email]);

    return result.rowCount > 0;
});

// find user is exists by user id
const isUserExistsByID = asyncHandler(async (id) => {
    const sql = 'SELECT * FROM admin_user WHERE admin_id = $1';
    const result = await query(sql, [id]);

    return result.rowCount > 0;
});

// find user by email
const findUserByEmail = asyncHandler(async (email) => {
    const sql = 'SELECT * FROM admin_user WHERE email = $1';
    const result = await query(sql, [email]);

    return result.rows[0];
});

// find user by ID
const findUserByID = asyncHandler(async (id) => {
    const sql = 'SELECT admin_id, firstname, lastname, email, contact_no,  admin_img, gender FROM admin_user WHERE admin_id = $1';
    const result = await query(sql, [id]);

    return result.rows[0];
});

// authenticate user
const authUser = asyncHandler(async (email, password) => {
    const sql = 'SELECT * FROM admin_user WHERE email = $1';
    const result = await query(sql, [email]);

    if (result.rowCount > 0) {
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return user;
        } else {
            return false;
        }
    } else {
        return false;
    }
});

// register user
const registerUsers = asyncHandler(async (firstname, lastname, email, password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    function generateRandomUserID() {
        return Math.floor(Math.random() * 90000) + 10000;
    }
    let randomUserID = generateRandomUserID();

    while (!isUserExistsByID(randomUserID)) {
        randomUserID = generateRandomUserID();
    }

    const sql = 'INSERT INTO users (firstname, lastname, user_id, email, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING firstname, lastname, user_id, email';
    const result = await query(sql, [firstname, lastname, randomUserID, email, hashedPassword]);

    return result;
});


const updateAdminProfile = async (userID, updatedInfo) => {
    // Construct a dynamic SQL query to update the user's profile
    const sql = `UPDATE admin_user SET 
                firstname = $1,
                lastname = $2,
                
                contact_no = $3,
                gender = $4
                WHERE admin_id = $5
                RETURNING *`;

    const { firstname, lastname, contact_no, gender } = updatedInfo;

    // Execute the SQL query with the updated user information and user ID
    const result = await query(sql, [firstname, lastname, contact_no, gender, userID]);

    if (result.rowCount > 0) {
        return result.rows[0]; // Return the updated user profile
    } else {
        return null; // No user was updated, handle accordingly in the controller
    }
};

const saveProfilePic = asyncHandler(async (user_id, img) => {

    const sql = 'UPDATE admin_user SET admin_img = $2 WHERE admin_id = $1 RETURNING admin_id';
    const result = await query(sql, [user_id, img]);
    return result;
});


export {
    isUserExists,
    registerUsers,
    authUser,
    findUserByEmail,
    findUserByID,
    isUserVerified,
    updateAdminProfile,
    saveProfilePic
};