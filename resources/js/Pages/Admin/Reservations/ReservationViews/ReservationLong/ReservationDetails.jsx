import {Badge, Button, Col, Row, Stack} from "react-bootstrap";
import {changeDateFormat, getDateTime} from "../../../../../ExternalJs/Util";
import useGetStatusColor from "../../../../../CustomHooks/useGetStatusColor";
import useGetReservationStatusText from "../../../../../CustomHooks/useGetReservationStatusText";
import {handleChangeReservationStatus} from "../../../../../Inertia_Requests/Admin_Requests";
import {useContext} from "react";
import {ActiveRangeContext} from "../../../Contexts/ActiveRangeContext";
import {ViewContext} from "../../../../../Contexts/ViewContext";

export function ReservationDetails({activeReservation, Attendees, handleActiveReservation,isConflicted,
    conflictMessage, editReservation, setReservation}) {
    const Placed_At = activeReservation?.created_at,
    Confirmation_Number = activeReservation?.Confirmation_Number,
    Date = changeDateFormat(activeReservation?.Date, '-', '-',true);
    const status = useGetReservationStatusText(activeReservation?.Status);
    const showActions = activeReservation.Status === 'Pending' && !isConflicted,
    [activeRange, setReservations] = useContext(ActiveRangeContext),
    reservationIsCancelled = activeReservation?.Status === 'Cancelled',
    {activeReservationsView,setActiveReservationsView} = useContext(ViewContext);
    const {editing, setEditing} = editReservation;

    return (
        <Row className={'my-t mb-lg-1 mt-xxl-2 border-bottom'}>
            <h4 className={'border-bottom pb-2 mb-2'}>Αρ. Κράτησης : {Confirmation_Number}</h4>
            <Col xs={12} md={6} lg={12} xxl={6} className={'d-flex flex-column mt-3 mb-1 my-lg-0'}>
                <Badge pill bg={useGetStatusColor(activeReservation?.Status)} className={`${showActions ? 'my-2 mx-auto' : 'm-auto'} 1 py-2 px-3 box_shadow user-select-none`}>
                    <h5 className={'m-0'}>{status}</h5>
                </Badge>
                {isConflicted && <h6 className={'text-warning my-3 my-xxl-2 user-select-none'}>{conflictMessage}</h6>}
                {showActions && <section className={'d-flex flex-column mt-2'}>
                        <Stack direction={'horizontal'} gap={2} className={'m-auto'}>
                            <Button className={'m-auto'} variant={'outline-success'} disabled={isConflicted}
                                    onClick={()=>handleChangeReservationStatus('Confirmed', activeReservation, handleActiveReservation,
                                    activeRange, setReservations, activeReservationsView, setReservation)}>
                                Επιβεβαίωση
                            </Button>
                            <Button className={'m-auto'} variant={'outline-danger'}
                                    onClick={()=>setEditing([true, 'Cancel'])}>
                                Ακύρωση
                            </Button>
                        </Stack>
                    </section>}
                {reservationIsCancelled && <p className={'p-1 my-1 user-select-none info-text text-muted'}><i>Το Gazebo, δεν είναι πλέον δεσμευμένο</i></p>}
            </Col>
            <Col xs={12} md={6} lg={12} xxl={6} className={'my-1 my-xxl-0 d-flex'}>
                <section className={'w-fit-content m-auto p-2 w-100'}>
                    <p className={'p-1 my-1 user-select-none'}><i><b>{activeReservation?.Type === 'Dinner' ? 'Δείπνο' : 'Ξαπλώστρες'}</b> στις {Date} </i>
                        για <b>{Attendees.length + 1}</b> {Attendees.length === 0 ? 'άτομο' : 'άτομα'}</p>
                    <p className={'p-1 my-1 user-select-none info-text'}><i>Καταχωρήθηκε : {getDateTime(Placed_At)}</i></p>
                </section>
            </Col>
        </Row>
    )
}
