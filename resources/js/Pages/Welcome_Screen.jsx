// import React, {useEffect, useRef, useState} from 'react';
// import Beach_Beds from "./Welcome_Screen/Beach_Beds";
// import Gazebo from "./Welcome_Screen/Gazebo";
// import Overlay from "./Welcome_Screen/Overlay";
// import '../../css/Welcome_Screen.css';
//
// export default function Welcome_Screen() {
//     const [IsVisible, setIsVisible] = useState();
//     const container = useRef(null);
//     const active = IsVisible  === 'Register' ?  ' container right-panel-active' : ' container';
//     useEffect(()=> {
//         if (IsVisible === 'Register')
//             container.current && container.current.classList.add("right-panel-active");
//         else if(IsVisible === 'Login')
//             container.current && container.current.classList.remove("right-panel-active");
//     },[IsVisible]);
//     return (
//         <div className={active} id="container" ref={container}>
//             <div className='row'>
//                 <div className='col-md-6' hidden={IsVisible === 'Login'}><Beach_Beds></Beach_Beds></div>
//                 <div className='col-md-6 ' hidden={IsVisible === 'Register'}><Gazebo></Gazebo></div>
//                 <Overlay setVisibility={setIsVisible}></Overlay>
//             </div>
//         </div>
//     );
// }
