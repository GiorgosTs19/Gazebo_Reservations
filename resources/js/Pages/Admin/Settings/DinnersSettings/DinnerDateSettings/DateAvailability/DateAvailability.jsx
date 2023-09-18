import {useContext} from "react";
import {SelectedDateContext} from "../../../../Contexts/SelectedDateContext";
import {isDateDisabledByAdmin} from "../../../../../../ExternalJs/Util";
import {DateAvailabilitySettings} from "./DateAvailabilitySettings";
import {DisabledDaysContext} from "../../../../Contexts/DisabledDaysContext";

export function DateAvailability() {
    const {selectedDate, setSelectedDate}= useContext(SelectedDateContext),
    dateIsRange = Array.isArray(selectedDate),
    Disabled_Days = useContext(DisabledDaysContext);
    const [isDateDisabled,existingReservationsAllowed] = !dateIsRange ?  isDateDisabledByAdmin(selectedDate,Disabled_Days) : [false,true];

    return (
        <div className={'text-center mx-auto mt-2'}>
            <DateAvailabilitySettings
            isDateDisabled={isDateDisabled} selectedDate={selectedDate}></DateAvailabilitySettings>
        </div>
    )
}
