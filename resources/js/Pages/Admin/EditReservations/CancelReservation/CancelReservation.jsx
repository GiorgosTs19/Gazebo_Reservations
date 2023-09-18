import {Button, Card, FloatingLabel, Form} from "react-bootstrap";
import {useContext, useState} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {ActiveRangeContext} from "../../Contexts/ActiveRangeContext";
import {handleChangeReservationStatus} from "../../../../Inertia_Requests/Admin_Requests";
import {ViewContext} from "../../../../Contexts/ViewContext";

export function CancelReservation() {
    const {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
        {activeReservationsView,setActiveReservationsView} = useContext(ViewContext),
        [input, setInput] = useState(''),
        [activeRange, setReservations] = useContext(ActiveRangeContext),
        confNumberConfirmed = input === 'ΑΚΥΡΩΣΗ';

    return (
        <Card className={'border-0'}>
            <Card.Header className={'bg-transparent'}>
                <Card.Title>Ακύρωση Κράτησης {activeReservation.Confirmation_Number}</Card.Title>
            </Card.Header>
            <Card.Body className={'my-0 p-2'}>
                <p className={'info-text-lg'}>
                    Είστε σίγουροι πώς θέλετε να ακυρώσετε την κράτηση;
                </p>
                <p className={'text-danger my-3 fw-bold'}>
                    Αυτή η ενέργεια, δεν μπορεί να αναιρεθεί!
                </p>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Επιβεβαίωση"
                    className="m-auto w-fit-content">
                    <Form.Control type="text" placeholder="Αριθμός Επιβεβαίωσης" className={'mt-4 mb-2'}
                    value={input} onChange={e=>setInput(e.target.value.trim())}/>
                </FloatingLabel>
                <p className={'info-text'}>Πληκτρολογήστε ΑΚΥΡΩΣΗ για να συνεχίσετε</p>
            </Card.Body>
            <Card.Footer className={'d-flex flex-column bg-transparent border-0'}>
                <Button variant={'danger'} className={'m-auto'} disabled={!confNumberConfirmed}
                onClick={()=>handleChangeReservationStatus('Cancelled',activeReservation, setActiveReservation,
                    activeRange, setReservations,activeReservationsView)}
                >Ακύρωση κράτησης</Button>
                <p className={'mt-3 mb-2 info-text text-muted fst-italic'}>Η κράτηση θα μεταφερθεί στην καρτέλα με τις ακυρωμένες κρατήσεις</p>
            </Card.Footer>
        </Card>
    )
}
