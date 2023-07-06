import {Form, InputGroup} from "react-bootstrap";
import {useContext, useEffect} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";

export function ContactNameFields({requirementsCheck}) {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    handleLNChange = (e)=> {
        setBookingDetails({...bookingDetails,last_name:e.target.value});
    },
    handleFNChange = (e)=>{
        // Handles the Booking's First Name field change.
        setBookingDetails({...bookingDetails,first_name:e.target.value});
    };

    return (
        <>
            {(bookingDetails.number_of_people!==0 && requirementsCheck())  &&
                <>
                    <p className={'text-secondary'}>Please fill in the Booking's Contact details.</p>
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
        </>
    )
}
