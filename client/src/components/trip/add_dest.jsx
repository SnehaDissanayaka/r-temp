// // import React, { useState, useEffect } from 'react';

// // const AddPlace = ({ setDisplayOption }) => {
// //     const [map, setMap] = useState(null); // Store the map object
// //     const [marker, setMarker] = useState(null); // Store the marker object
// //     const [selectedLocation, setSelectedLocation] = useState(null); // Store the selected location coordinates

// //     useEffect(() => {
// //         loadGoogleMapsAPI();
// //     }, []);

// //     const loadGoogleMapsAPI = () => {
// //         if (!window.google) {
// //             // Load the Google Maps API script only if it hasn't been loaded yet
// //             const script = document.createElement("script");
// //             script.src =
// //                 "https://maps.googleapis.com/maps/api/js?key=AIzaSyBhY-F4UuZzLWdgxdFRtsU1kyjJBLB63s8&libraries=places&callback=initMap";
// //             script.async = true;
// //             script.defer = true;
// //             script.onload = initMap;
// //             document.head.appendChild(script);
// //         } else {
// //             // If the API is already loaded, just initialize the map
// //             initMap();
// //         }
// //     };

// //     const initMap = () => {
// //         if (!map) {
// //             setMap(new window.google.maps.Map(document.getElementById("map"), {
// //                 // Map options, e.g., center, zoom level
// //                 // center: { lat: 37.7749, lng: -122.4194 },
// //                 center: { lat: 6.9271, lng: 79.8612 },
// //                 zoom: 8,
// //             }));
// //         }

// //         if (map) {
// //             // Add a click event listener to the map to place a marker
// //             map.addListener("click", (e) => {
// //                 placeMarker(e.latLng);
// //             });
// //         }
// //     };



// //     // const placeMarker = (location) => {
// //     //     if (map) {
// //     //         if (marker) {
// //     //             // Update the position of the existing marker
// //     //             marker.setPosition(location);
// //     //         } else {
// //     //             // Create a new marker and add it to the map
// //     //             const newMarker = new window.google.maps.Marker({
// //     //                 position: location,
// //     //                 map: map,
// //     //                 draggable: true,
// //     //             });

// //     //             newMarker.addListener("dragend", (e) => {
// //     //                 setSelectedLocation(e.latLng);
// //     //             });

// //     //             setMarker(newMarker);
// //     //         }

// //     //         // Show the map if it was hidden
// //     //         document.getElementById("map").style.display = "block";

// //     //         setSelectedLocation(location);
// //     //     }
// //     // };


// //     const submitLocation = () => {
// //         if (selectedLocation) {
// //             // Use selectedLocation (coordinates) for database submission
// //             // Example: Send selectedLocation to your API
// //             console.log("Selected Location: ", selectedLocation);
// //         }
// //     };

// //     return (
// //         <div>
// //             <h2>Add Location</h2>
// //             <div id="map" style={{ height: "400px" }}></div>
// //             <button onClick={submitLocation}>Submit Location</button>
// //         </div>
// //     );
// // };

// // export default AddPlace;

// import React, { useState, useEffect } from 'react';

// const AddPlace = ({ setDisplayOption }) => {
//     const [map, setMap] = useState(null);
//     const [marker, setMarker] = useState(null);
//     const [selectedLocation, setSelectedLocation] = useState(null);

//     useEffect(() => {
//         loadGoogleMapsAPI();
//     }, []);

//     const loadGoogleMapsAPI = () => {
//         if (!window.google) {
//             const script = document.createElement("script");
//             script.src =
//                 "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap";
//             script.async = true;
//             script.defer = true;
//             document.head.appendChild(script);
//         } else {
//             initMap();
//         }
//     };

//     window.initMap = () => {
//         if (!map) {
//             setMap(new window.google.maps.Map(document.getElementById("map"), {
//                 center: { lat: 6.9271, lng: 79.8612 },
//                 zoom: 8,
//             }));

//             map.addListener("click", (e) => {
//                 placeMarker(e.latLng);
//             });
//         }
//     };

//     // window.initMap = () => {
//     //     if (!map) {
//     //         setMap(new window.google.maps.Map(document.getElementById("map"), {
//     //             center: { lat: 6.9271, lng: 79.8612 },
//     //             zoom: 8,
//     //         }));

//     //         map.addListener("click", (e) => {
//     //             placeMarker(e.latLng);
//     //         });
//     //     }
//     // };

//     // const placeMarker = (location) => {
//     //     if (map) {
//     //         // Your marker code here
//     //     }
//     // };

//     const placeMarker = (location) => {
//         if (map) {
//             if (marker) {
//                 // Update the position of the existing marker
//                 marker.setPosition(location);
//             } else {
//                 // Create a new marker and add it to the map
//                 const newMarker = new window.google.maps.Marker({
//                     position: location,
//                     map: map,
//                     draggable: true,
//                 });

//                 newMarker.addListener("dragend", (e) => {
//                     setSelectedLocation(e.latLng);
//                 });

//                 setMarker(newMarker);
//             }

//             // Show the map if it was hidden
//             document.getElementById("map").style.display = "block";

//             setSelectedLocation(location);
//         }
//     };


//     const submitLocation = () => {
//         if (selectedLocation) {
//             // Use selectedLocation (coordinates) for database submission
//             console.log("Selected Location: ", selectedLocation);
//         }
//     };

//     return (
//         <div>
//             <h2>Add Location</h2>
//             <div id="map" style={{ height: "400px" }}></div>
//             <button onClick={submitLocation}>Submit Location</button>
//         </div>
//     );
// };

// export default AddPlace;
