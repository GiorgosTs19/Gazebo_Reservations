import {Form} from "react-bootstrap";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {useContext} from "react";
import {checkAttendees} from "./RequirementsChecks";

export function MultipleRoomsField() {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    handleMRChange = (e)=>{
        // Handles the More Rooms Boolean variable from the radio buttons input.
        switch (e.target.value) {
            case 'Yes':
                if(bookingDetails.more_rooms === true)
                    break;
                else {
                    setBookingDetails({...bookingDetails, more_rooms:true, primary_room:'',secondary_room:''});
                }
                break;
            case 'No':
                if(bookingDetails.more_rooms === false)
                    break;
                else {
                    setBookingDetails({...bookingDetails, more_rooms:false, primary_room:'', secondary_room:''});
                }
                break;
        }
    };

    const checkShowRequirements = ()=>{
        return bookingDetails.email.length > 0 && bookingDetails.phone_number.length > 0 && bookingDetails.number_of_people > 1 && checkAttendees(bookingDetails);
    };
    return (
        checkShowRequirements() &&
        <div className={'text-center my-2 my-md-2'}>
            <p className={'mx-auto my-1 bold-info-text'}>
                Multiple Rooms
            </p>
            <div className="mb-2 text-nowrap">
                <Form.Check inline label="Yes" name="MoreRooms" type={"radio"} id={'Yes'} className={'text-nowrap'}
                    onChange={handleMRChange} value={"Yes"} checked={bookingDetails.more_rooms === true}/>
                <Form.Check inline label="No" name="MoreRooms" type={"radio"} id={'No'} className={'text-nowrap'}
                    onChange={handleMRChange} value={"No"} checked={bookingDetails.more_rooms === false}/>
            </div>
        </div>

    )
}
