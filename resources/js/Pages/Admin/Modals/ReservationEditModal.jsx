import {Button, Modal} from "react-bootstrap";
import {useState} from "react";
import {ReservationEditingOptions} from "../Reservations/ReservationEditing/ReservationEditingOptions";
import {EditReservationModalTitleContext} from "../Contexts/EditReservationModalTitleContext";
export function ReservationEditModal({Reservation}) {
    const [show, setShow] = useState(false);
    const handleShow = () => {
        // Inertia.get(route('ShowAdminPanel'),{},{preserveScroll:true,preserveState:true,only:['Dinner_Reservations'],onSuccess:()=>{
        //     }});
        setShow(true);
    };
    const [content,setContent] = useState('Options');
    const [modalTitle,setModalTitle] = useState('Επεξεργασία Κράτησης');
    const handleBackToOptions = () => {setContent('Options');setModalTitle('Επεξεργασία Κράτησης')};
    const handleHide = () => {setContent('Options');setShow(false);}
    return (
        <>
            <Button variant={'outline-warning'} size={'lg'}
                    className={'mx-auto'} onClick={handleShow}>
                Επεξεργασία
            </Button>

            <Modal size="lg" show={show} onHide={handleHide} className={'text-center'}>
                <EditReservationModalTitleContext.Provider value={{modalTitle,setModalTitle}}>
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            {modalTitle}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {content !== 'Options' && <h2 onClick={handleBackToOptions} style={{cursor:'pointer'}}>&larr;</h2>}
                        {content === 'Options' &&
                            <ReservationEditingOptions Content={{content,setContent}} Reservation={Reservation}
                                                       ModalTitle={{modalTitle,setModalTitle}}>
                            </ReservationEditingOptions>
                        }
                        {content !== 'Options' &&
                            content
                        }
                    </Modal.Body>
                </EditReservationModalTitleContext.Provider>
            </Modal>
        </>
    )
}
