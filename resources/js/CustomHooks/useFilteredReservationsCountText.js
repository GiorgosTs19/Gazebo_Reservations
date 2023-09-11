export default function useFilteredReservationsCountText(filter, count, showZero = false) {
    const isPlural = count > 1;
    switch (filter) {
        case 'All' : {
            return isPlural ? 'Κρατήσεις' : (count === 1 ? 'Κράτηση' :
                (showZero ? 'Κρατήσεις ' : 'Δεν υπάρχει κάποια κράτηση'));
        }
        case 'Confirmed' : {
            return isPlural ? 'Επιβεβαιωμένες κρατήσεις' : (count === 1 ? 'Επιβεβαιωμένη κράτηση' :
                (showZero ? 'Επιβεβαιωμένες κρατήσεις' : 'Δεν υπάρχουν επιβεβαιωμένες κρατήσεις'));
        }
        case 'Pending' : {
            return isPlural ? 'Εκκρεμείς κρατήσεις' : (count === 1 ? 'Εκκρεμής κράτηση' :
                (showZero ? 'Εκκρεμείς κρατήσεις' : 'Δεν υπάρχουν εκκρεμείς κρατήσεις'));
        }
        case 'Cancelled' : {
            return isPlural ? 'Ακυρωμένες κρατήσεις' : (count === 1 ? 'Ακυρωμένη κράτηση' :
                (showZero ? 'Ακυρωμένες κρατήσεις' : 'Δεν υπάρχουν ακυρωμένες κρατήσεις'));
        }
    }
}
