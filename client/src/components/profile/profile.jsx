import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { makeRequest } from "../../axios";
import ProfilePic from '../../assets/images/profile.jpg';
import './profile.scss';

function Profile() {
    // const { currentUser } = useContext(AuthContext);

    // const [isEditing, setIsEditing] = useState(false);
    // const [editedInfo, setEditedInfo] = useState({
    //     firstname: currentUser.firstname,
    //     lastname: currentUser.lastname,
    //     email: currentUser.email,
    //     contact_no: currentUser.contact_no,
    //     gender: currentUser.gender,
    // });

    // const handleEditClick = () => {
    //     setIsEditing(true);
    // };

    // const handleSaveClick = async () => {
    //     try {
    //         const response = await makeRequest.put(`/users/updateUser?userID=${currentUser.user_id}`, editedInfo);

    //         if (response.data) {
    //             setIsEditing(false);
    //         }
    //     } catch (error) {
    //         console.error("Error updating user information:", error);
    //     }
    // };

    const { currentUser, updateUser } = useContext(AuthContext); // Use updateUser to update currentUser

    const [isEditing, setIsEditing] = useState(false);
    const [editedInfo, setEditedInfo] = useState({
        firstname: currentUser.firstname,
        lastname: currentUser.lastname,
        // email: currentUser.email,
        contact_no: currentUser.contact_no,
        gender: currentUser.gender,
    });

    const initialInfo = { ...editedInfo };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const response = await makeRequest.put(`/users/updateUser?userID=${currentUser.user_id}`, editedInfo);

            if (response.data) {
                setIsEditing(false);
                // Update the currentUser in the context with the new data
                updateUser({ ...currentUser, ...editedInfo });
            }
        } catch (error) {
            console.error("Error updating user information:", error);
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        // Reset editedInfo to the initial state when canceling
        setEditedInfo(initialInfo);
    };

    return (
        <div className="profile_main">
            <div className="profile">
                <div className="profile_picture">
                    <img src={ProfilePic} alt="Avatar" />
                </div>
                <div className='name'>
                    <h1>{currentUser.firstname} {currentUser.lastname}</h1>
                </div>
                <div className='actor'>
                    <h3>{currentUser.email}</h3>
                </div>
            </div>
            <div className="settings">
                <table>
                    <tbody>
                        <tr>
                            <th>Admin ID</th>
                            <td>{currentUser.user_id}</td>
                        </tr>
                        <tr>
                            <th>First Name</th>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedInfo.firstname}
                                        onChange={(e) => setEditedInfo({ ...editedInfo, firstname: e.target.value })}
                                    />
                                ) : (
                                    currentUser.firstname
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Last Name</th>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedInfo.lastname}
                                        onChange={(e) => setEditedInfo({ ...editedInfo, lastname: e.target.value })}
                                    />
                                ) : (
                                    currentUser.lastname
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Phone Number</th>
                            <td>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editedInfo.contact_no}
                                        onChange={(e) => setEditedInfo({ ...editedInfo, contact_no: e.target.value })}
                                    />
                                ) : (
                                    currentUser.contact_no
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>Gender</th>
                            <td>
                                {isEditing ? (
                                    <select
                                        name="gender"
                                        id="gender"
                                        value={editedInfo.gender}
                                        onChange={(e) => setEditedInfo({ ...editedInfo, gender: e.target.value })}
                                    >
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                    </select>
                                ) : (
                                    currentUser.gender
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
                {isEditing ? (
                    <div className='buttons'>
                        <button onClick={handleSaveClick} className="save">Save</button>
                        <button onClick={handleCancelClick} className="cancel">Cancel</button>
                    </div>
                ) : (
                    <button onClick={handleEditClick} className="edit">Edit Profile</button>
                )}
            </div>
        </div>
    );
}

export default Profile;
