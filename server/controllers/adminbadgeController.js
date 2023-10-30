import asyncHandler from "express-async-handler";
import {
    addNewBadge,
    getAllbadges,
    editCurrentBadge,
    deleteCurrentBadge,
} from "../models/adminbadgeModel.js";

const allBadges = asyncHandler(async (req, res) => {
    const badges = await getAllbadges();

    if (badges.length > 0) {
        res.status(200).json(badges);
    } else {
        res.status(404);
        throw new Error("Badges not found");
    }
});


const addBadge = asyncHandler(async (req, res) => {
    // const { email, password } = req.body;
    // console.log(req.body);

    // const badge = await addNewBadge(req.body);

    // if (badge.rowCount > 0) {
    //     res.status(200).json(badge);
    // } else {
    //     res.status(404);
    //     throw new Error("Badge Not Added");
    // }
    try {
        // Logging: Log the request body to inspect the data being received.
        console.log('Request Body:', req.body);

        const badge = await addNewBadge(req.body);

        if (badge > 0) {
            res.status(200).json(badge);
        } else {
            // Logging: Log an error message for debugging purposes.
            console.error('Badge Not Added');
            res.status(404).json({ error: 'Badge Not Added' });
        }
    } catch (error) {
        // Logging: Log any unhandled errors.
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const editBadge = asyncHandler(async (req, res) => {
    const badge = await editCurrentBadge(req.query.badgeID, req.body);

    if (badge) {
        res.status(200).json(badge);
    } else {
        res.status(404);
        throw new Error("Badges not found");
    }
});

const deleteBadge = asyncHandler(async (req, res) => {
    const badge = await deleteCurrentBadge(req.query.badgeID);

    if (badge) {
        res.status(200).json(badge);
    } else {
        res.status(404);
        throw new Error("Badges not found");
    }
}
);

export { allBadges, addBadge, editBadge, deleteBadge };
