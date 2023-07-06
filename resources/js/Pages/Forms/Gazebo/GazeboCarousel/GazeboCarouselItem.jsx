import {Button, Carousel, Image, Stack} from "react-bootstrap";
import {GazeboLocation} from "./GazeboLocation";
import {useContext, useEffect} from "react";
import {BookingDetailsContext} from "../../../../Contexts/BookingDetailsContext";
import {ContainerRefContext} from "../../../../Contexts/ContainerRefContext";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {IsTouchableContext} from "../../../../Contexts/IsTouchableContext";

export function GazeboCarouselItem({Gazebo,isAvailable}) {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    container = useContext(ContainerRefContext),
    innerWidth = useContext(InnerWidthContext),
    handleSelect = ()=>{
        if(bookingDetails.table !== Gazebo.id)
            setBookingDetails({...bookingDetails,table:Gazebo.id});
    },
    isTouchable = useContext(IsTouchableContext);

    return (
        <>
            {
                !isAvailable &&
                <Carousel.Caption className={'mb-5'}>
                    <h1 className={'display-5 mb-3 text-center'}>Unavailable</h1>
                </Carousel.Caption>
            }
            <div className={!isAvailable ? 'opacity-25':''}>
                <h3>Gazebo {Gazebo.ascending_number}</h3>
                <GazeboLocation index={Gazebo.ascending_number}></GazeboLocation>
                {isAvailable && isTouchable &&
                    <Button variant="outline-dark"  size={innerWidth > 1000 ? 'lg' : 'sm'} onClick={handleSelect}
                            disabled={bookingDetails.table === Gazebo.id} className={'rounded-5 shadow-sm mt-4 p-2'}>
                        {bookingDetails.table === Gazebo.id ? 'Selected' : 'Select'}
                    </Button>}
                <div style={{ position: 'relative' }} className={'mt-3'}>
                    <Image className={"d-block w-75 mx-auto shadow-lg gazepo-img my-2 rounded-5 img-fluid " + (isAvailable ? "gazepo-type-img-sm" : '')}
                        src="Images/GazeboAtNight.jpg" alt="" onClick={handleSelect}
                    />
                </div>
            </div>
        </>
    )
}
