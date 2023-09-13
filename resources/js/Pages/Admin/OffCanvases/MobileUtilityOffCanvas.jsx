import {Offcanvas} from "react-bootstrap";
import {useContext, useState} from "react";
import {ActiveReservationContext} from "../Contexts/ActiveReservationContext";
import {ReservationLong} from "../Reservations/ReservationViews/ReservationLong/ReservationLong";
import {ChevronUpSVG} from "../../../SVGS/ChevronUpSVG";
import {ChevronDownSVG} from "../../../SVGS/ChevronDownSVG";

export function MobileUtilityOffCanvas({height = 20,children, title = ''}) {
    const {activeReservation, setActiveReservation} = useContext(ActiveReservationContext);
    const [show, setShow] = useState(true);
    return (
        <>
            {!show && <div className={'mt-3'}>
                {title !== '' && <h6>{title}</h6>}
                <ChevronUpSVG className={'mx-auto'} onClick={()=>setShow(true)}/>
            </div>}
            <Offcanvas show={show} placement={'bottom'}  onHide={()=>setShow(false)} backdropClassName={'utility_backdrop'}
                       style={{height:`${height}%`, borderRadius:'30px 30px 0 0'}} className={'mx-1'} scroll={true} backdrop={true}>
                <Offcanvas.Header className={'justify-content-center pb-0 pt-1'} onClick={()=>setShow(false)}>
                    <ChevronDownSVG/>
                </Offcanvas.Header>
                <Offcanvas.Body className={'d-flex px-2 pt-3 pt-md-1 overflow-y-auto scroll-bar-hidden'}>
                    {children}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
