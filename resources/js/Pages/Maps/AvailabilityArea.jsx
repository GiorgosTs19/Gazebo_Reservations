import React, {useRef} from "react";

export function AvailabilityArea({title,coords,color}) {
    const AvailabilityAreaRef = useRef(),
    handleClick = (e)=>{
        e.preventDefault();
        // console.log('Clicked ' + title);
    };
    return (
        <area target="" alt={title} coords={coords} id={title}
              shape={'circle'} ref={AvailabilityAreaRef} className={'availabilityarea'} onClick={handleClick} color={color}/>
    )
}
