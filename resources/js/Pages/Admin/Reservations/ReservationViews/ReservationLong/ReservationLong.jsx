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
    Name = activeReservation?.Name.First + ' ' + activeReservation?.Name.Last,
    ContactDetails = activeReservation?.Contact,
    Rooms = activeReservation?.Rooms,
    Attendees = activeReservation?.Attendees,
    Gazebo = getTableAA(activeReservation?.Gazebo,Tables),
    Menus = activeReservation?.Menus,
    Notes = activeReservation?.Notes,
    Type = activeReservation.Type,
    MenuCatalog = useContext(MenuContext),
    Placed_At = activeReservation.Placed_At,
    Updated_At = activeReservation.Updated_At,
    hasChanges = Placed_At !== Updated_At,
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
        {(innerWidth < 992 || innerWidth > 992 && activeReservationsView === 'Search' || isInResolveConflictTab) &&
            <LeftArrowSVG className={'mb-2 mx-auto'} onClick={handleBack} height={innerWidth > 992 ? 35 : 24} width={innerWidth > 992 ? 35 : 24}/>}
        <ReservationDetails activeReservation={activeReservation} Attendees={Attendees} handleActiveReservation={setActiveReservation}
        editReservation={{editing, setEditing}}>
        </ReservationDetails>
        <Row className={'mt-4 mt-lg-1 '}>
            <Col sm={12} md={6} className={innerWidth > 992 ? 'border-end border-dark' : ''}>
                <section className={'my-2'}>
                    <h5 className={'user-select-none '}>Στοιχεία Επικοινωνίας</h5>
                    <p className={'info-text-lg mx-auto my-2'}>{Name}</p>
                    <p className={'info-text-lg mx-auto my-2'}>{ContactDetails?.Email}</p>
                    <p className={'info-text-lg mx-auto my-2'}>{ContactDetails?.Phone}</p>
                    <a className={'m-auto w-fit-content btn'} href={'mailto:' + ContactDetails.Email}><MailSVG height={32} width={32}/></a>
                </section>
                <div className={'p-2 my-3'}>
                    <h5 className={'user-select-none'}>Συνοδοί</h5>
                    <p className={'user-select-none'}>
                        {Attendees.length === 0 ? <b className={'h5'}>-</b> :
                            Attendees?.map((attendee,index)=>{
                                return <span className={'info-text-lg'} key={index}>{index>0 && ', '}{attendee.Name}</span>
                            })}
                    </p>
                </div>
            </Col>
            <Col sm={12} md={6} className={'d-flex flex-column'}>
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
                <h5 className={'user-select-none'}>Menu</h5>
                <SelectedMenus Menus={Menus} Type={Type} MenuCatalog={Type === 'Dinner' ? MenuCatalog.Dinner : MenuCatalog.Bed}/>
            </div>
            </Col>
            {Notes !== null && <div className={'p-2 my-2 user-select-none text-center mx-auto w-100'}>
                <h5>Σημειώσεις</h5>
                <p>{Notes}</p>
            </div>}
            {hasChanges &&<p className={'p-1 my-1 user-select-none info-text'}><i>{`${reservationIsCancelled ? 'Ακυρώθηκε' : 'Τελευταία αλλαγή'} : ${getDateTime(Updated_At)}`}</i></p>}
        </Row>
    </>

    return (
        <div className={'d-flex flex-column m-auto'}>
            {(activeReservation.Status === 'Pending' ? isConflicted : activeReservation.Status !== 'Cancelled') &&
            <Button className={'mb-0 border-bottom-0 w-fit-content mx-auto mt-3 mt-lg-0'} style={{borderRadius:'5px 5px 0 0'}} variant={'outline-secondary'}
                onClick={()=>setEditing(!editing)}>{!editing ? 'Επεξεργασία' : 'Κράτηση'}</Button>}
            <div className={`text-center box_shadow rounded-3 border p-3 m-auto h-fit-content ${isInResolveConflictTab ? ' mw-550px' : 'w-100 my-xl-auto '}`}>
                {!editing ? reservationTab :  <ReservationEditModal Reservation={activeReservation} Status={activeReservation.Status}
                   setReservations={setReservations}></ReservationEditModal>}
            </div>
        </div>
    )
}
