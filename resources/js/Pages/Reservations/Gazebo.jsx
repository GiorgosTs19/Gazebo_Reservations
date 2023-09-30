import {useEffect, useRef, useState} from 'react';
import {AlertMessage} from "../../Alerts/AlertMessage";
import 'react-calendar/dist/Calendar.css';
import '../../../css/Reservations.css'
import gsap from "gsap";
import {ReservationInfoForm} from "../Forms/ReservationDetails/ReservationInfoForm";
import {GazeboSelectionForm} from "../Forms/Gazebo/GazeboSelectionForm";
import {FormProgressContext} from "../../Contexts/FormProgressContext";
import {BookingDetailsContext} from "../../Contexts/BookingDetailsContext";
import {MenuSelectionForm} from "../Forms/Menu/MenuSelectionForm";
import {MenuContext} from "../../Contexts/MenuContext";
import {FinalizeReservation} from "../Forms/FinalizeReservation/FinalizeReservation";
import {GazebosContext} from "../../Contexts/GazebosContext";
import {InnerWidthContext} from "../../Contexts/InnerWidthContext";
import {TypeSelectionForm} from "../Forms/ReservationTypeSelection/TypeSelectionForm";
import {DatabaseSettingsContext} from "../Admin/Contexts/DatabaseSettingsContext";
import {ErrorsContext} from "../Admin/Contexts/ErrorsContext";
import {IsTouchableContext} from "../../Contexts/IsTouchableContext";
import {Container} from "react-bootstrap";
import {DisabledDaysContext} from "../Admin/Contexts/DisabledDaysContext";
import {IsDemoContext} from "../../Contexts/IsDemoContext";
import {RefContext} from "../../Contexts/RefContext";
import {InfoSVG} from "../../SVGS/InfoSVG";

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
    Disabled_Days = props.Disabled_Days,
    typeRef = useRef(null),
    tableRef = useRef(null),
    detailsRef = useRef(null),
    menuRef = useRef(null),
    finalizeRef = useRef(null),
    isDemo = props.is_Demo,
    isTouchDevice = () => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
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

    const getDisabledDays = () => {
        return Disabled_Days.filter(item=>item.Type === bookingDetails.type);
    }

    return (
        <RefContext.Provider value={ContainerRef}>
            <IsDemoContext.Provider value={isDemo}>
                <ErrorsContext.Provider value={{errors,setErrors}}>
                    <DatabaseSettingsContext.Provider value={bookingDetails.type === 'Dinner' ? DinnerSettings : BedSettings}>
                        <BookingDetailsContext.Provider value={{bookingDetails, setBookingDetails}}>
                            <FormProgressContext.Provider value={{progress,setProgress}}>
                                <MenuContext.Provider value={bookingDetails.type === 'Dinner' ? Menus.Dinner : Menus.Morning}>
                                    <GazebosContext.Provider value={Gazebos}>
                                        <IsTouchableContext.Provider value={isTouchDevice()}>
                                            <InnerWidthContext.Provider value={innerWidth}>
                                                <Container fluid className={`px-3 py-2 p-lg-0 text-center mx-auto h-100 mt-0 bg overflow-x-hidden d-flex flex-column ${isDemo ? ' bg' : ' img-container'}`}
                                                           ref={ContainerRef}>
                                                    <DisabledDaysContext.Provider value={getDisabledDays()}>
                                                        {errors && <AlertMessage variant={'danger'} errors={errors} header={'Oh Snap!'} duration={10}
                                                                                 shouldShow={!!errors} className={'w-fit-content mx-auto px-4 rounded-4'} />}
                                                        {/*{isDemo && isTouchDevice() && <InfoSVG className={'mx-auto'}></InfoSVG>}*/}
                                                        <TypeSelectionForm ref={typeRef}>
                                                            {progress === 'Table' && <GazeboSelectionForm Gazebos={Gazebos} ref={tableRef}></GazeboSelectionForm>}
                                                            {progress === 'Details' && <ReservationInfoForm ref={detailsRef}></ReservationInfoForm>}
                                                            {progress === 'Menu' && <MenuSelectionForm ref={menuRef}></MenuSelectionForm>}
                                                            {progress === 'Finalize' && <FinalizeReservation ref={finalizeRef}></FinalizeReservation>}
                                                        </TypeSelectionForm>
                                                    </DisabledDaysContext.Provider>
                                                </Container>
                                            </InnerWidthContext.Provider>
                                        </IsTouchableContext.Provider>
                                    </GazebosContext.Provider>
                                </MenuContext.Provider>
                            </FormProgressContext.Provider>
                        </BookingDetailsContext.Provider>
                    </DatabaseSettingsContext.Provider>
                </ErrorsContext.Provider>
            </IsDemoContext.Provider>
        </RefContext.Provider>
    )
}
