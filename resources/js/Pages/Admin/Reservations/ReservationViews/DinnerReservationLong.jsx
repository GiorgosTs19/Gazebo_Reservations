import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {GazeboLocation} from "../../../Forms/Gazebo/GazeboCarousel/GazeboLocation";
import {Badge, Button, Col, Row, Stack} from "react-bootstrap";
import {changeDateFormat, created_at, getMenuName, getTableAA} from "../../../../ExternalJs/Util";
import {ReservationEditModal} from "../../Modals/ReservationEditModal";
import {MenuContext} from "../../../../Contexts/MenuContext";
import {GazebosContext} from "../../../../Contexts/GazebosContext";
import {Inertia} from "@inertiajs/inertia";
import {ReservationsContext} from "../../../../Contexts/ReservationsContext";

export function DinnerReservationLong() {
    const {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    Tables = useContext(GazebosContext),
    Date = changeDateFormat(activeReservation.Date, '-', '-',true),
    Name = activeReservation?.Name.First + ' ' + activeReservation?.Name.Last,
    ContactDetails = activeReservation?.Contact,
    Confirmation_Number = activeReservation?.Confirmation_Number,
    Rooms = activeReservation?.Rooms,
    Attendees = activeReservation?.Attendees,
    Gazebo = getTableAA(activeReservation?.Gazebo,Tables),
    Menus = activeReservation?.Menus,
    Notes = activeReservation?.Notes,
    Placed_At = activeReservation.Placed_At,
    Updated_At = activeReservation.Updated_At,
    hasChanges = Placed_At !== Updated_At,
    MenuCatalog = useContext(MenuContext),
    Reservations = useContext(ReservationsContext);
    const getStatusColor = () =>{
        switch (activeReservation.Status) {
            case 'Cancelled' : {
                return 'text-danger';
            }
            case 'Confirmed' : {
                return 'text-success';
            }
            default : {
                return 'text-warning'
            }
        }
    };
    const getStatusText = () =>{
        switch (activeReservation.Status) {
            case 'Cancelled' : {
                return 'Ακυρώθηκε';
            }
            case 'Confirmed' : {
                return 'Επιβεβαιώθηκε';
            }
            default : {
                return 'Εκκρεμεί Επιβεβαίωση';
            }
        }
    };
    const handleChangeReservationStatus = (status) => {
        Inertia.patch(route('Change_Reservation_Status'),{reservation_id:activeReservation.id,status:status},{
           onSuccess:()=>{
               setActiveReservation(null);
           },
            only:activeReservation.Type === 'Dinner' ? ['Dinner_Reservations'] : ['Bed_Reservations']
        });
    }

    return (
        <div className={'text-center p-3 m-auto'}>
            <Row>
                <Col className={'text-center ' + ( innerWidth > 992 ? ' border border-1 border-start-0 border-top-0 border-bottom-0 ' : '')} xxl={7}>
                    <h6>Ενέργειες</h6>
                        <Row className={'my-3'}>
                            <Col xxl={activeReservation.Status === 'Pending' ? 4 : 12}
                                 className={activeReservation.Status === 'Pending' ? ( innerWidth > 992 ? ' border border-1 border-start-0 border-top-0 border-bottom-0 ' : '') : ''}>
                                <ReservationEditModal Reservation={activeReservation}></ReservationEditModal>
                            </Col>
                            {
                                activeReservation.Status === 'Pending' &&
                                <Col className={'d-flex flex-row my-3 my-xxl-0 '} xxl={8}>
                                    <Button className={'m-auto m-xxl-1'} variant={'outline-success'}
                                            onClick={()=>handleChangeReservationStatus('Confirmed')}>
                                        Επιβεβαίωση
                                    </Button>
                                    <Button className={'m-auto m-xxl-1'} variant={'outline-danger'}
                                            onClick={()=>handleChangeReservationStatus('Cancelled')}>
                                        Ακύρωση
                                    </Button>
                                </Col>
                            }
                        </Row>
                </Col>
                <Col className={'d-flex flex-column my-3 my-xxl-0'} xxl={5}>
                    <h6 className={'mx-auto'}>Κατάσταση</h6>
                    <Badge pill bg={getStatusColor().split('-')[1]} className={'m-auto p-2'}>
                        {getStatusText()}
                    </Badge>
                </Col>
            </Row>
            <Row className={'mb-2 my-xxl-0'}>
                <Col className={'border border-gray-400 mb-2 my-xxl-0'} xs={12} xxl={6}>
                    <p className={'p-1 my-1'}><i>Κράτηση για : {Date}</i></p>
                    <p className={'p-1 my-1'}><i>Καταχωρήθηκε στις : {created_at(Placed_At)}</i></p>
                    <p className={'p-1 my-1'}><i>Τελευταία αλλαγή : {hasChanges ? created_at(Updated_At) : '-'}</i></p>
                    <p className={'p-1 my-1'}>Κράτηση για <b>{Attendees.length + 1}</b> {Attendees.length === 0 ? 'άτομο' : 'άτομα'}.</p>
                </Col>
                <Col className={'d-flex'} xs={12} xxl={6}>
                    <Stack>
                        <h4 className={'border-bottom p-2 m-auto'}>Αρ. Κράτησης : {Confirmation_Number}</h4>

                    </Stack>
                </Col>
            </Row>
            <Row>
                <Col sm={12} lg={6}>
                    <div className={'border-bottom p-2 my-2'}>
                        <h5>Όνομα Κράτησης</h5>
                        <p>{Name === ' ' ? <b className={'h5 p-0 m-0'}>-</b> : Name}</p>
                    </div>
                    <Row className={'border-bottom p-2 my-2'}>
                        <h5>Στοιχεία Επικοινωνίας</h5>
                        <Col lg={8} className={'d-flex flex-column'}>
                            <p className={'info-text-lg mx-auto my-1'}>{ContactDetails?.Email}</p>
                            <p className={'info-text-lg mx-auto my-1'}>{ContactDetails?.Phone}</p>
                        </Col>
                        <Col lg={4} className={'d-flex'}>
                            <a className={'btn btn-outline-dark m-auto'} href={'mailto:' + ContactDetails.Email}>Email</a>
                        </Col>
                    </Row>
                    <div className={'border-bottom p-2'}>
                        <h5>Παρευρισκόμενοι</h5>
                        <p>
                            {Attendees.length === 0 ? <b className={'h5'}>-</b> :
                                Attendees?.map((attendee,index)=>{
                                return <span key={index}>{index>0 && ', '}{attendee.Name}</span>
                            })}
                        </p>
                    </div>
                </Col>
                <Col sm={12} lg={6}>
                    <div className={'border-bottom p-2 my-2'}>
                        <h5>{Rooms?.length > 1 ? 'Δωμάτια' : 'Δωμάτιο'}</h5>
                        <p>
                            {Rooms?.map((room,index)=>{
                                return <span key={index}>{index>0 && ', '}{room.Room_Number}</span>
                            })}
                        </p>
                    </div>
                    <div className={'border-bottom p-2'}>
                        <h5>A/A Κρατημένου Τραπεζιού</h5>
                        <p>{Gazebo}</p>
                        <GazeboLocation index={Gazebo} className={'p-1'} gap={2} width={'w-75'}></GazeboLocation>
                    </div>
                </Col>
                <div className={'border-bottom p-2 my-2'}>
                    <h5>Επιλεγμένο Menu / Δωμάτιο</h5>
                    <div>
                    {Menus?.map((menu,index)=>{
                        return <p key={index}><i>{menu.Room}</i> {' { K: ' + getMenuName(menu.Main,MenuCatalog) + ', E: ' + getMenuName(menu.Dessert,MenuCatalog) + ' }'}</p>
                    })}
                </div>
                    <p className={'text-muted'}>(Κ: Κυρίως, Ε: Επιδόρπιο)</p>
                </div>
                <div className={'border-bottom p-2 my-2'}>
                    <h5>Σημειώσεις Κράτησης</h5>
                    <p>{Notes === null ? 'Καμία σημείωση' : Notes}</p>
                </div>
            </Row>
        </div>
    )
}
