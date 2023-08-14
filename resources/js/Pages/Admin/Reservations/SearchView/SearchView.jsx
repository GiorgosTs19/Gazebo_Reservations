import {Button, Col, FloatingLabel, Form, InputGroup, Row, Stack} from "react-bootstrap";
import {useContext, useEffect, useReducer, useRef, useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import {ReservationShort} from "../ReservationViews/ReservationShort";
import gsap from "gsap";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";

export function SearchView() {
    const [searchResult,setSearchResult] = useState(null);
    const emailInputRef = useRef(null),
    phoneInputRef = useRef(null),
    confNumberInputRef = useRef(null),
    {activeReservation,setActiveReservation} = useContext(ActiveReservationContext);

    const animateInputFocus = (inputRef) => {
        const inputRefs = [emailInputRef, phoneInputRef, confNumberInputRef];
        inputRefs.forEach((ref) => {
            const tl = gsap.timeline();
            tl.to(ref.current, {
                x: 0, // Set the default position to 0
                opacity: 1, // Set the default opacity to 1
                duration: 0.3,
                ease: 'power3.out', // Add easing for smoother animation
                overwrite: 'auto', // Automatically handle conflicting animations
                display:'block'
            });

            if (inputRef !== null && ref.current !== inputRef) {
                tl.to(ref.current, {
                    x: -200,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power3.out',
                    overwrite: 'auto',
                });
                tl.to(ref.current, {
                    display:'none',
                    duration:0,
                })
            }
        });
    };
    // useEffect(()=>{
    //     animateInputFocus(null);
    // },[]);
    const searchCriteriaReducer = (state,action) => {
        switch (action.type) {
            case 'Set_Email' : {
                if(action.value.length === '' || state.email.length === 0)
                    animateInputFocus(emailInputRef.current);
                return {...state,email:action.value};
            }
            case 'Set_Phone' : {
                if(action.value.length === '' || state.phone_number.length === 0)
                    animateInputFocus(phoneInputRef.current);
                return {...state,phone_number:action.value};
            }
            case 'Set_Confirmation_Number' : {
                if(action.value.length === '' || state.conf_number.length === 0)
                    animateInputFocus(confNumberInputRef.current);
                return {...state,conf_number:action.value};
            }
            case 'Set_Room_Number' : {
                return {...state,room_number:action.value};
            }
            case 'Reset' : {
                setSearchResult(null);
                return {conf_number:'',
                    email:'',
                    phone_number:'',
                    room_number:''};
            }
        }
    };
    const [searchCriteria,dispatchSearchCriteria] = useReducer(searchCriteriaReducer,{
        conf_number:'',
        email:'',
        phone_number:'',
        room_number:''
    });
    const noCriteriaActive = Object.values(searchCriteria).every((criteria)=>criteria === '');

    useEffect(()=>{
        if(noCriteriaActive) {
            if(activeReservation !== null)
                setActiveReservation(null)
            animateInputFocus(null);
            return setSearchResult(null);
        }
        Inertia.get(route('Search_Reservations'),searchCriteria,{
            only:['search_result'],
            preserveScroll:true,
            preserveState:true,
            onSuccess:(res)=>{setSearchResult(res.props.search_result)}
        })
    },[searchCriteria]);

    // Generates the reservations to show for the selected date.
    const reservationsToShow = ()=> {
        if(!searchResult)
            return <h5 className={'my-0 my-sm-auto text-wrap'}>Εισάγετε κάποιο κριτήριο για να κάνετε αναζήτηση.</h5>

        if(searchResult.length === 0)
            return <h5 className={'my-auto text-wrap'}>Δεν βρέθηκαν κρατήσεις με αυτά τα κριτήρια αναζήτησης.</h5>

        // Will always try to show as many reservations per line, to save space.
        const reservationsToRender = innerWidth > 1500 ? 3 : (innerWidth > 1000 ? 2 : 1);
        const reservationChunks = [];
        for (let i = 0; i < searchResult.length; i += reservationsToRender) {
            reservationChunks.push(searchResult.slice(i, i + reservationsToRender));
        }
        return reservationChunks.map((chunk, index) => (
            <div key={index} className="d-flex justify-content-center">
                {chunk.map(reservation => (
                    <ReservationShort Reservation={reservation} key={reservation.id} className={'border mx-0 mx-md-4 my-5'} />
                ))}
            </div>
        ))
    };
    return (
        <Row className={'h-100'}>
            <Col className={'box_shadow text-center d-flex flex-column m-auto rounded-4 border border-2'} xs={12} md={6}
                 lg={3}>
                <h5 className={'my-3'}>Αναζήτηση με</h5>
                <Stack className={'m-auto w-90'}>
                    <div ref={confNumberInputRef}>
                        <FloatingLabel controlId="conf_number_search_input" label={'Αριθμός Κράτησης'} className="my-3 mx-auto">
                            <Form.Control
                                type="text" placeholder="Αρ. Κράτησης" onChange={(e) => dispatchSearchCriteria(
                                {type: 'Set_Confirmation_Number', value: e.target.value})}
                                value={searchCriteria.conf_number} required aria-label="Reservation Number"
                                aria-describedby="Reservation Number"
                            />
                        </FloatingLabel>
                    </div>
                    <div ref={emailInputRef}>
                        <FloatingLabel controlId="email_search_input" label={'Email'} className="my-3 mx-auto">
                            <Form.Control
                                type="email" placeholder="Email" onChange={(e) => dispatchSearchCriteria(
                                {type: 'Set_Email', value: e.target.value})}
                                value={searchCriteria.email} required aria-label="Email"
                                aria-describedby="Email"
                            />
                        </FloatingLabel>
                    </div>
                    <div ref={phoneInputRef}>
                        <FloatingLabel controlId="phone_number_search_input" label={'Τηλέφωνο'} className="my-3 mx-auto">
                            <Form.Control
                                type="email" placeholder="Τηλέφωνο" aria-label="Phone Number" aria-describedby="Phone Number"
                                value={searchCriteria.phone_number}
                                onChange={(e) => dispatchSearchCriteria(
                                    {type: 'Set_Phone', value: e.target.value})
                                }
                            />
                        </FloatingLabel>
                    </div>
                    <Button variant={'outline-secondary'} className={'my-3 w-fit-content mx-auto'}
                            disabled={noCriteriaActive}
                            onClick={() => dispatchSearchCriteria({type: 'Reset'})}>
                        Καθαρισμός φίλτρων
                    </Button>
                </Stack>
            </Col>
            <Col className={'d-flex flex-column text-center mt-4 mt-xl-0 ' +
                (Array.isArray(searchResult) && searchResult.length > 0 ? ' search-view-reservations' : '')} s={12} md={6} lg={9}>
                {Array.isArray(searchResult) && searchResult.length > 0 && <h5>
                    {searchResult.length === 1 ? `Βρέθηκε 1 αποτέλεσμα` : `Βρέθηκαν ${searchResult.length} αποτελέσματα`}
                </h5>}
                {<Stack className={'p-3 text-center d-flex overflow-y-auto h-90 my-auto'}>
                    {reservationsToShow()}
                </Stack>}
            </Col>
        </Row>
    )
}
{/*<h6 className={'my-2'}>Ή</h6>*/}
{/*<InputGroup className="my-3">*/}
{/*    <InputGroup.Text className={'bg-transparent'}>Αριθμός Δωματίου</InputGroup.Text>*/}
{/*    <Form.Control*/}
{/*        placeholder="Αριθμός Δωματίου"*/}
{/*        aria-label="Room Number"*/}
{/*        aria-describedby="Room Number"*/}
{/*        value={searchCriteria.room_number}*/}
{/*        onChange={(e)=> dispatchSearchCriteria(*/}
{/*            {type:'Set_Room_Number',value:e.target.value})}*/}
{/*    />*/}
{/*</InputGroup>*/}
