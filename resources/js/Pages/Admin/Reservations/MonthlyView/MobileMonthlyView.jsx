import {Button, Col, Row, Stack} from "react-bootstrap";
import {ReservationCountNotes} from "../../../../Notes/ReservationCountNotes";
import {useState} from "react";
import {useEffect} from "react";
import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";

export function MobileMonthlyView({Calendar,reservationsToShow,WarningMessage,selectedDate}) {
    const [shouldShowCalendar,setShouldShowCalendar] = useState(true),
    {activeReservation,setActiveReservation} = useContext(ActiveReservationContext);

    useEffect(()=>{
        if(selectedDate !== '')
            setShouldShowCalendar(false)
    },[selectedDate]);
    const handleBackToCalendar = () =>{
        setShouldShowCalendar(true);
        setActiveReservation(null);
    };
    console.log(shouldShowCalendar)
    return (
        <Row className={'text-center h-100'}>
            <Col className={'p-4'}>
                {shouldShowCalendar && <>
                    <ReservationCountNotes></ReservationCountNotes>
                    {Calendar}
                </>
                }
                {!shouldShowCalendar && activeReservation == null &&
                    <>
                        <Button size={'lg'} variant={'info'} onClick={handleBackToCalendar} className={'my-4'}>
                            &#x2190;
                        </Button>
                        <Stack className={'p-3'} style={{overflowY: 'auto', maxHeight : '350px'}}>
                            {WarningMessage()}
                            {reservationsToShow()}
                        </Stack>
                    </>
                }
                {activeReservation !== null &&
                    <Button size={'lg'} variant={'info'} onClick={()=>setActiveReservation(null)} className={'my-1'}>
                        &#x2190;
                    </Button>
                }
            </Col>
        </Row>
    )
}
