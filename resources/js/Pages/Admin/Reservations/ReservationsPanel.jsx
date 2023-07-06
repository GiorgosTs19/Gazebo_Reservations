import {Card, Col, Row} from "react-bootstrap";
import {WeeklyReservationsView} from "./WeeklyView/WeeklyReservationsView";
import {ViewSelectionMenu} from "./Settings/ViewSelectionMenu";
import {useState} from "react";
import {MonthlyView} from "./MonthlyView/MonthlyView";
import {ViewContext} from "../../../Contexts/ViewContext";
import {useContext} from "react";
import {InnerWidthContext} from "../../../Contexts/InnerWidthContext";
import {ActiveReservationContext} from "../Contexts/ActiveReservationContext";
import {DinnerReservationLong} from "./ReservationViews/DinnerReservationLong";
import {useEffect} from "react";
import {TodaysView} from "./TodaysView/TodaysView";
import {ReservationTypeSelectionMenu} from "./Settings/ReservationTypeSelectionMenu";
import {ReservationsContext} from "../../../Contexts/ReservationsContext";
import {ActiveReservationTypeContext} from "../Contexts/ActiveReservationTypeContext";

export function ReservationsPanel({Dinner_Reservations,Bed_Reservations}) {
    const [activeView,setActiveView] = useState('Today'),
        innerWidth = useContext(InnerWidthContext),
    [activeReservation,setActiveReservation] = useState(null),
    [isMobile,setIsMobile] = useState(innerWidth < 992),
    [reservationType,setReservationType] = useState('Dinner'),
        getReservationsByActiveType = () => {
            switch (reservationType) {
                case 'Dinner' :
                    return Dinner_Reservations;
                case 'Bed' :
                    return Bed_Reservations;
            }
        },
    showReservationLong = () => {
        if(isMobile)
            if(activeReservation !== null)
                return <DinnerReservationLong></DinnerReservationLong>
        if(activeReservation !== null)
            return <DinnerReservationLong></DinnerReservationLong>
        return  <h4 className={'text-muted m-auto'}>Επιλέξτε μία κράτηση για να δείτε λεπτομέρειες.</h4>
    }
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 992);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(()=>{
        setActiveReservation(null);
    },[reservationType]);

    return (
        <ReservationsContext.Provider value={getReservationsByActiveType()}>
            <ActiveReservationTypeContext.Provider value={{reservationType,setReservationType}}>
                <ActiveReservationContext.Provider value={{activeReservation,setActiveReservation}}>
                    <Card className={"p-1 mx-sm-auto mx-3 border-0"} style={{maxHeight:'85vh'}}>
                        <Card.Header style={{backgroundColor:'white'}} className={'text-center'}>
                            <ViewContext.Provider value={{activeView,setActiveView}}>
                                <Row className={'p-0'}>
                                    <Col lg={3} className={'d-flex ' + (isMobile ? 'border-bottom px-3 pb-2 mb-2' :
                                        'border-end px-3 pb-2 mb-2')}>
                                        <ReservationTypeSelectionMenu></ReservationTypeSelectionMenu>
                                    </Col>
                                    <Col lg={9}>
                                        <ViewSelectionMenu></ViewSelectionMenu>
                                    </Col>
                                </Row>
                            </ViewContext.Provider>
                        </Card.Header>
                        <Card.Body>
                            <Row className={'h-100'}>
                                <Col sm={12} lg={(activeReservation !== null || activeView === 'Weekly') ? 7 : 12}  className={!isMobile && 'border-end'}>
                                    {activeView === 'Today' && <TodaysView></TodaysView>}
                                    {activeView === 'Weekly' && <WeeklyReservationsView></WeeklyReservationsView>}
                                    {activeView === 'Monthly' && <MonthlyView></MonthlyView>}
                                </Col>
                                {(activeReservation !== null || (activeView === 'Weekly' && innerWidth > 1200)) && <Col sm={12} lg={5}
                                    className={'d-flex text-center'} as={'div'} style={{overflowY: 'auto', maxHeight: '70vh'}}>
                                    {showReservationLong()}
                                </Col>}
                            </Row>
                        </Card.Body>
                    </Card>
                </ActiveReservationContext.Provider>
            </ActiveReservationTypeContext.Provider>
        </ReservationsContext.Provider>
    )
}
