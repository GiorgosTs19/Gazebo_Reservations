import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {useContext} from "react";
import {BookingDetailsContext} from "../../Contexts/BookingDetailsContext";
import {changeDateFormat, getMenuName, getTableAA} from "../../ExternalJs/Util";
import {MenuContext} from "../../Contexts/MenuContext";
import {Inertia} from "@inertiajs/inertia";
import {InnerWidthContext} from "../../Contexts/InnerWidthContext";
import {GazebosContext} from "../../Contexts/GazebosContext";
import {forwardRef} from "react";
import {CalendarSVG} from "../../SVGS/CalendarSVG";
import {TableSVG} from "../../SVGS/TableSVG";
import {UserSVG} from "../../SVGS/UserSVG";

export const  FinalizeReservation = forwardRef(function FinalizeReservation({...props},ref) {
    const {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext),
    Menus = useContext(MenuContext),
    innerWidth = useContext(InnerWidthContext),

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
        });
    };

    return (
        <div className={'p-0'} ref={ref}>
            <Card className={'mb-0 border-0 bg-transparent'}>
                {bookingDetails.type === 'Dinner' && <p className={'mt-1 mb-3 text-danger'}>Please note that this booking requires an arrival time of
                    20:30.</p>}
                <Row className={'mx-auto '}>
                    <Col md={6} className={innerWidth >= 768 ? 'border-end' : 'border-bottom'}>
                        <Card.Header className={'bg-transparent mx-auto border-0 d-flex flex-column'}>
                           <i><Card.Subtitle className={'mb-2'}>Reservation's Details</Card.Subtitle></i>
                            <div className={'d-flex mx-auto my-1'}>
                                <CalendarSVG className={'my-auto'}/>
                            {changeDateFormat(bookingDetails.date,'-','-')}</div>
                            <div className={'d-flex mx-auto my-1'}>
                                <UserSVG/>
                                {bookingDetails.number_of_people}
                            </div>
                            <div className={'d-flex mx-auto my-1'}>
                                Table {getTableAA(bookingDetails.table,Gazebos)}
                            </div>
                            <div className={'mt-3 mx-auto'} style={{width:'fit-content'}}>
                                <i><Card.Subtitle className={'mb-2'}>{bookingDetails.more_rooms ? 'Rooms' : 'Room'}</Card.Subtitle></i>
                                <Card.Text>
                                    <span>{bookingDetails.primary_room}</span>
                                    {bookingDetails.secondary_room !== '' && <span>{', ' + bookingDetails.secondary_room}</span>}
                                </Card.Text>
                            </div>
                        </Card.Header>
                    </Col>
                    <Col md={6} className={innerWidth >= 768 ? '' : 'border-bottom'}>
                        <div className={'pt-3 pt-md-2 mx-auto'} style={{width:'fit-content'}}>
                            <i><Card.Subtitle className={'mb-2'}>Reservation's Contact</Card.Subtitle></i>
                            <Card.Text className={'mb-1'}>
                                <span>{bookingDetails.last_name + ' ' + bookingDetails.first_name}</span>
                            </Card.Text>
                            <Card.Text className={'mb-1'}>
                                <span>{bookingDetails.email}</span>
                            </Card.Text>
                            <Card.Text className={'mb-1'}>
                                <span>{bookingDetails.phone_number}</span>
                            </Card.Text>
                        </div>
                    </Col>
                </Row>
                <Card.Body className={'my-0 my-md-2'}>
                    <div className={'border-bottom  mb-1 mx-auto'} style={{width:'fit-content'}}>
                        <i><Card.Subtitle className={'mb-2'}>Selected {bookingDetails.more_rooms ? 'Menus / Room' : 'Menu'}</Card.Subtitle></i>
                        <Card.Text className={'mb-2'}>
                            <i>{bookingDetails.primary_room + ' : ' + (bookingDetails.primary_menu.Main !== '' ? getMenuName(bookingDetails.primary_menu.Main,Menus,true) : '') + ' Menu'
                                + ', ' + (bookingDetails.primary_menu.Dessert !== '' ? getMenuName(bookingDetails.primary_menu.Dessert,Menus,true):'')}</i>
                        </Card.Text>
                        {bookingDetails.more_rooms && bookingDetails.secondary_room !== '' && <Card.Text className={'mb-2'}>
                            <i>
                                {bookingDetails.secondary_room + ' : ' + (bookingDetails.secondary_menu.Main !== '' ? getMenuName(bookingDetails.secondary_menu.Main,Menus,true) : '') + ' Menu'
                                + ', ' + (bookingDetails.secondary_menu.Dessert !== '' ? getMenuName(bookingDetails.secondary_menu.Dessert,Menus,true) : '')}</i>
                        </Card.Text>}
                    </div>
                    {bookingDetails.attendees.length > 1 && <div className={'border-bottom pt-1 pt-md-2 mx-auto'} style={{width: 'fit-content'}}>
                        <i><Card.Subtitle className={'my-2'}>Reservation's Attendees</Card.Subtitle></i>
                        <Card.Text>
                            {bookingDetails.attendees.map((attendee, index) => {
                                return <span key={index}>{index > 0 ? (', ' + attendee) : attendee}</span>
                            })}
                        </Card.Text>
                    </div>}
                </Card.Body>
                <Card.Footer className={'bg-transparent border-0'}>
                    <div className={'pb-2 px-2 pt-0'}>
                        <Card.Subtitle className={'mb-2 '}>Additional Notes</Card.Subtitle>
                        <Form.Control as="textarea" placeholder="Notes"
                                      className={'mx-auto'} style={{ height: '100px',resize:'none',width:innerWidth > 992 ? '50%' : '85%'}}
                                      value={bookingDetails.notes} onChange={handleNotesChange} autoFocus/>
                    </div>
                    <Button variant={'outline-dark'} className={'m-3 mx-auto rounded-4 shadow-sm reservation-button'}
                            onClick={handleFinalizeReservation}>
                        Reserve
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    )
});
