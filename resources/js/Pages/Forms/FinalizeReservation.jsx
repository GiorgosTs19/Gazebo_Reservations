import {Button, Card, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import {useContext, useState} from "react";
import {BookingDetailsContext} from "../../Contexts/BookingDetailsContext";
import {changeDateFormat, getMenuName, getTableAA} from "../../ExternalJs/Util";
import {MenuContext} from "../../Contexts/MenuContext";
import React from "react";
import {FormProgressContext} from "../../Contexts/FormProgressContext";
import {Inertia} from "@inertiajs/inertia";
import {InnerWidthContext} from "../../Contexts/InnerWidthContext";

export function FinalizeReservation({Gazepos}) {
    const {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext),
    Menus = useContext(MenuContext),
    innerWidth = useContext(InnerWidthContext),
    handleNotesChange = (e) => {
        setBookingDetails({...bookingDetails,notes:e.target.value});
    },
    handleFinalizeReservation = () => {
        Inertia.post(route('Create_Reservation'),bookingDetails,{
            preserveState:true,
            preserveScroll:true,
        });
    };
    return (
        <div className={'p-0'}>
            <Card className={'mb-0 border-0'}>
                <p className={'mt-1 mb-3 text-danger'}>Please note that this booking requires an arrival time of 20:30.</p>
                {/*<p className={'mt-0 mb-3 text-danger'} >requires an arrival time of 20:30.</p>*/}
                <Row className={'mx-auto'}>
                    <Col md={6} className={innerWidth >= 768 ? 'border-end' : 'border-bottom'}>
                        <Card.Header className={'bg-transparent mx-auto border-0'}>
                           <i><Card.Subtitle className={'mb-2'}>Reservation's Details</Card.Subtitle></i>
                            <div><i>Date :</i> {changeDateFormat(bookingDetails.date,'-','-')}</div>
                            <div><i>Reserved Table :</i>  Table {getTableAA(bookingDetails.table,Gazepos)}</div>
                            <div><i>Reservation for {bookingDetails.number_of_people} people</i></div>

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
                                <span><i>Full Name :</i> {bookingDetails.last_name + ' ' + bookingDetails.first_name}</span>
                            </Card.Text>
                            <Card.Text className={'mb-1'}>
                                <span><i>Email :</i> {bookingDetails.email}</span>
                            </Card.Text>
                            <Card.Text className={'mb-1'}>
                                <span><i>Mobile :</i> {bookingDetails.phone_number}</span>
                            </Card.Text>
                        </div>
                    </Col>
                </Row>
                <Card.Body className={'my-0 my-md-2'}>
                    <div className={'border-bottom  mb-1 mx-auto'} style={{width:'fit-content'}}>
                        <i><Card.Subtitle className={'mb-2'}>Selected {bookingDetails.more_rooms ? 'Menus / Room' : 'Menu'}</Card.Subtitle></i>
                        <Card.Text className={'mb-2'}>
                            <i>{bookingDetails.primary_room + ' : ' + getMenuName(bookingDetails.primary_menu.Main,Menus) + ' Menu'
                                + ', ' + getMenuName(bookingDetails.primary_menu.Dessert,Menus)}</i>
                        </Card.Text>
                        <Card.Text className={'mb-2'}>
                            <i>{bookingDetails.secondary_room !== '' &&
                                bookingDetails.secondary_room + ' : ' + getMenuName(bookingDetails.secondary_menu.Main,Menus) + ' Menu'
                                + ', ' + getMenuName(bookingDetails.secondary_menu.Dessert,Menus)}</i>
                        </Card.Text>
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
                    <Button variant={'outline-success'} className={'m-3 mx-auto rounded-4 shadow-sm'}
                            onClick={handleFinalizeReservation}>
                        Reserve
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    )
}
