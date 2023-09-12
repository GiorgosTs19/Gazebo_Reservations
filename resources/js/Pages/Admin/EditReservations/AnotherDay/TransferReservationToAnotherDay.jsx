import {ChangeReservationDateCalendar} from "./ChangeReservationDateCalendar";
import {useEffect, useRef, useState,useContext} from "react";
import {changeDateFormat, getTableAA,} from "../../../../ExternalJs/Util";
import useCheckConflict from "../../../../CustomHooks/useCheckConflict";
import {ChevronDownSVG} from "../../../../SVGS/ChevronDownSVG";
import {ChevronUpSVG} from "../../../../SVGS/ChevronUpSVG";
import {getDate, getParameter, handleSetReservations} from "../../../../Inertia_Requests/Admin_Requests";
import {Button, Card, Col, Form, ListGroup, Row, Stack} from "react-bootstrap";
import {GazebosContext} from "../../../../Contexts/GazebosContext";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {Inertia} from "@inertiajs/inertia";
import {ResolvingConflictContext} from "../../Contexts/ResolvingConflictContext";
import {ViewContext} from "../../../../Contexts/ViewContext";
import {ActiveRangeContext} from "../../Contexts/ActiveRangeContext";
import {ActiveTabKeyContext} from "../../Contexts/ActiveTabKeyContext";


export function TransferReservationToAnotherDay({edit}) {
    const [selectedDateAvailability,setSelectedDateAvailability] = useState(null),
    Gazebos = useContext(GazebosContext),
    {resolvingConflict,setResolvingConflict} = useContext(ResolvingConflictContext);
    // A boolean to indicate if all tables will be shown in the list, or just the ones that can actually be selected,
    // basically the available ones.
    const [showOnlyAvailableTables,setShowOnlyAvailableTables] = useState(false);
    const {activeReservation,setActiveReservation} = useContext(ActiveReservationContext);
    const date = selectedDateAvailability ? selectedDateAvailability[0] : null;
    const [selectedTable,setSelectedTable] = useState('');
    const TablesListRef = useRef(null);
    const {activeReservationsView,setActiveReservationsView} = useContext(ViewContext),
    [showCalendar, setShowCalendar] = useState(true),
    [activeRange, setReservations] = useContext(ActiveRangeContext),
    {activeTabKey,handleSetActiveKey} = useContext(ActiveTabKeyContext),
    {editing, setEditing} = edit;
    const [isReservationInConflict,conflictType,conflictMessage] = useCheckConflict(activeReservation.id);
    // Handles the selection of a table from the list, as well as the scrolling to the appropriate height
    // of the list, to match the currently selected table
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

    const handleShowOnlyAvailableTablesChange = () => {
        setShowOnlyAvailableTables(!showOnlyAvailableTables);
    };

    // Gets the reservation's current table, no matter the availability of it on the current date.
    const sameTable = selectedDateAvailability ? selectedDateAvailability[1].find(table =>{
        return table.id === activeReservation.Gazebo;
    }) : null;

    // Filters out only the available tables out of all in the list.
    const AvailableTables = selectedDateAvailability ? selectedDateAvailability[1].filter((table)=>{
        return table.isAvailable === true;
    }) : [];

    // Checks if the same table as the reservation's current is available.
    const sameTableIsAvailable = sameTable ? sameTable.isAvailable : '';
    // It runs basically every the date changes, thus the availability changes. It checks to see if there's only 1 available table and if yes select it.
    // It will also check if the same table as the reservation's is available for the selected date, and if yes select it again.
    // If none of the above, simply set the selected table to empty so the user can select another one.
    useEffect(()=> {
        if(selectedDateAvailability)
            setShowCalendar(false);
        if(AvailableTables.length === 1) {
            return handleSelectTable(AvailableTables[0],selectedDateAvailability[1].indexOf(AvailableTables[0]));
        }
        if(sameTableIsAvailable)
            return handleSelectTable(sameTable,selectedDateAvailability[1].indexOf(selectedDateAvailability[1].find((table)=>{return table.id === sameTable.id})));
        if(TablesListRef.current)
            TablesListRef.current.scrollTop = 0;
        return setSelectedTable('');
    },[selectedDateAvailability]);

    // Checks if the selected date is the same as the reservation's current date.
    const isSelectedDateSameAsReservationsCurrent = date === activeReservation.Date;

    // Gets the availability text of each table. Current || Available || Reserved .
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
    // Gets the list item's opacity ( table opacity ) based on the table's availability Current || Available || Reserved .
    const getTableOpacity = (table) => {
        if(table.id === activeReservation.Gazebo && isSelectedDateSameAsReservationsCurrent)
            return 'opacity-50';
        if(!table.isAvailable)
            return 'opacity-25';
    };

    const getAvailableTablesTextWarning = () => {
        if(AvailableTables.length === 1)
            return <p className={'text-info sticky-top bg-white'}>Το μοναδικό διαθέσιμο Gazebo επιλέχθηκε αυτόματα.</p>;
        if(sameTableIsAvailable !== '') {
            if(sameTableIsAvailable)
                return <p className={'text-info sticky-top bg-white'}>Το ίδιο Gazebo είναι διαθέσιμο και επιλέχθηκε αυτόματα.</p>;
            return <p className={'text-danger'}>Το ίδιο Gazebo δεν είναι διαθέσιμο, επιλέξτε κάποιο άλλο.</p>;
        }
    }
    // Renders the list with the tables of the current date. If showOnlyAvailableTables is set to true,
    // it will only render the available ones.
    const getTablesList = () =>{
        if(!selectedDateAvailability)
            return <ListGroup.Item key={0} className={'text-info'}>
                Επιλέξτε μία ημέρα για να δείτε διαθεσιμότητα.
            </ListGroup.Item>
            if(showOnlyAvailableTables)
                return selectedDateAvailability[1].filter(table=>{
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
                })
            return selectedDateAvailability[1].map((table,index)=>{
                return <ListGroup.Item key={table.id} onClick={()=>handleSelectTable(table,index)}
                   style={{cursor:(table.isAvailable ? 'pointer ' : (table.id === activeReservation.Gazebo ? 'not-allowed' : 'not-allowed'))}}
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
    // Checks if there are any reserved tables on the selected date.
    const unavailableTablesExist = selectedDateAvailability ?  selectedDateAvailability[1].some(table=>{return table.isAvailable === false}) : false;
    const handleFetchReservations = () => {
        if(resolvingConflict[1] !== 'Reservations')
            return;
        switch (activeReservationsView) {
            case 'Today' : {
                break;
            }
            case 'Weekly' : {
                break;
            }
            case 'Monthly' : {
                break;
            }
        }
    }

    const handleSaveChanges = () => {
        Inertia.patch(route('Change_Reservation_Date'),{Reservation_id:activeReservation.id,Date:selectedDateAvailability[0],
        Table_id:selectedTable, date_start:getDate(0, activeRange), date_end:getDate(1, activeRange)},
            {preserveScroll:true,only:[getParameter(activeRange), 'activeReservation',conflictType === 'Date' ? 'Disabled_Dates_Reservations' : 'Disabled_Table_Reservations'],
            onSuccess:(res)=> {
                // console.log('res', res)
                setEditing(false);
                if(resolvingConflict[0] && activeTabKey !== 'ResolveConflict')
                    setResolvingConflict([false, '']);
                if(activeReservationsView !== 'Today')
                    setActiveReservation(res.props.activeReservation);
                handleSetReservations(res, activeRange, setReservations);
        }});
    };

    return (
        <>
            <Row className={'my-2 h-100'}>
                <p>Τρέχουσες Πληροφορίες Κράτησης</p>
                <p className={'border-bottom pb-3'}>
                    <span><b>Ημερομηνία :</b> <i>{changeDateFormat(activeReservation.Date,'-','-')}</i>, </span>
                    <span><b>Gazebo :</b> <i>{getTableAA(activeReservation.Gazebo,Gazebos)}</i></span>
                </p>
                <div className={'d-flex'}>
                    {selectedDateAvailability && unavailableTablesExist && <Stack direction={'horizontal'} className={'mx-auto'}>
                        <h6>Εμφάνιση μόνο των διαθέσιμων Gazebo</h6>
                        <Form.Switch className={'mx-1 mb-1'} checked={showOnlyAvailableTables}
                                     onChange={handleShowOnlyAvailableTablesChange}></Form.Switch>
                    </Stack>}
                </div>
            </Row>
            <div className={'my-1 h-100 text-center'}>
                {/*<Col className={'h-100'}>*/}
                    {!selectedDateAvailability && <h6 className={'text-info mb-4'}>Επιλέξτε νέα ημέρα κράτησης</h6>}
                    {showCalendar ? <>
                        <ChevronUpSVG onClick={()=>setShowCalendar(false)}/>
                        <ChangeReservationDateCalendar
                            SelectedDateAvailability={{selectedDateAvailability, setSelectedDateAvailability}}
                            className={'h-100'}>

                        </ChangeReservationDateCalendar>
                    </>: <>
                        <span className={'fw-bold'}>Ημερολόγιο</span>
                        <ChevronDownSVG onClick={()=>setShowCalendar(true)}/>
                    </>}
                {/*</Col>*/}
                {selectedDateAvailability &&
                    <Card className={'h-100 my-5 my-lg-3'}>
                        <Card.Header className={'bg-transparent'}>
                            Διαθέσιμα Τραπέζια για {changeDateFormat(date, '-', '-')}
                        </Card.Header>
                        <Card.Body className={'d-flex flex-column'}>
                            <ListGroup variant="flush" style={{height: '220px'}} ref={TablesListRef} className={'overflow-y-auto'}>
                                {getAvailableTablesTextWarning()}
                                {getTablesList()}
                            </ListGroup>
                        </Card.Body>
                    </Card>}
            </div>
            {selectedTable !== '' && <Button variant={'outline-success'} className={'my-2'} style={{width: 'fit-content'}}
            onClick={handleSaveChanges}>Επιβεβαίωση
                Αλλαγής</Button>}
        </>
    )
}
