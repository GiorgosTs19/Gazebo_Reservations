export default function useGetReservationStatusText(status) {
    switch (status) {
        case 'Cancelled' : {
            return 'Ακυρωμένη';
        }
        case 'Confirmed' : {
            return 'Επιβεβαιωμένη';
        }
        default : {
            return 'Εκκρεμούσα';
        }
    }
};
