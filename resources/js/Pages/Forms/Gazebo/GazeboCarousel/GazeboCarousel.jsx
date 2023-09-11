import {Carousel} from "react-bootstrap";
import {GazeboCarouselItem} from "./GazeboCarouselItem";
import {useState} from "react";
import {GazebosContext} from "../../../../Contexts/GazebosContext";
import {useContext} from "react";
import {getTableAvailabilityBoolean} from "../../../../ExternalJs/Util";
import {BookingDetailsContext} from "../../../../Contexts/BookingDetailsContext";
import {useGetAvailabilityForDate} from "../../../../CustomHooks/useGetAvailabilityForDate";
import {SpinnerSVG} from "../../../../SVGS/SpinnerSVG";

export function GazeboCarousel() {
    const [index, setIndex] = useState(0),
    {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    Gazebos = useContext(GazebosContext);
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    const [requestProgress, availability, setAvailability] = useGetAvailabilityForDate(bookingDetails.date, bookingDetails.type);
    const gazebosToShow = Gazebos.map((gazebo)=>{
        const isAvailable = getTableAvailabilityBoolean(gazebo.id,availability);
        return (<Carousel.Item key={gazebo.id}>
            <GazeboCarouselItem Gazebo={gazebo} isAvailable={isAvailable}>
                {
                    !isAvailable &&
                    <Carousel.Caption className={'z-3 m-auto position-relative start-0'}>
                        <h1 className={'display-5 my-auto text-center'}>Unavailable</h1>
                    </Carousel.Caption>
                }
            </GazeboCarouselItem>
        </Carousel.Item>)
    });

    return (
        <GazebosContext.Provider value={Gazebos}>
            {requestProgress === 'Pending' ? <SpinnerSVG/> :
                <Carousel activeIndex={index} onSelect={handleSelect}
                   className={'mx-auto py-4 text-dark'}
                   variant={'dark'}
                   controls
                   interval={null}>
                {gazebosToShow}
            </Carousel>}
        </GazebosContext.Provider>
    )
}
