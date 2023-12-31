import {Button, FloatingLabel, Form, Modal, Nav} from "react-bootstrap";
import {useContext, useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import {handleCreateNewReservationForDate} from "../../../Inertia_Requests/Admin_Requests";
import {formatDateInGreek, getFormattedDate, isDateDisabledByAdmin} from "../../../ExternalJs/Util";
import {AddSVG} from "../../../SVGS/AddSVG";
import {DisabledDaysContext} from "../Contexts/DisabledDaysContext";

export function AdminToNewReservationFormModal({returnButton = false, reservationType = 'Dinner', forCurrentDate = false}) {
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => {
        setShowModal(true);
    };
    const Disabled_Days = useContext(DisabledDaysContext);
    const date = getFormattedDate(new Date(),'-',1),
    [numberOfPeople, setNumberOfPeople] = useState(1);
    const [dateIsDisabled, reservationsAllowed] = isDateDisabledByAdmin(date,Disabled_Days);
    const canProceed = () => {
        if(forCurrentDate && dateIsDisabled)
            return false;
        if(numberOfPeople <=0)
            return false;
        switch (reservationType) {
            case 'Dinner' : {
                return numberOfPeople <=4;
            }
            case 'Bed' : {
                return numberOfPeople <=2;
            }
            default : {
                return false;
            }
        }
    }

    return (
        <>
            {returnButton ? <AddSVG onClick={handleShow} className={'m-auto'}/>:<Nav.Link className={'secondary my-auto hover-scale-1_03'} onClick={handleShow}>Νέα Κράτηση</Nav.Link>}
            <Modal show={showModal} className={'text-center'} centered onHide={()=>setShowModal(false)}>
                <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Μετάβαση στην φόρμα νέων κρατήσεων
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={'h-100'}>
                    {(forCurrentDate ? !dateIsDisabled : true) && <h6>Θα μεταβείτε στην φόρμα νέων κρατήσεων.</h6>}
                    {forCurrentDate && !dateIsDisabled && <>
                        <p className={'my-3 info-text-lg'}>
                            Έχετε επιλέξει να
                            δημιουργήσετε {reservationType === 'Dinner' ? 'βραδινή' : 'πρωινή'} κράτηση για σήμερα.
                        </p>

                        <h6 className={'my-2'}>
                            Ημερομηνία : {formatDateInGreek(date)}
                        </h6>
                        <h6 className={'my-2'}>
                            Τύπος
                            : {reservationType === 'Dinner' ? 'Βραδινή Κράτηση ( Δείπνο ) ' : 'Πρωινή Κράτηση ( Ξαπλώστρες )'}
                        </h6>
                        <FloatingLabel controlId="floatingInput" label={'Αριθμός Ατόμων'}
                                       className="my-3 mx-auto w-100">
                            <Form.Control
                                type="number" placeholder="Αριθμός Ατόμων"
                                onChange={e => setNumberOfPeople(e.target.value)}
                                value={numberOfPeople} required max={reservationType === 'Dinner' ? 4 : 2} min={0}/>
                            {numberOfPeople < 0 &&
                                <p className={'text-danger mt-2'}>Ο αριθμός ατόμων, πρέπει να είναι θετικός
                                    αριθμός.</p>}
                            {reservationType === 'Dinner' ? (numberOfPeople > 4 &&
                                    <p className={'text-danger mt-2'}>Επιτρέπονται μέχρι 4 άτομα για το είδος κράτησης που
                                        επιλέξατε</p>) :
                                (numberOfPeople > 2 &&
                                    <p className={'text-danger mt-2'}>Επιτρέπονται μέχρι 2 άτομα για το είδος κράτησης
                                        που επιλέξατε</p>)}
                        </FloatingLabel>
                        <p className={'my-3 info-text-lg'}>
                            Η ημερομηνία, ο τύπος κράτησης και ο αριθμός ατόμων, θα καταχωρηθούν αυτόματα για εσάς.
                        </p>
                    </>
                    }
                    {forCurrentDate && dateIsDisabled && <h5 className={'m-auto text-danger'}>Δεν μπορούν να καταχωρηθούν κρατήσεις σε απενεργοποιημένη ημέρα</h5>}

                    {(forCurrentDate ? !dateIsDisabled : true) && <h5 className={'my-3 info-text-lg'}>
                        Μετά την ολοκλήρωση της κράτησης, θα μεταφερθείτε ξανά πίσω σε αυτήν την σελίδα.
                    </h5>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={()=>setShowModal(false)}>Ακύρωση</Button>
                    {returnButton ?
                        <Button variant="outline-primary"
                                onClick={()=>handleCreateNewReservationForDate(date,reservationType, numberOfPeople)} disabled={!canProceed()}>Μετάβαση</Button>
                        :
                        <Button variant="outline-primary"
                             onClick={() => Inertia.get(route('Show.Gazebo.Reservation.Form'))}>Μετάβαση</Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}
