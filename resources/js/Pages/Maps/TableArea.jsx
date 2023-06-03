import React, {useEffect, useRef} from "react";

export function TableArea({title,coords,onClick,ID,isAvailable}) {
    const TableAreaRef = useRef();
    const id = title.split(' ')[1];
    useEffect(()=>{
        if(!isAvailable)
            TableAreaRef.current.style.cursor = 'default';
    })

    return (
        <area target="" alt={title} title={title} coords={coords} id={ID}
              shape={'rect'} ref={TableAreaRef} className={'tablearea'} onClick={onClick} onTouchStart={onClick}/>
    )
}
