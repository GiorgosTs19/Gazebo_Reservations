import {Button, Card, FloatingLabel, Form} from "react-bootstrap";
import {useContext, useState} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {ActiveRangeContext} from "../../Contexts/ActiveRangeContext";
import {handleChangeReservationStatus} from "../../../../Inertia_Requests/Admin_Requests";

export function CancelReservation({edit}) {
    const {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
        {editing, setEditing} = edit,
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
            <Card.Footer className={'d-flex bg-transparent border-0'}>
                <Button variant={'danger'} className={'m-auto'} disabled={!confNumberConfirmed}
                onClick={()=>handleChangeReservationStatus('Cancelled',{activeReservation,setActiveReservation:setActiveReservation},
                    activeRange, setReservations)}
                >Ακύρωση κράτησης</Button>
            </Card.Footer>
        </Card>
    )
}
