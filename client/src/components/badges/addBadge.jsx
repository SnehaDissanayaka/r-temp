import "./badges.scss";
import React, { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Icon from '@mui/material/Icon';

const generateUniqueID = () => {
    const now = new Date();
    const timestamp = now.getTime();
    return parseInt(timestamp.toString().slice(-8), 10);
};

function Addbadge({ onBackToBadges, mode, initialData, onSave }) {

    const handleBackClick = () => {
        onBackToBadges(); // Call the provided function to go back to the table view
    };

    // const [inputs, setInputs] = useState({
    //     badge_id: generateUniqueID(),
    //     badge_name: "",
    //     badge_color: "",
    //     badge_type: "",
    //     badge_constraints: 0,
    //     badge_link: "",
    //     badge_description: ""
    // });

    console.log("initialData:", initialData);

    const isEditMode = mode === 'edit';
    const [inputs, setInputs] = useState({
        badge_id: isEditMode ? initialData.badge_id : generateUniqueID(),
        badge_name: isEditMode ? initialData.badge_name : "",
        badge_color: isEditMode ? initialData.badge_color : "",
        badge_type: isEditMode ? initialData.badge_type : "",
        badge_constraints: isEditMode ? initialData.badge_constraints : 0,
        badge_link: isEditMode ? initialData.badge_img : "",
        badge_description: isEditMode ? initialData.badge_desc : ""
    });



    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const addBadge = async () => {
        console.log("Archiving post with ID:", inputs.badge_type);
        try {
            const response = await makeRequest.post(`/adminbadges/addBadge`, inputs);
            console.log("Response data:", response.data);
            window.alert("Badge added successfully!");

            // Redirect to a different URL
            window.location.href = "/badgespage"; // Replace "/your-new-url" with the URL you want to redirect to
        } catch (error) {
            window.alert("Badge added successfully!");

            window.location.href = "/badgespage"; // Replace "/your-new-url" with the URL you want to redirect to

            console.error("Error archiving Post:", error);
            throw error;
        }


    };

    // console.log("inputs:", inputs);

    const handleSubmit = async () => {
        try {
            if (isEditMode) {
                // Handle editing logic here
                // Example: const response = await makeRequest.put(`/adminbadges/editBadge/${inputs.badge_id}`, inputs);
                const response = await makeRequest.put(`/adminbadges/editBadge/?badgeID=${inputs.badge_id}`, inputs);
                onSave(response.data);

            } else {
                // Handle adding logic here
                console.log("inputs:", inputs);

                const response = await makeRequest.post(`/adminbadges/addBadge`, inputs);
                onSave(response.data);
            }
        } catch (error) {
            console.log("EROOOOOOOOORRR");
            console.error("Error:", error);
            // Handle error as needed
        }
    };

    return (
        <div className="badge_content">
            <div className="add_content">
                <div className="admin_form">
                    <form>
                        <div className="form_title">
                            <h2>{isEditMode ? 'Edit Badge' : 'Add New Badge'}</h2>
                            {/* <h2>Add New Badge</h2> */}
                        </div>
                        <div className="form_row">
                            <div className="row_detail">
                                <label htmlFor="badge_name">Badge Name</label>
                                <input
                                    type="text"
                                    id="badge_name"
                                    name="badge_name"
                                    placeholder="Badge Name"
                                    value={inputs.badge_name}
                                    onChange={handleChange} />
                            </div>
                            <div className="row_detail">
                                <label htmlFor="badge_color">Badge Color</label>
                                <select
                                    id="badge_color"
                                    name="badge_color"
                                    value={inputs.badge_color}
                                    onChange={handleChange}>
                                    <option value="bg-green-1" className="bg-green-1">
                                        Green 1 - #43a047
                                    </option>
                                    <option value="bg-green-2" className="bg-green-2">
                                        Green 2 - #009688
                                    </option>
                                    <option value="bg-green-3" className="bg-green-3">
                                        Green 3 - #8bc34a
                                    </option>
                                    <option value="bg-green-4" className="bg-green-4">
                                        Green 4 - #66bb6a
                                    </option>
                                    <option value="bg-blue-1" className="bg-blue-1">
                                        Blue 1 - #4850b5
                                    </option>
                                    <option value="bg-blue-2" className="bg-blue-2">
                                        Blue 2 - #03a9f4
                                    </option>
                                    <option value="bg-blue-3" className="bg-blue-3">
                                        Blue 3 - #2196f3
                                    </option>
                                    <option value="bg-blue-4" className="bg-blue-4">
                                        Blue 4 - #00acc1
                                    </option>
                                    <option value="bg-blue-5" className="bg-blue-5">
                                        Blue 5 - #8d9eff
                                    </option>
                                    <option value="bg-yellow-1" className="bg-yellow-1">
                                        Yellow 1 - #fbc02d
                                    </option>
                                    <option value="bg-yellow-2" className="bg-yellow-2">
                                        Yellow 2 - #e8a93a
                                    </option>
                                    <option value="bg-yellow-3" className="bg-yellow-3">
                                        Yellow 3 - #ecaa00
                                    </option>
                                    <option value="bg-purple-1" className="bg-purple-1">
                                        Purple 1 - #673ab7
                                    </option>
                                    <option value="bg-purple-2" className="bg-purple-2">
                                        Purple 2 - #9c27b0
                                    </option>
                                    <option value="bg-orange-1" className="bg-orange-1">
                                        Orange 1 - #ef6c00
                                    </option>
                                    <option value="bg-grey-1" className="bg-grey-1">
                                        Grey 1 - #444444
                                    </option>
                                    <option value="bg-grey-2" className="bg-grey-2">
                                        Grey 2 - #C8D2DB
                                    </option>
                                    <option value="bg-red-1" className="bg-red-1">
                                        Red 1 - #850000
                                    </option>
                                    <option value="bg-red-2" className="bg-red-2">
                                        Red 2 - #b04759
                                    </option>
                                    <option value="bg-red-3" className="bg-red-3">
                                        Red 3 - #ad1457
                                    </option>
                                    <option value="bg-silver" className="bg-silver">
                                        Silver - #96a5b3
                                    </option>
                                    <option value="bg-bronze" className="bg-bronze">
                                        Bronze - #988145
                                    </option>
                                    <option value="bg-gold" className="bg-gold">
                                        Gold - #ecaa00
                                    </option>
                                    <option value="bg-platinum" className="bg-platinum">
                                        Platinum - #3b6887
                                    </option>
                                    <option value="bg-soft-blue" className="bg-soft-blue">
                                        Soft Blue - #f3fbfe
                                    </option>
                                    <option value="bg-white" className="bg-white">
                                        White
                                    </option>
                                </select>
                            </div>

                        </div>
                        <div className="form_row">
                            <div className="row_detail">
                                <label htmlFor="badge_description">Description</label>
                                <input
                                    type="text"
                                    id="badge_description"
                                    name="badge_description"
                                    placeholder="Description"
                                    value={inputs.badge_description}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form_row">
                            <div className="row_detail">
                                <label htmlFor="badge_type">Badge Type</label>
                                <select
                                    id="badge_type"
                                    name="badge_type"
                                    value={inputs.badge_type}
                                    onChange={handleChange}>
                                    <option>Achievement</option>
                                    <option>Catagory</option>
                                </select>
                            </div>
                            <div className="row_detail">
                                <label htmlFor="badge_constraints">Badge Constraints</label>
                                <input
                                    type="text"
                                    id="badge_constraints"
                                    name="badge_constraints"
                                    placeholder="Badge Constraints"
                                    value={inputs.badge_constraints}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form_row">
                            <div className="row_detail">
                                <label htmlFor="badge_link">Link to Image</label>
                                <input
                                    type="text"
                                    id="badge_link"
                                    name="badge_link"
                                    placeholder="Link to Image"
                                    value={inputs.badge_link}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form_buttons">
                            <button className="createaccount" type="submit" onClick={handleSubmit} >
                                {isEditMode ? 'Save Changes' : 'Add Badge'}
                            </button>
                            <button className="cancel" onClick={handleBackClick} >Cancel</button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )

};

export default Addbadge;