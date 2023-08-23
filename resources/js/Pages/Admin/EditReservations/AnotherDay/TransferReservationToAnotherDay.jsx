import {Button, Card, Col, Form, ListGroup, Row, Stack} from "react-bootstrap";
import {ChangeReservationDateCalendar} from "./ChangeReservationDateCalendar";
import {useEffect, useRef, useState,useContext} from "react";
import {changeDateFormat, getFormattedDate, getTableAA,} from "../../../../ExternalJs/Util";
import {GazebosContext} from "../../../../Contexts/GazebosContext";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {Inertia} from "@inertiajs/inertia";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";
import {ShowEditReservationModalContext} from "../../Contexts/ShowEditReservationModalContext";
import {EditModalContentContext} from "../../Contexts/EditModalContentContext";
import useCheckConflict from "../../../../CustomHooks/useCheckConflict";
import {ResolvingConflictContext} from "../../Contexts/ResolvingConflictContext";
import {ActiveTabKeyContext} from "../../Contexts/ActiveTabKeyContext";

export function TransferReservationToAnotherDay({willResolveConflict = false}) {
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
    const {showEditModal,setShowEditModal} = useContext(ShowEditReservationModalContext),
    {content,setContent} = useContext(EditModalContentContext);
    const {activeTabKey,handleSetActiveKey} = useContext(ActiveTabKeyContext);
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
            return <p className={'text-info sticky-top bg-white'}>Το μοναδικό διαθέσιμο τραπέζι επιλέχθηκε αυτόματα.</p>;
        if(sameTableIsAvailable !== '') {
            if(sameTableIsAvailable)
                return <p className={'text-info sticky-top bg-white'}>Το ίδιο τραπέζι είναι διαθέσιμο και επιλέχθηκε αυτόματα.</p>;
            return <p className={'text-danger'}>Το ίδιο τραπέζι δεν είναι διαθέσιμο, επιλέξτε κάποιο άλλο.</p>;
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
                                Τραπέζι {getTableAA(table.id,Gazebos)}
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
                                Τραπέζι {getTableAA(table.id,Gazebos)}
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

    const handleSaveChanges = () => {
        Inertia.patch(route('Change_Reservation_Date'),{Reservation_id:activeReservation.id,Date:selectedDateAvailability[0],
        Table_id:selectedTable},{preserveScroll:true,only:[activeReservation.Type === 'Dinner' ?'Dinner_Reservations' : 'Bed_Reservations',
                'activeReservation',isReservationInConflict ? 'Conflicts' : ''], onSuccess:(res)=> {
                setContent('Options');
                resolvingConflict[0] && setResolvingConflict(false);
                resolvingConflict[0] && handleSetActiveKey(resolvingConflict[1]);
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
