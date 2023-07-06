import {Button, Image, Modal, OverlayTrigger, Stack, Tooltip} from "react-bootstrap";
import {getFormattedDate} from "../../../ExternalJs/Util";
import {Inertia} from "@inertiajs/inertia";
import {useContext, useState} from "react";
import {InnerWidthContext} from "../../../Contexts/InnerWidthContext";

export function SetDayUnavailableModal({selectedDate,current_date_availability,AvailabilityText,Reservations}) {
    const [show, setShow] = useState(false),
    innerWidth = useContext(InnerWidthContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSetDayUnavailable = () => {
        const date_to_disable = getFormattedDate(selectedDate,'-',1);
        Inertia.post(route('Disable_Day'),{Date:date_to_disable},{preserveScroll:true,preserveState:true,
            only:['Dinner_Reservations']});
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
                    {(Array.isArray(Reservations) && Reservations.length > 0) && <OverlayTrigger placement={'right-end'} overlay={<Tooltip>{AvailabilityText}</Tooltip>}>
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
                    <section className={'border-bottom text-warning pb-3'}>
                        Δεν θα μπορούν να γίνουν άλλες κρατήσεις για αυτήν την μέρα, μέχρι να την ξανά ορίσετε ώς διαθέσιμη.
                    </section>
                    <section >
                        Σε περίπτωση που θέσετε την ημέρα ως μη διαθέσιμη, αν δεν μπορούν να πραγματοποιηθούν
                        οι υπάρχουσες κρατήσεις πρέπει να γίνει μεταφορά τους σε άλλη μέρα.
                    </section>

                    <section>
                        Σε αντίθετη περίπτωση το σύστημα
                        απλά θα αποτρέψει επιπλέον κρατήσεις για εκείνη την ημέρα.
                    </section>

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
