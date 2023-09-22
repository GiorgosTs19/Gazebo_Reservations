import {ActiveReservationContext} from "../../../Contexts/ActiveReservationContext";
import {Alert, Button, Col, Row} from "react-bootstrap";
import {MenuContext} from "../../../../../Contexts/MenuContext";
import {GazebosContext} from "../../../../../Contexts/GazebosContext";
import {ActiveTabKeyContext} from "../../../Contexts/ActiveTabKeyContext";
import {ResolvingConflictContext} from "../../../Contexts/ResolvingConflictContext";
import {useContext, useState} from "react";
import {getDateTime, getTableAA} from "../../../../../ExternalJs/Util";
import {LeftArrowSVG} from "../../../../../SVGS/LeftArrowSVG";
import {SelectedMenus} from "./SelectedMenus";
import {ReservationDetails} from "./ReservationDetails";
import useCheckConflict from "../../../../../CustomHooks/useCheckConflict";
import {ReservationEditModal} from "../../../Modals/ReservationEditModal";
import useUpdateEffect from "../../../../../CustomHooks/useUpdateEffect";
import {useGetActiveReservation} from "../../../../../CustomHooks/useGetActiveReservation";
import {SpinnerSVG} from "../../../../../SVGS/SpinnerSVG";
import usePrevious from "../../../../../CustomHooks/usePrevious";
import useCheckChanges from "../../../../../CustomHooks/useCheckChanges";

export function ReservationLong() {
    const {activeReservation,setActiveReservation} = useContext(ActiveReservationContext);
    // console.log(activeReservation.Status)
    const [requestProgress, reservation, setReservation] = useGetActiveReservation(activeReservation.id, [activeReservation]);
    const{activeTabKey,handleSetActiveKey} = useContext(ActiveTabKeyContext);
    const Tables = useContext(GazebosContext),
    {resolvingConflict,setResolvingConflict} = useContext(ResolvingConflictContext),
    name = reservation?.Name.First + ' ' + reservation?.Name.Last,
    contactDetails = reservation?.Contact,
    rooms = reservation?.Rooms,
    attendees = reservation?.Attendees,
    attendeesExist = attendees?.length > 0,
    Gazebo = getTableAA(activeReservation?.gazebo_id,Tables),
    menus = reservation?.Menus,
    notes = reservation?.Notes,
    type = reservation?.Type,
    menuCatalog = useContext(MenuContext),
    placedAt = reservation?.Placed_At,
    updatedAt = reservation?.Updated_At,
    hasChanges = placedAt !== updatedAt,
    reservationIsCancelled = reservation?.Status === 'Cancelled',
    [editing, setEditing] = useState([false,'']),
    isInResolveConflictTab = activeTabKey === 'ResolveConflict';

    const handleBack = () => {
        setActiveReservation(null);
        if(resolvingConflict[0]) {
            handleSetActiveKey(resolvingConflict[1]);
            setResolvingConflict([false,'']);
        }
    };

    useUpdateEffect(()=> {
        setEditing([false, '']);
    },[activeReservation]);

    const previousActive = usePrevious(activeReservation);

    const reservationAlert = useCheckChanges(previousActive, activeReservation, Tables);

    const [isConflicted,conflictType,conflictMessage] = useCheckConflict(reservation?.id);

    const reservationTab = <>
        {(innerWidth > 992 && isInResolveConflictTab) &&
            <LeftArrowSVG className={'mb-2 mx-auto'} onClick={handleBack} height={innerWidth > 992 ? 35 : 24} width={innerWidth > 992 ? 35 : 24}/>}
        {reservation !== null && <ReservationDetails activeReservation={activeReservation} Attendees={attendees}
                             handleActiveReservation={setActiveReservation} setReservation={setReservation}
                             editReservation={{editing, setEditing}} isConflicted={isConflicted}
                             conflictMessage={conflictMessage}>
        </ReservationDetails>}
        <Row className={'mt-2 mt-lg-3 text-start px-1 px-lg-4'}>
            <Col sm={6} lg={8} xl={innerWidth >=1600 ? 7 : 6} className={`d-flex flex-column text-start ${innerWidth <= 576 ? 'text-center' : 'text-start'}`}>
                <section className={`${attendeesExist ? 'my-0' : 'my-auto'}`}>
                    <h5 className={'user-select-none info-text-xl'}>Στοιχεία Επικοινωνίας</h5>
                    <p className={'info-text mx-auto my-2'}>{name}</p>
                    <p className={'info-text mx-auto my-2'}>{contactDetails?.Email}</p>
                    <p className={'info-text mx-auto my-2'}>{contactDetails?.Phone}</p>
                </section>
            </Col>
            <Col sm={6} lg={4} xl={innerWidth >=1600 ? 5 : 6} className={'d-flex flex-column'}>
                <Row>
                    <Col className={'px-0'}>
                        <div className={`px-2 my-auto user-select-none ${innerWidth <= 576 ? 'text-center' : 'text-start'}`}>
                            <h5 className={'info-text-xl'}>{rooms?.length > 1 ? 'Δωμάτια' : 'Δωμάτιο'}</h5>
                            <p className={'mb-1 info-text'}>
                                {rooms?.map((room,index)=>{
                                    return <span key={index} className={'user-select-none'}>{index>0 && ', '}{room.Room_Number}</span>
                                })}
                            </p>
                        </div>
                    </Col>
                    <Col className={`px-lg-2 ${innerWidth <= 576 ? 'text-center' : 'text-start'}`}>
                        <div className={'user-select-none'}>
                            <h5 className={'info-text-xl'}>Gazebo</h5>
                            <p className={'mb-1 info-text'}>{Gazebo}</p>
                        </div>
                    </Col>
                    {attendeesExist && <div className={`py-1 px-2 my-1 ${innerWidth <= 576 ? 'text-center' : 'text-start'}`}>
                        <h5 className={'user-select-none info-text-xl'}>Συνοδοί</h5>
                        <p className={'user-select-none mb-0'}>
                            {attendees?.map((attendee, index) => {
                                return <span className={'info-text'}
                                             key={index}>{index > 0 && ', '}{attendee.Name}</span>
                            })}
                        </p>
                    </div>}
                </Row>
            </Col>
            <div className={`px-2 py-2 my-auto ${innerWidth <= 576 ? 'text-center' : 'text-start'}`}>
                <h5 className={'user-select-none info-text-xl'}>Menu</h5>
                {reservation !== null && <SelectedMenus Menus={menus} Type={type}
                                MenuCatalog={type === 'Dinner' ? menuCatalog.Dinner : menuCatalog.Bed}/>}
            </div>
            {notes !== null && <div className={'p-2 my-2 user-select-none text-center mx-auto w-100'}>
                <h5>Σημειώσεις</h5>
                <p className={'mb-1'}>{notes}</p>
            </div>}
            {hasChanges &&<p className={'p-1 my-1 user-select-none info-text text-center'}><i>{`${reservationIsCancelled ? 'Ακυρώθηκε' : 'Τελευταία αλλαγή'} : ${getDateTime(updatedAt)}`}</i></p>}
        </Row>
    </>

    return (
        requestProgress === 'Pending' ? <SpinnerSVG className={'m-auto'}/> : <div className={`d-flex flex-column pt-md-0 mw-550px justify-content-center m-auto`}>
            {reservationAlert}
            {(activeReservation?.Status === 'Pending' ? isConflicted : activeReservation?.Status !== 'Cancelled') &&
            <Button className={'mb-0 border-bottom-0 w-fit-content mx-auto mt-2 mt-lg-0'} style={{borderRadius:'5px 5px 0 0'}} variant={'outline-secondary'}
                onClick={()=>setEditing([!editing[0],''])}>{!editing[0] ? 'Ενέργειες' : 'Κράτηση'}</Button>}
            <div className={`text-center box_shadow rounded-3 border ${editing[0] ? 'px-1 py-2 ' : 'px-3 py-2 mw-550px'} h-fit-content`}>
                {!editing[0] ? reservationTab :  <ReservationEditModal conflictType={conflictType} edit={{editing, setEditing}}>
                    <p className={'info-text-lg mb-3'}>
                        E-mail
                    </p>
                    <a className={'m-auto w-fit-content btn btn-secondary'} href={'mailto:' + contactDetails.Email}>Αποστολή Email</a>
                </ReservationEditModal>}
            </div>
        </div>
    )
}
