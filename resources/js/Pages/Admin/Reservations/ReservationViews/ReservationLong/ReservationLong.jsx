import {useContext} from "react";
import {ActiveReservationContext} from "../../../Contexts/ActiveReservationContext";
import {Badge, Button, Col, Row} from "react-bootstrap";
import {changeDateFormat, created_at, getMenuName, getTableAA} from "../../../../../ExternalJs/Util";
import {ReservationEditModal} from "../../../Modals/ReservationEditModal";
import {MenuContext} from "../../../../../Contexts/MenuContext";
import {GazebosContext} from "../../../../../Contexts/GazebosContext";
import useGetReservationStatusText from "../../../../../CustomHooks/useGetReservationStatusText";
import {handleChangeReservationStatus} from "../../../../../Inertia_Requests/Admin_Requests";
import {LeftArrowSVG} from "../../../../../SVGS/LeftArrowSVG";
import {InnerWidthContext} from "../../../../../Contexts/InnerWidthContext";
import useGetStatusColor from "../../../../../CustomHooks/useGetStatusColor";
import useCheckConflict from "../../../../../CustomHooks/useCheckConflict";
import {ActiveTabKeyContext} from "../../../Contexts/ActiveTabKeyContext";
import {ResolvingConflictContext} from "../../../Contexts/ResolvingConflictContext";
import {SelectedMenus} from "./SelectedMenus";
import {ReservationDetails} from "./ReservationDetails";

export function ReservationLong() {
    const {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    {activeTabKey,handleSetActiveKey} = useContext(ActiveTabKeyContext);
    const Tables = useContext(GazebosContext),
    {resolvingConflict,setResolvingConflict} = useContext(ResolvingConflictContext),
    Name = activeReservation?.Name.First + ' ' + activeReservation?.Name.Last,
    ContactDetails = activeReservation?.Contact,
    Rooms = activeReservation?.Rooms,
    Attendees = activeReservation?.Attendees,
    Gazebo = getTableAA(activeReservation?.Gazebo,Tables),
    Menus = activeReservation?.Menus,
    Notes = activeReservation?.Notes,
    Type = activeReservation.Type,
    MenuCatalog = useContext(MenuContext),
    InnerWidth = useContext(InnerWidthContext);
    const [isConflicted,conflictType,conflictMessage] = useCheckConflict(activeReservation.id)
    const status = useGetReservationStatusText(activeReservation.Status);
    const handleBack = () => {
        setActiveReservation(null);
        if(resolvingConflict[0]) {
            handleSetActiveKey(resolvingConflict[1]);
            setResolvingConflict([false,'']);
        }
    };

    return (
        <div className={'text-center p-3 h-fit-content mx-auto ' + (resolvingConflict[0] ? 'reservation-long-view-conflicted' : '')}>
            <Row className={''}>
                {(InnerWidth < 992 || resolvingConflict[0]) &&
                    <LeftArrowSVG className={'mb-2 mx-auto'} onClick={handleBack} height={innerWidth > 992 ? 35 : 24} width={innerWidth > 992 ? 35 : 24}/>}
                <Col className={'text-center d-flex flex-column ' + ( InnerWidth > 992 ? ' border border-1 border-start-0 border-top-0 border-bottom-0 ' : '')} xxl={7}>
                    <h6>Ενέργειες</h6>
                        <Row className={'my-2 my-lg-3 mx-auto'}>
                            <Col lg={12}>
                                <ReservationEditModal Reservation={activeReservation} Status={activeReservation.Status} isReservationInConflict={isConflicted}></ReservationEditModal>
                            </Col>
                            {
                                activeReservation.Status === 'Pending' &&
                                <Col className={'d-flex flex-row my-3 mx-auto'}>
                                    <Button className={'m-auto'} variant={'outline-success'} disabled={isConflicted}
                                            onClick={()=>handleChangeReservationStatus('Confirmed',{activeReservation,setActiveReservation})}>
                                        Επιβεβαίωση
                                    </Button>
                                    <Button className={'m-auto'} variant={'outline-danger'}
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
                    <Badge pill bg={useGetStatusColor(activeReservation.Status)} className={'m-auto p-2 box_shadow user-select-none'}>
                        {status}
                    </Badge>
                    {!isConflicted ? (activeReservation.Status === 'Pending' && <h6 className={'text-warning my-3 my-xxl-0 user-select-none'}>
                        Η κράτηση δεν έχει επιβεβαιωθεί ακόμη, δεν επιτρέπονται αλλαγές.
                    </h6>) : <h6 className={'text-warning my-3 my-xxl-3 user-select-none'}>{conflictMessage}</h6>}
                </Col>
            </Row>
            <ReservationDetails activeReservation={activeReservation} Attendees={Attendees}/>
            <Row className={'box_shadow mt-4 mt-xxl-1 border rounded-3 pt-3'}>
                <Col sm={12} lg={6} className={InnerWidth > 992 ? 'border-end border-dark ' : ''}>
                    <Row className={'p-2 my-2'}>
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
                </Col>
                <Col sm={12} lg={6} className={'d-flex flex-column '}>
                    <Row>
                        <Col>
                            <div className={'p-2 my-auto user-select-none'}>
                                <h5>{Rooms?.length > 1 ? 'Δωμάτια' : 'Δωμάτιο'}</h5>
                                <p>
                                    {Rooms?.map((room,index)=>{
                                        return <span key={index} className={'user-select-none'}>{index>0 && ', '}{room.Room_Number}</span>
                                    })}
                                </p>
                            </div>
                        </Col>
                        <Col>
                            <div className={'p-2 user-select-none'}>
                                <h5>Gazebo</h5>
                                <p>{Gazebo}</p>
                            </div>
                        </Col>
                    </Row>

                    <div className={'p-2 my-auto'}>
                        <h5>Menu</h5>
                        <SelectedMenus Menus={Menus} Type={Type} MenuCatalog={Type === 'Dinner' ? MenuCatalog.Dinner : MenuCatalog.Bed}/>
                    </div>
                </Col>
                <Row className={'text-center mx-auto px-0 pb-3 mt-2'}>
                    <Col className={InnerWidth > 992 ? 'border-end border-dark ' : ''}>
                        <div className={'p-2'}>
                            <h5>Παρευρισκόμενοι</h5>
                            <p>
                                {Attendees.length === 0 ? <b className={'h5'}>-</b> :
                                    Attendees?.map((attendee,index)=>{
                                        return <span key={index}>{index>0 && ', '}{attendee.Name}</span>
                                    })}
                            </p>
                        </div>
                    </Col>
                    <Col className={'d-flex'}>
                        <div className={'p-2 my-2 user-select-none text-center mx-auto w-100'}>
                            <h5>Σημειώσεις</h5>
                            <p>{Notes === null ? 'Καμία σημείωση' : Notes}</p>
                        </div>
                    </Col>
                </Row>
            </Row>
        </div>
    )
}
