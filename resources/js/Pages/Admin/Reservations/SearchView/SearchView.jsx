import {Badge, Col, FloatingLabel, Form, Row, Stack} from "react-bootstrap";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {ReservationShort} from "../ReservationViews/ReservationShort";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {ActiveRangeContext} from "../../Contexts/ActiveRangeContext";
import {useCallback, useContext, useRef, useReducer, useState} from "react";
import {SearchFilters} from "./SearchFilters";
import {ReservationLong} from "../ReservationViews/ReservationLong/ReservationLong";
import {MobileActiveReservationOffCanvas} from "../../OffCanvases/MobileActiveReservationOffCanvas";
import {useSearch} from "../../../../CustomHooks/useSearch";
import {SpinnerSVG} from "../../../../SVGS/SpinnerSVG";
import {useScrollToActiveReservation} from "../../../../CustomHooks/useScrollToActiveReservation";

export function SearchView() {
    const {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    [showCriteria, setShowCriteria] = useState(true),
    InnerWidth = useContext(InnerWidthContext);
    const activeReservationRef = useRef(null);
    useScrollToActiveReservation(activeReservationRef);

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

    const [requestProgress, searchResult, setSearchResult] = useSearch(searchCriteria, noCriteriaActive, [searchCriteria]);

    const handleReplaceReservation = (reservation) => {
        const foundIndex = searchResult.findIndex(item=>item.id === reservation.id);
        if (searchResult[foundIndex]) {
            // Replace the reservation with the same id in the search result, with the newly fetched one,
            // to show the updates that have occurred;
            const newArray = [...searchResult];
            newArray[foundIndex] = reservation;
            setSearchResult(newArray)
        }
    };

    // Generates the reservations to show for the selected date.
    const reservationsToShow = ()=> {
        if(!searchResult)
            return <h5 className={'m-auto text-wrap info-text-xl'}>Εισάγετε κάποιο κριτήριο για να κάνετε αναζήτηση</h5>

        if(searchResult.length === 0)
            return <h5 className={'m-auto text-wrap info-text-xl'}>Δεν βρέθηκαν κρατήσεις με αυτά τα κριτήρια αναζήτησης</h5>

        return <Row className={'overflow-x-hidden'}>
            {searchResult.map((reservation) => (
                <Col className={'px-0 px-xl-2 overflow-x-hidden'} key={reservation.id} xs={12} md={activeReservation ? 12 : 6}
                     xxl={activeReservation ? 6 : 3}>
                    <ReservationShort
                        ref={reservation.id === activeReservation?.id ? activeReservationRef : null}
                        Reservation={reservation} className={`border mx-auto my-4 ${innerWidth < 576 ? ' flex-fill' : ''}`}
                    />
                </Col>
            ))}
        </Row>
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

    const reservationsStack = <Col xl={activeReservation === null ? 9 : 5} xxl={innerWidth > 1600 ? activeReservation === null ? 10 : 6 : activeReservation === null ? 9 : 5} className={'d-flex flex-column h-100 overflow-y-auto'}>
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
                     xl={3} xxl={innerWidth > 1600 ? 2 : 3}>
                    {Criteria}
                </Col>
                {requestProgress === 'Pending' ? <SpinnerSVG className={'m-auto'}/> : reservationsStack}
                {activeReservation !==null && <Col className={'h-fit-content m-auto overflow-y-auto p-4'} >
                    <ReservationLong/>
                </Col>}
            </>
        }

        return <>
            {Criteria}
            {requestProgress === 'Pending' ? <SpinnerSVG className={'m-auto'}/> : reservationsStack}
            <MobileActiveReservationOffCanvas/>
        </>
    }

    return (
        <Row className={'h-100 px-2 py-0 px-lg-0 pt-lg-0 overflow-y-auto d-flex'}>
            <ActiveRangeContext.Provider value={[null,handleReplaceReservation]}>
                {renderContent()}
            </ActiveRangeContext.Provider>
        </Row>
    )
}

