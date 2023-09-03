import {Button, Carousel} from "react-bootstrap";
import {GazeboLocation} from "./GazeboLocation";
import {useContext} from "react";
import {BookingDetailsContext} from "../../../../Contexts/BookingDetailsContext";

export function GazeboCarouselItem({Gazebo,isAvailable}) {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    handleSelect = ()=>{
        if(bookingDetails.table !== Gazebo.id)
            setBookingDetails({...bookingDetails,table:Gazebo.id});
    };

    return (
        <div className={`my-5 ${!isAvailable ? 'opacity-25':''}`}>
            <h3>Gazebo {Gazebo.ascending_number}</h3>
            <GazeboLocation index={Gazebo.ascending_number}></GazeboLocation>
            {/*{isAvailable &&*/}
            <Button variant="outline-dark"  onClick={handleSelect}
                    disabled={!isAvailable || bookingDetails.table === Gazebo.id} className={'border-0 rounded-3 box_shadow mt-4 p-2 reservation-button w-50'}>
                {isAvailable ? (bookingDetails.table === Gazebo.id ? 'Selected' : 'Select' ): 'Unavailable'}
            </Button>
        </div>
    )
}
