import {useContext} from "react";
import {ConflictsContext} from "../Pages/Admin/Contexts/ConflictsContext";

export default function useCheckConflict(reservationId) {
    const conflicts = useContext(ConflictsContext);
    const [Disabled_Dates_Reservations, Disabled_Table_Reservations] = conflicts;
        const dateConflictFound = Disabled_Dates_Reservations.find(item=>item.id === reservationId);
        if(dateConflictFound)
            return [true,'Date','Η κράτηση απαιτεί αλλαγή ημερομηνίας'];

        const tableConflictFound = Disabled_Table_Reservations.find(item=>item.id === reservationId);
        if(tableConflictFound)
            return [true, 'Table','Η κράτηση απαιτεί αλλαγή Gazebo'];

        return [false,'',''];
}
