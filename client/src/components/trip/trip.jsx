import "./trip.scss";
import React, { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Icon from '@mui/material/Icon';
// import AddPlace from './add_dest';

const Trip = () => {
    const [displayOption, setDisplayOption] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [displayedData, setDisplayedData] = useState([]);
    const [editTripType, setEditTripType] = useState(null);
    const [editedName, setEditedName] = useState("");
    const [newType, setNewType] = useState(""); // New type input field
    const [showAddNewType, setShowAddNewType] = useState(false); // Control visibility
    // const [editBadge, setEditBadge] = useState(null); // Track the badge being edited
    const PAGE_SIZE = 7;

    const { data: tripData, isLoading, isError, refetch } = useQuery(
        ["tripData"],
        async () => {
            const response = await makeRequest.get(`/trips/getTripTypes`);
            console.log("Response data:", response.data);
            return response.data;
        }
    );

    const startEditing = (row) => {
        setEditTripType(row.type_id);
        setEditedName(row.name);
    };

    const saveEdit = (row) => {
        try {
            const response = makeRequest.put(`/trips/editType?typeID=${row.type_id}`, {
                name: editedName,
            });

            refetch();

            // Close the edit mode
            setEditTripType(null);

            // console.log("Response data:", response);
        } catch (error) {
            console.log(error);
        }

        setEditTripType(null);
    };

    const cancelEdit = () => {
        setEditTripType(null);
    };

    // const handleSaveNewType = async () => {
    //     try {
    //         const response = await makeRequest.post("/trips/addTripType", {
    //             name: newType,
    //         });

    //         // Trigger a refetch to get the updated data
    //         refetch();

    //         // Close the "Add New Type" section
    //         setShowAddNewType(false);
    //         // Clear the new type input field
    //         setNewType("");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleAddNewType = () => {
        setShowAddNewType(true);
    };

    const handleSaveNewType = async () => {
        try {
            // Generate a 4-digit type_id from the current timestamp
            const currentTimestamp = Date.now();
            const type_id = (currentTimestamp % 10000).toString().padStart(4, '0');

            const response = await makeRequest.post("/trips/addTripType", {
                type_id, // Include the generated type_id
                name: newType,
            });

            // Trigger a refetch to get the updated data
            refetch();

            // Close the "Add New Type" section
            setShowAddNewType(false);
            // Clear the new type input field
            setNewType("");
        } catch (error) {
            console.log(error);
        }
    };


    const handleCancelNewType = () => {
        setShowAddNewType(false);
        // Clear the new type input field
        setNewType("");
    };


    // Calculate the range of rows to display based on the current page
    const startIndex = currentPage * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    useEffect(() => {
        if (tripData) {
            // Append the page data to the displayedData
            setDisplayedData((prevData) => [...tripData.slice(startIndex, endIndex)]);
        }
    }, [tripData, startIndex, endIndex]);

    const totalPages = Math.ceil((tripData?.length || 0) / PAGE_SIZE);

    const handleNextPageClick = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prevPage) => prevPage + 1);
            // Clear displayedData when moving to the next page
            setDisplayedData([]);
        }
    };


    // const handleAddClick = () => {
    //     setDisplayOption(1);
    //     // setEditBadge(null); // Reset the badge being edited
    // };

    // const handleEditBadge = (badge) => {
    //     setDisplayOption(1);
    //     setEditBadge(badge); // Set the badge being edited
    // };


    const handlePlaceAddClick = () => {
        setDisplayOption(1); // Change the display option to 1 when adding a place
    };



    return (
        <div className="badge_main">
            {/* <PersonalizingForm /> */}
            <div className="badge_content">
                <div className="badges">
                    <h2>Trips</h2>
                    <button onClick={handleAddNewType}>Add Trip Type
                        <Icon className="material-icons icon-color">
                            add_circle
                        </Icon></button>
                </div>
                {showAddNewType && (
                    <div className="add_new">
                        <label htmlFor="newType">New Type Name</label>
                        <input
                            type="text"
                            placeholder="New Type Name"
                            value={newType}
                            onChange={(e) => setNewType(e.target.value)}
                        />
                        <button className="save" onClick={handleSaveNewType}>Save</button>
                        <button className="cancel" onClick={handleCancelNewType}>Cancel</button>
                    </div>
                )}
                {displayOption === 1 && (
                    <AddPlace setDisplayOption={setDisplayOption} />
                )}
                <div className="rowb">
                    <table>
                        <thead>
                            <th>Trip Type</th>
                            <th>View Locations</th>
                            <th>Edit</th>
                        </thead>
                        <tbody>
                            {displayedData && displayedData.map((row) => (
                                <tr key={row.type_id}>
                                    <td style={{ width: '400px' }}>
                                        {editTripType === row.type_id ? (
                                            // Render an input field when in edit mode
                                            <input
                                                type="text"
                                                value={editedName}
                                                onChange={(e) => setEditedName(e.target.value)}
                                            />
                                        ) : (
                                            // Render the name when not in edit mode
                                            row.name
                                        )}
                                    </td>
                                    <td style={{ width: '200px' }}>
                                        <span className="material-icons" onClick={() => handleViewplacesClick(row.type_id)}>
                                            visibility
                                        </span>
                                    </td>
                                    <td>
                                        {editTripType === row.type_id ? (
                                            // Render save and cancel buttons when in edit mode
                                            <>
                                                <Icon className="material-icons icon-custom-color" onClick={() => saveEdit(row)}>
                                                    save
                                                </Icon>
                                                <Icon className="material-icons icon-custom-color" onClick={cancelEdit}>
                                                    cancel
                                                </Icon>
                                            </>
                                        ) : (
                                            // Render edit icon when not in edit mode
                                            <Icon className="material-icons icon-custom-color" onClick={() => startEditing(row)}>
                                                edit
                                            </Icon>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        {/* <tbody>
                            {displayedData && displayedData.map((row) => (
                                <tr>

                                    <td style={{ width: '400px' }}>{row.name}</td>

                                    <td style={{ width: '200px' }}>

                                        <span class="material-icons" onClick={() => handleViewplacesClick(row.type_id)}>
                                            visibility
                                        </span>
                                    </td>
                                    <td>
                                        <Icon className="material-icons icon-custom-color" onClick={() => handleEditType(row)}>
                                            edit
                                        </Icon>
                                    </td>
                                </tr>))}
                        </tbody> */}
                    </table>
                    {/* Pagination Controls */}
                    <div className="pagination">
                        <button
                            onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))}
                            disabled={currentPage === 0}
                        >
                            {"<"}
                        </button>
                        <span>Page {currentPage + 1} of {totalPages}</span>
                        <button
                            onClick={handleNextPageClick}
                            disabled={currentPage === totalPages - 1 || isLoading}
                        >
                            {">"}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
    // return (
    //     <div className="trip_main">
    //         <div className="row">
    //             <div className="trip_box">
    //                 <table>
    //                     <tr>
    //                         <th className="tdtype">Trip Type</th>
    //                         <th>Places</th>
    //                         <th className="thact">Action</th>
    //                     </tr>
    //                     <tr>
    //                         <td rowSpan={3}>Camping</td>
    //                         <td>Belihuloya Camping</td>
    //                         <td rowSpan={3} className="thact">
    //                             <span class="material-icons">
    //                                 add
    //                             </span>
    //                         </td>
    //                     </tr>
    //                     <tr>
    //                         <td>Mahagala Campsite</td>
    //                     </tr>
    //                     <tr>
    //                         <td>Wewatenna Camping site</td>
    //                     </tr>
    //                     <tr>
    //                         <td rowSpan={3}>Surfing</td>
    //                         <td>Belihuloya Camping</td>
    //                         <td rowSpan={3} className="thact">
    //                             <span class="material-icons">
    //                                 add
    //                             </span>
    //                         </td>
    //                     </tr>
    //                     <tr>
    //                         <td>Mahagala Campsite</td>
    //                     </tr>
    //                     <tr>
    //                         <td>Wewatenna Camping site</td>
    //                     </tr>
    //                     <tr>
    //                         <td rowSpan={7}>Beaches</td>
    //                         <td>Unawatuna</td>
    //                         <td rowSpan={7} className="thact">
    //                             <span class="material-icons">
    //                                 add
    //                             </span>
    //                         </td>
    //                     </tr>
    //                     <tr>
    //                         <td>Bentota</td>
    //                     </tr>
    //                     <tr>
    //                         <td>Mirissa</td>
    //                     </tr>
    //                     <tr>
    //                         <td>Dickwella</td>
    //                     </tr>
    //                     <tr>
    //                         <td>Weligama</td>
    //                     </tr>
    //                     <tr>
    //                         <td>Galle</td>
    //                     </tr>
    //                     <tr>
    //                         <td>Induruwa</td>
    //                     </tr>
    //                 </table>
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default Trip;
