import {Button, Col, Row, Stack} from "react-bootstrap";
import {ReservationCountNotes} from "../../../../Notes/ReservationCountNotes";
import {useState} from "react";
import {useEffect} from "react";
import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {LeftArrowSVG} from "../../../../SVGS/LeftArrowSVG";

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
    return (
        <Row className={'text-center h-100'}>
             <Col className={'px-1 ' + (shouldShowCalendar ? 'py-1' : 'py-0')}>
                {shouldShowCalendar && <>
                    {Calendar}
                </>
                }
                {!shouldShowCalendar &&
                    <>
                        <LeftArrowSVG className={'my-2'} rotate={90} onClick={handleBackToCalendar}/>
                        <Stack className={'p-3 overflow-y-auto'} style={{maxHeight: '350px'}}>
                            {WarningMessage()}
                            {reservationsToShow()}
                        </Stack>
                    </>
                }
            </Col>
        </Row>
    )
}
