import {Button, Carousel, Image, Stack} from "react-bootstrap";
import {GazeboLocation} from "./GazeboLocation";
import {useContext, useEffect} from "react";
import {BookingDetailsContext} from "../../../../Contexts/BookingDetailsContext";
import {ContainerRefContext} from "../../../../Contexts/ContainerRefContext";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {IsTouchableContext} from "../../../../Contexts/IsTouchableContext";

export function GazeboCarouselItem({Gazebo,isAvailable}) {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    innerWidth = useContext(InnerWidthContext),
    handleSelect = ()=>{
        if(bookingDetails.table !== Gazebo.id)
            setBookingDetails({...bookingDetails,table:Gazebo.id});
    },
    isTouchable = useContext(IsTouchableContext);

    return (
        <>

            <div className={'my-4 '}>
                {
                    !isAvailable &&
                    <Carousel.Caption className={'d-flex h-100 z-3'}>
                        <h1 className={'display-5 m-auto text-center'}>Unavailable</h1>
                    </Carousel.Caption>
                }
                <div className={!isAvailable ? 'opacity-25':''}>
                    <h3>{bookingDetails.type === 'Dinner' ? 'Table' : 'Bed'} {Gazebo.ascending_number}</h3>
                    <GazeboLocation index={Gazebo.ascending_number}></GazeboLocation>
                    {/*{isAvailable &&*/}
                    <Button variant="outline-dark"  onClick={handleSelect}
                            disabled={!isAvailable || bookingDetails.table === Gazebo.id} className={'rounded-5 shadow-sm mt-4 p-2 reservation-button w-50'}>
                        {isAvailable ? (bookingDetails.table === Gazebo.id ? 'Selected' : 'Select' ): 'Unavailable'}
                    </Button>
                </div>

                {/*<div style={{ position: 'relative' }} className={'mt-3'}>*/}

                {/*</div>*/}
            </div>
        </>
    )
}
