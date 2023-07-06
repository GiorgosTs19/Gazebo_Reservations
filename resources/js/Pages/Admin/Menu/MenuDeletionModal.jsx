import {Accordion, Button, Modal} from "react-bootstrap";
import {useState} from "react";
import {Menu} from "./Menu";
import {Inertia} from "@inertiajs/inertia";
import {useContext} from "react";
import {ActiveTabKeyContext} from "../Contexts/ActiveTabKeyContext";

export function MenuDeletionModal({menu}) {
    const [show, setShow] = useState(false),
    {activeTabKey, setActiveTabKey} = useContext(ActiveTabKeyContext),
    handleClose = () => setShow(false),
    handleShow = () => setShow(true),
    handleDeletion = (id) => {
        Inertia.delete(route('Delete_Menu'),{headers: { 'X-Menu_ID': id},onSuccess:()=>{
                setActiveTabKey('Existing');
            }});
        handleClose();
    };



    return (
        <>
            <Button variant={'outline-danger'} className={'rounded-5 shadow-sm'} onClick={handleShow}>Διαγραφή</Button>
            <Modal show={show} onHide={handleClose} className={'text-center'}>
                <Modal.Header closeButton>
                    <Modal.Title>Διαγραφή {menu.Name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5 className={'text-danger'}>Είστε σίγουροι ότι θέλετε να το διαγράψετε;</h5>
                    <Accordion defaultActiveKey={0}>
                        <Menu menu={menu} inModal={true} index={0}></Menu>
                    </Accordion>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Κλείσιμο
                    </Button>
                    <Button variant="danger" onClick={()=>handleDeletion(menu.id)}>
                        Διαγραφή
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
