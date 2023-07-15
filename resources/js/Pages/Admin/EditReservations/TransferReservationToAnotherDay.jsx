import {Button, Card, Col, Form, ListGroup, Row, Stack} from "react-bootstrap";
import {ChangeReservationDateCalendar} from "./ChangeReservationDateCalendar";
import {useEffect, useRef, useState} from "react";
import {changeDateFormat, getTableAA} from "../../../ExternalJs/Util";
import {useContext} from "react";
import {GazebosContext} from "../../../Contexts/GazebosContext";
import {ActiveReservationContext} from "../Contexts/ActiveReservationContext";
import {EditReservationModalTitleContext} from "../Contexts/EditReservationModalTitleContext";

export function TransferReservationToAnotherDay() {
    const [selectedDateAvailability,setSelectedDateAvailability] = useState(null),
    Gazebos = useContext(GazebosContext);
    const date = selectedDateAvailability ? selectedDateAvailability[0] : null,
        availableTables = selectedDateAvailability ? selectedDateAvailability[1] : [];
    const [selectedTable,setSelectedTable] = useState('');
    const TablesListRef = useRef(null);
    const handleSelectTable = (table,index) => {
        if(table.isAvailable)
            setSelectedTable(table.id);
        if(index === Gazebos.length-1)
            if(TablesListRef.current)
                TablesListRef.current.scrollTo({top:TablesListRef.current.scrollHeight})
    };
    const [showOnlyAvailableTables,setShowOnlyAvailableTables] = useState(false);
    const handleShowOnlyAvailableTablesChange = (e) => {
        setShowOnlyAvailableTables(!showOnlyAvailableTables);
    };
    const {activeReservation,setActiveReservation} = useContext(ActiveReservationContext);
    const sameTable = selectedDateAvailability ? availableTables.find(table =>{
        return table.id === activeReservation.Gazebo;
    }) : null;
    const sameTableIsAvailable = sameTable ? sameTable.isAvailable : ''
    useEffect(()=> {
        if(selectedDateAvailability) {
            if(sameTableIsAvailable)
                return setSelectedTable(sameTable.id);
            return setSelectedTable('');
        }
    },[selectedDateAvailability]);
    // isTableSameAsReservationsCurrent;

    const isSelectedDateSameAsReservationsCurrent = date === activeReservation.Date;

    const getTableAvailabilityText = (table) => {
        if(selectedTable === table.id)
            return <span>Επιλεγμένο</span>;
        if(table.id === activeReservation.Gazebo && isSelectedDateSameAsReservationsCurrent)
            return <span className={'text-warning'}>Τρέχων</span>;
        if(table.isAvailable)
            return <span className={'text-success'}>Διαθέσιμο</span>;
        else
            return <span className={'text-danger'}>Μη διαθέσιμο</span>;
    };
    const getTableOpacity = (table) => {
        if(table.id === activeReservation.Gazebo && isSelectedDateSameAsReservationsCurrent)
            return 'opacity-50';
        if(!table.isAvailable)
            return 'opacity-25';
    };
    const getAvailableTablesTextWarning = () => {
        if(sameTableIsAvailable !== '') {
            if(sameTableIsAvailable)
                return <p className={'text-info sticky-top bg-white'}>Το ίδιο τραπέζι είναι διαθέσιμο και επιλέχθηκε αυτόματα.</p>;
            return <p className={'text-danger'}>Το ίδιο τραπέζι δεν είναι διαθέσιμο, παρακαλούμε επιλέξτε κάποιο άλλο.</p>;
        }
    }
    const getTablesList = () =>{
        if(!selectedDateAvailability)
            return <ListGroup.Item key={0} className={'text-info'}>
                Επιλέξτε μία ημέρα για να δείτε διαθεσιμότητα.
            </ListGroup.Item>
            if(showOnlyAvailableTables)
                return availableTables.filter(table=>{
                    return table.isAvailable === true;
                }).map((table,index)=>{
                    return <ListGroup.Item key={table.id} onClick={()=>handleSelectTable(table,index)}
                                           style={{cursor:table.isAvailable ? 'pointer' : ''}}
                                           className={(getTableOpacity(table)) + (selectedTable === table.id ? ' bg-info' : '')}>
                        <Row>
                            <Col>
                                Τραπέζι {getTableAA(table.id,Gazebos)}
                            </Col>
                            <Col>
                                {getTableAvailabilityText(table)}
                            </Col>
                        </Row>
                    </ListGroup.Item>;
                })
            return availableTables.map((table,index)=>{
                return <ListGroup.Item key={table.id} onClick={()=>handleSelectTable(table,index)}
                       style={{cursor:table.isAvailable ? 'pointer' : ''}}
                       className={(getTableOpacity(table)) + (selectedTable === table.id ? ' bg-info' : '')}>
                            <Row>
                                <Col>
                                    Τραπέζι {getTableAA(table.id,Gazebos)}
                                </Col>
                                <Col>
                                    {getTableAvailabilityText(table)}
                                </Col>
                            </Row>
                        </ListGroup.Item>;
            })
    }
    const unavailableTablesExist = availableTables.some(table=>{return table.isAvailable === false});
    return (
        <>
            <Row className={'my-2'}>
                <p>Τρέχουσες Πληροφορίες Κράτησης</p>
                <p className={'border-bottom pb-3'}>
                    <span><b>Ημερομηνία :</b> <i>{changeDateFormat(activeReservation.Date,'-','-')}</i>, </span>
                    <span><b>Τραπέζι :</b> <i>{getTableAA(activeReservation.Gazebo,Gazebos)}</i></span>
                </p>
                <div className={'d-flex'}>
                    {selectedDateAvailability && unavailableTablesExist && <Stack direction={'horizontal'} className={'mx-auto'}>
                        <h6>Εμφάνιση μόνο των διαθέσιμων τραπέζιών</h6>
                        <Form.Switch className={'mx-1 mb-1'} checked={showOnlyAvailableTables}
                                     onChange={handleShowOnlyAvailableTablesChange}></Form.Switch>
                    </Stack>}
                </div>
            </Row>
            <Row className={'my-4'}>
                <Col>
                    {!selectedDateAvailability && <h6 className={'text-info mb-4'}>Επιλέξτε νέα ημέρα κράτησης</h6>}
                    <ChangeReservationDateCalendar SelectedDateAvailability={{selectedDateAvailability,setSelectedDateAvailability}}>

                    </ChangeReservationDateCalendar>
                </Col>
                {selectedDateAvailability && <Col className={'my-5 my-lg-0'}>
                    <Card className={'h-100'}>
                        <Card.Header className={'bg-transparent'}>
                            Διαθέσιμα Τραπέζια για {changeDateFormat(date, '-', '-')}
                        </Card.Header>
                        <Card.Body className={'d-flex flex-column'}>
                            <ListGroup variant="flush" style={{height: '300px', overflowY: 'auto'}} ref={TablesListRef}>
                                {getAvailableTablesTextWarning()}
                                {getTablesList()}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>}
            </Row>
            {selectedTable !== '' && <Button variant={'outline-success'} className={'my-2'} style={{width: 'fit-content'}}>Επιβεβαίωση
                Αλλαγής</Button>}
        </>
    )
}
