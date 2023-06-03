import {Button, Card, FloatingLabel, Form} from "react-bootstrap";
import {useContext} from "react";
import {BookingDetailsContext} from "../../Contexts/BookingDetailsContext";
import {changeDateFormat, getMenuName, getTableAA} from "../../ExternalJs/Util";
import {MenuContext} from "../../Contexts/MenuContext";
import React from "react";
import {FormProgressContext} from "../../Contexts/FormProgressContext";
import {Inertia} from "@inertiajs/inertia";
import {usePage} from "@inertiajs/inertia-react";

export function FinalizeReservation({Gazepos}) {
    const {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext),
    flash = usePage().props,
    {progress, setProgress} = useContext(FormProgressContext),
    Menus = useContext(MenuContext),
    handleNotesChange = (e) => {
        setBookingDetails({...bookingDetails,notes:e.target.value});
    },
    handleBackToMenu = () => {
        setProgress('Menu');
    },
    handleFinalizeReservation = () => {
        Inertia.post(route('Create_Reservation'),bookingDetails,{
            preserveState:true,
            preserveScroll:true,
            // onSuccess:(res)=>{
            //     console.log(res)
            // }
        });
    };
    console.log(flash)
    return (
        <div>
            <Button variant={'outline-dark'} className={'mt-3'} onClick={handleBackToMenu}>Back to Menu Selection</Button>
            <Card className={'my-3'}>
                <Card.Header className={'bg-transparent'}>
                    <div>Reservation Date : {changeDateFormat(bookingDetails.date,'-','-')}</div>
                    <div>Reserved Table : Table {getTableAA(bookingDetails.table,Gazepos)}</div>
                    <div>Reservation for {bookingDetails.number_of_people} people</div>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className={'mb-2'}>Reservations's Contact</Card.Subtitle>
                    <Card.Text className={'mb-1'}>
                        {bookingDetails.last_name + ' ' + bookingDetails.first_name}
                    </Card.Text>
                    <Card.Text className={'mb-1'}>
                        {bookingDetails.email}
                    </Card.Text>
                    <Card.Text className={'mb-1'}>
                        {bookingDetails.phone_number}
                    </Card.Text>
                    <Card.Subtitle className={'mb-2'}>Reservations's Attendees</Card.Subtitle>
                    <Card.Text>
                        {bookingDetails.attendees.map((attendee,index)=>{
                            return <span key={index}>{index > 0 ? (', ' + attendee): attendee}</span>
                        })}
                    </Card.Text>
                    <Card.Subtitle className={'mb-2'}>Rooms</Card.Subtitle>
                    <Card.Text>
                        <span>{bookingDetails.primary_room}</span>
                        {bookingDetails.secondary_room !== '' && <span>{', ' + bookingDetails.secondary_room}</span>}
                    </Card.Text>
                    <Card.Subtitle className={'mb-2'}>Selected Menus</Card.Subtitle>
                    <Card.Text className={'mb-2'}>
                        {bookingDetails.primary_room + ' { ' + getMenuName(bookingDetails.primary_menu,Menus) + ' }'}
                    </Card.Text>
                    <Card.Text className={'mb-3'}>
                        {bookingDetails.secondary_room !== '' &&
                            bookingDetails.secondary_room + ' { ' + getMenuName(bookingDetails.secondary_menu,Menus) + ' }'}
                    </Card.Text>
                    <Form>
                        <Card.Subtitle className={'mb-2'}>Additional Notes</Card.Subtitle>
                        <FloatingLabel label="Notes">
                            <Form.Control
                                as="textarea"
                                placeholder="Notes"
                                style={{ height: '100px',resize:'none'}}
                                value={bookingDetails.notes}
                                onChange={handleNotesChange}
                                autoFocus
                            />
                        </FloatingLabel>
                    </Form>
                </Card.Body>
                <Card.Footer className={'bg-transparent'}>
                    <Card.Subtitle className={'text-info my-2'}><u>Please note that this booking </u></Card.Subtitle>
                    <Card.Subtitle className={'text-info my-2 mx-3'}><u>requires an arrival time of 20:30. </u></Card.Subtitle>
                </Card.Footer>
                <Button variant={'outline-success'} size={'sm'} className={'m-3'} onClick={handleFinalizeReservation}>Reserve</Button>
            </Card>
        </div>
    )
}
