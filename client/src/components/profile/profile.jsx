import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { makeRequest } from "../../axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMutation } from "@tanstack/react-query";
// import DefaultProfilePic from './upload/default-profile.png';
// import DefaultProfilePic from '../../../public/upload/default-profile.png';


// import ProfilePic from '../../../public/upload/default-profile.png';
// import ProfilePic from '../../assets/images/default-profile.png';
import './profile.scss';

function Profile() {
    const [file, setFile] = useState(null);

    const { currentUser, updateUser } = useContext(AuthContext); // Use updateUser to update currentUser

    const [profilePic, setProfilePic] = useState('');
    const [profileNotFound, setProfileNotFound] = useState('');

    const setImageUrl = (currUrl) => {
        return require("../../../public/upload/" + currUrl);
    };

    useEffect(() => {
        if (currentUser && currentUser.profile_pic) {
            setProfilePic(setImageUrl(currentUser.profile_pic));
        }
    }, [currentUser]);

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

    const user_id = currentUser.user_id;

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

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const mutation = useMutation(
        (newCP) => {
            return makeRequest.put("/users/coverpic", newCP);
        },
        {
            onSuccess: () => {
                // setTriggerRefetch(true);
            },
        }
    );

    const handleUpdateCP = async (e) => {
        e.preventDefault();
        let imgUrl = "";
        if (file) imgUrl = await upload();
        mutation.mutate({ user_id, img: imgUrl });
        // setOpenUpdateCP(false);
        setFile(null);
    };



    return (
        <div className="profile_main">
            <div className="update-wrapper">
                <div className="files">
                    <label htmlFor="profile" className="file-label">
                        <div className="file-container">
                            {file ? (
                                <img className="file" alt="" src={URL.createObjectURL(file)} />
                            ) : (
                                <img className="file" alt="" src={profilePic} />
                            )}
                            <CloudUploadIcon className="icon" />
                        </div>
                    </label>
                    <input
                        type="file"
                        id="profile"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>



                <button className="updateDetails" onClick={handleUpdateCP}>
                    Update
                </button>

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
