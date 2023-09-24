import {Carousel, Form} from "react-bootstrap";
import {GazeboCarouselItem} from "./GazeboCarouselItem";
import {useEffect, useState} from "react";
import {GazebosContext} from "../../../../Contexts/GazebosContext";
import {useContext} from "react";
import {getTableAA, getTableAvailabilityBoolean} from "../../../../ExternalJs/Util";
import {BookingDetailsContext} from "../../../../Contexts/BookingDetailsContext";
import {useGetAvailabilityForDate} from "../../../../CustomHooks/useGetAvailabilityForDate";
import {SpinnerSVG} from "../../../../SVGS/SpinnerSVG";

export function GazeboCarousel() {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    Gazebos = useContext(GazebosContext),
    [index, setIndex] = useState(bookingDetails.table !== '' ? getTableAA(bookingDetails.table,Gazebos)-1 : 0);

    const [requestProgress, availability, setAvailability] = useGetAvailabilityForDate(bookingDetails.date, bookingDetails.type);
    const unavailableGazebosExist = availability.some(item=>item.isAvailable === false);

    const availableGazebos = availability.filter(item=>item.isAvailable === true);
    const onlyOneAvailable = availableGazebos.length === 1;
    const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
    const gazebosToMap = showOnlyAvailable ? Gazebos.filter(item1=>availableGazebos.some(item2=>item1.id === item2.id)) : Gazebos;
    const [showFirstAvailableMessage, setShowFirstAvailableMessage] = useState(false);
    const gazebosToShow = gazebosToMap.map((gazebo)=> {
        const isAvailable = getTableAvailabilityBoolean(gazebo.id,availability);
        return (<Carousel.Item key={gazebo.id} tabIndex={gazebo.ascending_number}>
            <GazeboCarouselItem Gazebo={gazebo} isAvailable={isAvailable}>
                {
                    !isAvailable &&
                    <Carousel.Caption className={'z-3 m-auto position-relative start-0'}>
                        <h1 className={'display-5 text-center'}>Unavailable</h1>
                    </Carousel.Caption>
                }
            </GazeboCarouselItem>
        </Carousel.Item>)
    });

    const handleSelectIndex = (selectedIndex) => {
        setIndex(selectedIndex);
        if(showFirstAvailableMessage)
            setShowFirstAvailableMessage(false);
    };

    const handleSelectGazebo = (id)=>{
        if(bookingDetails.table !== id)
            setBookingDetails({...bookingDetails,table:id});
    };
    useEffect(()=>{
        setShowOnlyAvailable(onlyOneAvailable);
        setShowFirstAvailableMessage(unavailableGazebosExist && !onlyOneAvailable);
    }, [availability]);

    useEffect(()=>{
        const firstAvailableGazebo = availability.find(item=>item.isAvailable === true);
        if(!firstAvailableGazebo)
            return;
        if(onlyOneAvailable) {
            handleSelectGazebo(availableGazebos[0].id);
        }
        if(getTableAA(firstAvailableGazebo.id,Gazebos) === 1)
            return;
        setIndex(!showOnlyAvailable ? getTableAA(firstAvailableGazebo.id,Gazebos)-1 : 0);
    },[availability, showOnlyAvailable]);

    const handleShowOnlyAvailableTablesChange = () => {
        setShowOnlyAvailable(!showOnlyAvailable);
    };

    return (
        <GazebosContext.Provider value={Gazebos}>
            {requestProgress === 'Pending' ? <SpinnerSVG/> :
                <>
                    {unavailableGazebosExist  && <div className={'mx-auto'}>
                        <h6 className={'info-text text-dark'}>Available Only</h6>
                        <Form.Switch className={'mx-1 mb-1'} checked={showOnlyAvailable} disabled={onlyOneAvailable}
                                     onChange={handleShowOnlyAvailableTablesChange}></Form.Switch>
                    </div>}
                    {onlyOneAvailable && <span className={'m-auto text-dark info-text px-3'}>Gazebo {getTableAA(bookingDetails.table, Gazebos)} auto-selected: only one available</span>}
                    {showFirstAvailableMessage && <span className={'m-auto text-dark info-text-lg px-3'}>First Available Gazebo</span>}
                    <Carousel activeIndex={index} onSelect={handleSelectIndex}
                              className={'my-auto py-2 py-md-0 text-dark gazebo-selection-carousel'}
                              variant={'dark'}
                              controls={availableGazebos.length !== 1}
                              indicators={availableGazebos.length !== 1}
                              interval={null}
                              slide={false}>
                        {gazebosToShow}
                    </Carousel>
                </>}
        </GazebosContext.Provider>
    )
}
