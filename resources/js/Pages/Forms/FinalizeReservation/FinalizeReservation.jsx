import {Button, Card, Col, Form, Image, Row} from "react-bootstrap";
import {useContext, useState} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {changeDateFormat, getTableAA} from "../../../ExternalJs/Util";
import {MenuContext} from "../../../Contexts/MenuContext";
import {Inertia} from "@inertiajs/inertia";
import {InnerWidthContext} from "../../../Contexts/InnerWidthContext";
import {GazebosContext} from "../../../Contexts/GazebosContext";
import {forwardRef} from "react";
import {CalendarSVG} from "../../../SVGS/CalendarSVG";
import {UserSVG} from "../../../SVGS/UserSVG";
import {MenusOverview} from "./MenusOverview";
import {ErrorsContext} from "../../Admin/Contexts/ErrorsContext";

export const  FinalizeReservation = forwardRef(function FinalizeReservation({...props},ref) {
    const {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext),
    Menus = useContext(MenuContext),
    innerWidth = useContext(InnerWidthContext),
    {errors, setErrors} = useContext(ErrorsContext),
    Gazebos = useContext(GazebosContext),
    // Handles the change of the booking's notes
    handleNotesChange = (e) => {
        setBookingDetails({...bookingDetails,notes:e.target.value});
    },
    // Handles the inertia request to submit the reservation and store it in the database.
    handleFinalizeReservation = () => {
        Inertia.post(route('Create_Reservation'),bookingDetails,{
            preserveState:true,
            preserveScroll:true,
            onError:(error)=>setErrors(error.Reservation),
        });
    };
    return (
        <div className={'p-0 mh-580px overflow-y-auto overflow-x-hidden'} ref={ref}>
            <Card className={'mb-0 mt-3 border-0 bg-transparent'}>
                {bookingDetails.type === 'Dinner' && <p className={'mt-1 mb-3 text-danger'}>Please note that this booking requires an arrival time of
                    20:30.</p>}
                <Row className={''}>
                    <Col md={4} className={innerWidth >= 768 ? 'border-end border-dark ' : 'border-bottom border-dark'}>
                        <Card.Header className={'bg-transparent mx-auto border-0 d-flex flex-column'}>
                           <i><Card.Subtitle className={'mb-2 info-text-lg'}>Reservation's Details</Card.Subtitle></i>
                            <section className={'d-flex mx-auto my-1'}>
                            {changeDateFormat(bookingDetails.date,'-','-')}</section>
                            <section className={'d-flex mx-auto my-1 fw-bold'}>
                                {bookingDetails.number_of_people} {bookingDetails.number_of_people === 1 ? 'Guest' : 'Guests'}
                            </section>
                            <section className={'mt-3 mx-auto w-fit-content'}>
                                <i><Card.Subtitle className={'mb-2'}>{bookingDetails.more_rooms ? `Rooms` : 'Room'}</Card.Subtitle></i>
                                <Card.Text>
                                    <span>{bookingDetails.primary_room}</span>
                                    {bookingDetails.secondary_room !== '' && <span>{', ' + bookingDetails.secondary_room}</span>}
                                </Card.Text>
                            </section>
                            <section className={'d-flex mx-auto my-3'}>
                                <div className="image-container bg-transparent">
                                    <Image src="Images/Icons/gazebo_icon.png" alt="" width={50} height={50}/>
                                    <span className="overlay-number">{getTableAA(bookingDetails.table,Gazebos)}</span>
                                </div>
                            </section>
                        </Card.Header>
                    </Col>
                    <Col md={4} className={innerWidth >= 768 ? 'border-end border-dark' : 'border-bottom border-dark'}>
                        <div className={'pt-3 pt-md-2 mx-auto w-fit-content'}>
                            <i><Card.Subtitle className={'mb-2 info-text-lg'}>Reservation's Contact</Card.Subtitle></i>
                            <Card.Text className={'my-3 my-xl-4'}>
                                <span>{bookingDetails.last_name + ' ' + bookingDetails.first_name}</span>
                            </Card.Text>
                            <Card.Text className={'my-3 my-xl-5'}>
                                <span>{bookingDetails.email}</span>
                            </Card.Text>
                            <Card.Text className={'my-3 my-xl-4'}>
                                <span>{bookingDetails.phone_number}</span>
                            </Card.Text>
                        </div>
                        {bookingDetails.type === 'Bed' && <MenusOverview className={'mt-5'}></MenusOverview>}
                    </Col>
                    <Col md={4} className={'d-flex flex-column mt-3 mt-md-0'}>
                        {bookingDetails.type === 'Dinner' && <MenusOverview className={'my-auto'}></MenusOverview>}
                        {bookingDetails.attendees.length >= 1 && <div className={'pt-1 pt-md-2 m-auto w-fit-content border-dark'}>
                            <i><Card.Subtitle className={'my-2 info-text-lg'}>Guests accompanying you</Card.Subtitle></i>
                            <Card.Text>
                                {bookingDetails.attendees.map((attendee, index) => {
                                    return <span key={index}>{index > 0 ? (', ' + attendee) : attendee}</span>
                                })}
                            </Card.Text>
                        </div>}
                    </Col>
                </Row>
                <Card.Footer className={'bg-transparent border-0 mt-3 mt-md-5'}>
                    <div className={'pb-2 px-2 pt-0'}>
                        <Card.Subtitle className={'mb-2 '}>Additional Notes</Card.Subtitle>
                        <Form.Control as="textarea" placeholder="Notes"
                                      className={'mx-auto'} style={{ height: '100px',resize:'none',width:innerWidth > 992 ? '50%' : '85%'}}
                                      value={bookingDetails.notes} onChange={handleNotesChange} autoFocus/>
                    </div>
                    <Button variant={'outline-light'} className={'m-3 mx-auto rounded-3 box_shadow border-0 reservation-button text-dark'}
                            onClick={handleFinalizeReservation}>
                        Reserve
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    )
});
