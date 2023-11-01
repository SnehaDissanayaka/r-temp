import asyncHandler from "express-async-handler";
import {
    addNewType,
    getAlltypes,
    editCurrentType,
    deleteCurrentType,
} from "../models/tripsModel.js";

const allTypes = asyncHandler(async (req, res) => {
    const types = await getAlltypes();

    if (types.length > 0) {
        // console.log(types);
        res.status(200).json(types);
    } else {
        res.status(404);
        throw new Error("Types not found");
    }
});


const addType = asyncHandler(async (req, res) => {
    // const { email, password } = req.body;
    // console.log(req.body);

    // const badge = await addNewType(req.body);

    // if (badge.rowCount > 0) {
    //     res.status(200).json(badge);
    // } else {
    //     res.status(404);
    //     throw new Error("Type Not Added");
    // }
    try {
        // Logging: Log the request body to inspect the data being received.
        console.log('Request Body:', req.body);

        const type = await addNewType(req.body);

        if (type > 0) {
            res.status(200).json(type);
        } else {
            // Logging: Log an error message for debugging purposes.
            console.error('Type Not Added');
            res.status(404).json({ error: 'Type Not Added' });
        }
    } catch (error) {
        // Logging: Log any unhandled errors.
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const editType = asyncHandler(async (req, res) => {

    const { typeID } = req.query;
    const type = await editCurrentType(typeID, req.body);


    if (type) {
        res.status(200).json(type);
    } else {
        res.status(404);
        throw new Error("Type not found");
    }
});

const deleteType = asyncHandler(async (req, res) => {
    const type = await deleteCurrentType(req.query.typeID);

    if (type) {
        res.status(200).json(type);
    } else {
        res.status(404);
        throw new Error("Types not found");
    }
}
);

export { allTypes, addType, editType, deleteType };
