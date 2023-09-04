import {OptionsSVG} from "../../../../SVGS/OptionsSVG";
import {Button, FloatingLabel, Form, Stack} from "react-bootstrap";
import {useState} from "react";
import {CloseSVG} from "../../../../SVGS/CloseSVG";
import {ChevronUpSVG} from "../../../../SVGS/ChevronUpSVG";
import {ChevronDownSVG} from "../../../../SVGS/ChevronDownSVG";

export function SearchFilters({SearchCriteria,inputRefs}) {
    const {confNumberInputRef,emailInputRef,phoneInputRef} = inputRefs,
        {searchCriteria,dispatchSearchCriteria, noCriteriaActive} = SearchCriteria,
    [showFilters, setShowFilters] = useState(true);
    return (
        <div className={'box_shadow text-center my-1 my-md-auto rounded-4 border border-2 px-2'}>
            <div className={'d-flex'}>
                <OptionsSVG className={'mx-auto my-3'}></OptionsSVG>
                {showFilters ? <ChevronUpSVG height={30} width={30} className={'border-0 text-dark align-self-end my-auto pe-1'}
                               onClick={() => setShowFilters(false)}/> : <ChevronDownSVG height={30} width={30} className={'border-0 text-dark align-self-end my-auto pe-1'}
                                                                                       onClick={() => setShowFilters(true)}/>}
            </div>

            <Stack className={'mx-auto w-90 h-fit-content'} hidden={!showFilters}>
                <div className="mb-3">
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
                <div ref={confNumberInputRef} >
                    <FloatingLabel controlId="conf_number_search_input" label={'Αριθμός Κράτησης'} className="my-3 mx-auto">
                        <Form.Control
                            type="text" placeholder="Αρ. Κράτησης" value={searchCriteria.conf_number} required aria-label="Reservation Number"
                            onChange={(e) => dispatchSearchCriteria({type:'Set_Confirmation_Number', value:e.target.value})}
                            className={'rounded-4'} aria-describedby="Reservation Number"/>
                    </FloatingLabel>
                </div>
                <div ref={emailInputRef}>
                    <FloatingLabel controlId="email_search_input" label={'Email'} className="my-3 mx-auto">
                        <Form.Control
                            type="email" placeholder="Email" value={searchCriteria.email} required aria-label="Email"
                            onChange={(e) => dispatchSearchCriteria({type:'Set_Email', value:e.target.value})}
                            className={'rounded-4'}  aria-describedby="Email"/>
                    </FloatingLabel>
                </div>
                <div ref={phoneInputRef}>
                    <FloatingLabel controlId="phone_number_search_input" label={'Τηλέφωνο'} className="my-3 mx-auto">
                        <Form.Control
                            type="email" placeholder="Τηλέφωνο" aria-label="Phone Number" aria-describedby="Phone Number"
                            value={searchCriteria.phone_number} className={'rounded-4'}
                            onChange={(e) => dispatchSearchCriteria({type:'Set_Phone', value:e.target.value})}/>
                    </FloatingLabel>
                </div>
                <Button variant={'outline-secondary'} className={'my-3 w-fit-content mx-auto'}
                        disabled={noCriteriaActive}
                        onClick={() => dispatchSearchCriteria({type: 'Reset'})}>
                    Καθαρισμός φίλτρων
                </Button>
            </Stack>
            <p className={'info-text'} hidden={!showFilters}>Εμφανίζονται μόνο κρατήσεις, με ημερομηνία κράτησης αργότερη της σημερινής.</p>
        </div>
    )
}
