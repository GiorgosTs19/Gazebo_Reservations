import {
    Accordion, Badge,
    Button, Col,
    Form,
    Image,
    ListGroup,
    Modal,
    OverlayTrigger, Row,
    Stack,
    Tooltip
} from "react-bootstrap";
import {changeDateFormat, getFormattedDate} from "../../../ExternalJs/Util";
import {Inertia} from "@inertiajs/inertia";
import {useContext, useEffect, useState} from "react";
import {InnerWidthContext} from "../../../Contexts/InnerWidthContext";
import {ActiveReservationTypeContext} from "../Contexts/ActiveReservationTypeContext";

import useGetReservationStatusText from "../../../CustomHooks/useGetReservationStatusText";

export function SetDayUnavailableModal({selectedDate,current_date_availability,AvailabilityText}) {
    const [show, setShow] = useState(false),
    innerWidth = useContext(InnerWidthContext),
    [allowExistingReservations,setAllowExistingReservations] = useState(false),
    Type = useContext(ActiveReservationTypeContext);
    // const [[dateHasReservations,Reservations],setDateHasReservations] = useState([false,0]);
    const [reservations,setReservations] = useState([]);
    const dateIsRange = Array.isArray(selectedDate);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChangeAllowExistingReservations = value => {
        setAllowExistingReservations(value);
    }
    useEffect(()=>{
        if(show) {
            if(!dateIsRange) {
                Inertia.get(route('Get_Availability_For_Date'), {date: getFormattedDate(selectedDate,'-',1),get_reservations:true},{
                    only:['availability_for_date'],
                    preserveScroll:true,
                    preserveState:true,
                    onSuccess:(res)=>{
                        console.log('res',res.props.availability_for_date)
                        setReservations(res.props.availability_for_date);
                    }
                });
                return;
            }
            Inertia.get(route('Get_Availability_For_Dates'), {date_start: getFormattedDate(selectedDate[0],'-',1),date_end:getFormattedDate(selectedDate[1],'-',1)},{
                only:['availability_for_date_range'],
                preserveScroll:true,
                preserveState:true,
                onSuccess:(res)=>{
                    console.log('res',res.props)
                    setReservations(res.props.availability_for_date_range);
                }
            });
        }
    },[show]);

    const handleSetDayUnavailable = () => {
        const date_to_disable = !dateIsRange ? getFormattedDate(selectedDate,'-',1) :
        [getFormattedDate(selectedDate[0],'-',1),getFormattedDate(selectedDate[1],'-',1)];
        Inertia.post(route('Disable_Day'),{Date:date_to_disable,Allow_Existing_Reservations:allowExistingReservations,Type:Type},{preserveScroll:true,preserveState:true,
            only:['Dinner_Reservations']});
    };
    // const getReservationCountMessage = () => {
    //     if(reservations.length>0) {
    //         switch (reservations.length) {
    //             case 1 : {
    //                 return <p className={'my-2 fw-bold'}>Έχει καταχωρηθεί ήδη 1 κράτηση για αυτήν την μέρα.</p>
    //             }
    //             default : {
    //                 return <p className={'my-2 fw-bold'}>Έχουν καταχωρηθεί ήδη {reservations.length} κρατήσεις για αυτήν την μέρα.</p>
    //             }
    //         }
    //     }
    // }

    const renderSelectedDays = () => {
        const reservationsToShow = (day) => {
            const reservations_of_current_date = reservations.filter((reservation)=>reservation.Date === day);

            return [reservations_of_current_date.map((reservation, index) => {
                    return <ListGroup.Item key={index+1} className={'p-2 text-center my-3'}>
                        <p>Αρ. Κράτησης : {reservation.Confirmation_Number}</p>
                        <Badge pill bg={getStatusColor(reservation.Status).split('-')[1]} className={'my-3 p-2 box_shadow user-select-none'}>
                            {useGetReservationStatusText(reservation.Status)}
                        </Badge>
                    </ListGroup.Item>;
                }
            ),reservations_of_current_date.length]
        };

        const getStatusColor = (status) =>{
            switch (status) {
                case 'Cancelled' : {
                    return 'text-danger';
                }
                case 'Confirmed' : {
                    return 'text-success';
                }
                default : {
                    return 'text-warning'
                }
            }
        };
        if(dateIsRange) {
            const getDatesWithReservations = () => {
                let dates = [];
                reservations.forEach((reservation)=>{
                    if(!dates.includes(reservation.Date)) {
                        dates = [...dates,reservation.Date]
                    }
                });
                return dates;
            };


            return getDatesWithReservations().map((day,index)=>{
                const [reservationsShow,reservationsCount] = reservationsToShow(day);
                return <Accordion.Item className={'mx-2 my-4'} key={index} eventKey={index.toString()}>
                    <Accordion.Header>{changeDateFormat(day,'-','-')} ( {reservationsCount} κρατήσεις )</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup horizontal={false} gap={5} className={'py-1'}>
                            {reservationsShow}
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>;
            });
        }

            return <Accordion.Item className={'mx-2 my-4'} key={0} eventKey={'0'}>
                <Accordion.Header>( {reservations.length} κρατήσεις )</Accordion.Header>
                <Accordion.Body>
                    <ListGroup horizontal={false} gap={5} className={'py-1'}>
                        {reservations.map((reservation, index) => {
                            return <ListGroup.Item key={index+1} className={'p-2 text-center my-3'}>
                                <p>Αρ. Κράτησης : {reservation.Confirmation_Number}</p>
                                <Badge pill bg={getStatusColor(reservation.Status).split('-')[1]} className={'my-3 p-2 box_shadow user-select-none'}>
                                    {useGetReservationStatusText(reservation.Status)}
                                </Badge>
                            </ListGroup.Item>;
                        })}
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>;

    };
    const getWarningMessage = () => {
        switch (allowExistingReservations) {
            case false : {
                switch (reservations.length) {
                    case 1 : {
                        return <b>ΠΡΕΠΕΙ να γίνει μεταφορά της σε άλλη μέρα έπειτα από συνεννόηση με τον πελάτη.</b>
                    }
                    default : {
                        return <b>ΠΡΕΠΕΙ να γίνει μεταφορά τους σε άλλη μέρα έπειτα από συνεννόηση με τους πελάτες.</b>
                    }
                }
            }
            case true : {
                switch (reservations.length) {
                    case 1 : {
                        return <b>Η υπάρχουσα κράτηση θα πραγματοποιηθεί κανονικά.</b>
                    }
                    default : {
                        return <b>Οι υπάρχουσες κρατήσεις θα πραγματοποιηθούν κανονικά.</b>
                    }
                }
            }
        }
    };
    console.log(selectedDate)
    const dateRangeWarningMessage = reservations.length > 0 ?
            <h6 className={'my-4'}>Υπάρχουν {reservations.length} κρατήσεις από τις {changeDateFormat(getFormattedDate(selectedDate[0],'-',1),'-')} μέχρι τις {changeDateFormat(getFormattedDate(selectedDate[1],'-',1),'-')}</h6> :
            <h6 className={'my-4'}>Δεν υπάρχει καμία κράτηση από τις {getFormattedDate(selectedDate[0],'-',1)} μέχρι τις {getFormattedDate(selectedDate[1],'-',1)}</h6>

    const formatted_date = !dateIsRange ? getFormattedDate(selectedDate, '-', 2) :
        [changeDateFormat(getFormattedDate(selectedDate[0],'-',1),'-','-'),changeDateFormat(getFormattedDate(selectedDate[1],'-',1),'-','-')];
    return (
        <>
            <div className={'d-flex'}>
                <Stack direction={'horizontal'} className={'mx-auto'}>
                    <Button variant={'outline-danger'} className={'p-2 my-2'}
                            disabled={current_date_availability === 'Disabled'}
                            onClick={handleShow}>
                        Ορισμός ως μη {!dateIsRange ? 'διαθέσιμη' : 'διαθέσιμες'}
                    </Button>
                    {(reservations.length > 0) &&
                        <OverlayTrigger placement={'right-end'} overlay={<Tooltip>{AvailabilityText}</Tooltip>}>
                            <Image src={'Images/Icons/warning.png'} className={'ms-3'}></Image>
                        </OverlayTrigger>}
                </Stack>
            </div>
            <Modal show={show} onHide={handleClose} className={'day-unavailable-modal'}>
                <Modal.Header closeButton>
                    <Modal.Title>Ορισμός {!dateIsRange ? formatted_date : `από ${formatted_date[0]} έως ${formatted_date[1]}`} ως μη {!dateIsRange ? 'διαθέσιμη' : 'διαθέσιμες'}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={'fst-italic text-center'}>
                    <section className={'text-warning'}>
                        Είστε σίγουροι πως θέλετε να θέσετε {!dateIsRange ? `την ${formatted_date}` : `τις ημέρες από ${formatted_date[0]} έως ${formatted_date[1]}`} ως μή {!dateIsRange ? 'διαθέσιμη' : 'διαθέσιμες'}?
                    </section>
                    <section className={'text-warning ' + (reservations.length ? 'border-bottom pb-3 ' : '')}>
                        Δεν θα μπορούν να καταχωρηθούν {reservations.length ? 'άλλες' : ''} {!dateIsRange ?
                        'κρατήσεις για αυτήν την μέρα, μέχρι να την ξανά ορίσετε ώς διαθέσιμη.' :
                        'κρατήσεις για αυτές τις μέρες, μέχρι να τις ξανά ορίσετε διαθέσιμες.'}
                    </section>
                    {reservations.length > 0 && !dateIsRange && <section className={'p-2 my-1'}>
                        <p>
                            <Image src={'Images/Icons/warning.png'} className={'my-1'}></Image>
                        </p>
                        <section className={'my-2'}>
                            <h6 className={'mb-4'}>Οι υπάρχουσες κρατήσεις</h6>
                            <Form className={'my-4'}>
                                <Form.Check
                                    inline
                                    label="Μπορούν να πραγματοποιηθούν."
                                    name="Existing_Reservations_Allowance"
                                    className={'my-3'}
                                    type={"radio"}
                                    checked={allowExistingReservations === true}
                                    onChange={()=>handleChangeAllowExistingReservations(true)}
                                />
                                <Form.Check
                                    inline
                                    label="Δεν μπορούν να πραγματοποιηθούν."
                                    name="Existing_Reservations_Allowance"
                                    className={'my-3'}
                                    type={"radio"}
                                    checked={allowExistingReservations === false}
                                    onChange={()=>handleChangeAllowExistingReservations(false)}
                                />
                            </Form>
                        </section>
                        {/*<div>*/}
                        {/*    {!allowExistingReservations && !dateIsRange && getReservationCountMessage()}*/}
                        {/*</div>*/}
                        {getWarningMessage()}
                    </section>}
                    {!reservations.length && !dateIsRange && <section className={'my-3'}>
                        <h6>Δεν υπάρχει κάποια κράτηση για αυτήν την ημέρα.</h6>
                    </section>}
                    {dateIsRange && <section>
                        {dateRangeWarningMessage}
                    </section>}
                    <div className={'overflow-auto mh-400px m-auto'}>
                        <Accordion className="week-days p-0 mx-3 " gap={2}>
                            {renderSelectedDays()}
                        </Accordion>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" className={'p-2 my-2'} onClick={handleClose}>
                        Ακύρωση
                    </Button>
                    <Button variant={'outline-danger'} className={'p-2 my-2'}
                            disabled={current_date_availability === 'Disabled'}
                            onClick={handleSetDayUnavailable}>
                        Ορισμός ως μη {!dateIsRange  ? 'διαθέσιμη' : 'διαθέσιμες'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
