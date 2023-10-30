import './profile.scss';
import react, { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import ProfilePic from '../../assets/images/profile.jpg';

function Profile() {
    const { currentUser } = useContext(AuthContext);
    console.log("Current user:", currentUser);

    const [isEditing, setIsEditing] = useState(false);
    const [editedField, setEditedField] = useState(null);
    const [editedInfo, setEditedInfo] = useState({
        firstname: currentUser.firstname,
        lastname: currentUser.lastname,
        email: currentUser.email,
        contact_no: currentUser.contact_no,
        gender: currentUser.gender,
    });

    const handleEditClick = (field) => {
        setIsEditing(true);
        setEditedField(field);
    };

    const handleSaveClick = async () => {
        try {
            // Handle saving the edited data for the current field
            const response = await makeRequest.put(`/users/updateUser?userID=${currentUser.user_id}`, {
                [editedField]: editedInfo[editedField],
            });

            // Check if the update was successful in the response
            if (response.data) {
                // Update the UI with the saved data
                setIsEditing(false);
                setEditedField(null);
            }
        } catch (error) {
            console.error("Error updating user information:", error);
            // Handle the error as needed
        }
    };


    // get current user details
    // const { data: currentUserData, isLoading, isError } = useQuery(
    //     ["currentUserData"],
    //     async () => {
    //         try {
    //             const response = await makeRequest.get(`/users/getUser?userID=${currentUser.user_id}`);
    //             return response.data;
    //         } catch (error) {
    //             console.error("Error fetching currentUserData:", error);
    //             throw error;
    //         }
    //     }

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

                {/* <table>
                    <tr>
                        <th>Admin ID</th>
                        <td>{currentUser.user_id}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>User Name</th>
                        <td>
                            {editedField === "name" ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editedInfo.firstname}
                                        onChange={(e) => setEditedInfo({ ...editedInfo, firstname: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        value={editedInfo.lastname}
                                        onChange={(e) => setEditedInfo({ ...editedInfo, lastname: e.target.value })}
                                    />
                                </div>
                            ) : (
                                `${currentUser.firstname} ${currentUser.lastname}`
                            )}
                        </td>
                        <td>
                            {editedField !== "name" && (
                                <span className="material-icons" onClick={() => handleEditClick("name")}>
                                    edit
                                </span>
                            )}
                            {editedField === "name" && (
                                <button onClick={handleSaveClick}>Save</button>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>
                            {editedField === "email" ? (
                                <input
                                    type="text"
                                    value={editedInfo.email}
                                    onChange={(e) => setEditedInfo({ ...editedInfo, email: e.target.value })}
                                />
                            ) : (
                                currentUser.email
                            )}
                        </td>
                        <td>
                            {editedField !== "email" && (
                                <span className="material-icons" onClick={() => handleEditClick("email")}>
                                    edit
                                </span>
                            )}
                            {editedField === "email" && (
                                <button onClick={handleSaveClick}>Save</button>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Phone Number</th>
                        <td>
                            {editedField === "contact_no" ? (
                                <input
                                    type="text"
                                    value={editedInfo.contact_no}
                                    onChange={(e) => setEditedInfo({ ...editedInfo, contact_no: e.target.value })}
                                />
                            ) : (
                                `0${currentUser.contact_no}`
                            )}
                        </td>
                        <td>
                            {editedField !== "contact_no" && (
                                <span className="material-icons" onClick={() => handleEditClick("contact_no")}>
                                    edit
                                </span>
                            )}
                            {editedField === "contact_no" && (
                                <button onClick={handleSaveClick}>Save</button>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Gender</th>
                        <td>
                            {editedField === "gender" ? (
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
                        <td>
                            {editedField !== "gender" && (
                                <span className="material-icons" onClick={() => handleEditClick("gender")}>
                                    edit
                                </span>
                            )}
                            {editedField === "gender" && (
                                <button onClick={handleSaveClick}>Save</button>
                            )}
                        </td>
                    </tr>
                </table> */}

                <table>
                    <tr>
                        <th>Admin ID</th>
                        <td>{currentUser.user_id}</td>
                        <td></td>
                    </tr>

                    <tr>
                        <th>First Name</th>
                        <td>
                            {editedField === "firstname" ? (
                                <input
                                    type="text"
                                    value={editedInfo.firstname}
                                    onChange={(e) => setEditedInfo({ ...editedInfo, firstname: e.target.value })}
                                />
                            ) : (
                                currentUser.firstname
                            )}
                        </td>
                        <td>
                            {editedField !== "firstname" && (
                                <span className="material-icons" onClick={() => handleEditClick("firstname")}>
                                    edit
                                </span>
                            )}
                            {editedField === "firstname" && (
                                <button onClick={handleSaveClick}>Save</button>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Last Name</th>
                        <td>
                            {editedField === "lastname" ? (
                                <input
                                    type="text"
                                    value={editedInfo.lastname}
                                    onChange={(e) => setEditedInfo({ ...editedInfo, lastname: e.target.value })}
                                />
                            ) : (
                                currentUser.lastname
                            )}
                        </td>
                        <td>
                            {editedField !== "lastname" && (
                                <span className="material-icons" onClick={() => handleEditClick("lastname")}>
                                    edit
                                </span>
                            )}
                            {editedField === "lastname" && (
                                <button onClick={handleSaveClick}>Save</button>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>
                            {editedField === "email" ? (
                                <input
                                    type="text"
                                    value={editedInfo.email}
                                    onChange={(e) => setEditedInfo({ ...editedInfo, email: e.target.value })}
                                />
                            ) : (
                                currentUser.email
                            )}
                        </td>
                        <td>
                            {editedField !== "email" && (
                                <span className="material-icons" onClick={() => handleEditClick("email")}>
                                    edit
                                </span>
                            )}
                            {editedField === "email" && (
                                <button onClick={handleSaveClick}>Save</button>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Phone Number</th>
                        <td>
                            {editedField === "contact_no" ? (
                                <input
                                    type="text"
                                    value={editedInfo.contact_no}
                                    onChange={(e) => setEditedInfo({ ...editedInfo, contact_no: e.target.value })}
                                />
                            ) : (
                                `0${currentUser.contact_no}`
                            )}
                        </td>
                        <td>
                            {editedField !== "contact_no" && (
                                <span className="material-icons" onClick={() => handleEditClick("contact_no")}>
                                    edit
                                </span>
                            )}
                            {editedField === "contact_no" && (
                                <button onClick={handleSaveClick}>Save</button>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <th>Gender</th>
                        <td>
                            {editedField === "gender" ? (
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
                        <td>
                            {editedField !== "gender" && (
                                <span className="material-icons" onClick={() => handleEditClick("gender")}>
                                    edit
                                </span>
                            )}
                            {editedField === "gender" && (
                                <button onClick={handleSaveClick}>Save</button>
                            )}
                        </td>
                    </tr>
                </table>


            </div>
        </div>
    );
}

export default Profile;