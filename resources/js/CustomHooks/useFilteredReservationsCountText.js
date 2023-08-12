export default function useFilteredReservationsCountText(filter,count) {
    const isPlural = count > 1;
    switch (filter) {
        case 'All' : {
            return isPlural ? 'Κρατήσεις' : (count === 1 ? 'Κράτηση' : 'Δεν υπάρχει κάποια κράτηση.');
        }
        case 'Confirmed' : {
            return isPlural ? 'Επιβεβαιωμένες κρατήσεις' : (count === 1 ? 'Επιβεβαιωμένη κράτηση' : 'Δεν υπάρχουν επιβεβαιωμένες κρατήσεις.');
        }
        case 'Pending' : {
            return isPlural ? 'Κρατήσεις που εκκρεμούν' : (count === 1 ? 'Κράτηση που εκκρεμεί' : 'Δεν υπάρχουν κρατήσεις που εκκρεμούν.');
        }
        case 'Cancelled' : {
            return isPlural ? 'Ακυρωμένες κρατήσεις' : (count === 1 ? 'Ακυρωμένη κράτηση' : 'Δεν υπάρχουν ακυρωμένες κρατήσεις.');
        }
    }
}
