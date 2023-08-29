import React, {useEffect, useRef, useState} from 'react'
import 'react-calendar/dist/Calendar.css';
import {ReservationInfoForm} from "../Forms/ReservationDetails/ReservationInfoForm";
import {GazeboSelectionForm} from "../Forms/Gazebo/GazeboSelectionForm";
import {FormProgressContext} from "../../Contexts/FormProgressContext";
import {GazeboBookingProgressBar} from "../../ProgressBars/GazeboBookingProgressBar";
import {BookingDetailsContext} from "../../Contexts/BookingDetailsContext";
import {MenuSelectionForm} from "../Forms/Menu/MenuSelectionForm";
import {MenuContext} from "../../Contexts/MenuContext";
import {FinalizeReservation} from "../Forms/FinalizeReservation/FinalizeReservation";
import {GazeboAvailabilityContext} from "../../Contexts/GazeboAvailabilityContext";
import {GazebosContext} from "../../Contexts/GazebosContext";
import {InnerWidthContext} from "../../Contexts/InnerWidthContext";
import {TypeSelectionForm} from "../Forms/ReservationTypeSelection/TypeSelectionForm";
import '../../../css/Reservations.css'
import {IsTouchableContext} from "../../Contexts/IsTouchableContext";
import {Container} from "react-bootstrap";
import gsap from "gsap";
import {DatabaseSettingsContext} from "../Admin/Contexts/DatabaseSettingsContext";

export default function Gazebo(props) {
    const [progress, setProgress] = useState('Type'),
    [bookingDetails, setBookingDetails] = useState(
        {
            date:'',
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
    DinnerSettings = props.Settings.Dinner,
    BedSettings = props.Settings.Bed,
    ContainerRef = useRef(),
    Gazebos = props.Gazebos,
    Menus = props.Menu,
    Availability = props.Availability,
    typeRef = useRef(null),
    tableRef = useRef(null),
    detailsRef = useRef(null),
    menuRef = useRef(null),
    finalizeRef = useRef(null),
    getHeight = (content) => {
        switch (content) {
            case 'Nav' : {
                if(bookingDetails.type === '')
                    return 0;
                if(innerWidth < 1000) {
                    if (window.innerWidth > window.innerHeight)
                        return '20%';
                }
                return '8%';
            }
            case 'Con' : {
                if(bookingDetails.type === '')
                    return '100%';
                if(innerWidth < 1000) {
                    if(window.innerWidth > window.innerHeight)
                        return '80vh';
                }
                return '90%';
            }
        }
    },
    isTouchDevice = () => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    const shouldShowScroll = () => {
        if ( innerWidth > 1440)
            return 'hidden'
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
    },[bookingDetails.number_of_people,bookingDetails.date]);

    useEffect(()=>{
        const tl = gsap.timeline();
        switch (progress) {
            case 'Table' : {
                tl.from(tableRef.current,{y:'1500px',duration:1},'>');
                break;
            }
            case 'Details' : {
                tl.from(detailsRef.current,{y:'1500px',duration:1},'>');
                break;
            }
        }
    },[progress]);

    return (
        <DatabaseSettingsContext.Provider value={bookingDetails.type === 'Dinner' ? DinnerSettings : BedSettings}>
            <BookingDetailsContext.Provider value={{bookingDetails, setBookingDetails}}>
                <FormProgressContext.Provider value={{progress,setProgress}}>
                    <MenuContext.Provider value={bookingDetails.type === 'Dinner' ? Menus.Dinner : Menus.Morning}>
                        <GazeboAvailabilityContext.Provider value={(bookingDetails.type === 'Dinner' ? Availability.Dinner : Availability.Morning)}>
                            <GazebosContext.Provider value={Gazebos}>
                                <IsTouchableContext.Provider value={isTouchDevice()}>
                                    <InnerWidthContext.Provider value={innerWidth}>
                                        <Container fluid className={'px-1 pb-1 pt-0 text-center mx-auto mt-0 vh-100 bg'}>
                                            {progress !== 'Type' && <div  className={'mx-auto sticky-top pt-2'} style={{height:getHeight('Nav')}}>
                                                <div style={{width: (innerWidth > 1000 ? 'fit-content' : '95%')}}
                                                     className={'mx-auto d-flex'}>
                                                    <GazeboBookingProgressBar></GazeboBookingProgressBar>
                                                </div>
                                            </div>}
                                            <div className={'px-2 py-3 my-1 d-flex flex-column scrollable-y'}
                                                 ref={ContainerRef} style={{overflowY:shouldShowScroll(),overflowX:'hidden'}}>
                                                <TypeSelectionForm ref={typeRef}>
                                                    {progress === 'Table' && <GazeboSelectionForm Gazebos={Gazebos} ref={tableRef}>
                                                    </GazeboSelectionForm>}
                                                    {progress === 'Details' && <ReservationInfoForm ref={detailsRef}>
                                                    </ReservationInfoForm>}
                                                    {progress === 'Menu' &&
                                                        <MenuSelectionForm ref={menuRef}></MenuSelectionForm>}
                                                    {progress === 'Finalize' &&
                                                        <FinalizeReservation ref={finalizeRef}></FinalizeReservation>}
                                                </TypeSelectionForm>
                                            </div>
                                        </Container>
                                    </InnerWidthContext.Provider>
                                </IsTouchableContext.Provider>
                            </GazebosContext.Provider>
                        </GazeboAvailabilityContext.Provider>
                    </MenuContext.Provider>
                </FormProgressContext.Provider>
            </BookingDetailsContext.Provider>
        </DatabaseSettingsContext.Provider>
    )
}
