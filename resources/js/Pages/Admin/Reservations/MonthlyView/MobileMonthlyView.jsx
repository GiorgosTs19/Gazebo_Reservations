import {Col, Row, Stack} from "react-bootstrap";
import {useState} from "react";
import {useEffect} from "react";
import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {LeftArrowSVG} from "../../../../SVGS/LeftArrowSVG";

export function MobileMonthlyView({Calendar, reservationsToShow, selectedDate}) {
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
             <Col className={'px-1 d-flex flex-column ' + (shouldShowCalendar ? 'py-1' : 'py-0')}>
                {shouldShowCalendar && <>
                    {Calendar}
                </>
                }
                {!shouldShowCalendar &&
                    <>
                        <LeftArrowSVG className={'my-2 mx-auto'} rotate={90} onClick={handleBackToCalendar}/>
                        <Stack className={'p-3 overflow-y-auto ' + (innerWidth > 992 ? 'mh-600px' : 'h-90')}>
                            {reservationsToShow()}
                        </Stack>
                    </>
                }
            </Col>
        </Row>
    )
}
