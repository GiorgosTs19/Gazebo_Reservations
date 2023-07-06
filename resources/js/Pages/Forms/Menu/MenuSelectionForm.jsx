import {useContext} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {RoomMenuSelection} from "./RoomMenuSelection";
import {Button} from "react-bootstrap";
import {FormProgressContext} from "../../../Contexts/FormProgressContext";

export function MenuSelectionForm() {
    const {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext),
    {progress, setProgress} = useContext(FormProgressContext),
    checkRequirement = () => {
        switch (bookingDetails.more_rooms) {
            case true : {
                return bookingDetails.primary_menu.Main !== '' && bookingDetails.secondary_menu.Main !== '' &&
                    bookingDetails.primary_menu.Dessert !== '' && bookingDetails.secondary_menu.Dessert !== '';
            }
            case false : {
                return bookingDetails.primary_menu !== '' && bookingDetails.primary_menu.Dessert !== '';
            }
            case null : {
                return bookingDetails.primary_menu !== '' && bookingDetails.primary_menu.Dessert !== '';
            }
        }
    },
    handleFinalize = () => {
        setProgress('Finalize');
    },
    handleBackToDetails = () => {
        setProgress('Details');
    };
    console.log(bookingDetails)
    return (
        <div className={'px-4 h-100'} style={{overflowY:'auto'}}>
            {/*<Button variant={'outline-dark'} className={'my-2 rounded-4 shadow-sm'} onClick={handleBackToDetails}>Back to Details</Button>*/}
            <p className={'my-1 text-info'}>* Number of Portions are adjusted</p>
            <p className={'my-1 text-info'}> to the number of people per room.</p>
            <RoomMenuSelection Room={bookingDetails.primary_room} primary></RoomMenuSelection>
            {checkRequirement() &&
                <Button variant={'outline-success'} onClick={handleFinalize} className={'rounded-4 shadow-sm'}>Finalize Reservation</Button>
            }
            {bookingDetails.secondary_room !== '' &&
                <RoomMenuSelection Room={bookingDetails.secondary_room}></RoomMenuSelection>}
        </div>
    )
}
