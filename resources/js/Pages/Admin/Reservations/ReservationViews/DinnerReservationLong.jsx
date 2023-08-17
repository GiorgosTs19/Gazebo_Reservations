import {useContext} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {Badge, Button, Col, Row} from "react-bootstrap";
import {changeDateFormat, created_at, getMenuName, getTableAA} from "../../../../ExternalJs/Util";
import {ReservationEditModal} from "../../Modals/ReservationEditModal";
import {MenuContext} from "../../../../Contexts/MenuContext";
import {GazebosContext} from "../../../../Contexts/GazebosContext";
import useGetReservationStatusText from "../../../../CustomHooks/useGetReservationStatusText";
import {handleChangeReservationStatus} from "../../../../Inertia_Requests/Admin_Requests";
import {ViewContext} from "../../../../Contexts/ViewContext";
import {LeftArrowSVG} from "../../../../SVGS/LeftArrowSVG";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";

export function DinnerReservationLong() {
    const {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    {activeView,setActiveView} = useContext(ViewContext),
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
    InnerWidth = useContext(InnerWidthContext);
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
    const status = useGetReservationStatusText(activeReservation.Status);

    return (
        <div className={'text-center p-3 mx-auto'}>
            <Row className={''}>
                <Col className={'text-center d-flex flex-column ' + ( InnerWidth > 992 ? ' border border-1 border-start-0 border-top-0 border-bottom-0 ' : '')} xxl={7}>
                    <h6>Ενέργειες</h6>
                        <Row className={'my-2 my-lg-3 mx-auto'}>
                            {InnerWidth < 992 &&
                                <LeftArrowSVG className={'mb-2'} onClick={() => setActiveReservation(null)}/>}
                            <Col lg={12}>
                                <ReservationEditModal Reservation={activeReservation} Status={activeReservation.Status}></ReservationEditModal>
                            </Col>
                            {
                                activeReservation.Status === 'Pending' &&
                                <Col className={'d-flex flex-row my-3 mx-auto'}>
                                    <Button className={'m-auto '} variant={'outline-success'}
                                            onClick={()=>handleChangeReservationStatus('Confirmed',{activeReservation,setActiveReservation})}>
                                        Επιβεβαίωση
                                    </Button>
                                    <Button className={'m-auto '} variant={'outline-danger'}
                                            onClick={()=>handleChangeReservationStatus('Cancelled',{activeReservation,setActiveReservation})}>
                                        Ακύρωση
                                    </Button>
                                </Col>
                            }
                            {activeReservation.Status === 'Cancelled' &&
                                <h6 className={'text-danger my-3 user-select-none'}>Η κράτηση έχει ακυρωθεί, δεν επιτρέπονται
                                    αλλαγές.</h6>}
                        </Row>
                </Col>
                <Col className={'d-flex flex-column my-1 my-lg-3 my-xxl-0'} xxl={5}>
                    <h6 className={'mx-auto user-select-none'}>Κατάσταση</h6>
                    <Badge pill bg={getStatusColor().split('-')[1]} className={'m-auto p-2 box_shadow user-select-none'}>
                        {status}
                    </Badge>
                    {activeReservation.Status === 'Pending' && <h6 className={'text-warning my-3 my-xxl-0 user-select-none'}>Η κράτηση δεν έχει επιβεβαιωθεί ακόμη, δεν επιτρέπονται αλλαγές.</h6>}
                </Col>
            </Row>
            <Row className={'my-3 my-lg-4 mt-xxl-2'}>
                <Col className={'border border-gray-400 mb-2 my-xxl-0 box_shadow rounded-4'} xs={12} xxl={7}>
                    <p className={'p-1 my-1 user-select-none'}><i>Κράτηση <b>{activeReservation.Type === 'Dinner' ? 'Δείπνου' : 'Ξαπλώστρας'}</b> για τις {Date}</i></p>
                    <p className={'p-1 my-1 user-select-none'}>Κράτηση για <b>{Attendees.length + 1}</b> {Attendees.length === 0 ? 'άτομο' : 'άτομα'}.</p>
                    <p className={'p-1 my-1 user-select-none'}><i>Καταχωρήθηκε στις  {created_at(Placed_At)}</i></p>
                    <p className={'p-1 my-1 user-select-none'}><i>Τελευταία αλλαγή : {hasChanges ? created_at(Updated_At) : '-'}</i></p>
                </Col>
                <Col className={'d-flex mt-4 mt-xxl-2 flex-column'} xs={12} xxl={5}>
                    <h4 className={'border-bottom p-4 m-auto box_shadow rounded-4'}>Αρ. Κράτησης : {Confirmation_Number}</h4>
                </Col>
            </Row>
            <Row className={'box_shadow mt-4 mt-xxl-2 border rounded-3'}>
                <Col sm={12} lg={6}>
                    <Row className={'border-bottom p-2 my-2'}>
                        <h5>Στοιχεία Επικοινωνίας</h5>
                        {/*<Col xxl={8} className={'d-flex flex-column'}>*/}
                            <p>{Name === ' ' ? <b className={'h5 p-0 my-2'}>-</b> : Name}</p>
                            <p className={'info-text-lg mx-auto my-2'}>{ContactDetails?.Email}</p>
                            <p className={'info-text-lg mx-auto my-2'}>{ContactDetails?.Phone}</p>
                        {/*</Col>*/}
                        {/*<Col xxl={4} className={'d-flex'}>*/}
                            <a className={'btn btn-outline-dark m-auto w-fit-content'} href={'mailto:' + ContactDetails.Email}>Email</a>
                        {/*</Col>*/}
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
                <Col sm={12} lg={6} className={'d-flex flex-column'}>
                    <Row>
                        <Col>
                            <div className={'border-bottom p-2 my-auto user-select-none'}>
                                <h5>{Rooms?.length > 1 ? 'Δωμάτια' : 'Δωμάτιο'}</h5>
                                <p>
                                    {Rooms?.map((room,index)=>{
                                        return <span key={index} className={'user-select-none'}>{index>0 && ', '}{room.Room_Number}</span>
                                    })}
                                </p>
                            </div>
                        </Col>
                        <Col>
                            <div className={'border-bottom p-2 user-select-none'}>
                                <h5>Τραπέζι</h5>
                                <p>{Gazebo}</p>
                            </div>
                        </Col>
                    </Row>

                    <div className={'border-bottom p-2 my-auto'}>
                        <h5>Menu</h5>
                        <div>
                            {Menus?.map((menu,index)=>{
                                return <p key={index} className={'user-select-none'}><i>{menu.Room}</i> {' { K: ' + getMenuName(menu.Main,MenuCatalog) + ', E: ' + getMenuName(menu.Dessert,MenuCatalog) + ' }'}</p>
                            })}
                        </div>
                        <p className={'text-muted user-select-none'}>(Κ: Κυρίως, Ε: Επιδόρπιο)</p>
                    </div>

                </Col>

                <div className={'p-2 my-2 user-select-none'}>
                    <h5>Σημειώσεις Κράτησης</h5>
                    <p>{Notes === null ? 'Καμία σημείωση' : Notes}</p>
                </div>
            </Row>
        </div>
    )
}
