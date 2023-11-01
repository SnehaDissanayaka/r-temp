import './adView.scss';
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Picture1 from '../../assets/images/hotel.jpg';

function AdView() {

    const { data: fullAdd } = useQuery(
        ["adFData"],
        async () => {
            const response = await makeRequest.get(`/admin/fullAddDisplay`);
            return response.data;
        }
    );

    /*return(
        <div className="ad_view_main">
            {fullAdd && fullAdd.map((row) => (
            <div className="adview_profile">
                <div className="adview_profile_summary" key={row.id}>
                    <div className="about">
                        <div className="profile_picture">
                            {row.ad_img}
                        </div>
                        <div className='name'>
                            {row.title}
                        </div>
                        <div className='actor'>
                            {row.service_type}
                        </div>
                    </div>
                    <div className="profile_details">
                        <table>
                            <tr>
                                <th>Hotel Name</th>
                                <td>{row.firstname && row.lastname}</td>
                            </tr>
                            <tr>
                                <th>Location</th>
                                <td>{row.location}</td>
                            </tr>
                            <tr>
                                <th>Contact Number</th>
                                <td>{row.contact_no}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{row.email}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="adview_profile_details">
                    <div className="profile_reports">
                        <h1>Topic : {row.title}</h1>
                        <div className="ad_description">
                            {row.description}
                        </div>
                    </div>
                    <div className="review_buttons">
                    <button className="btn btn-primary">Accept and Publish</button>
                    <button className="btn btn-danger">Review and Return</button>
                </div>
                </div>
            </div>
            ))}
        </div>
    );*/

    return(
        <div className="ad_view_main">
            <div className="adview_profile">
                <div className="adview_profile_summary">
                    <div className="about">
                        <div className="profile_picture">
                            <img src= {Picture1} alt="Avatar" />
                        </div>
                        <div className='name'>
                            <h1>Ocean Wave</h1>
                        </div>
                        <div className='actor'>
                            <h3>Hotel</h3>
                        </div>
                    </div>
                    <div className="profile_details">
                        <table>
                            <tr>
                                <th>Hotel Name</th>
                                <td>Ocean Wave</td>
                            </tr>
                            <tr>
                                <th>Location</th>
                                <td>Lake Geneva, Kandy</td>
                            </tr>
                            <tr>
                                <th>Contact Number</th>
                                <td>+94772244456</td>
                            </tr>
                            <tr>
                                <th>Website</th>
                                <td>www.oceanwave.com</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="adview_profile_details">
                    <div className="profile_reports">
                        <h1>Topic : Introducing "Ocean Wave"</h1>
                        <div className="ad_description">
                            <p>🌊 Elegantly appointed waterfront rooms and suites, offering captivating vistas. Plush furnishings for ultimate comfort.</p> 
                            <p>🍽 Indulge in a symphony of flavors with our fusion of local and global cuisines. Culinary artisans craft exquisite dishes.</p> 
                            <p>🌸 Rejuvenate at our waterfront spa, where pampering treatments, massages, and rejuvenating therapies await.</p> 
                            <p>🚣‍♀ Embark on aquatic adventures or stroll through lush gardens, immersing yourself in nature's embrace.</p> 
                            <p>🎊 The ideal venue for celebrations and events. Our meticulous event planning ensures every occasion is extraordinary. </p>
                        </div>
                    </div>
                    <div className="review_buttons">
                    <button className="btn btn-primary">Accept and Publish</button>
                    <button className="btn btn-danger">Review and Return</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default AdView;