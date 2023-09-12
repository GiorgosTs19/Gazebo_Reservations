import {changeDateFormat, getTableAA} from "../../../../ExternalJs/Util";
import {useContext,useState,useRef,useEffect} from "react";
import useCheckConflict from "../../../../CustomHooks/useCheckConflict";
import {getDate, getParameter, handleSetReservations} from "../../../../Inertia_Requests/Admin_Requests";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {GazebosContext} from "../../../../Contexts/GazebosContext";
import {Inertia} from "@inertiajs/inertia";
import {Button, Card, Col, Form, ListGroup, Row, Stack} from "react-bootstrap";
import {ResolvingConflictContext} from "../../Contexts/ResolvingConflictContext";
import {ActiveTabKeyContext} from "../../Contexts/ActiveTabKeyContext";
import {ActiveRangeContext} from "../../Contexts/ActiveRangeContext";

export function ChangeReservationTableSameDay({edit}) {
    const {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
        Gazebos = useContext(GazebosContext),
        {resolvingConflict,setResolvingConflict} = useContext(ResolvingConflictContext);
    const [selectedTable,setSelectedTable] = useState('');
    const TablesListRef = useRef(null);
    const {activeTabKey,handleSetActiveKey} = useContext(ActiveTabKeyContext),
    {editing, setEditing} = edit;
    const [isReservationInConflict,conflictType,conflictMessage] = useCheckConflict(activeReservation.id),
    [activeRange, setReservations] = useContext(ActiveRangeContext);
    const handleSelectTable = (table,index) => {
        if(table.isAvailable && table.id !== activeReservation.Gazebo)
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

    const date = activeReservation.Date;
    const [tables,setTables] = useState([]);
    useEffect(()=>{
        if(date !== null) {
            Inertia.get(route('Get_Availability_For_Date'), {date: date, type:activeReservation.Type},{
                only:['availability_for_date'],
                preserveScroll:true,
                preserveState:true,
                onSuccess:(res)=>{
                    setTables(res.props.availability_for_date);
                }
            });
        }
    },[]);
    const [showOnlyAvailableTables,setShowOnlyAvailableTables] = useState(false);
    const handleShowOnlyAvailableTablesChange = (e) => {
        setShowOnlyAvailableTables(!showOnlyAvailableTables);
    };

    const unavailableTablesExist = tables.some(table=>{return table.isAvailable === false});

    const getTableAvailabilityText = (table) => {
        if(selectedTable === table.id)
            return <span>Επιλεγμένο</span>;
        if(table.id === activeReservation.Gazebo)
            return <span className={'text-warning'}>Τρέχων</span>;
        if(table.isAvailable)
            return <span className={'text-success'}>Διαθέσιμο</span>;
        else
            return <span className={'text-danger'}>Μη διαθέσιμο</span>;
    };

    const getTableOpacity = (table) => {
        if(table.id === activeReservation.Gazebo)
            return 'opacity-50';
        if(!table.isAvailable)
            return 'opacity-25';
    };

    const getTablesList = () => {
        if(showOnlyAvailableTables)
            return tables.filter(table=>{
                return table.isAvailable === true;
            }).map((table,index)=>{
                return <ListGroup.Item key={table.id} onClick={()=>handleSelectTable(table,index)}
                                       style={{cursor:table.isAvailable ? 'pointer' : ''}}
                                       className={(getTableOpacity(table)) + (selectedTable === table.id ? ' bg-info' : '')}>
                    <Row>
                        <Col>
                            Gazebo {getTableAA(table.id,Gazebos)}
                        </Col>
                        <Col>
                            {getTableAvailabilityText(table)}
                        </Col>
                    </Row>
                </ListGroup.Item>;
            });

        return tables.map((table,index)=>{
            return <ListGroup.Item key={table.id} onClick={()=>handleSelectTable(table,index)}
               style={{cursor:table.isAvailable ? 'pointer' : (table.id === activeReservation.Gazebo ? 'not-allowed' : 'not-allowed') }}
               className={(getTableOpacity(table)) + (selectedTable === table.id ? ' bg-info' : '')}>
                <Row>
                    <Col>
                        Gazebo {getTableAA(table.id,Gazebos)}
                    </Col>
                    <Col>
                        {getTableAvailabilityText(table)}
                    </Col>
                </Row>
            </ListGroup.Item>;
        })
    }

    const handleSaveChanges = () => {
        Inertia.patch(route('Change_Reservation_Table'),{Reservation_id:activeReservation.id,
            Table_id:selectedTable, date_start:getDate(0, activeRange), date_end:getDate(1, activeRange)},
            {preserveScroll:true,only: [getParameter(activeRange),
                'activeReservation', isReservationInConflict ? 'Disabled_Table_Reservations' : '']
            ,onSuccess:(res)=> {
                setEditing(false);
                if(resolvingConflict[0] && activeTabKey !== 'ResolveConflict')
                    setResolvingConflict([false, '']);
                setActiveReservation(res.props.activeReservation);
                handleSetReservations(res, activeRange, setReservations)
            }});
    };

    return (
        <Row className={'p-2 '}>
            <Col className={'h-100'}>
                <div className={'d-flex mb-4'}>
                    {unavailableTablesExist && <Stack direction={'horizontal'} className={'mx-auto'}>
                        <h6 onClick={handleShowOnlyAvailableTablesChange} style={{cursor:'pointer'}}>
                            Εμφάνιση μόνο των διαθέσιμων Gazebo
                        </h6>
                        <Form.Switch className={'mx-1 mb-1'} checked={showOnlyAvailableTables}
                                     onChange={handleShowOnlyAvailableTablesChange}></Form.Switch>
                    </Stack>}
                </div>
                <Card className={'h-100 border-0'}>
                    <Card.Header className={'bg-transparent'}>
                        Διαθέσιμα Τραπέζια για {changeDateFormat(date, '-', '-')}
                    </Card.Header>
                    <Card.Body className={'d-flex flex-column'}>
                        <ListGroup variant="flush" style={{height: '250px', overflowY: 'auto'}} ref={TablesListRef}>
                            {getTablesList()}
                        </ListGroup>
                    </Card.Body>
                </Card>
                {selectedTable !== '' && <Button variant={'outline-success'} className={'mt-4'} style={{width: 'fit-content'}} onClick={handleSaveChanges}>
                    Επιβεβαίωση Αλλαγής</Button>}
            </Col>
        </Row>
    )
}
