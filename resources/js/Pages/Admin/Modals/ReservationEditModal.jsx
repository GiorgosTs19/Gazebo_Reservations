import {Card} from "react-bootstrap";
import {useState} from "react";
import {ReservationEditingOptions} from "../EditReservations/ReservationEditingOptions";
import {EditReservationModalTitleContext} from "../Contexts/EditReservationModalTitleContext";
import {EditModalContentContext} from "../Contexts/EditModalContentContext";
import {LeftArrowSVG} from "../../../SVGS/LeftArrowSVG";

export function ReservationEditModal({conflictType, edit, children = null}) {
    const [content,setContent] = useState('Options');
    const [modalTitle,setModalTitle] = useState('Επεξεργασία Κράτησης');
    const {editing, setEditing} = edit;
    const handleBackToOptions = () => {
        setContent('Options');
        setModalTitle('Επεξεργασία Κράτησης');
        setEditing([editing[0], '']);
    };

    return (
        <Card className={'text-center border-0'}>
            <EditReservationModalTitleContext.Provider value={{modalTitle,setModalTitle}}>
                    <EditModalContentContext.Provider value={{content,setContent}}>
                        {modalTitle !== '' && <Card.Header className={'bg-transparent'}>
                            <Card.Title id="example-modal-sizes-title-lg">
                                {modalTitle}
                            </Card.Title>
                        </Card.Header>}
                        <Card.Body className={`h-100 px-1 py-0`}>
                            {content !== 'Options' && <LeftArrowSVG onClick={handleBackToOptions} className={'mx-auto mb-3 cursor-pointer hover-scale-1_1'}/>}
                            {content === 'Options' &&
                                <ReservationEditingOptions conflictType={conflictType} edit={edit}>
                                    {children}
                                </ReservationEditingOptions>
                            }
                            {content !== 'Options' &&
                                content
                            }
                        </Card.Body>
                    </EditModalContentContext.Provider>
            </EditReservationModalTitleContext.Provider>
        </Card>
    )
}
