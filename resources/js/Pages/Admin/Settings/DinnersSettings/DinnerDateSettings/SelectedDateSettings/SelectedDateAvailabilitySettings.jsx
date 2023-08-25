import {SetDayUnavailableModal} from "../../../../Modals/SetDayUnavailableModal/SetDayUnavailableModal";
import {Button} from "react-bootstrap";
import {getFormattedDate} from "../../../../../../ExternalJs/Util";
import {Inertia} from "@inertiajs/inertia";
import {useContext} from "react";
import {ActiveReservationTypeContext} from "../../../../Contexts/ActiveReservationTypeContext";

export function SelectedDateAvailabilitySettings({isDateDisabled,selectedDate}) {
    const dateIsRange = Array.isArray(selectedDate);
    const {reservationType,setReservationType} = useContext(ActiveReservationTypeContext);
    const handleSetDayAvailable = () => {
        const date_to_enable = !dateIsRange && getFormattedDate(selectedDate,'-',1);
        Inertia.delete(route('Enable_Day'),{headers: {'X-Date': date_to_enable,'X-Type':reservationType},preserveScroll:true,preserveState:true,
            only:['Dinner_Reservations','Conflicts']});
    };
    return (
        <div className={'my-auto'}>
            {!isDateDisabled &&
                <SetDayUnavailableModal current_date_availability={isDateDisabled} selectedDate={selectedDate}>
                </SetDayUnavailableModal>}
            {isDateDisabled &&
                <Button variant={'outline-success'} className={'p-2 my-2'}
                        disabled={!isDateDisabled}
                        onClick={handleSetDayAvailable}>
                    Ορισμός ως Διαθέσιμη
                </Button>}
        </div>
    )
}
