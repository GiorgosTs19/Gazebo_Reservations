import {Button} from "react-bootstrap";
import {GazeboLocation} from "./GazeboLocation";
import {useContext} from "react";
import {BookingDetailsContext} from "../../../../Contexts/BookingDetailsContext";

export function GazeboCarouselItem({Gazebo,isAvailable, children}) {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    handleSelect = ()=>{
        if(bookingDetails.table !== Gazebo.id)
            setBookingDetails({...bookingDetails,table:Gazebo.id});
    };

    return (
        <div className={`my-auto d-flex flex-column ${!isAvailable ? 'opacity-25':''}`}>
            <h3>Gazebo {Gazebo.ascending_number}</h3>
            {isAvailable ? <>
                <GazeboLocation index={Gazebo.ascending_number}></GazeboLocation>
                <Button variant="outline-dark"  onClick={handleSelect}
                        disabled={!isAvailable || bookingDetails.table === Gazebo.id} className={'border-0 rounded-3 box_shadow mt-3 py-2 px-4 reservation-button mx-auto w-auto'}>
                    {isAvailable ? (bookingDetails.table === Gazebo.id ? 'Selected' : 'Select' ): 'Unavailable'}
                </Button>
            </> : children}
        </div>
    )
}
