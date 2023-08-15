import {useContext, useEffect, useState} from "react";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {Inertia} from "@inertiajs/inertia";
import {Button, Modal} from "react-bootstrap";
import {SelectedDateContext} from "../../Contexts/SelectedDateContext";
import {GazebosContext} from "../../../../Contexts/GazebosContext";
import {CalendarSettings} from "../../Settings/DinnersSettings/CalendarSettings";

export function SetTablesUnavailableModal({gazebo}) {
    const [show, setShow] = useState(false),
        innerWidth = useContext(InnerWidthContext)
    const [selectedDate,setSelectedDate] = useState('');
    const [reservations,setReservations] = useState([]);
    const dateIsRange = Array.isArray(selectedDate);
    const [selectedTables, setSelectedTables] = useState([]),
    Gazebos = useContext(GazebosContext);

    const handleSelectTable = (e) => {
        // setSelectedTables((prevState)=>[...prevState,e.target.value]);
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(selectedDate)
    useEffect(()=>{
        if(show) {
            Inertia.get(route('Get_Reservations_For_Table'), {gazebo_id:gazebo.id,reservation_type:'Dinner'},{
                only:['reservations_of_table'],
                preserveScroll:true,
                preserveState:true,
                onSuccess:(res)=>{
                    console.log(res.props.reservations_of_table);
                    setReservations(res.props.reservations_of_table);
                }
            });
        }
    },[show]);

    // const handleSetDayUnavailable = () => {
    //     if(!dateIsRange){
    //         const date_to_disable = getFormattedDate(selectedDate,'-',1);
    //         return Inertia.post(route('Disable_Day'),{Date:date_to_disable,Allow_Existing_Reservations:allowExistingReservations,Type:Type},
    //             {preserveScroll:true,preserveState:true, only:['Dinner_Reservations'],onSuccess:()=>setShow(false)});
    //     }
    //     const dates_to_disable = [getFormattedDate(selectedDate[0],'-',1),getFormattedDate(selectedDate[1],'-',1)];
    //     return Inertia.post(route('Disable_Days'),{Date_Start:dates_to_disable[0],Date_End:dates_to_disable[1],
    //         Allow_Existing_Reservations:allowExistingReservations,Type:Type},{preserveScroll:true,preserveState:true,
    //         only:['Dinner_Reservations'],onSuccess:()=>setShow(false)});
    // };

    // const formatted_date = show && (!dateIsRange ? getFormattedDate(selectedDate, '-', 2) :
    //     [changeDateFormat(getFormattedDate(selectedDate[0],'-',1),'-','-'),
    //         changeDateFormat(getFormattedDate(selectedDate[1],'-',1),'-','-')]);

    return (<>
            {/* Button that is being returned to open the modal. */}
            <Button variant={'outline-secondary'} className={'p-2 m-auto rounded-4'}
                    onClick={handleShow}>
               Διαχείριση Τραπεζιού {gazebo.ascending_number}
            </Button>
            <Modal show={show} onHide={handleClose} className={'day-unavailable-modal'}>
                {/* Shows the date|s to be disabled as the title of the modal*/}
                <Modal.Header closeButton>
                    <Modal.Title className={'user-select-none'}>Διαχείριση τραπεζιού {gazebo.ascending_number}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={'fst-italic text-center overflow-y-auto mh-720px'}>
                    <SelectedDateContext.Provider value={{selectedDate,setSelectedDate}}>
                        <CalendarSettings allowClickOnDisabledDays={false} isInTableSettings Reservations={reservations}></CalendarSettings>
                    </SelectedDateContext.Provider>
                    {/*<ActiveReservations reservations={reservations} dateIsRange={dateIsRange}/>*/}
                </Modal.Body>
                <Modal.Footer>
                    {/* Modal button to close the modal. */}
                    <Button variant="outline-secondary" className={'p-2 my-2'} onClick={handleClose}>
                        Ακύρωση
                    </Button>
                    {/* Modal button to confirm and disable the selected date|s. */}
                    <Button variant={'outline-danger'} className={'p-2 my-2'}>
                            {/*disabled={current_date_availability === 'Disabled'}*/}
                            {/*onClick={handleSetDayUnavailable}*/}
                       Απενεργοποίηση Τραπεζιού
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
