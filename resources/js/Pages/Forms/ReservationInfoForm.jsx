import React, {useContext} from "react";
import {Button, Card, Form, InputGroup} from "react-bootstrap";
import '../../../css/ReservationForms.css'
import {FormProgressContext} from "../../Contexts/FormProgressContext";
import {BookingDetailsContext} from "../../Contexts/BookingDetailsContext";
import {changeDateFormat} from "../../ExternalJs/Util";
import {ContainerRefContext} from "../../Contexts/ContainerRefContext";

export function ReservationInfoForm({classname}) {
    const {progress, setProgress} = useContext(FormProgressContext),
    {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    ContainerRef = useContext(ContainerRefContext),
    handleScrollAndReturn = (boolean) => {
        console.log(boolean === true)
        if(boolean === true)
            ContainerRef.scrollTo({top: ContainerRef.scrollHeight,behavior:'smooth'});
        return boolean;
    },
    handlePreviousClick = ()=>{
        // Handles the click on the Back to Table Selection Button
        // Sets progress to "Table" to move back to the TableSelection tab
        setProgress('Table');
    },
    handleNextClick = ()=>{
        // Handles the click on the To Menu Selection Button
        // Sets progress to "Menu" to move forward to the MenuSelection tab
        setProgress('Menu');
    },
    handleNOPChange = (e)=>{
        // Handles the Number of People Select field change.
        // If the selection is not the currently selected it also resets the MoreRooms Boolean.
        let more_rooms = bookingDetails.more_rooms, attendees = bookingDetails.attendees;
        if(bookingDetails.number_of_people !== e.target.value) {
            more_rooms = null;
            attendees = []
        }
        setBookingDetails({...bookingDetails,number_of_people:parseInt(e.target.value),more_rooms:more_rooms,attendees:attendees});
    },
    handleMRChange = (e)=>{
        // Handles the More Rooms Boolean variable from the radio buttons input.
        switch (e.target.value) {
            case 'Yes':
                if(bookingDetails.more_rooms === true)
                    break;
                else
                    setBookingDetails({...bookingDetails, more_rooms:true, primary_room:'',secondary_room:''});
                    break;
            case 'No':
                if(bookingDetails.more_rooms === false)
                    break;
                else
                    setBookingDetails({...bookingDetails, more_rooms:false, primary_room:'', secondary_room:''});
                    break;
        }
    },
    handleLNChange = (e)=>{
        // Handles the Booking's Last Name field change.
        setBookingDetails({...bookingDetails,last_name:e.target.value});
    },
    handleFNChange = (e)=>{
        // Handles the Booking's First Name field change.
        setBookingDetails({...bookingDetails,first_name:e.target.value});
    },
    handleEChange = (e)=>{
        // Handles the Booking's Email field change.
        setBookingDetails({...bookingDetails,email:e.target.value});
    },
    handlePNChange = (e)=>{
        // Handles the Booking's Phone Number field change.
        setBookingDetails({...bookingDetails,phone_number:e.target.value});
    },
    handlePRNChange = (e)=>{
        // Handles the Booking's Primary Room Number field change.
        setBookingDetails({...bookingDetails,primary_room:e.target.value});
    },
    handleSRNChange = (e)=>{
        // Handles the Booking's Secondary Room Number field change.
        setBookingDetails({...bookingDetails,secondary_room:e.target.value});
    },
    checkShowRequirements = ()=>{
        // Checks the requirements for each form step to appear
        if(bookingDetails.number_of_people>2)
            return bookingDetails.more_rooms !==null;
        return true;

    },
    handleAttendeeNameChange = (e, index) => {
        // Handles the Booking's bookingDetails.attendees first name fields change.
        const updatedAttendees = bookingDetails.attendees;
        updatedAttendees[index] = e.target.value;
        setBookingDetails({...bookingDetails,attendees:updatedAttendees});
    },
    checkAttendeesRequirements = (length) => {
        const containsNoEmptyStrings = bookingDetails.attendees.every(function(element) {
            return element !== "";
        });
        if(!containsNoEmptyStrings)
            return false;
        return bookingDetails.attendees.length === length;
    },
    checkProceedRequirements = () => {
        // Checks the requirements for proceeding to the Menu Selection Tab
        switch (bookingDetails.number_of_people) {
            case 1:
                return handleScrollAndReturn((bookingDetails.last_name.length > 0 && bookingDetails.first_name.length > 0
                    && bookingDetails.email.length > 0 && bookingDetails.phone_number.length > 0 && bookingDetails.primary_room !== ''));
            case 2:
                return handleScrollAndReturn((bookingDetails.last_name.length > 0 && bookingDetails.first_name.length > 0
                    && bookingDetails.email.length > 0 && bookingDetails.phone_number.length > 0 && bookingDetails.primary_room !== ''
                    && checkAttendeesRequirements(1)));
            case 3:
            case 4:
                switch (bookingDetails.more_rooms) {
                    case null:
                        return false;
                    case true:{
                        return handleScrollAndReturn((bookingDetails.last_name.length > 0 && bookingDetails.first_name.length > 0
                            && bookingDetails.email.length > 0 && bookingDetails.phone_number.length > 0
                            && bookingDetails.primary_room !== '' && bookingDetails.secondary_room !== ''
                            && checkAttendeesRequirements(bookingDetails.number_of_people-1)))
                    }
                    case false:
                        return handleScrollAndReturn((bookingDetails.last_name.length > 0 && bookingDetails.first_name.length > 0
                            && bookingDetails.email.length > 0 && bookingDetails.phone_number.length > 0 && bookingDetails.primary_room !== ''
                            && checkAttendeesRequirements(bookingDetails.number_of_people-1)));
                }
        }
    };
    return (
            <Card className={'text-center p-2 my-2 mx-auto ' + classname} style={{width:'90%'}}>
                <Card.Header>
                    <Button variant={'outline-dark'} className={'my-2'}
                            onClick={handlePreviousClick} size={'sm'}>
                        Back to Table Selection
                    </Button>
                    <h5>Reservation Date : {changeDateFormat(bookingDetails.date,'-','-')}</h5>
                </Card.Header>
                <Card.Body>
                    <Form className={'form-container p-2 text-center'}>
                        <p>Please specify the number of people for your reservation.</p>
                        <Form.Select size="sm" defaultValue={"Please Select"} className={'my-2 text-center'}
                                     onChange={handleNOPChange}>
                            <option hidden>Please Select</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </Form.Select>
                        {
                            bookingDetails.number_of_people > 2 &&
                            <div className={'text-center my-2'}>
                                <p className={'mx-auto text-danger'}>
                                    You have selected to make a reservation for more than 2 guests.
                                </p>
                                <p className={'mx-auto text-danger'}>
                                    If the guests in your reservation are from multiple rooms, please let us know.
                                </p>
                                <div className="mb-3">
                                    <Form.Check inline label="Yes" name="MoreRooms" type={"radio"} id={'Yes'}
                                                onChange={handleMRChange} value={"Yes"} checked={bookingDetails.more_rooms === true}/>
                                    <Form.Check inline label="No" name="MoreRooms" type={"radio"} id={'No'}
                                                onChange={handleMRChange} value={"No"} checked={bookingDetails.more_rooms === false}/>
                                </div>
                            </div>
                        }
                        {(bookingDetails.number_of_people!==0 && checkShowRequirements())  &&
                            <>
                                <p className={'text-warning'}>Please fill in the Booking's Contact details.</p>
                                <InputGroup className="mb-3" size={"sm"}>
                                    <Form.Control type="text" placeholder="Last Name" size={"sm"} className={'mb-2 text-center'}
                                                  value={bookingDetails.last_name}
                                                  onChange={handleLNChange}/>
                                    <Form.Control type="text" placeholder="First Name" size={"sm"} className={'mb-2 text-center'}
                                                  value={bookingDetails.first_name}
                                                  onChange={handleFNChange}/>
                                </InputGroup>
                            </>
                        }
                        {(bookingDetails.first_name.length>0 && bookingDetails.last_name.length>0 && checkShowRequirements()) && <InputGroup className="mb-3">
                            <Form.Control type="email" placeholder="Email" size={"sm"} className={'mb-2 text-center'}
                                          value={bookingDetails.email}
                                          onChange={handleEChange}/>
                            <Form.Control type="text" placeholder="Phone Number" size={"sm"} className={'mb-2 text-center'}
                                          value={bookingDetails.phone_number}
                                          onChange={handlePNChange}/>
                        </InputGroup>}
                        {(bookingDetails.email.length>0 && bookingDetails.phone_number.length>0 && checkShowRequirements()) &&<InputGroup className="mb-3r">
                            <Form.Control type="number" placeholder={"Room Number " + (bookingDetails.more_rooms ? ' 1' : '')}
                                          size={"sm"} className={'mb-2 text-center'} value={bookingDetails.primary_room} onChange={handlePRNChange}/>
                            {bookingDetails.more_rooms && <Form.Control type="number" placeholder={"Room Number 2"} size={"sm"}
                                                        className={'mb-2 text-center'} value={bookingDetails.secondary_room} onChange={handleSRNChange}/>}
                        </InputGroup>
                        }
                        {
                            bookingDetails.email.length>0 && bookingDetails.phone_number.length>0 && bookingDetails.number_of_people > 1 && checkShowRequirements()
                            &&
                            <>
                                <p className={'text-warning'}>Please provide the first names of the additional Attendees accompanying you.</p>
                                <InputGroup className="mb-3">
                                    {/*Return inputs for attendee's first names based on the number of people variables */}
                                    {Array.from({ length:bookingDetails.number_of_people-1 }).map((_, index)=>{
                                        let number = index +2;
                                        return <Form.Control key={'Attendee ' + number} type="text" placeholder={"Name " + number}
                                                             size={"sm"} className={'mb-2 text-center'} value={bookingDetails.attendees[index] || ''}
                                                             onChange={(e)=>handleAttendeeNameChange(e,index)}/>
                                    })}
                                </InputGroup>
                            </>
                        }
                        {
                            checkProceedRequirements() && <Button variant={'outline-success'} onClick={handleNextClick} className={'mt-2'}>
                                Proceed to Menu Selection
                            </Button>
                        }
                    </Form>
                </Card.Body>
            </Card>
    )
}
