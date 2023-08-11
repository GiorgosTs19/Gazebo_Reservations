import {Carousel} from "react-bootstrap";
import {GazeboCarouselItem} from "./GazeboCarouselItem";
import {useState} from "react";
import {GazebosContext} from "../../../../Contexts/GazebosContext";
import {useContext} from "react";
import {GazeboAvailabilityContext} from "../../../../Contexts/GazeboAvailabilityContext";
import {getAvailabilityByDate, getTableAvailabilityBoolean} from "../../../../ExternalJs/Util";
import {BookingDetailsContext} from "../../../../Contexts/BookingDetailsContext";

export function GazeboCarousel({Gazebos}) {
    const [index, setIndex] = useState(0),
    {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    Availability = useContext(GazeboAvailabilityContext);
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    const gazebosToShow = Gazebos.map((gazebo)=>{
        const isAvailable = getTableAvailabilityBoolean(gazebo.id,getAvailabilityByDate(bookingDetails.date,Availability))
        return (<Carousel.Item key={gazebo.id}>
            <GazeboCarouselItem Gazebo={gazebo} isAvailable={isAvailable}></GazeboCarouselItem>
        </Carousel.Item>)
    });
    return (
        <GazebosContext.Provider value={Gazebos}>
            <Carousel activeIndex={index} onSelect={handleSelect}
            className={'mx-auto'}
            variant={'dark'}
            interval={null}>
                {gazebosToShow}
            </Carousel>
        </GazebosContext.Provider>
    )
}
