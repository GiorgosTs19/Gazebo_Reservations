import {OptionsSVG} from "../../../../SVGS/OptionsSVG";
import {Button, FloatingLabel, Form, Stack} from "react-bootstrap";

export function SearchFilters({SearchCriteria,inputRefs}) {
    const {confNumberInputRef,emailInputRef,phoneInputRef} = inputRefs,
        {searchCriteria,dispatchSearchCriteria, noCriteriaActive} = SearchCriteria;
    return (
        <>
            <OptionsSVG className={'mx-auto my-3'}></OptionsSVG>
            <Stack className={'mx-auto w-90'} >
                <div className="mb-3">
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
                        label="Dinner"
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
                        label="Bed"
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
        </>
    )
}
