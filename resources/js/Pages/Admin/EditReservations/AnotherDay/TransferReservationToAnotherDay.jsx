import {Button, Card, Col, Form, ListGroup, Row, Stack} from "react-bootstrap";
import {ChangeReservationDateCalendar} from "./ChangeReservationDateCalendar";
import {useEffect, useRef, useState} from "react";
import {changeDateFormat, getTableAA} from "../../../../ExternalJs/Util";
import {useContext} from "react";
import {GazebosContext} from "../../../../Contexts/GazebosContext";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {Inertia} from "@inertiajs/inertia";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";
import {ShowEditReservationModalContext} from "../../Contexts/ShowEditReservationModalContext";

export function TransferReservationToAnotherDay() {
    const [selectedDateAvailability,setSelectedDateAvailability] = useState(null),
    Gazebos = useContext(GazebosContext);
    const date = selectedDateAvailability ? selectedDateAvailability[0] : null;
    const [tables,setTables] = useState([]);
    useEffect(()=>{
        if(date !== null) {
            Inertia.get(route('Get_Availability_For_Date'), {date: date},{
                only:['availability_for_date'],
                preserveScroll:true,
                preserveState:true,
                onSuccess:(res)=>{
                    setTables(res.props.availability_for_date);
                }
            });
        }
    },[date]);
    const [selectedTable,setSelectedTable] = useState('');
    const TablesListRef = useRef(null);
    const {reservationType,setReservationType} = useContext(ActiveReservationTypeContext),
    {showEditModal,setShowEditModal} = useContext(ShowEditReservationModalContext);
    const handleSelectTable = (table,index) => {
        if(table.isAvailable)
            setSelectedTable(table.id);
        if (TablesListRef.current) {
            if(index === 0)
                TablesListRef.current.scrollTop = 0;
            else {
                const listItem = TablesListRef.current.childNodes[index];
                const listItemHeight = listItem.offsetHeight;
                const scrollTop = listItem.offsetTop - listItemHeight;
                TablesListRef.current.scrollTo({ top: scrollTop, behavior: 'smooth' });
            }
        }
    };
    const [showOnlyAvailableTables,setShowOnlyAvailableTables] = useState(false);
    const handleShowOnlyAvailableTablesChange = (e) => {
        setShowOnlyAvailableTables(!showOnlyAvailableTables);
    };
    const {activeReservation,setActiveReservation} = useContext(ActiveReservationContext);
    const sameTable = tables ? tables.find(table =>{
        return table.id === activeReservation.Gazebo;
    }) : null;
    const AvailableTables = selectedDateAvailability ? selectedDateAvailability[1].filter((table)=>{
        return table.isAvailable === true;
    }) : [];
    const sameTableIsAvailable = sameTable ? sameTable.isAvailable : '';

    useEffect(()=> {
        if(AvailableTables.length === 1) {
            return handleSelectTable(AvailableTables[0],tables.indexOf(AvailableTables[0]));
        }
        if(sameTableIsAvailable)
            return handleSelectTable(sameTable,tables.indexOf(tables.find((table)=>{return table.id === sameTable.id})));
        TablesListRef.current.scrollTop = 0;
        return setSelectedTable('');
    },[tables]);

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
        if(AvailableTables.length === 1)
            return <p className={'text-info sticky-top bg-white'}>Το μοναδικό διαθέσιμο τραπέζι επιλέχθηκε αυτόματα.</p>;
        if(sameTableIsAvailable !== '') {
            if(sameTableIsAvailable)
                return <p className={'text-info sticky-top bg-white'}>Το ίδιο τραπέζι είναι διαθέσιμο και επιλέχθηκε αυτόματα.</p>;
            return <p className={'text-danger'}>Το ίδιο τραπέζι δεν είναι διαθέσιμο, επιλέξτε κάποιο άλλο.</p>;
        }
    }
    const getTablesList = () =>{
        if(!selectedDateAvailability)
            return <ListGroup.Item key={0} className={'text-info'}>
                Επιλέξτε μία ημέρα για να δείτε διαθεσιμότητα.
            </ListGroup.Item>
            if(showOnlyAvailableTables)
                return tables.filter(table=>{
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
            return tables.map((table,index)=>{
                return <ListGroup.Item key={table.id} onClick={()=>handleSelectTable(table,index)}
                   style={{cursor:table.isAvailable ? 'pointer' : (table.id === activeReservation.Gazebo ? 'not-allowed' : 'not-allowed') }}
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
    const unavailableTablesExist = tables.some(table=>{return table.isAvailable === false});

    const handleSaveChanges = () => {
        Inertia.patch(route('Change_Reservation_Date'),{Reservation_id:activeReservation.id,Date:selectedDateAvailability[0],
        Table_id:selectedTable},{preserveScroll:true,only:reservationType === 'Dinner' ?
                ['Dinner_Reservations','activeReservation'] : ['Bed_Reservations','activeReservation'],onSuccess:(res)=> {
                setContent('Options');
                setShowEditModal(false);
                setActiveReservation(res.props.activeReservation);
            }});
    };

    return (
        <>
            <Row className={'my-2 h-100'}>
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
            <Row className={'my-4 h-100'}>
                <Col className={'h-100'}>
                    {!selectedDateAvailability && <h6 className={'text-info mb-4'}>Επιλέξτε νέα ημέρα κράτησης</h6>}
                    <ChangeReservationDateCalendar SelectedDateAvailability={{selectedDateAvailability,setSelectedDateAvailability}} className={'h-100'}>

                    </ChangeReservationDateCalendar>
                </Col>
                {selectedDateAvailability && <Col className={'my-5 my-lg-0'}>
                    <Card className={'h-100'}>
                        <Card.Header className={'bg-transparent'}>
                            Διαθέσιμα Τραπέζια για {changeDateFormat(date, '-', '-')}
                        </Card.Header>
                        <Card.Body className={'d-flex flex-column'}>
                            <ListGroup variant="flush" style={{height: '255px'}} ref={TablesListRef} className={'overflow-y-auto'}>
                                {getAvailableTablesTextWarning()}
                                {getTablesList()}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>}
            </Row>
            {selectedTable !== '' && <Button variant={'outline-success'} className={'my-2'} style={{width: 'fit-content'}}
            onClick={handleSaveChanges}>Επιβεβαίωση
                Αλλαγής</Button>}
        </>
    )
}
