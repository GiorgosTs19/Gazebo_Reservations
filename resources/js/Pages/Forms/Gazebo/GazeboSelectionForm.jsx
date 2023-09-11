import {Button, Image} from "react-bootstrap";
import {useContext} from "react";
import {FormProgressContext} from "../../../Contexts/FormProgressContext";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {getTableAA} from "../../../ExternalJs/Util";
import {GazeboCarousel} from "./GazeboCarousel/GazeboCarousel";
import {forwardRef} from "react";
import {GazebosContext} from "../../../Contexts/GazebosContext";

export const GazeboSelectionForm = forwardRef(function GazeboSelectionForm({...props},ref) {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    Gazebos = useContext(GazebosContext),
    {progress, setProgress} = useContext(FormProgressContext),

    handleNextClick = ()=>{
        setProgress('Details');
    };

    return (
        <div ref={ref} className={'m-auto d-flex flex-column text-light'}>
            <GazeboCarousel/>
            {/*<Image className={"d-block mx-auto shadow-lg gazepo-img my-4 rounded-5 img-fluid " + (innerWidth > 992 ? ' w-25' : 'w-75')}*/}
            {/*       src={'Images/'+ (bookingDetails.type === 'Dinner' ? 'GazeboAtNight.jpg' : 'GazeboAtDay.jpg')} alt=""/>*/}
            {progress === 'Table' && <Button variant={'outline-light'} className={'my-2 mx-auto border-0 rounded-3 box_shadow reservation-button text-dark'}
                                             hidden={!bookingDetails.table} onClick={handleNextClick}>
                Continue with Gazebo {getTableAA(bookingDetails.table, Gazebos)}
            </Button>}
        </div>
    )
});
