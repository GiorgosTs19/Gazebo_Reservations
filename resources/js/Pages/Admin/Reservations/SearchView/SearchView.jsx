import {Badge, Col, FloatingLabel, Form, Row, Stack} from "react-bootstrap";
import {useCallback, useContext, useEffect, useReducer, useRef, useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import {ReservationShort} from "../ReservationViews/ReservationShort";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {SearchFilters} from "./SearchFilters";
import {ReservationLong} from "../ReservationViews/ReservationLong/ReservationLong";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {ActiveRangeContext} from "../../Contexts/ActiveRangeContext";
import {MobileActiveReservationOffCanvas} from "../../OffCanvases/MobileActiveReservationOffCanvas";

export function SearchView() {
    const [searchResult,setSearchResult] = useState(null);
    const {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    [showCriteria, setShowCriteria] = useState(true),
    InnerWidth = useContext(InnerWidthContext);

    const searchCriteriaReducer = (state,action) => {
        switch (action.type) {
            case 'Set_Email' : {
                    // animateInputFocus(emailInputRef.current);
                return {...state,email:action.value};
            }
            case 'Set_Phone' : {
                    // animateInputFocus(phoneInputRef.current);
                return {...state,phone_number:action.value};
            }
            case 'Set_Confirmation_Number' : {
                    // animateInputFocus(confNumberInputRef.current);
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
            return <h5 className={'m-auto text-wrap info-text-xl'}>Εισάγετε κάποιο κριτήριο για να κάνετε αναζήτηση</h5>

        if(searchResult.length === 0)
            return <h5 className={'m-auto text-wrap info-text-xl'}>Δεν βρέθηκαν κρατήσεις με αυτά τα κριτήρια αναζήτησης</h5>

        // Will always try to show as many reservations per line, to save space.
        const reservationsToRender = InnerWidth > 992 ? (activeReservation === null ? 2 : 1) : 1;
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
            criteria = [...criteria,<Badge bg="dark" text="light" key={0} className={'mx-2'}>{`${searchCriteria.email}`}</Badge>];
        if(searchCriteria.conf_number !== '')
            criteria = [...criteria,<Badge bg="dark" text="light" key={1} className={'mx-2'}>{`# ${searchCriteria.conf_number}`}</Badge>];
        if(searchCriteria.phone_number !== '')
            criteria = [...criteria,<Badge bg="dark" text="light" key={2} className={'mx-2'}>{`${searchCriteria.phone_number}`}</Badge>];
        if(searchCriteria.type !== 'All')
            criteria = [...criteria,<Badge bg="dark" text="light" key={3} className={'mx-2'}>{`${searchCriteria.type === 'Dinner' ? 'Βραδινές' : 'Πρωινές'}`}</Badge>];

        return <Stack direction={'horizontal'} className={'mt-1 mb-2 mt-lg-2 mb-lg-4 mx-auto'}>
            {criteria.map(badge => badge)}
        </Stack>
    },[searchCriteria]);

    const reservationsStack = <Col xl={activeReservation === null ? 9 : 5} className={'d-flex flex-column h-100 overflow-y-auto'}>
        {Array.isArray(searchResult) && searchResult.length > 0 && <h5 className={'m-auto'}>
            {searchResult.length === 1 ? `Βρέθηκε 1 αποτέλεσμα` : `Βρέθηκαν ${searchResult.length} αποτελέσματα`}
        </h5>}
        {getCriteriaLabels()}
        {<Stack className={'p-3 text-center d-flex overflow-y-auto h-90 my-auto'}>
            {reservationsToShow()}
        </Stack>}
    </Col>;

    const Criteria = <SearchFilters SearchCriteria={{searchCriteria,dispatchSearchCriteria,noCriteriaActive}} filtersVisibility={{showCriteria, setShowCriteria}}>
        <FloatingLabel controlId="conf_number_search_input" label={'Αριθμός Κράτησης'} className="my-3 mx-auto mw-250px">
            <Form.Control
                type="text" placeholder="Αρ. Κράτησης" value={searchCriteria.conf_number} required aria-label="Reservation Number"
                onChange={(e) => dispatchSearchCriteria({type:'Set_Confirmation_Number', value:e.target.value})}
                className={'rounded-4'} aria-describedby="Reservation Number" disabled={searchCriteria.phone_number !== '' || searchCriteria.email !== ''}/>
        </FloatingLabel>
        <FloatingLabel controlId="email_search_input" label={'Email'} className="my-3 mx-auto mw-250px">
            <Form.Control
                type="email" placeholder="Email" value={searchCriteria.email} required aria-label="Email"
                onChange={(e) => dispatchSearchCriteria({type:'Set_Email', value:e.target.value})}
                className={'rounded-4'}  aria-describedby="Email" disabled={searchCriteria.phone_number !== '' || searchCriteria.conf_number !== ''}/>
        </FloatingLabel>
        <FloatingLabel controlId="phone_number_search_input" label={'Τηλέφωνο'} className="my-3 mx-auto mw-250px">
            <Form.Control
                type="email" placeholder="Τηλέφωνο" aria-label="Phone Number" aria-describedby="Phone Number"
                value={searchCriteria.phone_number} className={'rounded-4'} disabled={searchCriteria.email !== '' || searchCriteria.conf_number !== ''}
                onChange={(e) => dispatchSearchCriteria({type:'Set_Phone', value:e.target.value})}/>
        </FloatingLabel>
    </SearchFilters>;
    const renderContent = () => {
        if(InnerWidth >= 1200) {
            return <>
                <Col className={`search-filters d-flex flex-column bg-white py-3 ${innerWidth < 992 ? 'sticky-top' : ''} ${InnerWidth < 768 ? 'h-fit-content' : 'h-100'}`}
                     xl={3}>
                    {Criteria}
                </Col>
                {reservationsStack}
                {activeReservation !==null && <Col className={'d-flex h-100 overflow-y-auto px-1'} >
                    <ReservationLong/>
                </Col>}
            </>
        }

        return <>
            {Criteria}
            {reservationsStack}
            <MobileActiveReservationOffCanvas/>
        </>
    }

    return (
        <Row className={'h-100 px-2 py-0 px-lg-0 pt-lg-0 overflow-y-auto'}>
            <ActiveRangeContext.Provider value={[null,()=>{}]}>
                {renderContent()}
            </ActiveRangeContext.Provider>
        </Row>
    )
}

