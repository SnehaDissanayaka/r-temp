// // // // import './reports.scss';

// // // // import { Icon } from '@mui/material';
// // // // import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';

// // // // function Report_Image({ postImageDisplayed, setpostImageDisplayed }) {

// // // //     const closeImage = () => {
// // // //         setpostImageDisplayed(0);
// // // //     }

// // // //     return (
// // // //         <div className='Img_container'>
// // // //             <div className='Img_div'>
// // // //                 <h2>Post Image</h2>
// // // //                 <DisabledByDefaultRoundedIcon onClick={() => closeImage()} className="close" sx={{ color: 'red' }} />
// // // //                 <div className="container">
// // // //                     <img src={postImageDisplayed} alt="post image" />

// // // //                 </div>
// // // //             </div>
// // // //         </div>
// // // //     )
// // // // }

// // // // export default Report_Image;

// // // import './reports.scss';
// // // import { Icon } from '@mui/material';
// // // import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
// // // import { useState } from 'react';

// // // function Report_Image({ postImageDisplayed, setpostImageDisplayed }) {
// // //     const [containerHeight, setContainerHeight] = useState('auto');

// // //     const closeImage = () => {
// // //         setpostImageDisplayed(0);
// // //     }

// // //     const adjustContainerHeight = (event) => {
// // //         // Access the loaded image's dimensions
// // //         const imageWidth = event.target.width;
// // //         const imageHeight = event.target.height;

// // //         // Set the container's height based on the image dimensions
// // //         setContainerHeight(`${imageHeight}px`);
// // //     }

// // //     return (
// // //         <div className='Img_container'>
// // //             <div className='Img_div'>
// // //                 <h2>Post Image</h2>
// // //                 <DisabledByDefaultRoundedIcon onClick={closeImage} className="close" sx={{ color: 'red' }} />
// // //                 <div className="container" style={{ height: containerHeight }}>
// // //                     <img
// // //                         src={postImageDisplayed}
// // //                         alt="post image"
// // //                         onLoad={adjustContainerHeight}
// // //                     />
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // // export default Report_Image;


// // import './reports.scss';
// // import { Icon } from '@mui/material';
// // import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
// // import { useState } from 'react';

// // function Report_Image({ postImageDisplayed, setpostImageDisplayed }) {
// //     const [containerHeight, setContainerHeight] = useState('auto');

// //     const closeImage = () => {
// //         setpostImageDisplayed(0);
// //     }

// //     const adjustContainerHeight = () => {
// //         // Set the desired width
// //         const desiredWidth = 635;

// //         // Access the loaded image's dimensions
// //         const image = new Image();
// //         image.src = postImageDisplayed;
// //         const imageWidth = image.width;
// //         const imageHeight = image.height;

// //         // Calculate the height based on the width-to-height ratio
// //         const height = (desiredWidth / imageWidth) * imageHeight;

// //         // Set the container's height based on the calculated height
// //         setContainerHeight(`${height}px`);
// //     }

// //     return (
// //         <div className='Img_container'>
// //             <div className='Img_div'>
// //                 <h2>Post Image</h2>
// //                 <DisabledByDefaultRoundedIcon onClick={closeImage} className="close" sx={{ color: 'red' }} />
// //                 <div className="container" style={{ width: '635px', height: containerHeight }}>
// //                     <img
// //                         src={postImageDisplayed}
// //                         alt="post image"
// //                         onLoad={adjustContainerHeight}
// //                     />
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // export default Report_Image;

// import './reports.scss';
// import { Icon } from '@mui/material';
// import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
// import { useState, useEffect } from 'react';

// function Report_Image({ postImageDisplayed, setpostImageDisplayed }) {
//     const [containerHeight, setContainerHeight] = useState('auto');
//     const [containerWidth, setContainerWidth] = useState('auto');

//     const closeImage = () => {
//         setpostImageDisplayed(0);
//     }

//     useEffect(() => {
//         adjustContainerDimensions();
//     }, [postImageDisplayed]);

//     const adjustContainerDimensions = () => {
//         // Set the desired dimensions
//         const desiredWidth = 693;
//         const desiredHeight = 488;

//         // Access the loaded image's dimensions
//         const image = new Image();
//         image.src = postImageDisplayed;

//         image.onload = () => {
//             const imageWidth = image.width;
//             const imageHeight = image.height;

//             // Calculate dimensions to fit within the desired size while maintaining aspect ratio
//             if (imageWidth > desiredWidth) {
//                 const scaleFactor = desiredWidth / imageWidth;
//                 const newWidth = desiredWidth;
//                 const newHeight = imageHeight * scaleFactor;
//                 setContainerWidth(`${newWidth}px`);
//                 setContainerHeight(`${newHeight}px`);
//             } else if (imageHeight > desiredHeight) {
//                 const scaleFactor = desiredHeight / imageHeight;
//                 const newWidth = imageWidth * scaleFactor;
//                 const newHeight = desiredHeight;
//                 setContainerWidth(`${newWidth}px`);
//                 setContainerHeight(`${newHeight}px`);
//             }
//         }
//     }

//     return (
//         <div className='Img_container'>
//             <div className='Img_div' style={{ width: containerWidth, height: containerHeight }}>
//                 <h2>Post Image</h2>
//                 <DisabledByDefaultRoundedIcon onClick={closeImage} className="close" sx={{ color: 'red' }} />
//                 <div className="container">
//                     <img src={postImageDisplayed} alt="post image" />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Report_Image;

import './reports.scss';
import { Icon } from '@mui/material';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import { useState } from 'react';

function Report_Image({ postImageDisplayed, setpostImageDisplayed }) {
    const closeImage = () => {
        setpostImageDisplayed(0);
    }

    return (
        <div className='Img_container'>
            <div className='Img_div'>
                <h2>Post Image</h2>
                <DisabledByDefaultRoundedIcon onClick={closeImage} className="close" sx={{ color: 'red' }} />
                <div className="container">
                    <img src={postImageDisplayed} alt="post image" />
                </div>
            </div>
        </div>
    );
}

export default Report_Image;
