import {Button, Stack} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {FiltersBar} from "../FiltersBar/FiltersBar";

export function MobileTodaysView({reservationsToShow,filter}) {
    const [shouldShowStack, setShouldShowStack] = useState(true),
        {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
        {reservationsFilter,setReservationsFilter} = filter,
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
            {shouldShowStack ?
                <div className={'d-flex flex-column'}>
                    <FiltersBar setReservationsFilter={setReservationsFilter}
                                reservationsFilter={reservationsFilter} direction={'vertical'}></FiltersBar>
                    <Stack className={'p-3 text-center mx-auto'} style={{
                        overflowY: 'auto',
                        height: '70vh'
                    }}>
                        {reservationsToShow}
                    </Stack>
                </div>
                :
                <div className={'d-flex'}>
                    <Button size={'lg'} variant={'info'} onClick={handleBackToStack} className={'my-4 mx-auto'}>
                        &#x2190;
                    </Button>
                </div>}
        </>
    )
}
