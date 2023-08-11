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
    {progress, setProgress} = useContext(FormProgressContext),
    Gazebos = useContext(GazebosContext),
    handleNextClick = ()=>{
        setProgress('Details');
    };

    return (
        <div ref={ref} className={'m-auto'} style={{width:'fit-content'}}>
            {/*+ (isAvailable ? " gazepo-type-img-sm " : '') onClick={handleSelect}*/}
            <GazeboCarousel Gazebos={Gazebos}></GazeboCarousel>
            <Image className={"d-block mx-auto shadow-lg gazepo-img my-4 rounded-5 img-fluid " + (innerWidth > 992 ? ' w-25' : 'w-75')}
                   src={'Images/'+ (bookingDetails.type === 'Dinner' ? 'GazeboAtNight.jpg' : 'GazeboAtDay.jpg')} alt=""
            />
            {progress === 'Table' && <Button variant={'outline-dark'} className={'my-2 mx-1 rounded-5 shadow-sm reservation-button'}
                                             hidden={!bookingDetails.table} onClick={handleNextClick}>
                Continue with Table {getTableAA(bookingDetails.table, Gazebos)}
            </Button>}
        </div>
    )
});
