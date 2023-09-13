import {Button, Form, Offcanvas, Stack} from "react-bootstrap";
import {ChevronDownSVG} from "../../../../SVGS/ChevronDownSVG";

export function SearchFilters({SearchCriteria, filtersVisibility, children}) {
    const {searchCriteria,dispatchSearchCriteria, noCriteriaActive} = SearchCriteria,
        {showCriteria, setShowCriteria} = filtersVisibility;

    return (
        <>
            {innerWidth <= 1200 && <div className={'m-auto d-flex flex-column p-2'}>
                <h6 className={'text-center '}>Φίλτρα</h6>
                <ChevronDownSVG height={30} width={30} className={'border-0 text-dark align-self-end m-auto pe-1'}
                onClick={() => setShowCriteria(true)}/>
                </div>}
            <Offcanvas show={showCriteria} placement={'top'} responsive={'xl'} scroll={true} backdrop={true}
                       className={'mx-2 h-fit-content my-lg-auto d-flex'} backdropClassName={'search_filters_backdrop'}
                       style={{borderRadius:'0 0 15px 15px', height:innerWidth < 1200 ? 'fit-content' : '100%'}} onHide={()=>setShowCriteria(false)}>
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
                                {children}
                            </Stack>
                        </Stack>
                        <Button variant={'outline-secondary'} className={'my-3 w-fit-content mx-auto'}
                                disabled={noCriteriaActive}
                                onClick={() => dispatchSearchCriteria({type: 'Reset'})}>
                            Καθαρισμός φίλτρων
                        </Button>
                        <p className={'info-text'} hidden={!showCriteria}>Εμφανίζονται μόνο κρατήσεις, με ημερομηνία αργότερη της σημερινής.</p>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
