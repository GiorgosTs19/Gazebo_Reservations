import {Button, Modal} from "react-bootstrap";
import {useState} from "react";
import {ReservationEditingOptions} from "../Reservations/ReservationEditing/ReservationEditingOptions";
import {EditReservationModalTitleContext} from "../Contexts/EditReservationModalTitleContext";
import {ShowEditReservationModalContext} from "../Contexts/ShowEditReservationModalContext";
import {EditModalContentContext} from "../Contexts/EditModalContentContext";
export function ReservationEditModal({Reservation}) {
    const [showEditModal, setShowEditModal] = useState(false);
    const handleShow = () => {
        // Inertia.get(route('ShowAdminPanel'),{},{preserveScroll:true,preserveState:true,only:['Dinner_Reservations'],onSuccess:()=>{
        //     }});
        setShowEditModal(true);
    };
    const [content,setContent] = useState('Options');
    const [modalTitle,setModalTitle] = useState('Επεξεργασία Κράτησης');
    const handleBackToOptions = () => {setContent('Options');setModalTitle('Επεξεργασία Κράτησης')};
    const handleHide = () => {setContent('Options');setShowEditModal(false);}
    return (
        <>
            <Button variant={'outline-dark'}
                    className={'mx-auto px-2 py-2 rounded-3'} onClick={handleShow}>
                Επεξεργασία
            </Button>

            <Modal size="lg" show={showEditModal} onHide={handleHide} className={'text-center'}>
                <EditReservationModalTitleContext.Provider value={{modalTitle,setModalTitle}}>
                    <ShowEditReservationModalContext.Provider value={{showEditModal,setShowEditModal}}>
                        <EditModalContentContext.Provider value={{content,setContent}}>
                            <Modal.Header closeButton>
                                <Modal.Title id="example-modal-sizes-title-lg">
                                    {modalTitle}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {content !== 'Options' && <h5 onClick={handleBackToOptions} style={{cursor:'pointer',width:'fit-content'}} className={'mx-auto mb-3 border-bottom'}
                                >&larr; Πίσω</h5>}
                                {content === 'Options' &&
                                    <ReservationEditingOptions Content={{content,setContent}} Reservation={Reservation}
                                                               ModalTitle={{modalTitle,setModalTitle}}>
                                    </ReservationEditingOptions>
                                }
                                {content !== 'Options' &&
                                    content
                                }
                            </Modal.Body>
                        </EditModalContentContext.Provider>
                    </ShowEditReservationModalContext.Provider>
                </EditReservationModalTitleContext.Provider>
            </Modal>
        </>
    )
}
