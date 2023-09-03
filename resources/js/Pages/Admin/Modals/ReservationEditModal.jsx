import {Button, Modal} from "react-bootstrap";
import {useState} from "react";
import {ReservationEditingOptions} from "../Reservations/ReservationEditing/ReservationEditingOptions";
import {EditReservationModalTitleContext} from "../Contexts/EditReservationModalTitleContext";
import {ShowEditReservationModalContext} from "../Contexts/ShowEditReservationModalContext";
import {EditModalContentContext} from "../Contexts/EditModalContentContext";
import {LeftArrowSVG} from "../../../SVGS/LeftArrowSVG";
export function ReservationEditModal({Reservation,Status, className, isReservationInConflict = false}) {
    const [showEditModal, setShowEditModal] = useState(false);
    const handleShow = () => {
        // isInConflict && setConflictReservation();
        setShowEditModal(true);
    };
    const [content,setContent] = useState('Options');
    const [modalTitle,setModalTitle] = useState('Επεξεργασία Κράτησης');
    const handleBackToOptions = () => {setContent('Options');setModalTitle('Επεξεργασία Κράτησης')};
    const handleHide = () => {setContent('Options');setShowEditModal(false);}
    const isEditButtonDisabled = !isReservationInConflict ? (Status === 'Pending' || Status === 'Cancelled') : false;
    return (
        <>
            <Button variant={'secondary'}
                     className={`mx-auto px-2 py-2 rounded-3 ${!isEditButtonDisabled ? 'hover-scale-1_03' : ''} ` + className} onClick={handleShow}
                     disabled={isEditButtonDisabled}>
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
                            <Modal.Body className={'h-100'}>
                                {content !== 'Options' && <LeftArrowSVG onClick={handleBackToOptions} className={'mx-auto mb-3 cursor-pointer'}/>}
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
