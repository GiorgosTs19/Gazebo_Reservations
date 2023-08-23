import {Form} from "react-bootstrap";
import {useContext} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";

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

    return (
        <>
            {
            bookingDetails.number_of_people > 1 && bookingDetails.type === 'Dinner' &&
            <div className={'text-center my-2'}>
                {/*<p className={'mx-auto text-danger'}>*/}
                {/*    You have selected to make a reservation for more than 2 guests.*/}
                {/*</p>*/}
                <p className={'mx-auto my-1'}>
                    If the guests in your reservation are from multiple rooms,
                </p>
                <p className={'mx-auto mb-2 mt-1'}>
                    please let us know.
                </p>
                <div className="mb-3">
                    <Form.Check inline label="Yes" name="MoreRooms" type={"radio"} id={'Yes'}
                        onChange={handleMRChange} value={"Yes"} checked={bookingDetails.more_rooms === true}/>
                    <Form.Check inline label="No" name="MoreRooms" type={"radio"} id={'No'}
                        onChange={handleMRChange} value={"No"} checked={bookingDetails.more_rooms === false}/>
                </div>
            </div>
        }
        </>
    )
}
