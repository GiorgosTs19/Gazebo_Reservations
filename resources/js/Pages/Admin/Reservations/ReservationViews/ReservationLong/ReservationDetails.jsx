import {Badge, Button, Col, Row, Stack} from "react-bootstrap";
import {changeDateFormat, created_at} from "../../../../../ExternalJs/Util";
import useGetStatusColor from "../../../../../CustomHooks/useGetStatusColor";
import useGetReservationStatusText from "../../../../../CustomHooks/useGetReservationStatusText";
import useCheckConflict from "../../../../../CustomHooks/useCheckConflict";
import {ReservationEditModal} from "../../../Modals/ReservationEditModal";
import {handleChangeReservationStatus} from "../../../../../Inertia_Requests/Admin_Requests";

export function ReservationDetails({activeReservation, Attendees, handleActiveReservation, children}) {
    const Placed_At = activeReservation.Placed_At,
    Updated_At = activeReservation.Updated_At,
    hasChanges = Placed_At !== Updated_At,
    Confirmation_Number = activeReservation?.Confirmation_Number,
    Date = changeDateFormat(activeReservation.Date, '-', '-',true);
    const status = useGetReservationStatusText(activeReservation.Status);
    const [isConflicted,conflictType,conflictMessage] = useCheckConflict(activeReservation.id)
    return (
        <Row className={'my-3 mb-lg-1 mt-xxl-2'}>
            <Col xs={12} md={6} lg={12} xxl={6} className={'my-3 my-lg-0'}>
                {/*<h6 className={'mx-auto user-select-none'}>Κατάσταση</h6>*/}
                <Badge pill bg={useGetStatusColor(activeReservation.Status)} className={'mx-auto mb-4 mb-lg-2 mb-xxl-1 py-2 px-3 box_shadow user-select-none'}>
                    <h5 className={'m-0'}>{status}</h5>
                </Badge>
                {isConflicted && <h6 className={'text-warning my-3 my-xxl-3 user-select-none'}>{conflictMessage}</h6>}
                <section className={'d-flex flex-column mt-3'}>
                    <h5 className={'user-select-none mx-auto my-3'}>Ενέργειες</h5>
                        {activeReservation.Status === 'Pending' ? (isConflicted &&
                            <ReservationEditModal Reservation={activeReservation} Status={activeReservation.Status}
                            isReservationInConflict={isConflicted}></ReservationEditModal>
                        ) : (activeReservation.Status !== 'Cancelled' && <ReservationEditModal Reservation={activeReservation} Status={activeReservation.Status}
                        isReservationInConflict={isConflicted} className={'w-fit-content my-3'}/>)}
                        {
                            activeReservation.Status === 'Pending' && !isConflicted &&
                            <Stack direction={'horizontal'} gap={2} className={'m-auto'}>
                                <Button className={'m-auto'} variant={'outline-success'} disabled={isConflicted}
                                        onClick={()=>handleChangeReservationStatus('Confirmed',{activeReservation,setActiveReservation:handleActiveReservation})}>
                                    Επιβεβαίωση
                                </Button>
                                <Button className={'m-auto'} variant={'outline-danger'}
                                        onClick={()=>handleChangeReservationStatus('Cancelled',{activeReservation,setActiveReservation:handleActiveReservation})}>
                                    Ακύρωση
                                </Button>
                            </Stack>
                        }
                        {activeReservation.Status === 'Cancelled' &&
                            <h6 className={'text-danger my-3 user-select-none'}>Η κράτηση έχει ακυρωθεί, δεν επιτρέπονται
                                αλλαγές.</h6>}
                </section>
            </Col>
            {/*border border-gray-400  box_shadow rounded-4 */}
            <Col xs={12} md={6} lg={12} xxl={6} className={'my-3 my-xxl-0'}>
                <section className={'mb-2 my-xxl-0 w-fit-content mx-auto p-2 w-100'}>
                    <h4 className={'border-bottom pb-2 mb-2'}>Αρ. Κράτησης : {Confirmation_Number}</h4>
                    <p className={'p-1 my-1 user-select-none'}><i>Κράτηση <b>{activeReservation.Type === 'Dinner' ? 'Δείπνου' : 'Ξαπλώστρας'}</b> για τις {Date}</i></p>
                    <p className={'p-1 my-1 user-select-none'}>για <b>{Attendees.length + 1}</b> {Attendees.length === 0 ? 'άτομο' : 'άτομα'}.</p>
                    <p className={'p-1 my-1 user-select-none'}><i>Καταχωρήθηκε στις  {created_at(Placed_At)}</i></p>
                    <p className={'p-1 my-1 user-select-none'}><i>Τελευταία αλλαγή : {hasChanges ? created_at(Updated_At) : '-'}</i></p>
                </section>
            </Col>
        </Row>
    )
}
