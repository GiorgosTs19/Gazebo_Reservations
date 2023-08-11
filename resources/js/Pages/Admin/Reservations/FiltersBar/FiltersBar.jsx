import {Badge, Stack} from "react-bootstrap";

export function FiltersBar({reservationsFilter,setReservationsFilter,direction='vertical',className=''}) {
    return (
        <Stack direction={direction} className={className}>
            <Badge pill bg={"dark"} style={{userSelect:'none',cursor:'pointer'}}
                   className={(direction === 'vertical' ? 'my-2 ' : 'mx-2 ' )
                       + (reservationsFilter === 'All' ? 'opacity-50' : '')}
                   onClick={()=>setReservationsFilter('All')}>
                Όλες
            </Badge>
            <Badge pill bg={"success"} className={(direction === 'vertical' ? 'my-2 ' : 'mx-2 ' )
                + (reservationsFilter === 'Confirmed' ? 'opacity-50' : '')}
                   style={{userSelect:'none',cursor:'pointer'}} onClick={()=>setReservationsFilter('Confirmed')}>
                Επιβεβαιωμένες
            </Badge>
            <Badge pill bg={"warning"} className={(direction === 'vertical' ? 'my-2 ' : 'mx-2 ' )
                + (reservationsFilter === 'Pending' ? 'opacity-50' : '')}
                   style={{userSelect:'none',cursor:'pointer'}} onClick={()=>setReservationsFilter('Pending')}>
                Εκκρεμούν
            </Badge>
            <Badge pill bg={"danger"} className={(direction === 'vertical' ? 'my-2 ' : 'mx-2 ' )
                + (reservationsFilter === 'Cancelled' ? 'opacity-50' : '')}
                   style={{userSelect:'none',cursor:'pointer'}} onClick={()=>setReservationsFilter('Cancelled')}>
                Ακυρωμένες
            </Badge>
        </Stack>
    )
}
