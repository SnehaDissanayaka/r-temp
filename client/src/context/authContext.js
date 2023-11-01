import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (inputs) => {
        const res = await axios.post("http://localhost:8000/server/users/login", inputs, {
            withCredentials: true,
        });

        setCurrentUser(res.data)
    };

    const logout = async () => {
        await axios.post("http://localhost:8000/server/users/logout");
        setCurrentUser(null);
    }

    const updateUser = (newUserData) => {
        // Update the currentUser with the new data
        setCurrentUser(newUserData);
    };

    const updateProfilePic = (newProfilePic) => {
        // Create a new copy of currentUser with the updated profile_pic
        const newCurrentUser = { ...currentUser, profile_pic: newProfilePic };
        setCurrentUser(newCurrentUser);

        // Save the updated user data to localStorage (optional)
        localStorage.setItem("user", JSON.stringify(newCurrentUser));
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, updateUser, updateProfilePic }}>
            {children}
        </AuthContext.Provider>
    )
};