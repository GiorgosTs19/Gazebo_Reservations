import {OptionsSVG} from "../../../../SVGS/OptionsSVG";
import {Button, FloatingLabel, Form, Offcanvas, Stack} from "react-bootstrap";
import {useState} from "react";
import {CloseSVG} from "../../../../SVGS/CloseSVG";
import {ChevronUpSVG} from "../../../../SVGS/ChevronUpSVG";
import {ChevronDownSVG} from "../../../../SVGS/ChevronDownSVG";
import {ChevronLeftSVG} from "../../../../SVGS/ChevronLeftSVG";
import {ChevronRightSVG} from "../../../../SVGS/ChevronRightSVG";

export function SearchFilters({SearchCriteria,inputRefs, filtersVisibility}) {
    const {confNumberInputRef,emailInputRef,phoneInputRef} = inputRefs,
        {searchCriteria,dispatchSearchCriteria, noCriteriaActive} = SearchCriteria,
        {showFilters, setShowFilters} = filtersVisibility;


    return (
        <>
            {innerWidth <= 1200 && <div className={'m-auto d-flex flex-column p-2'}>
                <h6 className={'text-center '}>Φίλτρα</h6>
                <ChevronDownSVG height={30} width={30} className={'border-0 text-dark align-self-end m-auto pe-1'}
                onClick={() => setShowFilters(true)}/>
                </div>}
            <Offcanvas show={showFilters} placement={'top'} responsive={'xl'} scroll={true} backdrop={'false'} className={'mx-2 h-fit-content my-lg-auto d-flex'}
                       style={{borderRadius:'0 0 15px 15px', height:innerWidth < 1200 ? 'fit-content' : '100%'}} onHide={()=>setShowFilters(false)}>
                <div className={'d-flex'}>
                </div>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Κριτήρια Αναζήτησης</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className={'d-flex w-fit-content m-auto'}>
                    <div className={`box_shadow text-center m-auto rounded-4 border border-2 px-2 overflow-y-auto`}>
                        <Stack className={`mx-auto flex-wrap`} >
                            <div className="my-3">
                                <h6>Είδος Κράτησης</h6>
                                <Form.Check
                                    inline
                                    label="Όλες"
                                    name="ReservationType"
                                    type={'radio'}
                                    value={'All'}
                                    id={`ReservationType-1`}
                                    checked={searchCriteria.type === 'All'}
                                    onChange={(e) => dispatchSearchCriteria(
                                        {type: 'Set_Reservation_Type', value: e.target.value})}
                                />
                                <Form.Check
                                    inline
                                    label="Βραδινές"
                                    name="ReservationType"
                                    type={'radio'}
                                    id={`ReservationType-2`}
                                    value={'Dinner'}
                                    checked={searchCriteria.type === 'Dinner'}
                                    onChange={(e) => dispatchSearchCriteria(
                                        {type: 'Set_Reservation_Type', value: e.target.value})}
                                />
                                <Form.Check
                                    inline
                                    label="Πρωινές"
                                    name="ReservationType"
                                    type={'radio'}
                                    value={'Bed'}
                                    id={`ReservationType-3`}
                                    checked={searchCriteria.type === 'Bed'}
                                    onChange={(e) => dispatchSearchCriteria(
                                        {type: 'Set_Reservation_Type', value: e.target.value})}
                                />
                            </div>
                            <Stack direction={innerWidth < 1200 ? 'horizontal' : 'vertical'} gap={3} className={'flex-wrap'}>
                                <FloatingLabel controlId="conf_number_search_input" label={'Αριθμός Κράτησης'} className="my-3 mx-auto mw-250px" ref={confNumberInputRef} >
                                    <Form.Control
                                        type="text" placeholder="Αρ. Κράτησης" value={searchCriteria.conf_number} required aria-label="Reservation Number"
                                        onChange={(e) => dispatchSearchCriteria({type:'Set_Confirmation_Number', value:e.target.value})}
                                        className={'rounded-4'} aria-describedby="Reservation Number"/>
                                </FloatingLabel>
                                <FloatingLabel controlId="email_search_input" label={'Email'} className="my-3 mx-auto mw-250px" ref={emailInputRef}>
                                    <Form.Control
                                        type="email" placeholder="Email" value={searchCriteria.email} required aria-label="Email"
                                        onChange={(e) => dispatchSearchCriteria({type:'Set_Email', value:e.target.value})}
                                        className={'rounded-4'}  aria-describedby="Email"/>
                                </FloatingLabel>
                                <FloatingLabel controlId="phone_number_search_input" label={'Τηλέφωνο'} className="my-3 mx-auto mw-250px" ref={phoneInputRef}>
                                    <Form.Control
                                        type="email" placeholder="Τηλέφωνο" aria-label="Phone Number" aria-describedby="Phone Number"
                                        value={searchCriteria.phone_number} className={'rounded-4'}
                                        onChange={(e) => dispatchSearchCriteria({type:'Set_Phone', value:e.target.value})}/>
                                </FloatingLabel>
                            </Stack>
                        </Stack>
                        <Button variant={'outline-secondary'} className={'my-3 w-fit-content mx-auto'}
                                disabled={noCriteriaActive}
                                onClick={() => dispatchSearchCriteria({type: 'Reset'})}>
                            Καθαρισμός φίλτρων
                        </Button>
                        <p className={'info-text'} hidden={!showFilters}>Εμφανίζονται μόνο κρατήσεις, με ημερομηνία αργότερη της σημερινής.</p>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
