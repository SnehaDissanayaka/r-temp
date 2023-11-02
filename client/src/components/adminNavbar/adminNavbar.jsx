import React, { useContext } from 'react';
import "./adminNavbar.scss";
import { useNavigate } from 'react-router-dom';
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

import Picture9 from "../../assets/images/profile.png";
import Logout from "../../assets/images/Logout.png";

const AdminNavbar = () => {

    const navigate = useNavigate(); // Initialize useNavigate

    const { currentUser, logout } = useContext(AuthContext);

    // Function for logging out
    const handleLogout = async () => {
        logout();
        navigate("/adminLogin");
    };



    // // In your component or another function
    // useEffect(() => {
    //     handleLogout();
    // }, []);


    return (
        <div className="admin_navbar">
            <div className="left">
                <h1>Roamly</h1>

            </div>
            <div className="right">
                <div className="middle"></div>
                <div className="icons">

                    <div className="profile">
                        <img src={Picture9} alt="loading error" />
                    </div>
                    <p><i onClick={handleLogout} class="fa fa-logout"><img class="logout" src={Logout} /></i></p>

                </div>
            </div>
        </div >
    );
}

export default AdminNavbar;
