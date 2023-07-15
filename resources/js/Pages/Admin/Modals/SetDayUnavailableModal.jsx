import {Button, Form, Image, Modal, OverlayTrigger, Stack, Tooltip} from "react-bootstrap";
import {getFormattedDate} from "../../../ExternalJs/Util";
import {Inertia} from "@inertiajs/inertia";
import {useContext, useState} from "react";
import {InnerWidthContext} from "../../../Contexts/InnerWidthContext";
import {ActiveReservationTypeContext} from "../Contexts/ActiveReservationTypeContext";

export function SetDayUnavailableModal({selectedDate,current_date_availability,AvailabilityText,Reservations}) {
    const [show, setShow] = useState(false),
    innerWidth = useContext(InnerWidthContext),
    [allowExistingReservations,setAllowExistingReservations] = useState(false),
    Type = useContext(ActiveReservationTypeContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChangeAllowExistingReservations = value => {
        setAllowExistingReservations(value);
    }

    const handleSetDayUnavailable = () => {
        const date_to_disable = getFormattedDate(selectedDate,'-',1);
        Inertia.post(route('Disable_Day'),{Date:date_to_disable,Allow_Existing_Reservations:allowExistingReservations,Type:Type},{preserveScroll:true,preserveState:true,
            only:['Dinner_Reservations']});
    };
    const dateHasReservations = Array.isArray(Reservations) && Reservations.length > 0;

    const getReservationCountMessage = () => {
        switch (Reservations.length) {
            case 1 : {
                return <p className={'my-2 fw-bold'}>Έχει καταχωρηθεί ήδη 1 κράτηση για αυτήν την μέρα.</p>
            }
            default : {
                return <p className={'my-2 fw-bold'}>Έχουν καταχωρηθεί ήδη {Reservations.length} κρατήσεις για αυτήν την μέρα.</p>
            }
        }
    }

    const getWarningMessage = () => {
        switch (allowExistingReservations) {
            case false : {
                switch (Reservations.length) {
                    case 1 : {
                        return <b>ΠΡΕΠΕΙ να γίνει μεταφορά της σε άλλη μέρα έπειτα από συνεννόηση με τον πελάτη.</b>
                    }
                    default : {
                        return <b>ΠΡΕΠΕΙ να γίνει μεταφορά τους σε άλλη μέρα έπειτα από συνεννόηση με τους πελάτες.</b>
                    }
                }
            }
            case true : {
                switch (Reservations.length) {
                    case 1 : {
                        return <b>Η υπάρχουσα κράτηση θα πραγματοποιηθεί κανονικά.</b>
                    }
                    default : {
                        return <b>Οι υπάρχουσες κρατήσεις θα πραγματοποιηθούν κανονικά.</b>
                    }
                }
            }
        }
    };
    const formatted_date = getFormattedDate(selectedDate, '-', 2);
    return (
        <>
            <div className={'d-flex'}>
                <Stack direction={'horizontal'} className={'mx-auto'}>
                    <Button variant={'outline-danger'} className={'p-2 my-2'}
                            disabled={current_date_availability === 'Disabled'}
                            onClick={handleShow}>
                        Ορισμός ως μη διαθέσιμη
                    </Button>
                    {(dateHasReservations && Reservations.length > 0) &&
                        <OverlayTrigger placement={'right-end'} overlay={<Tooltip>{AvailabilityText}</Tooltip>}>
                            <Image src={'Images/Icons/warning.png'} className={'ms-3'}></Image>
                        </OverlayTrigger>}
                </Stack>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ορισμός {formatted_date} ως μη διαθέσιμη</Modal.Title>
                </Modal.Header>
                <Modal.Body className={'fst-italic text-center'}>
                    <section className={'text-warning'}>
                        Είστε σίγουροι πως θέλετε να θέσετε την {formatted_date} ως μή διαθέσιμη?
                    </section>
                    <section className={'text-warning ' + (dateHasReservations ? 'border-bottom pb-3 ' : '')}>
                        Δεν θα μπορούν να καταχωρηθούν {dateHasReservations ? 'άλλες' : ''} κρατήσεις για αυτήν την μέρα,
                        μέχρι να την ξανά ορίσετε ώς διαθέσιμη.
                    </section>
                    {dateHasReservations && <section className={'p-2 my-1'}>
                        <p>
                            <Image src={'Images/Icons/warning.png'} className={'my-1'}></Image>
                        </p>
                        <section className={'my-2'}>
                            <Form>
                                <Form.Check
                                    inline
                                    label="Μπορούν να πραγματοποιηθούν οι υπάρχουσες κρατήσεις."
                                    name="Existing_Reservations_Allowance"
                                    type={"radio"}
                                    checked={allowExistingReservations === true}
                                    onChange={()=>handleChangeAllowExistingReservations(true)}
                                />
                                <Form.Check
                                    inline
                                    label="Δεν μπορούν να πραγματοποιηθούν οι υπάρχουσες κρατήσεις."
                                    name="Existing_Reservations_Allowance"
                                    type={"radio"}
                                    checked={allowExistingReservations === false}
                                    onChange={()=>handleChangeAllowExistingReservations(false)}
                                />
                            </Form>
                        </section>
                        <div>
                            {!allowExistingReservations && getReservationCountMessage()}
                        </div>
                        {getWarningMessage()}
                        {!allowExistingReservations &&
                            <div className={'mt-2'}>
                                <p>Παράλληλα το σύστημα θα αποτρέψει περαιτέρω κρατήσεις για αυτήν την ημέρα.</p>
                            </div>
                        }
                    </section>}

                    {dateHasReservations && allowExistingReservations && <section>
                        <b>Tο σύστημα θα αποτρέψει επιπλέον κρατήσεις για αυτήν την ημέρα.</b>
                    </section>}

                    {!dateHasReservations && <section className={'my-3'}>
                        <h6>Δεν υπάρχει κάποια κράτηση για αυτήν την ημέρα.</h6>
                    </section>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" className={'p-2 my-2'} onClick={handleClose}>
                        Ακύρωση
                    </Button>
                    <Button variant={'outline-danger'} className={'p-2 my-2'}
                            disabled={current_date_availability === 'Disabled'}
                            onClick={handleSetDayUnavailable}>
                        Ορισμός ως μη διαθέσιμη
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
