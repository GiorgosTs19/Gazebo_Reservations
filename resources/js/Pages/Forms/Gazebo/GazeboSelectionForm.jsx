import {Button} from "react-bootstrap";
import {FormProgressContext} from "../../../Contexts/FormProgressContext";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {GazebosContext} from "../../../Contexts/GazebosContext";
import {useContext, forwardRef} from "react";
import {getTableAA} from "../../../ExternalJs/Util";
import {GazeboCarousel} from "./GazeboCarousel/GazeboCarousel";

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
            <Button variant={'outline-light'} className={'mb-3 mx-auto w-fit-content border-0 rounded-3 reservation-button text-dark px-2 text-nowrap'}
                hidden={!bookingDetails.table} onClick={handleNextClick}>
                Proceed with Gazebo {getTableAA(bookingDetails.table, Gazebos)}
            </Button>
        </div>
    )
});
