import {Button, Stack} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";

export function MobileTodaysView({reservationsToShow}) {
    const [shouldShowStack, setShouldShowStack] = useState(true),
        {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    handleBackToStack = () =>{
        setShouldShowStack(true);
        setActiveReservation(null);
    };
    useEffect(()=>{
        if(activeReservation !== null)
            setShouldShowStack(false);
    },[activeReservation]);

    return (
        <>
            {shouldShowStack ? <Stack className={'p-3 text-center'} style={{
                overflowY: 'auto',
                height: '70vh'
            }}>
                {reservationsToShow()}
            </Stack> :
                <div className={'d-flex'}>
                    <Button size={'lg'} variant={'info'} onClick={handleBackToStack} className={'my-4 mx-auto'}>
                        &#x2190;
                    </Button>
                </div>}
        </>
    )
}
