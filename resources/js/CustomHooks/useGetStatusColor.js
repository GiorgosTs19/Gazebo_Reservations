export default function useGetStatusColor(status) {
    switch (status) {
        case 'Cancelled' : {
            return 'danger';
        }
        case 'Confirmed' : {
            return 'success';
        }
        default : {
            return 'warning'
        }
    }
}
