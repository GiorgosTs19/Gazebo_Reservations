import {ActiveReservationContext} from "../../../Contexts/ActiveReservationContext";
import {Button, Col, Row} from "react-bootstrap";
import {MenuContext} from "../../../../../Contexts/MenuContext";
import {GazebosContext} from "../../../../../Contexts/GazebosContext";
import {ActiveTabKeyContext} from "../../../Contexts/ActiveTabKeyContext";
import {ResolvingConflictContext} from "../../../Contexts/ResolvingConflictContext";
import {ViewContext} from "../../../../../Contexts/ViewContext";
import {useContext, useState} from "react";
import {getDateTime, getTableAA} from "../../../../../ExternalJs/Util";
import {LeftArrowSVG} from "../../../../../SVGS/LeftArrowSVG";
import {SelectedMenus} from "./SelectedMenus";
import {ReservationDetails} from "./ReservationDetails";
import {MailSVG} from "../../../../../SVGS/MailSVG";
import useCheckConflict from "../../../../../CustomHooks/useCheckConflict";
import {ReservationEditModal} from "../../../Modals/ReservationEditModal";
import useUpdateEffect from "../../../../../CustomHooks/useUpdateEffect";

export function ReservationLong({setReservations = ()=>{}}) {
    const {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    {activeTabKey,handleSetActiveKey} = useContext(ActiveTabKeyContext);
    const Tables = useContext(GazebosContext),
    {resolvingConflict,setResolvingConflict} = useContext(ResolvingConflictContext),
    name = activeReservation?.Name.First + ' ' + activeReservation?.Name.Last,
    contactDetails = activeReservation?.Contact,
    rooms = activeReservation?.Rooms,
    attendees = activeReservation?.Attendees,
    attendeesExist = attendees.length > 0,
    Gazebo = getTableAA(activeReservation?.Gazebo,Tables),
    menus = activeReservation?.Menus,
    notes = activeReservation?.Notes,
    type = activeReservation.Type,
    menuCatalog = useContext(MenuContext),
    placedAt = activeReservation.Placed_At,
    updatedAt = activeReservation.Updated_At,
    hasChanges = placedAt !== updatedAt,
    reservationIsCancelled = activeReservation.Status === 'Cancelled',
    {activeReservationsView,setActiveReservationsView} = useContext(ViewContext),
    [editing, setEditing] = useState(false),
    isInResolveConflictTab = activeTabKey === 'ResolveConflict';
    const handleBack = () => {
        setActiveReservation(null);
        if(resolvingConflict[0]) {
            handleSetActiveKey(resolvingConflict[1]);
            setResolvingConflict([false,'']);
        }
    };

    useUpdateEffect(()=>{
        setEditing(false);
    },[activeReservation]);

    const [isConflicted,conflictType,conflictMessage] = useCheckConflict(activeReservation.id);
    const reservationTab = <>
        {/*{(innerWidth > 992 && activeReservationsView === 'Search') &&*/}
        {/*    <LeftArrowSVG className={'mb-2 mx-auto'} onClick={handleBack} height={innerWidth > 992 ? 35 : 24} width={innerWidth > 992 ? 35 : 24}/>}*/}
        <ReservationDetails activeReservation={activeReservation} Attendees={attendees} handleActiveReservation={setActiveReservation}
        editReservation={{editing, setEditing}} isConflicted={isConflicted} conflictMessage={conflictMessage}>
        </ReservationDetails>
        <Row className={'mt-2 mt-lg-1'}>
            <Col sm={12} md={6} className={'d-flex flex-column ' + (innerWidth > 992 ? 'border-end border-dark' : '')}>
                <section className={`mx-auto ${attendeesExist ? 'my-0 my-md-2' : 'my-auto'}`}>
                    <h5 className={'user-select-none '}>Στοιχεία Επικοινωνίας</h5>
                    <p className={'info-text-lg mx-auto my-2'}>{name}</p>
                    <p className={'info-text-lg mx-auto my-2'}>{contactDetails?.Email}</p>
                    <p className={'info-text-lg mx-auto my-2'}>{contactDetails?.Phone}</p>
                </section>
                {attendeesExist && <div className={'p-1 my-1'}>
                    <h5 className={'user-select-none'}>Συνοδοί</h5>
                    <p className={'user-select-none mb-0'}>
                        {attendees?.map((attendee, index) => {
                            return <span className={'info-text-lg'}
                                         key={index}>{index > 0 && ', '}{attendee.Name}</span>
                        })}
                    </p>
                </div>}
            </Col>
            <Col sm={12} md={6} className={'d-flex flex-column'}>
                <Row>
                    <Col>
                        <div className={'p-2 my-auto user-select-none'}>
                            <h5>{rooms?.length > 1 ? 'Δωμάτια' : 'Δωμάτιο'}</h5>
                            <p className={'mb-1'}>
                                {rooms?.map((room,index)=>{
                                    return <span key={index} className={'user-select-none'}>{index>0 && ', '}{room.Room_Number}</span>
                                })}
                            </p>
                        </div>
                    </Col>
                    <Col>
                        <div className={'p-2 user-select-none'}>
                            <h5>Gazebo</h5>
                            <p className={'mb-1'}>{Gazebo}</p>
                        </div>
                    </Col>
                </Row>
                <div className={'p-2 my-auto'}>
                    <h5 className={'user-select-none'}>Menu</h5>
                    <SelectedMenus Menus={menus} Type={type} MenuCatalog={type === 'Dinner' ? menuCatalog.Dinner : menuCatalog.Bed}/>
                </div>
            </Col>
            {notes !== null && <div className={'p-2 my-2 user-select-none text-center mx-auto w-100'}>
                <h5>Σημειώσεις</h5>
                <p>{notes}</p>
            </div>}
            {hasChanges &&<p className={'p-1 my-1 user-select-none info-text'}><i>{`${reservationIsCancelled ? 'Ακυρώθηκε' : 'Τελευταία αλλαγή'} : ${getDateTime(updatedAt)}`}</i></p>}
        </Row>
    </>

    return (
        <div className={'d-flex flex-column m-auto pt-md-0'}>
            {(activeReservation.Status === 'Pending' ? isConflicted : activeReservation.Status !== 'Cancelled') &&
            <Button className={'mb-0 border-bottom-0 w-fit-content mx-auto mt-3 mt-lg-0'} style={{borderRadius:'5px 5px 0 0'}} variant={'outline-secondary'}
                onClick={()=>setEditing(!editing)}>{!editing ? 'Ενέργειες' : 'Κράτηση'}</Button>}
            <div className={`text-center box_shadow rounded-3 border ${editing ? 'px-1 py-3' : 'px-3 py-2'} m-auto h-fit-content ${isInResolveConflictTab ? ' mw-550px' : 'w-100 my-xl-auto '}`}>
                {!editing ? reservationTab :  <ReservationEditModal conflictType={conflictType} edit={{editing, setEditing}}>
                    <p className={'info-text-lg my-auto'}>
                        Αποστολή E-mail
                    </p>
                    <a className={'mx-auto mt-2 w-fit-content btn btn-secondary'} href={'mailto:' + contactDetails.Email}>{contactDetails.Email}</a>
                </ReservationEditModal>}
            </div>
        </div>
    )
}
