import './reports.scss';
import React, { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Reported_post_done_view from './view_post_done';

import Icon from '@mui/material/Icon';

function Post_Report_td({ postImageDisplayed, setpostImageDisplayed }) {

    const [selectPost, setSelectPost] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [displayedreportsData, setDisplayedData] = useState([]);
    const PAGE_SIZE = 7; // Number of rows to display per page

    const handlepostClick = (report_id) => {
        setSelectPost(report_id);
    };

    const handleBackToReports = () => {
        setSelectPost(0);
        // reload the data
        refetch();
    };

    const { data: reportsData, isLoading, isError, refetch } = useQuery(
        ["reportsData", currentPage],
        async () => {
            const response = await makeRequest.get(`/reports/postReportsD?page=${currentPage + 1}&pageSize=${PAGE_SIZE}`);
            return response.data;
        }
    );

    // Calculate the range of rows to display based on the current page
    const startIndex = currentPage * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    useEffect(() => {
        if (reportsData) {
            // Append the page data to the displayedData
            setDisplayedData((prevData) => [...reportsData.slice(startIndex, endIndex)]);
        }
    }, [reportsData, startIndex, endIndex]);

    // Slice the data array to display only the current page's rows
    // const displayedData = reportsData ? reportsData.slice(startIndex, endIndex) : [];

    const totalPages = Math.ceil((reportsData?.length || 0) / PAGE_SIZE);

    const handleNextPageClick = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prevPage) => prevPage + 1);
            // Clear displayedData when moving to the next page
            setDisplayedData([]);
        }
    };

    return (
        <div className="t-div">
            {selectPost !== 0 ? (
                <Reported_post_done_view selectedPost={selectPost} onBackToReports={handleBackToReports} postImageDisplayed={postImageDisplayed} setpostImageDisplayed={setpostImageDisplayed} />
            ) : (
                <div><div className="t-div-topic">
                    <p>Post Reports - Completed</p>
                </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Report ID</th>
                                <th>Poster</th>
                                <th>Post ID</th>
                                <th>Report Type</th>
                                <th>Severity</th>
                                <th>Remarks</th>
                                <th>View Reported Post</th>
                                <th>Remedy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedreportsData.map((row) => (
                                <tr key={row.reported_post_id}>
                                    <td>{row.report_id}</td>
                                    <td>{row.poster_name}</td>
                                    <td>{row.reported_post_id}</td>
                                    <td>{row.type}</td>
                                    <td>
                                        {row.severity === 1 ? "High" : row.severity === 2 ? "Medium" : "Low"}
                                    </td>
                                    <td>{row.content}</td>
                                    <td>
                                        <span class="material-icons" onClick={() => handlepostClick(row.report_id)}>
                                            visibility
                                        </span>
                                    </td>
                                    <td>{row.remedy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

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
            )}

            {/* // {/* )}  */}
        </div>
    )
}

export default React.memo(Post_Report_td);