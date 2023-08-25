import {Button, Modal} from "react-bootstrap";
import {changeDateFormat, getFormattedDate} from "../../../../ExternalJs/Util";
import {Inertia} from "@inertiajs/inertia";
import {useContext, useEffect, useState} from "react";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";
import {ActiveReservations} from "./ActiveReservations";
import {Warnings} from "./Warnings";

export function SetDayUnavailableModal({selectedDate}) {
    const {reservationType,setReservationType} = useContext(ActiveReservationTypeContext);
    const [show, setShow] = useState(false),
    [allowExistingReservations,setAllowExistingReservations] = useState(false);
    const [reservations,setReservations] = useState([]);
    const dateIsRange = Array.isArray(selectedDate);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        if(show) {
            if(!dateIsRange) {
                Inertia.get(route('Get_Availability_For_Date'), {date: getFormattedDate(selectedDate,'-',1),
                    get_reservations:true,type:reservationType},{
                    only:['availability_for_date'],
                    preserveScroll:true,
                    preserveState:true,
                    onSuccess:(res)=>{
                        setReservations(res.props.availability_for_date);
                    }
                });
                return;
            }
            Inertia.get(route('Get_Availability_For_Dates'), {date_start: getFormattedDate(selectedDate[0],'-',1),
                date_end:getFormattedDate(selectedDate[1],'-',1),type:reservationType},{
                only:['availability_for_date_range'],
                preserveScroll:true,
                preserveState:true,
                onSuccess:(res)=>{
                    setReservations(res.props.availability_for_date_range);
                }
            });
        }
    },[show]);

    const handleSetDayUnavailable = () => {
        if(!dateIsRange){
            const date_to_disable = getFormattedDate(selectedDate,'-',1);
            return Inertia.post(route('Disable_Day'),{Date:date_to_disable,Allow_Existing_Reservations:allowExistingReservations,Type:reservationType},
                {preserveScroll:true,preserveState:true, only:['Dinner_Reservations'],onSuccess:()=>setShow(false)});
        }
        const dates_to_disable = [getFormattedDate(selectedDate[0],'-',1),getFormattedDate(selectedDate[1],'-',1)];
        return Inertia.post(route('Disable_Days'),{Date_Start:dates_to_disable[0],Date_End:dates_to_disable[1],
            Allow_Existing_Reservations:allowExistingReservations,Type:reservationType},{preserveScroll:true,preserveState:true,
            only:['Dinner_Reservations'],onSuccess:()=>setShow(false)});
    };

    const formatted_date = show && (!dateIsRange ? getFormattedDate(selectedDate, '-', 2) :
        [changeDateFormat(getFormattedDate(selectedDate[0],'-',1),'-','-'),
            changeDateFormat(getFormattedDate(selectedDate[1],'-',1),'-','-')]);

    return (<>
            <div className={'d-flex'}>
                {/* Button that is being returned to open the modal. */}
                <Button variant={'outline-danger'} className={'p-2 my-2 mx-auto'}
                        onClick={handleShow}>
                    Απενεργοποίηση
                </Button>
            </div>
            <Modal show={show} onHide={handleClose} className={'day-unavailable-modal'}>
                {/* Shows the date|s to be disabled as the title of the modal*/}
                <Modal.Header closeButton>
                    <Modal.Title>Απενεργοποίηση {!dateIsRange ? formatted_date : `από ${formatted_date[0]} έως ${formatted_date[1]}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={'fst-italic text-center overflow-y-auto mh-600px'}>
                    {/* Shows warnings, if there are any reservations that fall withing the range of dates or date to be disabled*/}
                    <Warnings reservations={reservations}
                    aboutExistingReservations={{allowExistingReservations,setAllowExistingReservations}} show={show}
                              dates={{dateIsRange, formatted_date,selectedDate}}></Warnings>
                   {/* Shows the reservations that fall withing the range to be disabled || the date to be disabled */}
                    {reservations.length > 0 && <ActiveReservations reservations={reservations} dateIsRange={dateIsRange}/>}
                </Modal.Body>
                <Modal.Footer>
                    {/* Modal button to close the modal. */}
                    <Button variant="outline-secondary" className={'p-2 my-2'} onClick={handleClose}>
                        Ακύρωση
                    </Button>
                    {/* Modal button to confirm and disable the selected date|s. */}
                    <Button variant={'outline-danger'} className={'p-2 my-2'}
                            onClick={handleSetDayUnavailable}>
                        Απενεργοποίηση
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

// const getReservationCountMessage = () => {
//     if(reservations.length>0) {
//         switch (reservations.length) {
//             case 1 : {
//                 return <p className={'my-2 fw-bold'}>Έχει καταχωρηθεί ήδη 1 κράτηση για αυτήν την μέρα.</p>
//             }
//             default : {
//                 return <p className={'my-2 fw-bold'}>Έχουν καταχωρηθεί ήδη {reservations.length} κρατήσεις για αυτήν την μέρα.</p>
//             }
//         }
//     }
// }
