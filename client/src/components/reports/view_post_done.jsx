import React, { useState, useEffect } from 'react'; // Import React if not already imported
import './reports.scss';
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Line from './../../assets/images/Line1.png';
import LineV from './../../assets/images/LineV.png';

function Reported_post_done_view({ selectedPost, onBackToReports, postImageDisplayed, setpostImageDisplayed }) {
    const handleBackClick = () => {
        onBackToReports();
    };

    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    // const { setpostImageDisplayed } = props;


    const viewImage = (image) => {

        setpostImageDisplayed(image);
    }




    useEffect(() => {

    }, [isUpdatingStatus]);

    useEffect(() => {
    }, [isUpdated]);

    const { data: PostreportData, isLoading, isError } = useQuery(
        ["PostreportData"],
        async () => {
            try {
                const response = await makeRequest.get(`/reports/postReportDetails?selectedPost=${selectedPost}`);
                return response.data;
            } catch (error) {
                console.error("Error fetching PostreportData:", error);
                throw error;
            }
        }
    );

    // console.log(PostreportData);

    const obh = PostreportData && PostreportData[0];


    const { data: reportPostData, isLoadingPost, isErrorPost } = useQuery(
        ["reportsDatann"],
        async () => {
            const response = await makeRequest.get(`/reports/postDetails?selectedPostID=${obh.post_id}`);
            return response.data;
        }
    );

    const { data: AllreportsData, isLoadingPost1, isErrorPost1 } = useQuery(
        ["AllreportsData"],
        async () => {
            const response = await makeRequest.get(`/reports/allReports?selectedPostID=${obh.post_id}`);
            return response.data;
        }
    );

    const { data: AllreportsCount, isLoadingPost2, isErrorPost2 } = useQuery(
        ["AllreportsCount"],
        async () => {
            const response = await makeRequest.get(`/reports/allReportCount?selectedPostID=${obh.post_id}`);
            return response.data;
        }
    );

    // Check if any data is still loading
    if (isLoading || isLoadingPost || isLoadingPost1 || isLoadingPost2) {
        return <div>Loading...</div>;
    }

    return (
        <div className='r_post_view'>
            <div className="report_title">
                <div>
                    <h2>Post Report - Report ID : {selectedPost}</h2>
                    {/* <p>{PostreportData ? (PostreportData[0].report_status === 'unread' ? "Unread Report" : "Ongoing Report") : "Loading..."}</p> */}
                </div>
                <button onClick={handleBackClick}>Back to Reports</button>
            </div>
            <img src={Line} alt="line" className='line' />
            <div className="report_body">
                <div className='content'>
                    <h4>Report Details</h4>
                    <p>
                        <span>Reported On :</span> {PostreportData ? PostreportData[0].reported_date : "Loading..."}
                    </p>
                    <p>
                        <span>Report Type :</span> {PostreportData ? PostreportData[0].type : "Loading..."}
                    </p>
                    <p>
                        <span>Severity :</span> {PostreportData ? (PostreportData[0].severity == "1" ? "High" : (PostreportData[0].severity == "2" ? "moderate" : "Low")) : "Loading..."}
                    </p>
                    <p>
                        <span>Remarks :</span> {PostreportData ? PostreportData[0].content : "Loading..."}
                    </p>
                    <h4>Post Details</h4>
                    <p>
                        <span>Post ID :</span> {PostreportData ? PostreportData[0].post_id : "Loading..."}</p>
                    <p>
                        <span>Post Status :</span> {PostreportData ? (PostreportData[0].archived == true ? "Post Archived" : "Currently Displaying") : "Loading..."}
                    </p>
                    <p>
                        <span>Poster User ID :</span> {PostreportData ? PostreportData[0].user_id : "Loading..."}
                    </p>
                    <p>
                        <span>Posted By :</span> {PostreportData ? PostreportData[0].firstname : "Loading..."} {PostreportData ? PostreportData[0].lastname : "Loading..."}
                    </p>
                    <p>
                        <span>Posted On : </span>{PostreportData ? PostreportData[0].created_at : "Loading..."}
                    </p>
                    <p className="post-content">
                        <span>Post Text :</span>
                        <textarea disabled>{PostreportData ? PostreportData[0].content : "Loading..."}</textarea>
                    </p>

                    <p><span>Post Image :  </span> <span className="material-icons" onClick={() => viewImage(PostreportData[0].image)}> visibility</span> </p>
                    {/* <p>Image Here</p> */}
                    <p><span>Likes : </span>{reportPostData ? reportPostData[0].like_count : "Loading..."}</p>
                    <p><span>Comments : </span>{reportPostData ? reportPostData[0].comment_count : "Loading..."}</p>
                </div>
                <img src={LineV} alt="line" className='lineV' />
                <div className='all-reports'>
                    <h4>Other Reports for the Post</h4>
                    <p>Total : {AllreportsCount ? AllreportsCount[0].report_count : "Loading"}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Report ID</th>
                                <th>Report Type</th>
                                <th>Severity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AllreportsData && AllreportsData.map((row) => (
                                <tr key={row.report_id}>
                                    <td>{row.report_id}</td>
                                    <td>{row.type}</td>
                                    <td>
                                        {row.severity === 1 ? "High" : row.severity === 2 ? "Medium" : "Low"}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default Reported_post_done_view;
