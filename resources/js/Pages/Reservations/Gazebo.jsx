import React, {useEffect, useRef, useState} from 'react'
import 'react-calendar/dist/Calendar.css';
import {ReservationInfoForm} from "../Forms/ReservationDetails/ReservationInfoForm";
import {GazeboSelectionForm} from "../Forms/Gazebo/GazeboSelectionForm";
import {FormProgressContext} from "../../Contexts/FormProgressContext";
import {BookingDetailsContext} from "../../Contexts/BookingDetailsContext";
import {MenuSelectionForm} from "../Forms/Menu/MenuSelectionForm";
import {MenuContext} from "../../Contexts/MenuContext";
import {FinalizeReservation} from "../Forms/FinalizeReservation/FinalizeReservation";
import {GazeboAvailabilityContext} from "../../Contexts/GazeboAvailabilityContext";
import {GazebosContext} from "../../Contexts/GazebosContext";
import {InnerWidthContext} from "../../Contexts/InnerWidthContext";
import {TypeSelectionForm} from "../Forms/ReservationTypeSelection/TypeSelectionForm";
import {DatabaseSettingsContext} from "../Admin/Contexts/DatabaseSettingsContext";
import {ErrorsContext} from "../Admin/Contexts/ErrorsContext";
import {IsTouchableContext} from "../../Contexts/IsTouchableContext";
import '../../../css/Reservations.css'
import {Container} from "react-bootstrap";
import gsap from "gsap";
import {AlertMessage} from "../../Alerts/AlertMessage";

export default function Gazebo(props) {
    const [progress, setProgress] = useState('Type'),
    selectedDate = props.SelectedDate, selectedType = props.SelectedType,
    selectedPeople = parseInt(props.SelectedPeople),
    [bookingDetails, setBookingDetails] = useState(
        {
            date:selectedDate ?? '',
            table:'',
            number_of_people:selectedPeople ?? 0,
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
            type: selectedType ?? '',
        }),
    [errors,setErrors] = useState(null),
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
        <ErrorsContext.Provider value={{errors,setErrors}}>
            <DatabaseSettingsContext.Provider value={bookingDetails.type === 'Dinner' ? DinnerSettings : BedSettings}>
                <BookingDetailsContext.Provider value={{bookingDetails, setBookingDetails}}>
                    <FormProgressContext.Provider value={{progress,setProgress}}>
                        <MenuContext.Provider value={bookingDetails.type === 'Dinner' ? Menus.Dinner : Menus.Morning}>
                            <GazeboAvailabilityContext.Provider value={(bookingDetails.type === 'Dinner' ? Availability.Dinner : Availability.Morning)}>
                                <GazebosContext.Provider value={Gazebos}>
                                    <IsTouchableContext.Provider value={isTouchDevice()}>
                                        <InnerWidthContext.Provider value={innerWidth}>
                                            <Container fluid className={'p-3 text-center mx-auto h-100 mt-0 bg overflow-x-hidden d-flex flex-column video-container'}>
                                                {errors && <AlertMessage variant={'danger'} message={errors} header={'Oh Snap!'} duration={3} shouldShow={true}
                                                 onClose={()=>setErrors(null)} className={'w-fit-content mx-auto px-3 py-1'}/>}
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
                                            </Container>
                                        </InnerWidthContext.Provider>
                                    </IsTouchableContext.Provider>
                                </GazebosContext.Provider>
                            </GazeboAvailabilityContext.Provider>
                        </MenuContext.Provider>
                    </FormProgressContext.Provider>
                </BookingDetailsContext.Provider>
            </DatabaseSettingsContext.Provider>
        </ErrorsContext.Provider>
    )
}

{/*{progress !== 'Type' && <div  className={'mx-auto sticky-top pt-2'} style={{height:getHeight('Nav')}}>*/}
{/*    <div style={{width: (innerWidth > 1000 ? 'fit-content' : '95%')}}*/}
{/*         className={'mx-auto d-flex'}>*/}
{/*        <GazeboBookingProgressBar></GazeboBookingProgressBar>*/}
{/*    </div>*/}
{/*</div>}*/}
