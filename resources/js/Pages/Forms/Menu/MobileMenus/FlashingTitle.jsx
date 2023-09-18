import {useEffect, useState} from 'react';

export function FlashingTitle({ onClick = () => {}, conditionMet , children, className='', style={}}) {
    const [isFlashing, setIsFlashing] = useState(false);

    // When the Tab is clicked, the flashing animation effectively stops since isFlashing is set to false;
    const handleClick = () => {
        setIsFlashing(false);
        // typeof onClick() === 'function' && onClick();
    };
    // When the condition is met, start the flashing animation.
    useEffect(()=>{
        if(!conditionMet)
            return;
        setIsFlashing(true);
    },[conditionMet])

    // Toggle the animation class based on the condition passed in the props
    const ClassName = `${className} ${isFlashing && conditionMet ? 'flash-animation' : ''}`;

    return (
        <p className={ClassName} onClick={handleClick} style={style}>
            {children}
        </p>
    );
}
