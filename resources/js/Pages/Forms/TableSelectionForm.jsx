import {Button} from "react-bootstrap";
import {GazepoMap} from "../Maps/GazepoMap";
import React from "react";
import {useContext} from "react";
import {FormProgressContext} from "../../Contexts/FormProgressContext";
import {BookingDetailsContext} from "../../Contexts/BookingDetailsContext";
import {getTableAA} from "../../ExternalJs/Util";

export function TableSelectionForm({Gazepos}) {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    {progress, setProgress} = useContext(FormProgressContext),
    handleNextClick = ()=>{
        setProgress('Details');
    },
    handleBackClick = ()=>{
        setProgress('Date');
    };

    return (
            <div className={'m-3'}>
                <Button id={'ToPersonalInfo'} variant={'outline-dark'} className={'my-3 mx-1'}
                        onClick={handleBackClick}>
                    Back To Date Selection
                </Button>
                <GazepoMap Gazepos={Gazepos}></GazepoMap>
                <Button id={'ToPersonalInfo'} variant={'outline-success'} className={'mt-2 mx-1'}
                        hidden={!bookingDetails.table} onClick={handleNextClick}>
                    Continue with Table {getTableAA(bookingDetails.table,Gazepos)}
                </Button>
            </div>
    )
}
