import './reports.scss';
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Icon from '@mui/material/Icon';

function User_Report_td() {

    const PAGE_SIZE = 7; // Number of rows to display per page
    const [currentPage, setCurrentPage] = useState(0);

    const { data: reportsData, isLoading, isError } = useQuery(
        ["reportsData"],
        async () => {
            const response = await makeRequest.get(`/reports/userReportsD`);
            return response.data;
        }
    );

    // Calculate the range of rows to display based on the current page
    const startIndex = currentPage * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    // Slice the data array to display only the current page's rows
    const displayedData = reportsData ? reportsData.slice(startIndex, endIndex) : [];

    const totalPages = Math.ceil((reportsData?.length || 0) / PAGE_SIZE);

    return (
        <div className="t-div">
            <div className="t-div-topic">
                <p>User Reports - Completed</p>

            </div>
            <table>
                <thead>
                    <tr>
                        <th>Reported User</th>
                        <th>User ID</th>
                        <th>Report Type</th>
                        <th>Severity</th>
                        <th>Remarks</th>
                        <th>View</th>
                        <th>Remedy</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Set rows from data returned on reportsData */}
                    {reportsData && reportsData.map((row) => (
                        <tr key={row.id}>
                            <td>{row.poster_name}</td>
                            <td>{row.reported_user_id}</td>
                            <td>{row.type}</td>
                            <td>
                                {row.severity === 1 ? "High" : row.severity === 2 ? "Medium" : "Low"}
                            </td>
                            <td>{row.content}</td>
                            <td>
                                <span class="material-icons">
                                    visibility
                                </span>
                            </td>
                            <td>{row.remedy}</td>
                        </tr>
                    ))}



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
                    onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))}
                    disabled={currentPage === totalPages - 1 || isLoading}
                >
                    {">"}
                </button>
            </div>

            {/* )} */}
        </div>)
}

export default User_Report_td;