import {Button} from "react-bootstrap";
import React from "react";
import {useContext} from "react";
import {FormProgressContext} from "../../../Contexts/FormProgressContext";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {getTableAA} from "../../../ExternalJs/Util";
import {GazeboCarousel} from "./GazeboCarousel/GazeboCarousel";

export function GazeboSelectionForm({Gazebos}) {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    {progress, setProgress} = useContext(FormProgressContext),
    handleNextClick = ()=>{
        setProgress('Details');
    },
    handleBackClick = ()=>{
        setProgress('Date');
    };

    return (
        <>
            <Button variant={'outline-success'} className={'my-2 mx-1 rounded-5 shadow-sm'}
                    hidden={!bookingDetails.table} onClick={handleNextClick}>
                Continue with Gazebo {getTableAA(bookingDetails.table,Gazebos)}
            </Button>
            <div className={'mx-auto my-2 rounded-2'} style={{width:'fit-content'}}>
                <GazeboCarousel Gazebos={Gazebos}></GazeboCarousel>
            </div>
        </>
    )
}
