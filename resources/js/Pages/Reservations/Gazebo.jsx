import React, {useEffect, useRef, useState} from 'react'
import 'react-calendar/dist/Calendar.css';
import {ReservationInfoForm} from "../Forms/ReservationDetails/ReservationInfoForm";
import {DateSelectionForm} from "../Forms/Date/DateSelectionForm";
import {GazeboSelectionForm} from "../Forms/Gazebo/GazeboSelectionForm";
import {FormProgressContext} from "../../Contexts/FormProgressContext";
import {GazeboBookingProgressBar} from "../../ProgressBars/GazeboBookingProgressBar";
import {BookingDetailsContext} from "../../Contexts/BookingDetailsContext";
import {MenuSelectionForm} from "../Forms/Menu/MenuSelectionForm";
import {MenuContext} from "../../Contexts/MenuContext";
import {FinalizeReservation} from "../Forms/FinalizeReservation";
import {GazeboAvailabilityContext} from "../../Contexts/GazeboAvailabilityContext";
import {GazebosContext} from "../../Contexts/GazebosContext";
import {InnerWidthContext} from "../../Contexts/InnerWidthContext";
import {TypeSelectionForm} from "../Forms/ReservationTypeSelection/TypeSelectionForm";
import '../../../css/Reservations.css'
import {IsTouchableContext} from "../../Contexts/IsTouchableContext";
import {Container} from "react-bootstrap";

export default function Gazebo(props) {
    const [progress, setProgress] = useState('Date'),
    [bookingDetails, setBookingDetails] = useState(
        {
            date:null,
            table:'',
            number_of_people:0,
            more_rooms:false,
            first_name:'',
            last_name:'',
            email:'',
            phone_number:'',
            primary_room:'',
            secondary_room:'',
            attendees:[],
            primary_menu:{Main:'',Dessert:''},
            secondary_menu:{Main:'',Dessert:''},
            notes:'',
            type:'',
        }),
    [innerWidth, setInnerWidth] = useState(window.innerWidth),
    ContainerRef = useRef(),
    Gazebos = props.Gazebos,
    Menus = props.Menu,
    Availability = props.Availability,
    getWidth = () => {
        if(innerWidth < 992)
            return '95vw';

        switch (bookingDetails.type) {
            case '' :
                return '75vw';
            default :{
                if(progress === 'Details')
                    return '65vw'
                return '45vw';
            }
        }
    },
    isTouchDevice = () => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    const shouldShowScroll = () => {
        if(innerWidth > 992)
            switch (progress) {
                case 'Date' :
                    return 'hidden';
                default :
                    return 'auto';
            }
        return 'auto';
    };

    useEffect(() => {
        const handleResize = () => {
            setInnerWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(()=>{
        ContainerRef.current?.scrollTo({top: ContainerRef.current?.scrollHeight,behavior:'smooth'});
    },[bookingDetails.number_of_people]);
    console.log(bookingDetails)
    return (
        <BookingDetailsContext.Provider value={{bookingDetails, setBookingDetails}}>
            <FormProgressContext.Provider value={{progress,setProgress}}>
                <MenuContext.Provider value={bookingDetails.type === 'Dinner' ? Menus.Dinner : Menus.Morning}>
                    <GazeboAvailabilityContext.Provider value={bookingDetails.type === 'Dinner' ? Availability.Dinner : Availability.Morning}>
                        <GazebosContext.Provider value={Gazebos}>
                            <IsTouchableContext.Provider value={isTouchDevice()}>
                                <InnerWidthContext.Provider value={innerWidth}>
                                    <Container className={'px-1 pb-1 pt-0 text-center mx-auto mt-0'} style={{width:getWidth(),overflowY:shouldShowScroll(),height:'95vh'}}>
                                        <div  className={'mx-auto sticky-top pt-2'} style={{backgroundColor:'white'}}>
                                            <h1 className={'mb-2 mt-0'} style={{color:'#7a7a7a'}}>Sentido Port Royal</h1>
                                            {bookingDetails.type !=='' &&
                                                <div style={{width: (innerWidth > 1000 ? 'fit-content' : '95%')}}
                                                     className={'mx-auto d-flex'}>
                                                    <GazeboBookingProgressBar></GazeboBookingProgressBar>
                                                </div>}
                                        </div>
                                        <div className={'px-2 pt-2 pb-3'}
                                            ref={ContainerRef}>
                                            {bookingDetails.type !=='' ?
                                                <>
                                                    {progress === 'Date' && <DateSelectionForm></DateSelectionForm>}
                                                    {progress === 'Table' && <GazeboSelectionForm Gazebos={Gazebos}></GazeboSelectionForm>}
                                                    {progress === 'Details' && <ReservationInfoForm></ReservationInfoForm>}
                                                    {progress === 'Menu' && <MenuSelectionForm></MenuSelectionForm>}
                                                    {progress === 'Finalize' && <FinalizeReservation Gazepos={Gazebos}></FinalizeReservation>}
                                                </>:
                                                <div className={'d-flex h-100 my-2'}>
                                                    <TypeSelectionForm></TypeSelectionForm>
                                                </div>
                                            }
                                        </div>
                                    </Container>
                                </InnerWidthContext.Provider>
                            </IsTouchableContext.Provider>
                        </GazebosContext.Provider>
                    </GazeboAvailabilityContext.Provider>
                </MenuContext.Provider>
            </FormProgressContext.Provider>
        </BookingDetailsContext.Provider>
    )
}
