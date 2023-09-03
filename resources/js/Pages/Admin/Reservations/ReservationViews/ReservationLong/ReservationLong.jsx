import {useContext} from "react";
import {ActiveReservationContext} from "../../../Contexts/ActiveReservationContext";
import {Col, Row} from "react-bootstrap";
import {getTableAA} from "../../../../../ExternalJs/Util";
import {MenuContext} from "../../../../../Contexts/MenuContext";
import {GazebosContext} from "../../../../../Contexts/GazebosContext";
import {LeftArrowSVG} from "../../../../../SVGS/LeftArrowSVG";
import {InnerWidthContext} from "../../../../../Contexts/InnerWidthContext";
import {ActiveTabKeyContext} from "../../../Contexts/ActiveTabKeyContext";
import {ResolvingConflictContext} from "../../../Contexts/ResolvingConflictContext";
import {SelectedMenus} from "./SelectedMenus";
import {ReservationDetails} from "./ReservationDetails";
import {MailSVG} from "../../../../../SVGS/MailSVG";

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
    const handleBack = () => {
        setActiveReservation(null);
        if(resolvingConflict[0]) {
            handleSetActiveKey(resolvingConflict[1]);
            setResolvingConflict([false,'']);
        }
    };

    return (
        <div className={`text-center box_shadow rounded-3 border p-3 m-auto h-fit-content ${resolvingConflict[0] ? ' ' : 'w-100 my-xl-auto'} ` + (resolvingConflict[0] ? 'reservation-long-view-conflicted' : '')}>
            {(InnerWidth < 992 || resolvingConflict[0]) &&
                <LeftArrowSVG className={'mb-2 mx-auto'} onClick={handleBack} height={innerWidth > 992 ? 35 : 24} width={innerWidth > 992 ? 35 : 24}/>}
            <ReservationDetails activeReservation={activeReservation} Attendees={Attendees} handleActiveReservation={setActiveReservation}>
            </ReservationDetails>
            {/*box_shadow  rounded-3 */}
            <Row className={'mt-4 mt-lg-1 pt-3'}>
                <Col sm={12} md={6} className={InnerWidth > 992 ? 'border-end border-dark ' : ''}>
                    <section className={'my-2'}>
                        <h5 className={'user-select-none'}>Στοιχεία Επικοινωνίας</h5>
                        <p className={'info-text-lg mx-auto my-2'}>{Name}</p>
                        <p className={'info-text-lg mx-auto my-2'}>{ContactDetails?.Email}</p>
                        <p className={'info-text-lg mx-auto my-2'}>{ContactDetails?.Phone}</p>
                        <a className={'m-auto w-fit-content btn'} href={'mailto:' + ContactDetails.Email}><MailSVG height={32} width={32}/></a>
                    </section>
                    <div className={'p-2 my-3'}>
                        <h5>Παρευρισκόμενοι</h5>
                        <p>
                            {Attendees.length === 0 ? <b className={'h5'}>-</b> :
                                Attendees?.map((attendee,index)=>{
                                    return <span className={'info-text-lg'} key={index}>{index>0 && ', '}{attendee.Name}</span>
                                })}
                        </p>
                    </div>
                </Col>
                <Col sm={12} md={6} className={'d-flex flex-column '}>
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
                {Notes !== null && <div className={'p-2 my-2 user-select-none text-center mx-auto w-100'}>
                    <h5>Σημειώσεις</h5>
                    <p>{Notes}</p>
                </div>}
            </Row>
        </div>
    )
}
