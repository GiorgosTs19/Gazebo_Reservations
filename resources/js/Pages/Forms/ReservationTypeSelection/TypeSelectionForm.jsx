import {Button, Col, Image, Row} from "react-bootstrap";
import {forwardRef, useContext, useEffect, useRef, useState} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {InnerWidthContext} from "../../../Contexts/InnerWidthContext";
import {IsTouchableContext} from "../../../Contexts/IsTouchableContext";
import {ReservationCalendar} from "../Date/ReservationCalendar";
import {changeDateFormat} from "../../../ExternalJs/Util";
import {NumberOfPeople} from "../ReservationDetails/NumberOfPeople";
import {FormProgressContext} from "../../../Contexts/FormProgressContext";
import {DateNotes} from "../../../Notes/DateNotes";
import gsap from "gsap";
import useUpdateEffect from "../../../CustomHooks/useUpdateEffect";
import {GazeboBookingProgressBar} from "../../../ProgressBars/GazeboBookingProgressBar";

export const TypeSelectionForm = forwardRef(function TypeSelectionForm({children},ref) {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    {progress, setProgress} = useContext(FormProgressContext),
    handleImageClick = (value) => {
        if(progress === 'Type') {
            setBookingDetails(prev=>{return{...prev,type:value,more_rooms:false}});
            switch (value) {
                case 'Bed' : {
                    gsap.fromTo('#sun-img', 2, {rotation:0, transformOrigin:"50% 50%"},{rotation:180, transformOrigin:"50% 50%"});
                    break;
                }
                case 'Dinner' : {
                    gsap.fromTo('#moon-img', 1, {rotation:90, transformOrigin:"50% 50%"},{rotation:0, transformOrigin:"50% 50%"});
                    break;
                }
            }
        }
    },
    isTouchable = useContext(IsTouchableContext),
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

    useEffect(()=>{
        const tl = gsap.timeline();
            if(showCalendar) {
                if(bookingDetails.type ==='Dinner') {
                    tl.to('#date_notes',{duration:1.5,x:'2500px',ease:'power1.out'});
                    tl.to('#date_notes',{duration:0,display:'none'},0.5);
                }
                tl.from(calendarRef.current,{y:'1500px',duration:0.5,ease:'power1.in'},0);
            }
            if(progress === 'Type' && !showCalendar) {
                if(bookingDetails.type ==='Dinner'){
                    tl.to('#date_notes', {duration: 0, display: 'block'});
                    tl.to('#date_notes', {duration: 0.5, x: '0'}, '>');
                }
            }
    },[showCalendar]);

    useUpdateEffect(()=>{
        setBookingDetails(prev=>{return{...prev,number_of_people:0,date:'',more_rooms:false,table:'',
            primary_menu:{Main:'',Dessert:''}, secondary_menu:{Main:'',Dessert:''}}});
        setShowCalendar(false);
        setProgress('Type');
    },[bookingDetails.type]);

    useEffect(()=>{
        if(bookingDetails.table !== '')
            setBookingDetails(prev=>{return {...prev,table:''}});
    },[bookingDetails.date]);

    useEffect(()=>{
        if(progress !== 'Type' && progress !=='Table'){
            setProgress('Details');
            setBookingDetails(prev=>{return {...prev,more_rooms:false,primary_room:'',secondary_room:''}});
        }
    },[bookingDetails.number_of_people]);

    useEffect(()=>{
        const tl = gsap.timeline();
        if(bookingDetails.type === 'Dinner') {
            switch (progress) {
                case 'Table' : {
                    tl.to('#date_notes',{duration:1,x:'2500px'});
                    tl.to('#date_notes',{duration:0,display:'none'},'>');
                    break;
                }
                case 'Type' : {
                    tl.to('#date_notes',{duration:0,display:'block'});
                    tl.fromTo('#date_notes',{duration:1,x:'2500px'},{duration:1,x:'0'},'>');
                    break;
                }
            }
        }
    },[progress]);

    return (
        <div className={`${progress === 'Table' ? 'px-0 py-3' : 'p-3 '} border border-1 rounded-5 mx-auto content-card h-fit-content my-auto position-relative `
            + (innerWidth > 992 ? ' w-50 ' : ' w-100 ')}
              ref={ref}>
            <GazeboBookingProgressBar></GazeboBookingProgressBar>
            <Row className={'w-100 d-flex mx-0 '}>
                <Col ref={typeSelectionRef} className={'my-auto'} xs={12} md={bookingDetails.type === '' ? 12 : (progress !== 'Type' ? 12 : 5)}>
                    <Row className={'m-auto'}>
                        <Col className={'p-2 border-blue border border-start-0 border-top-0 border-bottom-0 d-flex ' + (progress !== 'Type' ? 'opacity-50' : '')}
                             style={{backgroundColor:bookingDetails.type ==='Dinner' ? 'rgba(79,158,178,0.7)' : '',borderRadius:'15px 0 0 15px',userSelect:'none',cursor:'pointer'}}
                             onClick={()=>handleImageClick('Dinner')}>
                            <Image src={'Images/Icons/moon.png'} width={'20px'} height={'20px'} className={'ms-2 my-auto'} id={'moon-img'}></Image>
                            <h6 className={'m-auto'} style={{cursor:progress === 'Type' ? "pointer" : 'none'}}>
                                Seaside Dinner
                            </h6>
                        </Col>
                        <Col className={'p-2 d-flex me-0 me-lg-3 ' + (progress !== 'Type' ? 'opacity-50' : '')}
                             style={{backgroundColor:bookingDetails.type ==='Bed'?'rgba(217,232,112,0.7)':''
                            ,borderRadius:'0 15px 15px 0',userSelect:'none',cursor:'pointer'}} onClick={()=>handleImageClick('Bed')}>
                            <h6 className={'m-auto'} style={{cursor:progress === 'Type' ? "pointer" : 'none'}}>
                                Sun Bed
                            </h6>
                            <Image src={'Images/Icons/sun.png'} width={'24px'} height={'24px'} id={'sun-img'} className={'my-auto'}></Image>
                        </Col>
                    </Row>
                </Col>
                {bookingDetails.type !== '' && progress === 'Type' && <Col ref={numberOfPeopleSelectionRef} md={7} xxl={bookingDetails.number_of_people !== 0 ? 3 : 7}
                      className={'my-auto border-blue border border-end-0  mt-4 mt-md-0 py-2 ' + (innerWidth > 768 ? 'border-bottom-0 border-top-0' : 'border-start-0 ') +
                          (bookingDetails.number_of_people === 0 ? ' border-bottom-0' : '')}>
                    <div className={`m-auto px-4 text-center`} style={{ userSelect: 'none'}}>
                        <span className={'fw-bold fst-italic'}>Guest Count</span>
                        <NumberOfPeople></NumberOfPeople>
                    </div>
                </Col>}
                {bookingDetails.number_of_people !== 0 && progress === 'Type'  && <Col ref={dateSelectionRef}
                      className={'text-center border-blue d-flex my-auto border-end-0 border-top-0 border-bottom-0 py-2 ' + (!showCalendar ? 'border' : '') +
                          (innerWidth < 768 ? 'border-start-0' : '')}
                      xxl={4}>
                    <div className={'p-2 mx-auto w-100 ' + (bookingDetails.number_of_people === 0 ? 'opacity-25' : '')}>
                        <div className={'box_shadow border-0 m-auto py-2 px-4 rounded-4 w-100 position-relative '}
                             style={{
                                 backgroundColor: 'rgba(253,249,249,0.75)',
                                 userSelect: 'none'
                             }}>
                            <span>Date</span>
                            <h6 style={{cursor: bookingDetails.number_of_people === 0 ? '' : 'pointer'}}
                                onClick={handleShowCalendar}>
                                {bookingDetails.date ? changeDateFormat(bookingDetails.date, '-', '-') : 'Choose Date'}
                            </h6>
                        </div>
                    </div>
                </Col>}
            </Row>
            {showCalendar && <div ref={calendarRef}>
                <ReservationCalendar></ReservationCalendar>
                {progress === 'Type' && <Button variant={'outline-light'} hidden={!bookingDetails?.date || bookingDetails.number_of_people === 0}
                    className={'my-2 box_shadow border-0 reservation-button text-dark'}
                    onClick={handleNextClick}
                    style={{width: 'fit-content', height: 'fit-content'}}>
                    Book on {changeDateFormat(bookingDetails?.date,'-','/')}
                </Button>}
            </div>}
            {/*<DateNotes></DateNotes>*/}
            {progress === 'Type' && !showCalendar && <Button variant={'outline-light'} hidden={!bookingDetails?.date || bookingDetails.number_of_people === 0}
                className={'my-2 box_shadow reservation-button text-dark'}
                onClick={handleNextClick}
                style={{width: 'fit-content', height: 'fit-content'}}>
                Book on {changeDateFormat(bookingDetails?.date,'-','/')}
            </Button>}
                {children}
        </div>
    );
});
