import {useContext, useEffect, useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import {Button, Modal} from "react-bootstrap";
import {SelectedDateContext} from "../Contexts/SelectedDateContext";
import {CalendarSettings} from "../Settings/DinnersSettings/CalendarSettings";
import {ActiveReservationTypeContext} from "../Contexts/ActiveReservationTypeContext";
import {getFormattedDate, isDateDisabledByAdmin} from "../../../ExternalJs/Util";
import {DisabledDaysContext} from "../Contexts/DisabledDaysContext";
import {OptionsSVG} from "../../../SVGS/OptionsSVG";

export function SetTablesUnavailableModal({gazebo}) {
    const [show, setShow] = useState(false);
    const [selectedDate,setSelectedDate] = useState('');
    const [reservations,setReservations] = useState([]);
    const [disabledDays,setDisabledDays] = useState([]);
    const dateIsRange = Array.isArray(selectedDate);
    const {reservationType,setReservationType} = useContext(ActiveReservationTypeContext);
    const Disabled_Days = useContext(DisabledDaysContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        if(show) {
            Inertia.get(route('Get_Reservations_For_Table'), {gazebo_id:gazebo.id,reservation_type:'Dinner',
                get_disabled_days:true},{
                only:['reservations_of_table'],
                preserveScroll:true,
                preserveState:true,
                onSuccess:(res)=>{
                    // Returns a table where the first element is a table containing all the dates when the current table is already booked,
                    // and the second element is also a table containing all the dates when the date is already disabled by the admins.
                    setReservations(res.props.reservations_of_table[0]);
                    setDisabledDays(res.props.reservations_of_table[1]);
                }
            });
        }
    },[show]);

    const handleSetTableUnavailable = () => {
        // Disable the given Table for the selected Date for the specified reservation Type.
        if(!dateIsRange){
            const date_to_disable = getFormattedDate(selectedDate,'-',1);
            return Inertia.post(route('Disable_Table'),{Date:date_to_disable,Reservation_Type:reservationType,Gazebo_id:gazebo.id},
                {preserveScroll:true,preserveState:true,only:['disabled_days_for_table','Disabled_Table_Reservations'],
                    onSuccess:(res)=>setDisabledDays(res.props.disabled_days_for_table)});
        }

        // Disable the given Table for the given date range for the specified reservation Type.
        const dates_to_disable = [getFormattedDate(selectedDate[0],'-',1),getFormattedDate(selectedDate[1],'-',1)];
        return Inertia.post(route('Disable_Table_In_Range'),{Date_Start:dates_to_disable[0],Date_End:dates_to_disable[1],
            Reservation_Type:reservationType,Gazebo_id:gazebo.id},{preserveScroll:true,preserveState:true,
            only:['disabled_days_for_table','Disabled_Table_Reservations'],
            onSuccess:(res)=>setDisabledDays(res.props.disabled_days_for_table)});
    };

    const handleSetTableAvailable = () => {
        const date_to_enable = getFormattedDate(selectedDate,'-',1);
        Inertia.delete(route('Enable_Table'),{headers: {'X-Date': date_to_enable,'X-Type':reservationType,'X-Table_id':gazebo.id},
            preserveScroll:true,preserveState:true,only:['disabled_days_for_table', 'Disabled_Table_Reservations'],
            onSuccess:(res)=>setDisabledDays(res.props.disabled_days_for_table)});
    }

    const getActionButton = () => {
        if(Array.isArray(selectedDate)) {
            if(selectedDate[0] === '')
                return null;
            return <Button variant={'outline-danger'} className={'p-2 my-2 mx-auto'} onClick={handleSetTableUnavailable}>Απενεργοποίηση</Button>;
        }
        if(selectedDate === '')
            return null;
        if(isDateDisabledByAdmin(selectedDate,Disabled_Days)[0])
            return <h6 className={'mx-auto'}>Η μέρα είναι απενεργοποιημένη</h6>;
        if(disabledDays?.includes(getFormattedDate(selectedDate,'-',1)))
            return <Button variant={'outline-success'} className={'p-2 my-2 mx-auto'} onClick={handleSetTableAvailable}>Ενεργοποίηση</Button>;
        return <Button variant={'outline-danger'} className={'p-2 my-2 mx-auto'} onClick={handleSetTableUnavailable}>Απενεργοποίηση</Button>;
    };

    return (<>
            {/* Button that is being returned to open the modal. */}
            <Button variant={'outline-secondary'} className={'p-1 m-auto border-0'}
                    onClick={handleShow}>
               <OptionsSVG height={24} width={24}/>
            </Button>
            <Modal show={show} onHide={handleClose} className={'day-unavailable-modal'}>
                {/* Shows the date|s to be disabled as the title of the modal*/}
                <Modal.Header closeButton>
                    <Modal.Title className={'user-select-none'}>Διαχείριση Gazebo {gazebo.ascending_number}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={'fst-italic text-center overflow-y-auto mh-720px'}>
                    <SelectedDateContext.Provider value={{selectedDate,setSelectedDate}}>
                        <CalendarSettings allowClickOnDisabledDays={false} isInTableSettings Reservations={reservations} disabledDaysForTable={disabledDays}></CalendarSettings>
                    </SelectedDateContext.Provider>
                </Modal.Body>
                <Modal.Footer>
                    {getActionButton()}
                </Modal.Footer>
            </Modal>
        </>
    );
}
