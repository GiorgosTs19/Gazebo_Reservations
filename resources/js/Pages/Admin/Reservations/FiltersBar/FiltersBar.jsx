import {Badge, Stack} from "react-bootstrap";

export function FiltersBar({reservationsFilter,setReservationsFilter,direction='vertical',className=''}) {
    return (
            <Stack direction={direction} className={'d-flex flex-wrap ' + className} >
                <Badge pill bg={"dark"}
                       className={'cursor-pointer user-select-none ' + (direction === 'vertical' ? 'my-2 ' : 'mx-2' )
                           + (reservationsFilter === 'All' ? 'opacity-50' : '')}
                       onClick={()=>setReservationsFilter('All')}>
                    Όλες
                </Badge>
                <Badge pill bg={"success"} className={'cursor-pointer user-select-none ' + (direction === 'vertical' ? 'my-2 ' : 'mx-2' )
                    + (reservationsFilter === 'Confirmed' ? 'opacity-50' : '')}
                       onClick={()=>setReservationsFilter('Confirmed')}>
                    Επιβεβαιωμένες
                </Badge>
                <Badge pill bg={"warning"} className={'cursor-pointer user-select-none ' + (direction === 'vertical' ? 'my-2 '
                        : 'mx-2 my-2 my-xxl-0' )
                    + (reservationsFilter === 'Pending' ? 'opacity-50' : '')}
                      onClick={()=>setReservationsFilter('Pending')}>
                    Εκκρεμούν
                </Badge>
                <Badge pill bg={"danger"} className={'cursor-pointer user-select-none ' + (direction === 'vertical' ? 'my-2 '
                        : 'mx-2 my-2 my-xxl-0' )
                    + (reservationsFilter === 'Cancelled' ? 'opacity-50' : '')}
                       onClick={()=>setReservationsFilter('Cancelled')}>
                    Ακυρωμένες
                </Badge>
            </Stack>
    )
}
