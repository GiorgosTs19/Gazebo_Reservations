import {Button, Col, Row} from "react-bootstrap";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {InnerWidthContext} from "../../../Contexts/InnerWidthContext";
import {FormProgressContext} from "../../../Contexts/FormProgressContext";
import {forwardRef, useContext, useEffect, useRef, useState} from "react";
import {ReservationCalendar} from "../Date/ReservationCalendar";
import {changeDateFormat} from "../../../ExternalJs/Util";
import {NumberOfPeople} from "../ReservationDetails/NumberOfPeople";
import useUpdateEffect from "../../../CustomHooks/useUpdateEffect";
import {GazeboBookingProgressBar} from "../../../ProgressBars/GazeboBookingProgressBar";
import {TypeOptionsRow} from "./TypeOptionsRow";

export const TypeSelectionForm = forwardRef(function TypeSelectionForm({children},ref) {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    {progress, setProgress} = useContext(FormProgressContext),
    innerWidth = useContext(InnerWidthContext),
    typeSelectionRef = useRef(null),
    dateSelectionRef = useRef(null),
    numberOfPeopleSelectionRef = useRef(null),
    calendarRef = useRef(null),
    [showCalendar,setShowCalendar] = useState(false);
    const handleShowCalendar = () => {
        if(progress !== 'Type')
            setProgress('Type');
        if(bookingDetails.number_of_people > 0)
            setShowCalendar(!showCalendar);
    };
    const handleNextClick = ()=> {
        setShowCalendar(false);
        setProgress('Table');
    };

    useUpdateEffect(()=>{
        setBookingDetails(prev=>{return{...prev,number_of_people:0,date:'',more_rooms:false,table:'',
            primary_menu:{Main:'',Dessert:''}, secondary_menu:{Main:'',Dessert:''}, secondary_room : bookingDetails.type === 'Bed' ? '' : prev.secondary_room}});
        setShowCalendar(false);
    },[bookingDetails.type]);

    useEffect(()=>{
        if(bookingDetails.table !== '')
            setBookingDetails(prev=>{return {...prev,table:''}});
    },[bookingDetails.date]);

    useEffect(()=>{
        if(progress !== 'Type' && progress !=='Table') {
            setProgress('Details');
            setBookingDetails(prev=>{return {...prev,more_rooms:false,primary_room:'',secondary_room:''}});
        }
    },[bookingDetails.number_of_people]);

    return (
        <div className={`${progress === 'Table' ? 'p-0' : (progress === 'Details' ? 'p-2 p-md-3' : 'p-3')}) border border-1 rounded-5 mx-auto content-card h-fit-content mw-850px w-100
        ${innerWidth <= 576 && (showCalendar  || progress === 'Details' || progress === 'Finalize') ? 'mt-1 my-md-auto' : 'my-auto'} position-relative`} ref={ref}>
            <GazeboBookingProgressBar></GazeboBookingProgressBar>
            {progress === 'Type' ? <Row className={`pb-3 pb-md-3`}>
                <Col md={bookingDetails.number_of_people === 0 ? 12 : progress === 'Type' ? (showCalendar ? 6 : 8) : 12}
                     className={'d-flex'}>
                    <Row className={'w-100 d-flex mx-auto mb-3 mb-lg-0'}>
                        <Col ref={typeSelectionRef} className={'mb-2 my-md-auto'}
                             md={bookingDetails.type === '' && bookingDetails.number_of_people === 0 ? 12 : (bookingDetails.number_of_people === 0 ? 7 : 12)}>
                            <TypeOptionsRow/>
                        </Col>
                        {bookingDetails.type !== '' && progress === 'Type' &&
                            <Col ref={numberOfPeopleSelectionRef} md={bookingDetails.number_of_people === 0 ? 5 : 12}
                                 className={`my-auto border-blue px-4 text-center m-auto py-2 ${bookingDetails.number_of_people === 0 && innerWidth >= 1400 ? 'border-start' : ''} ` + (innerWidth > 768 ? 'border-bottom-0 border-top-0' : 'border-start-0 ') +
                                     (bookingDetails.number_of_people === 0 ? ' border-bottom-0' : '')}>
                                <span className={'info-text-lg'}>Guest Count</span>
                                <NumberOfPeople></NumberOfPeople>
                            </Col>}
                        {showCalendar && bookingDetails.number_of_people !== 0 && progress === 'Type' &&
                            <div ref={dateSelectionRef}
                                 className={'box_shadow border-0 m-auto py-2 px-4 rounded-4 position-relative cursor-pointer mw-330px user-select-none'}
                                 style={{backgroundColor: 'rgba(253,249,249,0.75)'}} onClick={handleShowCalendar}>
                                {(!showCalendar || innerWidth >= 992) && <span className={'info-text-lg'}>Date</span>}
                                <h6 style={{cursor: bookingDetails.number_of_people === 0 ? '' : 'pointer'}}
                                    className={'mb-0'}>
                                    {bookingDetails.date ? changeDateFormat(bookingDetails.date, '-', '-') : 'Choose Date'}
                                </h6>
                            </div>}
                    </Row>
                </Col>
                {progress === 'Type' && <Col className={'d-flex flex-column'} md={showCalendar ? 6 : 4}>
                    {!showCalendar && bookingDetails.number_of_people !== 0 && progress === 'Type' &&
                        <div ref={dateSelectionRef}
                             className={'box_shadow border-0 m-auto py-2 px-4 rounded-4 position-relative cursor-pointer mw-330px user-select-none'}
                             onClick={handleShowCalendar}
                             style={{backgroundColor: 'rgba(253,249,249,0.75)'}}>
                            {(!showCalendar || innerWidth >= 992) && <span className={'info-text-lg'}>Date</span>}
                            <h6 className={'mb-0 text-nowrap'}>
                                {bookingDetails.date ? changeDateFormat(bookingDetails.date, '-', '-') : 'Choose Date'}
                            </h6>
                        </div>
                    }
                    {showCalendar && <div className={'mx-auto'} ref={calendarRef}>
                        <ReservationCalendar></ReservationCalendar>
                    </div>}
                    {progress === 'Type' && <Button variant={'outline-light'}
                        hidden={!bookingDetails?.date || bookingDetails.number_of_people === 0}
                        className={'mt-4 my-md-3 mx-auto w-fit-content h-fit-content box_shadow border-0 reservation-button text-dark'}
                        onClick={handleNextClick}>
                        Book on {changeDateFormat(bookingDetails?.date, '-', '/')}
                    </Button>}
                </Col>}
            </Row> : <div className={'px-2 pb-3'}>
                <TypeOptionsRow/>
            </div>}
                {children}
        </div>
    );
});
