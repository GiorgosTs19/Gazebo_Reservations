import {Form, InputGroup} from "react-bootstrap";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {useContext} from "react";
import {checkAttendees} from "./RequirementsChecks";
import {ErrorsContext} from "../../Admin/Contexts/ErrorsContext";

export function PrimaryContactDetails({singleGuest}) {
    const emailRegex = /^[\w\.-]+@[\w\.-]+\.\w+$/;
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    {errors, setErrors} = useContext(ErrorsContext);
    const emailErrorExists = (errors && Object.keys(errors).includes('email') && errors.email !== '' )|| !emailRegex.test(bookingDetails.email);

    const handleEChange = (e)=>{
        // Handles the Booking's Email field change.
        if(errors && errors.email && emailRegex.test(e.target.value)) {
            setErrors(prev=>{
                return delete prev.email;
            })
        }
        setBookingDetails(prev=>{return {...prev,email:e.target.value}});
    },
    handlePNChange = (e)=>{
        // Handles the Booking's Phone Number field change.
        setBookingDetails(prev=>{return {...prev,phone_number:e.target.value}});
    };
    const checkShowRequirements = ()=>{
        return bookingDetails.first_name.length>0 && bookingDetails.last_name.length>0;
    };

    const inputMargin = checkAttendees(bookingDetails) && !singleGuest ? 'mx-1' : 'mx-1 mx-md-auto';
    const emailChecks = emailRegex.test(bookingDetails.email);

    return (
        <>
            {checkShowRequirements() && <InputGroup className="mb-2">
                <Form.Control type="email" placeholder="Email" size={"sm"} className={`mb-2 text-center box_shadow border-1 ${inputMargin} mw-300px ${bookingDetails.email.length > 0 && emailErrorExists ? 'border-danger' : ''}`}
                              value={bookingDetails.email}
                              onChange={handleEChange}/>
                {}
                <Form.Control type="text" placeholder="Phone Number" size={"sm"} className={`mb-2 text-center box_shadow border-0 ${inputMargin} mw-300px`}
                              value={bookingDetails.phone_number}
                              onChange={handlePNChange}/>
            </InputGroup>}
            {bookingDetails.email.length > 0 && emailErrorExists && <span className={'my-2 text-danger'}>{(errors && errors.email) ? errors.email : 'Invalid email address'}</span>}
        </>
    )
}
