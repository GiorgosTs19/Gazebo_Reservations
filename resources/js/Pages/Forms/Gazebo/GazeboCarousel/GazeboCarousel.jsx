import {Carousel, Image, Stack} from "react-bootstrap";
import {GazeboCarouselItem} from "./GazeboCarouselItem";
import {useState} from "react";
import {GazebosContext} from "../../../../Contexts/GazebosContext";
import {useContext} from "react";
import {GazeboAvailabilityContext} from "../../../../Contexts/GazeboAvailabilityContext";
import {getAvailabilityByDate, getTableAvailabilityBoolean} from "../../../../ExternalJs/Util";
import {BookingDetailsContext} from "../../../../Contexts/BookingDetailsContext";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";

export function GazeboCarousel({Gazebos}) {
    const [index, setIndex] = useState(0),
    {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    Availability = useContext(GazeboAvailabilityContext),
    current_date_availability = getAvailabilityByDate(bookingDetails.date,Availability),
    innerWidth = useContext(InnerWidthContext);
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
            <Carousel activeIndex={index} onSelect={handleSelect} className={'mx-auto ' + (window.innerWidth > 800 ? ' w-50' : ' w-100')}
                      variant={'dark'}
                      interval={null}>
                {gazebosToShow}
            </Carousel>
        </GazebosContext.Provider>
    )
}
