import React from 'react';
import './App.scss';
import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from "react-router-dom";

import { useContext, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AdminLogin from './pages/adminLogin/adminLogin';
import TripType from './pages/tripType/tripType';
import PlacesDetails from './pages/placesDetails/placesDetails';
import AdminPanel from './pages/adminPanel/adminPanel';
import Users from './pages/users/users';
import UserProfile from './pages/userProfile/userProfile';
import AddAdmin from './pages/addAdmin/addAdmin';
import AdvertisementsPage from './pages/AdvertisementsPage/advertisementsPage';
import ReportsPage from './pages/reportsPage/reportsPage';
import PlacesPage from './pages/placesPage/placesPage';
import BadgesPage from './pages/badgesPage/badgesPage';
import ProfilePage from './pages/profilePage/profilePage';
import AdViewPage from './pages/adViewPage/adViewPage';

// function App() {

//     const { currentUser } = useContext(AuthContext);

//     const { darkMode } = useContext(DarkModeContext);

//     const queryClient = new QueryClient();

//     const Reports = () => {
//         return (
//             <QueryClientProvider client={queryClient}>
//                 <div className={`theme-${darkMode ? "dark" : "light"}`}>
//                     <ReportsPage />
//                 </div>
//             </QueryClientProvider >
//         );
//     };

//     const ProtectedRoute = ({ children }) => {
//         if (!currentUser) {
//             return <Navigate to="/adminlogin" />;
//         }
//         return children;
//     };



//     const router = createBrowserRouter([
//         {
//             path: "/",
//             // element: (
//             //     <ProtectedRoute>
//             //         <AdminPanel />
//             //     </ProtectedRoute>
//             // ),
//             children: [
//                 {
//                     path: "/",
//                     element: <AdminPanel />,
//                 },
//                 {
//                     path: "/placesdetails",
//                     element: <PlacesDetails />,
//                 },
//                 {
//                     path: "/triptype",
//                     element: <TripType />,
//                 },
//                 {
//                     path: "/users",
//                     element: <Users />,
//                 },
//                 {
//                     path: "/userprofile",
//                     element: <UserProfile />,
//                 },
//                 {
//                     path: "/addadmin",
//                     element: <AddAdmin />,
//                 },
//                 {
//                     path: "/advertisementspage",
//                     element: <AdvertisementsPage />,
//                 },
//                 {
//                     path: "/reportspage",
//                     element: <Reports />,
//                 },
//                 {
//                     path: "/placespage",
//                     element: <PlacesPage />,
//                 },
//                 {
//                     path: "/badgespage",
//                     element: <BadgesPage />,
//                 },
//                 {
//                     path: "/profilepage",
//                     element: <ProfilePage />,
//                 },
//                 {
//                     path: "/adviewpage",
//                     element: <AdViewPage />,
//                 },
//             ],

//         },
//         {
//             path: "/adminlogin",
//             element: <AdminLogin />,
//         },
//         {
//             path: "/reportspage",
//             element: <Reports />,
//         }

//         // {
//         //     path: "/adminlogin",
//         //     element: <AdminLogin />,
//         // },
//         // {
//         //     path: "/",
//         //     element: <AdminPanel />,
//         // },
//         // {
//         //     path: "/placesdetails",
//         //     element: <PlacesDetails />,
//         // },
//         // {
//         //     path: "/triptype",
//         //     element: <TripType />,
//         // },
//         // {
//         //     path: "/users",
//         //     element: <Users />,
//         // },
//         // {
//         //     path: "/userprofile",
//         //     element: <UserProfile />,
//         // },
//         // {
//         //     path: "/addadmin",
//         //     element: <AddAdmin />,
//         // },
//         // {
//         //     path: "/advertisementspage",
//         //     element: <AdvertisementsPage />,
//         // },
//         // {
//         //     path: "/reportspage",
//         //     element: <Reports />,
//         // },
//         // {
//         //     path: "/placespage",
//         //     element: <PlacesPage />,
//         // },
//         // {
//         //     path: "/badgespage",
//         //     element: <BadgesPage />,
//         // },
//         // {
//         //     path: "/profilepage",
//         //     element: <ProfilePage />,
//         // },
//         // {
//         //     path: "/adviewpage",
//         //     element: <AdViewPage />,
//         // },
//     ]);

//     return (
//         <QueryClientProvider client={queryClient}>
//             <div>
//                 <RouterProvider router={router} />
//             </div>
//         </QueryClientProvider>

//     );
// }

// export default App;

function App() {
    const { currentUser } = useContext(AuthContext);
    const { darkMode } = useContext(DarkModeContext);
    const queryClient = new QueryClient();




    const Reports = () => {
        return (
            <QueryClientProvider client={queryClient}>
                <div className={`theme-${darkMode ? "dark" : "light"}`}>
                    <ReportsPage />
                </div>
            </QueryClientProvider >
        );
    };

    //     const ProtectedRoute = ({ children }) => {
    //         if (!currentUser) {
    //             return <Navigate to="/adminlogin" />;
    //         }
    //         return children;
    //     };



    const ProtectedRoute = ({ children }) => {
        // console.log(currentUser);
        if (!currentUser) {
            return <AdminLogin />;
        }
        return children;
    };

    const router = createBrowserRouter([
        {
            path: "/",
            children: [
                {
                    path: "/",
                    element: (
                        <ProtectedRoute>
                            <AdminPanel />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/placesdetails",
                    element: (
                        <ProtectedRoute>
                            <PlacesDetails />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/triptype",
                    element: (
                        <ProtectedRoute>
                            <TripType />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/users",
                    element: (
                        <ProtectedRoute>
                            <Users />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/userprofile",
                    element: (
                        <ProtectedRoute>
                            <UserProfile />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/addadmin",
                    element: (
                        <ProtectedRoute>
                            <AddAdmin />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/advertisementspage",
                    element: (
                        <ProtectedRoute>
                            <AdvertisementsPage />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/reportspage",
                    element: (
                        <ProtectedRoute>
                            <Reports />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/placespage",
                    element: (
                        <ProtectedRoute>
                            <PlacesPage />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/badgespage",
                    element: (
                        <ProtectedRoute>
                            <BadgesPage />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/profilepage",
                    element: (
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/adviewpage",
                    element: (
                        <ProtectedRoute>
                            <AdViewPage />
                        </ProtectedRoute>
                    ),
                },
            ],
        },
        {
            path: "/adminlogin",
            element: <AdminLogin />,
        },
        {
            path: "/reportspage",
            element: (
                <ProtectedRoute>
                    <Reports />
                </ProtectedRoute>
            ),
        },
    ]);

    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <RouterProvider router={router} />
            </div>
        </QueryClientProvider>
    );
}

export default App;