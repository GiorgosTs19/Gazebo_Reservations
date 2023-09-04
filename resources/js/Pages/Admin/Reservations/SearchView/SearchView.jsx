import {Badge, Col, Row, Stack} from "react-bootstrap";
import {useCallback, useContext, useEffect, useReducer, useRef, useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import {ReservationShort} from "../ReservationViews/ReservationShort";
import gsap from "gsap";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {SearchFilters} from "./SearchFilters";

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
            if(inputRef === null || inputRef === ref.current)
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

    const searchCriteriaReducer = (state,action) => {
        switch (action.type) {
            case 'Set_Email' : {
                // if(action.value.length === 0 || state.email.length === 0)
                    animateInputFocus(emailInputRef.current);
                return {...state,email:action.value};
            }
            case 'Set_Phone' : {
                // if(action.value.length === 0 || state.phone_number.length === 0)
                    animateInputFocus(phoneInputRef.current);
                return {...state,phone_number:action.value};
            }
            case 'Set_Confirmation_Number' : {
                // if(action.value.length === 0 || state.conf_number.length === 0)
                    animateInputFocus(confNumberInputRef.current);
                return {...state,conf_number:action.value};
            }
            case 'Set_Reservation_Type' : {
                return {...state,type:action.value};
            }
            // case 'Set_Room_Number' : {
            //     return {...state,room_number:action.value};
            // }
            case 'Reset' : {
                setSearchResult(null);
                return {conf_number:'',
                    email:'',
                    phone_number:'',
                    type:'All'
                    // room_number:'',
                };
            }
        }
    };
    const [searchCriteria,dispatchSearchCriteria] = useReducer(searchCriteriaReducer,{
        conf_number:'',
        email:'',
        phone_number:'',
        type:'All'
        // room_number:'',
    });

    const noCriteriaActive = searchCriteria.email === '' && searchCriteria.conf_number === ''
    && searchCriteria.phone_number === '';

    useEffect(()=>{
        if(noCriteriaActive) {
            if(activeReservation !== null)
                setActiveReservation(null)
            animateInputFocus(null);
            return setSearchResult(null);
        }
        if(searchCriteria.email !== '' || searchCriteria.conf_number !== '' || searchCriteria.phone_number !== '')
            Inertia.get(route('Search_Reservations'),searchCriteria,{
                only:['search_result'],
                preserveScroll:true,
                preserveState:true,
                onSuccess:(res)=>{setSearchResult(res.props.search_result)}
            });
    },[searchCriteria]);

    // Generates the reservations to show for the selected date.
    const reservationsToShow = ()=> {
        if(!searchResult)
            return <h5 className={'my-0 my-sm-auto text-wrap'}>Εισάγετε κάποιο κριτήριο για να κάνετε αναζήτηση.</h5>

        if(searchResult.length === 0)
            return <h5 className={'my-auto text-wrap'}>Δεν βρέθηκαν κρατήσεις με αυτά τα κριτήρια αναζήτησης.</h5>

        // Will always try to show as many reservations per line, to save space.
        const reservationsToRender = innerWidth > 1500 ? (activeReservation === null ? 3 : 2) : (innerWidth > 1000 ? 2 : 1);
        const reservationChunks = [];
        for (let i = 0; i < searchResult.length; i += reservationsToRender) {
            reservationChunks.push(searchResult.slice(i, i + reservationsToRender));
        }
        return reservationChunks.map((chunk, index) => (
            <div key={index} className="d-flex justify-content-center">
                {chunk.map(reservation => (
                    <ReservationShort Reservation={reservation} key={reservation.id} className={'border mx-0 mx-md-4 mb-3 mb-lg-5'} />
                ))}
            </div>
        ))
    };

    const getCriteriaLabels = useCallback(()=>{
        let criteria = [];
        if(searchCriteria.email !== '')
            criteria = [...criteria,<Badge bg="dark" text="light" className={'mx-2'}>{`${searchCriteria.email}`}</Badge>];
        if(searchCriteria.conf_number !== '')
            criteria = [...criteria,<Badge bg="dark" text="light" className={'mx-2'}>{`${searchCriteria.conf_number}`}</Badge>];
        if(searchCriteria.phone_number !== '')
            criteria = [...criteria,<Badge bg="dark" text="light" className={'mx-2'}>{`${searchCriteria.phone_number}`}</Badge>];
        if(searchCriteria.type !== 'All')
            criteria = [...criteria,<Badge bg="dark" text="light" className={'mx-2'}>{`${searchCriteria.type === 'Dinner' ? 'Βραδινές' : 'Πρωινές'}`}</Badge>];

        return <Stack direction={'horizontal'} className={'mt-1 mb-2 mt-lg-2 mb-lg-4 mx-auto'}>
            {criteria.map(badge => badge)}
        </Stack>
    },[searchCriteria]);

    return (
        <Row className={'h-100 px-2 py-2 px-lg-0 pt-lg-0 overflow-y-auto'}>
            <Col className={'search-filters d-flex flex-column'} xs={12} md={6} lg={4} xl={3}>
                <SearchFilters SearchCriteria={{searchCriteria,dispatchSearchCriteria,noCriteriaActive}} inputRefs={{confNumberInputRef, emailInputRef, phoneInputRef}}>
                </SearchFilters>
            </Col>
            <Col className={'d-flex flex-column text-center mt-4 mt-md-0 ' +
                (Array.isArray(searchResult) && searchResult.length > 0 ? ' search-view-reservations' : '')}
                 sm={12} md={6} lg={8} xl={9}>
                {Array.isArray(searchResult) && searchResult.length > 0 && <h5>
                    {searchResult.length === 1 ? `Βρέθηκε 1 αποτέλεσμα` : `Βρέθηκαν ${searchResult.length} αποτελέσματα`}
                </h5>}
                {getCriteriaLabels()}
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
