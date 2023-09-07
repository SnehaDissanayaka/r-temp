import './reports.scss';
import { useState } from 'react';
import Icon from '@mui/material/Icon';

function Post_Report_tnd() {


    return (
        <div className={`t-div`}>
            <div className={`t-div-topic`}>
                <p>Post Reports - To Do</p>
                {/* <span className="material-icons" onClick={toggleExpand}>
                    view_stream
                </span> */}
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Poster</th>
                        <th>Report Type</th>
                        <th>Severity</th>
                        <th>Remarks</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John Dom</td>
                        <td>Violence</td>
                        <td>High</td>
                        <td>Non</td>
                        <td>Unread</td>
                        <td>
                            <span class="material-icons">
                                visibility
                            </span>
                            <Icon className="material-icons icon-custom-color">
                                drafts_rounded
                            </Icon>
                        </td>
                    </tr>
                    <tr>
                        <td>John Dom</td>
                        <td>Violence</td>
                        <td>High</td>
                        <td>Non</td>
                        <td>Unread</td>
                        <td>
                            <span class="material-icons">
                                visibility
                            </span>
                            <Icon className="material-icons icon-custom-color">
                                email_rounded
                            </Icon>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>)
}

export default Post_Report_tnd;