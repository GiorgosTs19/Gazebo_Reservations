import {Button, Modal} from "react-bootstrap";

export function PendingUnsavedChangesWarningModal({shouldShowModal,handleCloseModal,SaveChanges}) {
    return (
        <Modal show={shouldShowModal} onHide={handleCloseModal} backdrop="static"
               keyboard={false}>
            <Modal.Header>
                <Modal.Title>Μη αποθηκευμένες αλλαγές στις ρυθμίσεις των Βραδινών Κρατήσεων</Modal.Title>
            </Modal.Header>
            <Modal.Body>Έχετε κάνει αλλαγές στις ρυθμίσεις και δεν τις έχετε αποθηκεύσει.</Modal.Body>
            <Modal.Body>Είστε σίγουροι ότι θέλετε να συνεχίσετε χωρίς να αποθηκεύσετε τις αλλαγές που κάνατε;</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleCloseModal}>
                    Συνέχεια χωρίς Αποθήκευση
                </Button>
                <Button variant="outline-success" onClick={SaveChanges}>
                    Αποθήκευση Αλλαγών
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
