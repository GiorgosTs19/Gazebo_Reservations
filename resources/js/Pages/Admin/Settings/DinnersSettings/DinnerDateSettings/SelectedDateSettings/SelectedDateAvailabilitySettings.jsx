import {SetDayUnavailableModal} from "../../../../Modals/SetDayUnavailableModal/SetDayUnavailableModal";
import {Button} from "react-bootstrap";
import {getFormattedDate} from "../../../../../../ExternalJs/Util";
import {Inertia} from "@inertiajs/inertia";

export function SelectedDateAvailabilitySettings({isDateDisabled,selectedDate}) {
    const dateIsRange = Array.isArray(selectedDate);
    const handleSetDayAvailable = () => {
        const date_to_enable = !dateIsRange && getFormattedDate(selectedDate,'-',1);
        Inertia.delete(route('Enable_Day'),{headers: { 'X-Date': date_to_enable},preserveScroll:true,preserveState:true,
            only:['Dinner_Reservations']});
    };
    return (
        <div className={'my-auto'}>
            <h5 className={'mb-2 mb-xl-3'}>Διαθεσιμότητα {!dateIsRange ? 'Ημέρας' : 'Ημερών'}</h5>
            {!isDateDisabled &&
                <SetDayUnavailableModal current_date_availability={isDateDisabled} selectedDate={selectedDate}>
                </SetDayUnavailableModal>}
            {isDateDisabled  && !dateIsRange &&  <h6 className={'text-danger'}>Η επιλεγμένη μέρα έχει τεθεί μη διαθέσιμη.</h6>}
            {isDateDisabled &&
                <Button variant={'outline-success'} className={'p-2 my-2'}
                        disabled={!isDateDisabled}
                        onClick={handleSetDayAvailable}>
                    Ορισμός ως Διαθέσιμη
                </Button>}
        </div>
    )
}
