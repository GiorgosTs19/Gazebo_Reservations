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
        <div className={`my-auto d-flex flex-column ${!isAvailable ? 'opacity-40' : ''}`}>
            <h3>Gazebo {Gazebo.ascending_number}</h3>
                <GazeboLocation index={Gazebo.ascending_number} showWave={isAvailable} className={'w-fit-content'}>
                    {children}
                    <Button variant="outline-dark"  onClick={handleSelect}
                            disabled={!isAvailable || bookingDetails.table === Gazebo.id}
                            className={'border-0 rounded-3 my-auto py-1 px-2  reservation-button mx-auto w-fit-content z-2 gazebo-select-button'}>
                        {isAvailable ? (bookingDetails.table === Gazebo.id ? 'Selected' : 'Select' ): 'Unavailable'}
                    </Button>
                </GazeboLocation>
        </div>
    )
}
