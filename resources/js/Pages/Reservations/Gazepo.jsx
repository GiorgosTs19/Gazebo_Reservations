import React, {useRef, useState} from 'react'
import 'react-calendar/dist/Calendar.css';
import {ReservationInfoForm} from "../Forms/ReservationInfoForm";
import {DateSelectionForm} from "../Forms/Date/DateSelectionForm";
import {TableSelectionForm} from "../Forms/TableSelectionForm";
import {FormProgressContext} from "../../Contexts/FormProgressContext";
import {GazepoBookingProgressBar} from "../../ProgressBars/GazepoBookingProgressBar";
import {BookingDetailsContext} from "../../Contexts/BookingDetailsContext";
import {MenuSelectionForm} from "../Forms/Menu/MenuSelectionForm";
import {MenuContext} from "../../Contexts/MenuContext";
import {FinalizeReservation} from "../Forms/FinalizeReservation";
import {ContainerRefContext} from "../../Contexts/ContainerRefContext";
import {GazepoAvailabilityContext} from "../../Contexts/GazepoAvailabilityContext";
import {GazeposContext} from "../../Contexts/GazeposContext";

export default function Gazepo(props) {
    const [progress, setProgress] = useState('Date'),
    [bookingDetails, setBookingDetails] = useState(
        {
            date:null,
            table:'',
            number_of_people:0,
            more_rooms:null,
            first_name:'',
            last_name:'',
            email:'',
            phone_number:'',
            primary_room:'',
            secondary_room:'',
            attendees:[],
            primary_menu:'',
            secondary_menu:'',
            notes:'',
        }),
    GazepoContainerRef = useRef(),
    Gazepos = props.Gazepos,
    Menu = props.Menu,
    Availability = props.Availability;
    // console.log(Availability)
    // console.log(bookingDetails)
    return (
        <BookingDetailsContext.Provider value={{bookingDetails, setBookingDetails}}>
            <FormProgressContext.Provider value={{progress,setProgress}}>
                <MenuContext.Provider value={Menu}>
                    <ContainerRefContext.Provider value={GazepoContainerRef.current}>
                        <GazepoAvailabilityContext.Provider value={Availability}>
                            <GazeposContext.Provider value={Gazepos}>
                                <div className={'px-0 text-center GazepoContainer mx-auto'} ref={GazepoContainerRef}>
                                    <h1 className={'my-2 sentido'} style={{color:'#7a7a7a'}}>Sentido Port Royal</h1>
                                    <GazepoBookingProgressBar></GazepoBookingProgressBar>
                                    {progress === 'Date' && <DateSelectionForm></DateSelectionForm>}
                                    {progress === 'Table' && <TableSelectionForm Gazepos={Gazepos}></TableSelectionForm>}
                                    {progress === 'Details' && <ReservationInfoForm></ReservationInfoForm>}
                                    {progress === 'Menu' && <MenuSelectionForm></MenuSelectionForm>}
                                    {progress === 'Finalize' && <FinalizeReservation Gazepos={Gazepos}></FinalizeReservation>}
                                </div>
                            </GazeposContext.Provider>
                        </GazepoAvailabilityContext.Provider>
                    </ContainerRefContext.Provider>
                </MenuContext.Provider>
            </FormProgressContext.Provider>
        </BookingDetailsContext.Provider>
    )
}
