import {Button, Card, Col, Form, ListGroup, Row} from "react-bootstrap";
import {changeDateFormat, getFormattedDate, getTableAA} from "../../../../ExternalJs/Util";
import {useContext, useEffect, useRef, useState} from "react";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {Inertia} from "@inertiajs/inertia";
import {getDate, getParameter, handleSetReservations} from "../../../../Inertia_Requests/Admin_Requests";
import {GazebosContext} from "../../../../Contexts/GazebosContext";
import {ActiveRangeContext} from "../../Contexts/ActiveRangeContext";
import {ActiveTabKeyContext} from "../../Contexts/ActiveTabKeyContext";
import useCheckConflict from "../../../../CustomHooks/useCheckConflict";
import {ViewContext} from "../../../../Contexts/ViewContext";
import {ResolvingConflictContext} from "../../Contexts/ResolvingConflictContext";
import {SpinnerSVG} from "../../../../SVGS/SpinnerSVG";


export function TablesList({selectedDate, date, activeDateRange, requestProgress,
    selectedTable, setShowCalendar, setSelectedTable, edit, availability}) {
    const {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    Gazebos = useContext(GazebosContext),
    {resolvingConflict,setResolvingConflict} = useContext(ResolvingConflictContext),
    {activeReservationsView,setActiveReservationsView} = useContext(ViewContext);
    const [showOnlyAvailableTables,setShowOnlyAvailableTables] = useState(false);
    const [activeRange, setReservations] = useContext(ActiveRangeContext),
    {activeTabKey,handleSetActiveKey} = useContext(ActiveTabKeyContext),
    {editing, setEditing} = edit;
    const [isReservationInConflict,conflictType,conflictMessage] = useCheckConflict(activeReservation.id);
    // Checks if the selected date is the same as the reservation's current date.
    const isSelectedDateSameAsReservationsCurrent = date === activeReservation.Date;
    const TablesListRef = useRef(null);
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

    // Checks if there are any reserved tables on the selected date.
    const unavailableTablesExist = selectedDate ?  availability.some(table=>{return table.isAvailable === false}) : false;


    // Gets the list item's opacity ( table opacity ) based on the table's availability Current || Available || Reserved .
    const getTableOpacity = (table) => {
        if(table.id === activeReservation.Gazebo && isSelectedDateSameAsReservationsCurrent)
            return 'opacity-50';
        if(!table.isAvailable)
            return 'opacity-25';
    };

    // Gets the reservation's current table, no matter the availability of it on the current date.
    const sameTable = availability.find(table =>{
        return table.id === activeReservation.Gazebo;
    });

    // Filters out only the available tables out of all in the list.
    const AvailableTables = selectedDate ? availability.filter((table)=>{
        return table.isAvailable === true;
    }) : [];

    // Checks if the same table as the reservation's current is available.
    const sameTableIsAvailable = sameTable ? sameTable.isAvailable : '';


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

    // It runs basically every the date changes, thus the availability changes. It checks to see if there's only 1 available table and if yes select it.
    // It will also check if the same table as the reservation's is available for the selected date, and if yes select it again.
    // If none of the above, simply set the selected table to empty so the user can select another one.
    useEffect(()=> {
        if(selectedDate)
            setShowCalendar(false);
        if(AvailableTables.length === 1) {
            return handleSelectTable(AvailableTables[0],availability.indexOf(AvailableTables[0]));
        }
        if(sameTableIsAvailable)
            return handleSelectTable(sameTable,availability.indexOf(availability.find((table)=>{return table.id === sameTable.id})));
        if(TablesListRef.current)
            TablesListRef.current.scrollTop = 0;
        return setSelectedTable('');
    },[selectedDate]);

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
        if(!selectedDate)
            return <ListGroup.Item key={0} className={'text-info'}>
                Επιλέξτε μία ημέρα για να δείτε διαθεσιμότητα.
            </ListGroup.Item>
        if(showOnlyAvailableTables)
            return availability.filter(table=>{
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
        return availability.map((table, index)=>{
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

    const handleSaveChanges = () => {
        Inertia.patch(route('Change_Reservation_Date'),{reservation_id:activeReservation.id,date:getFormattedDate(selectedDate),
                gazebo_id:selectedTable, date_start:getDate(0, activeDateRange),
                date_end:getDate(1, activeDateRange), active_view:activeReservationsView,
                reservation_type:activeReservation.Type},
            {preserveScroll:true,preserveState:true,only:[getParameter(activeDateRange),
                'activeReservation',conflictType !== '' ? conflictType === 'Date' ? 'Disabled_Dates_Reservations' : 'Disabled_Table_Reservations' : ''],
                onSuccess:(res)=> {
                    // console.log('res', res)
                    setEditing(false);
                    if(resolvingConflict[0] && activeTabKey !== 'ResolveConflict')
                        setResolvingConflict([false, '']);
                    handleSetReservations(res, activeRange, setReservations,activeReservationsView);
                    setActiveReservation(res.props.activeReservation);
                },
            onError:errors=>console.log(errors)});
    };

    const handleShowOnlyAvailableTablesChange = () => {
        setShowOnlyAvailableTables(!showOnlyAvailableTables);
    };

    return (
        <Card className={'h-100 my-2 my-lg-3 border-0'}>
            <Card.Header className={'bg-transparent info-text-lg'}>
                Διαθέσιμα Τραπέζια για {changeDateFormat(date, '-', '-')}
                <div className={'d-flex'}>
                {selectedDate && unavailableTablesExist && <div className={'mx-auto'}>
                    <h6>Εμφάνιση μόνο των διαθέσιμων Gazebo</h6>
                    <Form.Switch className={'mx-1 mb-1'} checked={showOnlyAvailableTables}
                                 onChange={handleShowOnlyAvailableTablesChange}></Form.Switch>
                </div>}
            </div>
            </Card.Header>
            <Card.Body className={'d-flex flex-column'}>
                {requestProgress === 'Pending' ? <SpinnerSVG/> : <ListGroup variant="flush" style={{height: '220px'}} ref={TablesListRef} className={'overflow-y-auto'}>
                    {getAvailableTablesTextWarning()}
                    {getTablesList()}
                </ListGroup>}
            </Card.Body>
            <Card.Footer className={'bg-transparent border-0'}>
                {selectedTable !== '' && <Button variant={'outline-success'} className={'my-2'} style={{width: 'fit-content'}}
                onClick={handleSaveChanges}>Επιβεβαίωση Αλλαγής</Button>}
            </Card.Footer>
        </Card>
    )
}
