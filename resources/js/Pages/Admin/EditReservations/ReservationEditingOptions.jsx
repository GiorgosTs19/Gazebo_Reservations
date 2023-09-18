import {Button, Col, Row, Stack} from "react-bootstrap";
import {ActiveReservationContext} from "../Contexts/ActiveReservationContext";
import {EditReservationModalTitleContext} from "../Contexts/EditReservationModalTitleContext";
import {TransferReservationToAnotherDay} from "./AnotherDay/TransferReservationToAnotherDay";
import {useContext} from "react";
import {ChangeReservationTableSameDay} from "./SameDay/ChangeReservationTableSameDay";
import {isDateDisabledByAdmin} from "../../../ExternalJs/Util";
import {DisabledDaysContext} from "../Contexts/DisabledDaysContext";
import {EditModalContentContext} from "../Contexts/EditModalContentContext";
import {CancelReservation} from "./CancelReservation/CancelReservation";
import {useGetAvailabilityForDate} from "../../../CustomHooks/useGetAvailabilityForDate";
import {SpinnerSVG} from "../../../SVGS/SpinnerSVG";

export function ReservationEditingOptions({conflictType = '', edit, children = null}) {
    const {content,setContent} = useContext(EditModalContentContext),
    {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    {modalTitle,setModalTitle} = useContext(EditReservationModalTitleContext),
    Disabled_Days = useContext(DisabledDaysContext),
    [isDateDisabled, reservationsAllowed]= isDateDisabledByAdmin(activeReservation.Date,Disabled_Days);
    const [requestProgress, availability, setAvailability] = useGetAvailabilityForDate(activeReservation.Date, activeReservation.Type,[]);
    const noAvailableTablesExist = availability.every(table=>{return table.isAvailable === false});

    const handleClickTransfer = () => {
        setContent(<TransferReservationToAnotherDay edit={edit}/>);
        setModalTitle('Αλλαγή ημερομηνίας της κράτησης')
    };

    const handleClickChangeTable = () => {
        setContent(<ChangeReservationTableSameDay edit={edit} availability={availability}/>);
        setModalTitle('Αλλαγή Gazebo την ίδια μέρα')
    };

    const handleClickCancelReservation = () => {
        setContent(<CancelReservation edit={edit}/>);
        setModalTitle('');
    };
    const canChangeGazeboSameDay = (conflictType === 'Table' || conflictType === '') && !isDateDisabled;
    return (
        requestProgress === 'Pending' ? <SpinnerSVG className={'my-2'}/> : <>
            <Row className={'my-3'}>
                <Col className={'d-flex flex-column'}>
                    {children}
                </Col>
                <Col className={'d-flex flex-column'}>
                    <p className={'info-text-lg mb-3'}>
                        Ημερομηνία
                    </p>
                    <Button variant={'secondary'} className={'m-auto'} onClick={handleClickTransfer}>Αλλαγή Ημέρας</Button>
                </Col>
            </Row>
            <Row className={'my-3'}>
                {canChangeGazeboSameDay &&
                    <Col className={'d-flex flex-column'} xs={6}>
                        <p className={'info-text-lg mb-3'}>Gazebo</p>
                        {noAvailableTablesExist &&
                            <p className={'text-danger fw-bold info-text-lg mt-2 mb-1'}>Δεν υπάρχουν διαθέσιμα Gazebo την ίδια μέρα.</p>}
                        <Button variant={'secondary'} className={'m-auto ' + (noAvailableTablesExist ? 'opacity-25' : '')}
                                onClick={handleClickChangeTable} disabled={noAvailableTablesExist || isDateDisabled}>
                            Αλλαγή Gazebo
                        </Button>
                    </Col>}
                <Col xs={canChangeGazeboSameDay ? 6 : 12} className={'d-flex flex-column my-3 my-sm-0'}>
                    <p className={'info-text-lg mb-3 '}>Μενού</p>
                    <Button variant={'secondary'} className={'m-auto'} disabled>Αλλαγή Μενού</Button>
                </Col>
            </Row>
            <section className={'my-5'}>
                <p className={'info-text-lg my-auto'}>Ακύρωση της κράτησης</p>
                <Button variant={'outline-danger'} onClick={handleClickCancelReservation} className={'mt-3 mx-auto'}>Ακύρωση</Button>
            </section>
        </>
    )
}
