import "./badges.scss";
import React, { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Icon from '@mui/material/Icon';
import Addbadge from "./addBadge";


function Badges() {
    const [displayOption, setDisplayOption] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [displayedData, setDisplayedData] = useState([]);
    const [editBadge, setEditBadge] = useState(null); // Track the badge being edited
    const PAGE_SIZE = 7;

    const { data: badgeData, isLoading, isError, refetch } = useQuery(
        ["badgeData"],
        async () => {
            const response = await makeRequest.get(`/adminbadges/getBadges`);
            return response.data;
        }
    );

    // Calculate the range of rows to display based on the current page
    const startIndex = currentPage * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    useEffect(() => {
        if (badgeData) {
            // Append the page data to the displayedData
            setDisplayedData((prevData) => [...badgeData.slice(startIndex, endIndex)]);
        }
    }, [badgeData, startIndex, endIndex]);

    const totalPages = Math.ceil((badgeData?.length || 0) / PAGE_SIZE);

    const handleNextPageClick = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prevPage) => prevPage + 1);
            // Clear displayedData when moving to the next page
            setDisplayedData([]);
        }
    };

    // const handleAddClick = () => {
    //     setDisplayOption(1);
    // };

    const handleAddClick = () => {
        setDisplayOption(1);
        setEditBadge(null); // Reset the badge being edited
    };

    const handleEditBadge = (badge) => {
        setDisplayOption(1);
        setEditBadge(badge); // Set the badge being edited
    };

    const handleBackToBadges = () => {
        setDisplayOption(0);
    };

    const handleDeleteBadge = async (badgeID) => {
        const confirmed = window.confirm("Are you sure you want to delete this badge?");

        if (!confirmed) {
            // User cancelled the deletion, do nothing
            return;
        }

        try {
            const response = await makeRequest.delete(`/adminbadges/deleteBadge?badgeID=${badgeID}`);
            console.log("Response data:", response.data);
            refetch();
            return response.data;
        } catch (error) {
            console.error("Error deleting Badge:", error);
            throw error;
        }
    }


    return (
        <div className="badge_main">
            {displayOption !== 0 ? (
                <Addbadge
                    // onBackToBadges={handleBackToBadges}
                    onBackToBadges={handleBackToBadges}
                    mode={editBadge ? 'edit' : 'add'}
                    initialData={editBadge || null}
                // onSave={handleAddOrEditBadge}
                />) : (
                <div className="badge_content">
                    <div className="badges">
                        <h2>Badges</h2>
                        <button onClick={handleAddClick}>Add Badge
                            <Icon className="material-icons icon-color">
                                add_circle
                            </Icon></button>
                    </div>
                    <div className="rowb">
                        <table>
                            <thead>
                                <th>Badge</th>
                                <th>Badge Name</th>
                                <th>Badge Type</th>
                                <th>Description</th>
                                <th>Constraints</th>
                                <th>Actions</th>
                            </thead>
                            <tbody>
                                {displayedData && displayedData.map((row) => (
                                    <tr>
                                        <td>
                                            <div className="badge-container margin-10">
                                                <div className={`badge-circle ${row.badge_color}`}>
                                                    <div className="circle-content white">
                                                        <img className="badge-img" src={row.badge_img} alt={row.badge_name} />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ width: '200px' }}>{row.badge_name}</td>
                                        <td>{row.badge_type}</td>
                                        <td style={{ width: '300px' }}>{row.badge_desc}</td>
                                        <td>{row.badge_constraint}</td>
                                        <td>
                                            <Icon className="material-icons icon-custom-color" onClick={() => handleEditBadge(row)}>
                                                edit
                                            </Icon>
                                            <Icon className="material-icons icon-custom-color" onClick={() => handleDeleteBadge(row.badge_id)}>
                                                delete
                                            </Icon>
                                        </td>
                                    </tr>))}
                            </tbody>
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
            )}
        </div>
    );
}

export default Badges;
