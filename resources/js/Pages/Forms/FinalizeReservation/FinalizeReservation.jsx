import {useContext, forwardRef} from "react";
import {changeDateFormat, getTableAA} from "../../../ExternalJs/Util";
import {MenusOverview} from "./MenusOverview";
import {Notes} from "./Notes";
import {Button, Card, Col, Row, Stack} from "react-bootstrap";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {Inertia} from "@inertiajs/inertia";
import {GazebosContext} from "../../../Contexts/GazebosContext";
import {ErrorsContext} from "../../Admin/Contexts/ErrorsContext";

export const FinalizeReservation = forwardRef(function FinalizeReservation({...props},ref) {
    const {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext),
    {errors, setErrors} = useContext(ErrorsContext),
    Gazebos = useContext(GazebosContext),
    // Handles the inertia request to submit the reservation and store it in the database.
    handleFinalizeReservation = () => {
        Inertia.post(route('Create_Reservation'),bookingDetails,{
            preserveState:true,
            preserveScroll:true,
            onError:(error)=> setErrors(error),
        });
    };

    return (
        <div className={'px-2 mh-615px overflow-y-auto overflow-x-hidden text-start d-flex'} ref={ref}>
            <Card className={'mb-0 border-0 bg-transparent px-1 mx-auto'}>
                {bookingDetails.type === 'Dinner' && <p className={'mb-1 mt-lg-3 text-danger text-center'}>Please note that this reservation requires an arrival time of
                    20:30.</p>}
                <Card.Body className={'py-1'}>
                    <Row>
                        <Col xl={12} className={`d-flex flex-column px-0 `}>
                            <Row className={'mb-1 '}>
                                <Col xs={4} xxl={3}>
                                    <p className={'info-text-lg my-1'}>Date</p>
                                    <p className={'mb-1 fw-350 reservation-finalize-view-text'}>{changeDateFormat(bookingDetails.date)}</p>
                                </Col>
                                <Col className={'px-1'} xs={4} xxl={3}>
                                    <p className={'info-text-lg my-1'}>Gazebo</p>
                                    <p className={'my-0 user-select-none fw-350 reservation-finalize-view-text'}>Gazebo {getTableAA(bookingDetails.table,Gazebos)}</p>
                                </Col>
                                <Col className={'px-1'} xs={4} xxl={3}>
                                    <p className={'info-text-lg my-1'}>{bookingDetails.more_rooms ? 'Rooms' : 'Room'}</p>
                                    <p className={'my-0 user-select-none fw-350 reservation-finalize-view-text'}>{`${bookingDetails.primary_room}${bookingDetails.more_rooms ? `, ${bookingDetails.secondary_room}` : ''}`}</p>
                                </Col>
                                <Col xxl={3}>
                                    <section className={'mb-1 my-xl-auto'}>
                                        <p className={'info-text-lg mb-1'}>Guests</p>
                                        <p className={'mb-1 flex-wrap fw-350 reservation-finalize-view-text'}>
                                            <span>{bookingDetails.last_name + ' ' + bookingDetails.first_name}</span>
                                            {bookingDetails.attendees.length >= 1 && (bookingDetails.attendees.map((attendee, index) => {
                                                return <span key={index}>{(', ' + attendee)}</span>
                                            }))}
                                        </p>
                                    </section>
                                </Col>
                            </Row>
                        </Col>
                        <Col xl={12} className={`px-0 mb-1 mt-xl-4`}>
                            <Row>
                                <Col xl={5}>
                                    <p className={'mb-1 info-text-lg'}>Contact</p>
                                    <Stack direction={'horizontal'} gap={2} className={`mb-1 flex-wrap`}>
                                        <p className={'my-1 mx-0 fw-350 reservation-finalize-view-text text-break'}>{bookingDetails.phone_number}</p>
                                        |
                                        <p className={'my-1 mx-0 fw-350 reservation-finalize-view-text text-break'}>{bookingDetails.email}</p>
                                    </Stack>
                                </Col>
                                <Col xs={12} xl={7}>
                                    <MenusOverview className={'my-auto px-0'}></MenusOverview>
                                </Col>
                            </Row>
                        </Col>
                        {/*{innerWidth <= 1200 && <MenusOverview className={'my-auto px-0 '}></MenusOverview>}*/}
                    </Row>
                </Card.Body>
                <Card.Footer className={'bg-transparent border-0 d-flex flex-column text-center'}>
                    <Notes containerRef={ref}/>
                    <Button variant={'outline-light'} className={'mt-3 mx-auto rounded-3 border-0 reservation-button text-dark text-nowrap'}
                            onClick={handleFinalizeReservation}>
                        Reserve
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    )
});
