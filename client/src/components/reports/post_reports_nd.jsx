// // // import './reports.scss';
// // // import { useState } from 'react';
// // // import { useQuery } from "@tanstack/react-query";
// // // import { makeRequest } from "../../axios";
// // // import Icon from '@mui/material/Icon';
// // // import Reported_post_view from './view_post';

// // // function Post_Report_tnd() {

// // //     const [selectPost, setselectPost] = useState(0);

// // //     const handlepostClick = (report_id) => {
// // //         // console.log(report_id);
// // //         setselectPost(report_id);
// // //     };

// // //     const handleBackToReports = () => {
// // //         setselectPost(0); // Set selectPost to zero to make the table visible
// // //     };

// // //     const PAGE_SIZE = 7; // Number of rows to display per page
// // //     const [currentPage, setCurrentPage] = useState(0);

// // //     const { data: reportsDataPRND, isLoading, isError } = useQuery(
// // //         ["reportsDataPRND"],
// // //         async () => {
// // //             const response = await makeRequest.get(`/reports/postReportsND`);
// // //             return response.data;
// // //         }
// // //     );

// // //     // Calculate the range of rows to display based on the current page
// // //     const startIndex = currentPage * PAGE_SIZE;
// // //     const endIndex = startIndex + PAGE_SIZE;

// // //     // Slice the data array to display only the current page's rows
// // //     const displayedData = reportsDataPRND ? reportsDataPRND.slice(startIndex, endIndex) : [];

// // //     const totalPages = Math.ceil((reportsDataPRND?.length || 0) / PAGE_SIZE);

// // //     // console.log(reportsDataPRND[3].report_id);

// // //     return (
// // //         <div className={`t-div`}>
// // //             {selectPost !== 0 ? (<Reported_post_view selectedPost={selectPost} onBackToReports={handleBackToReports} />) : (
// // //                 <div>
// // //                     <div className={`t-div-topic`}>
// // //                         <p>Post Reports - To Do</p>
// // //                     </div>
// // //                     <table>
// // //                         <thead>
// // //                             <tr>
// // //                                 <th>Poster</th>
// // //                                 <th>Post ID</th>
// // //                                 <th>Report Type</th>
// // //                                 <th>Severity</th>
// // //                                 <th>Remarks</th>
// // //                                 <th>Status</th>
// // //                                 <th>View</th>
// // //                             </tr>
// // //                         </thead>
// // //                         <tbody>
// // //                             {displayedData.slice(0, 4).map((row) => (
// // //                                 <tr key={row.reported_post_id}>
// // //                                     <td>{row.poster_name}</td>
// // //                                     <td>{row.reported_post_id}</td>
// // //                                     <td>{row.type}</td>
// // //                                     <td>
// // //                                         {row.severity === 1 ? "High" : row.severity === 2 ? "Medium" : "Low"}
// // //                                     </td>
// // //                                     <td>{row.content}</td>
// // //                                     <td>
// // //                                         {row.report_status === "ongoing" ? (
// // //                                             <Icon className="material-icons icon-custom-color">
// // //                                                 drafts_rounded
// // //                                             </Icon>
// // //                                         ) : (
// // //                                             <Icon className="material-icons icon-custom-color">
// // //                                                 email_rounded
// // //                                             </Icon>
// // //                                         )}
// // //                                     </td>
// // //                                     <td>
// // //                                         <span className="material-icons" onClick={() => handlepostClick(row.report_id)}> visibility</span>
// // //                                     </td>
// // //                                 </tr>
// // //                             ))}
// // //                         </tbody>
// // //                     </table>
// // //                     {/* Pagination Controls */}
// // //                     <div className="pagination">
// // //                         <button
// // //                             onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))}
// // //                             disabled={currentPage === 0}
// // //                         >
// // //                             {"<"}
// // //                         </button>
// // //                         <span>Page {currentPage + 1} of {totalPages}</span>
// // //                         <button
// // //                             onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))}
// // //                             disabled={currentPage === totalPages - 1 || isLoading}
// // //                         >
// // //                             {">"}
// // //                         </button>
// // //                     </div>
// // //                 </div>)}
// // //         </div >
// // //     );
// // // }

// // // export default Post_Report_tnd;
// // import React, { useState } from 'react';
// // import { useQuery } from "@tanstack/react-query";
// // import { makeRequest } from "../../axios";
// // import Icon from '@mui/material/Icon';
// // import Reported_post_view from './view_post';

// // function Post_Report_tnd() {
// //     const [selectPost, setselectPost] = useState(0);
// //     const [currentPage, setCurrentPage] = useState(0);

// //     const handlepostClick = (report_id) => {
// //         setselectPost(report_id);
// //     };

// //     const handleBackToReports = () => {
// //         setselectPost(0);
// //     };

// //     const PAGE_SIZE = 7;

// //     // Define a queryKey that includes currentPage to make it dynamic
// //     const queryKey = ["reportsDataPRND", currentPage];

// //     // Fetch the data using useQuery and the dynamic queryKey
// //     const { data: reportsDataPRND, isLoading, isError, refetch } = useQuery(
// //         queryKey,
// //         async () => {
// //             const response = await makeRequest.get(`/reports/postReportsND?page=${currentPage + 1}&pageSize=${PAGE_SIZE}`);
// //             return response.data;
// //         }
// //     );

// //     // Calculate the range of rows to display based on the current page
// //     const startIndex = currentPage * PAGE_SIZE;
// //     const endIndex = startIndex + PAGE_SIZE;

// //     // Slice the data array to display only the current page's rows
// //     const displayedData = reportsDataPRND ? reportsDataPRND.slice(startIndex, endIndex) : [];

// //     const totalPages = Math.ceil((reportsDataPRND?.length || 0) / PAGE_SIZE);

// //     // Function to handle next page button click
// //     const handleNextPageClick = () => {
// //         if (currentPage < totalPages - 1) {
// //             setCurrentPage((prevPage) => prevPage + 1);
// //             // Trigger a data reload by calling refetch with the updated queryKey
// //             refetch(queryKey);
// //         }
// //     };

// //     return (
// //         <div className={`t-div`}>
// //             {selectPost !== 0 ? (
// //                 <Reported_post_view selectedPost={selectPost} onBackToReports={handleBackToReports} />
// //             ) : (
// //                 <div>
// //                     <div className={`t-div-topic`}>
// //                         <p>Post Reports - To Do</p>
// //                     </div>
// //                     <table>
// //                         <thead>
// //                             <tr>
// //                                 <th>Report ID</th>
// //                                 <th>Poster</th>
// //                                 <th>Post ID</th>
// //                                 <th>Report Type</th>
// //                                 <th>Severity</th>
// //                                 <th>Remarks</th>
// //                                 <th>Status</th>
// //                                 <th>View</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {displayedData.map((row) => (
// //                                 <tr key={row.reported_post_id}>
// //                                     <td>{row.report_id}</td>
// //                                     <td>{row.poster_name}</td>
// //                                     <td>{row.reported_post_id}</td>
// //                                     <td>{row.type}</td>
// //                                     <td>
// //                                         {row.severity === 1 ? "High" : row.severity === 2 ? "Medium" : "Low"}
// //                                     </td>
// //                                     <td>{row.content}</td>
// //                                     <td>
// //                                         {row.report_status === "ongoing" ? (
// //                                             <Icon className="material-icons icon-custom-color">
// //                                                 drafts_rounded
// //                                             </Icon>
// //                                         ) : (
// //                                             <Icon className="material-icons icon-custom-color">
// //                                                 email_rounded
// //                                             </Icon>
// //                                         )}
// //                                     </td>
// //                                     <td>
// //                                         <span className="material-icons" onClick={() => handlepostClick(row.report_id)}> visibility</span>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                     {/* Pagination Controls */}
// //                     <div className="pagination">
// //                         <button
// //                             onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))}
// //                             disabled={currentPage === 0}
// //                         >
// //                             {"<"}
// //                         </button>
// //                         <span>Page {currentPage + 1} of {totalPages}</span>
// //                         <button
// //                             onClick={handleNextPageClick}
// //                             disabled={currentPage === totalPages - 1 || isLoading}
// //                         >
// //                             {">"}
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}
// //         </div >
// //     );
// // }

// // export default Post_Report_tnd;

// import React, { useState, useEffect } from 'react';
// import { useQuery } from "@tanstack/react-query";
// import { makeRequest } from "../../axios";
// import Icon from '@mui/material/Icon';
// import Reported_post_view from './view_post';

// function Post_Report_tnd() {
//     const [selectPost, setSelectPost] = useState(0);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [displayedData, setDisplayedData] = useState([]);

//     const handlepostClick = (report_id) => {
//         setSelectPost(report_id);
//     };

//     const handleBackToReports = () => {
//         setSelectPost(0);
//     };

//     const PAGE_SIZE = 7;

//     // Define a queryKey that includes currentPage to make it dynamic
//     const queryKey = ["reportsDataPRND", currentPage];

//     // Fetch the data using useQuery and the dynamic queryKey
//     const { data: reportsDataPRND, isLoading, isError, refetch } = useQuery(
//         queryKey,
//         async () => {
//             const response = await makeRequest.get(`/reports/postReportsND?page=${currentPage + 1}&pageSize=${PAGE_SIZE}`);
//             return response.data;
//         }
//     );

//     useEffect(() => {
//         // Reset displayedData when reportsDataPRND changes
//         if (reportsDataPRND) {
//             setDisplayedData([]);
//         }
//     }, [reportsDataPRND]);

//     // Function to handle next page button click
//     const handleNextPageClick = () => {
//         if (currentPage < totalPages - 1) {
//             setCurrentPage((prevPage) => prevPage + 1);
//             // Trigger a data reload by calling refetch with the updated queryKey
//             refetch(queryKey);
//         }
//     };

//     // Calculate the range of rows to display based on the current page
//     const startIndex = currentPage * PAGE_SIZE;
//     const endIndex = startIndex + PAGE_SIZE;

//     // Slice the data array to display only the current page's rows
//     const pageData = reportsDataPRND ? reportsDataPRND.slice(startIndex, endIndex) : [];

//     useEffect(() => {
//         // Add the page data to displayedData
//         setDisplayedData((prevData) => [...prevData, ...pageData]);
//     }, [pageData]);

//     const totalPages = Math.ceil((reportsDataPRND?.length || 0) / PAGE_SIZE);

//     return (
//         <div className={`t-div`}>
//             {selectPost !== 0 ? (
//                 <Reported_post_view selectedPost={selectPost} onBackToReports={handleBackToReports} />
//             ) : (
//                 <div>
//                     <div className={`t-div-topic`}>
//                         <p>Post Reports - To Do</p>
//                     </div>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Report ID</th>
//                                 <th>Poster</th>
//                                 <th>Post ID</th>
//                                 <th>Report Type</th>
//                                 <th>Severity</th>
//                                 <th>Remarks</th>
//                                 <th>Status</th>
//                                 <th>View</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {displayedData.map((row) => (
//                                 <tr key={row.reported_post_id}>
//                                     <td>{row.report_id}</td>
//                                     <td>{row.poster_name}</td>
//                                     <td>{row.reported_post_id}</td>
//                                     <td>{row.type}</td>
//                                     <td>
//                                         {row.severity === 1 ? "High" : row.severity === 2 ? "Medium" : "Low"}
//                                     </td>
//                                     <td>{row.content}</td>
//                                     <td>
//                                         {row.report_status === "ongoing" ? (
//                                             <Icon className="material-icons icon-custom-color">
//                                                 drafts_rounded
//                                             </Icon>
//                                         ) : (
//                                             <Icon className="material-icons icon-custom-color">
//                                                 email_rounded
//                                             </Icon>
//                                         )}
//                                     </td>
//                                     <td>
//                                         <span className="material-icons" onClick={() => handlepostClick(row.report_id)}> visibility</span>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                     {/* Pagination Controls */}
//                     <div className="pagination">
//                         <button
//                             onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))}
//                             disabled={currentPage === 0}
//                         >
//                             {"<"}
//                         </button>
//                         <span>Page {currentPage + 1} of {totalPages}</span>
//                         <button
//                             onClick={handleNextPageClick}
//                             disabled={currentPage === totalPages - 1 || isLoading}
//                         >
//                             {">"}
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Post_Report_tnd;

import React, { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Icon from '@mui/material/Icon';
import Reported_post_view from './view_post';

function Post_Report_tnd() {
    const [selectPost, setSelectPost] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [displayedData, setDisplayedData] = useState([]);
    const PAGE_SIZE = 7;

    const handlepostClick = (report_id) => {
        setSelectPost(report_id);
    };

    const handleBackToReports = () => {
        setSelectPost(0);
    };

    const { data: reportsDataPRND, isLoading, isError, refetch } = useQuery(
        ["reportsDataPRND", currentPage],
        async () => {
            const response = await makeRequest.get(`/reports/postReportsND?page=${currentPage + 1}&pageSize=${PAGE_SIZE}`);
            return response.data;
        }
    );

    // Calculate the range of rows to display based on the current page
    const startIndex = currentPage * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    useEffect(() => {
        if (reportsDataPRND) {
            // Append the page data to the displayedData
            setDisplayedData((prevData) => [...prevData, ...reportsDataPRND.slice(startIndex, endIndex)]);
        }
    }, [reportsDataPRND, startIndex, endIndex]);

    const totalPages = Math.ceil((reportsDataPRND?.length || 0) / PAGE_SIZE);

    const handleNextPageClick = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prevPage) => prevPage + 1);
            // Clear displayedData when moving to the next page
            setDisplayedData([]);
        }
    };

    return (
        <div className={`t-div`}>
            {selectPost !== 0 ? (
                <Reported_post_view selectedPost={selectPost} onBackToReports={handleBackToReports} />
            ) : (
                <div>
                    <div className={`t-div-topic`}>
                        <p>Post Reports - To Do</p>
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
                                <th>Status</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedData.map((row) => (
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
                                        {row.report_status === "ongoing" ? (
                                            <Icon className="material-icons icon-custom-color">
                                                drafts_rounded
                                            </Icon>
                                        ) : (
                                            <Icon className="material-icons icon-custom-color">
                                                email_rounded
                                            </Icon>
                                        )}
                                    </td>
                                    <td>
                                        <span className="material-icons" onClick={() => handlepostClick(row.report_id)}> visibility</span>
                                    </td>
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
                            onClick={handleNextPageClick}
                            disabled={currentPage === totalPages - 1 || isLoading}
                        >
                            {">"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Post_Report_tnd;

