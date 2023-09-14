import {Button, Card, Col, Form, Row, Stack} from "react-bootstrap";
import {useContext} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {changeDateFormat, getTableAA} from "../../../ExternalJs/Util";
import {Inertia} from "@inertiajs/inertia";
import {GazebosContext} from "../../../Contexts/GazebosContext";
import {forwardRef} from "react";
import {MenusOverview} from "./MenusOverview";
import {ErrorsContext} from "../../Admin/Contexts/ErrorsContext";

export const  FinalizeReservation = forwardRef(function FinalizeReservation({...props},ref) {
    const {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext),
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
        <div className={'px-2 mh-580px overflow-y-auto overflow-x-hidden text-start d-flex'} ref={ref}>
            <Card className={'mb-0 border-0 bg-transparent px-1 mx-auto '}>
                {bookingDetails.type === 'Dinner' && <p className={'mb-1 mt-lg-3 text-danger text-center'}>Please note that this reservation requires an arrival time of
                    20:30.</p>}
                <div>
                    <Row>
                        <Col>
                            <p className={'info-text my-1'}>Date</p>
                            <p className={'mb-1'}>{changeDateFormat(bookingDetails.date)}</p>
                        </Col>
                        <Col>
                            <p className={'info-text my-1'}>Gazebo</p>
                            <p className={'my-0 user-select-none'}>{getTableAA(bookingDetails.table,Gazebos)}</p>
                        </Col>
                    </Row>

                        <p className={'info-text mb-1'}>Guests</p>
                        <p className={'mb-1'}>
                            <span>{bookingDetails.last_name + ' ' + bookingDetails.first_name}</span>
                            {bookingDetails.attendees.length >= 1 && (bookingDetails.attendees.map((attendee, index) => {
                                return <span key={index}>{(', ' + attendee)}</span>
                            }))}
                        </p>

                    <p className={'mb-1 info-text'}>Contact</p>
                    <Stack direction={'horizontal'} gap={3} className={'mb-2'}>
                        <p className={'my-1'}>{bookingDetails.phone_number}</p>
                        <p className={'my-1'}>{bookingDetails.email}</p>
                    </Stack>
                    <MenusOverview className={'my-auto'}></MenusOverview>
                </div>
                <Card.Footer className={'bg-transparent border-0 d-flex flex-column text-center'}>
                    <Card.Subtitle className={'mb-2 '}>Additional Notes</Card.Subtitle>
                    <Form.Control as="textarea" placeholder="Notes"
                                  style={{ height: '100px',resize:'none'}}
                                  value={bookingDetails.notes} onChange={handleNotesChange} autoFocus/>
                    <Button variant={'outline-light'} className={'mt-3 mx-auto rounded-3 border-0 reservation-button text-dark'}
                            onClick={handleFinalizeReservation}>
                        Reserve
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    )
});
