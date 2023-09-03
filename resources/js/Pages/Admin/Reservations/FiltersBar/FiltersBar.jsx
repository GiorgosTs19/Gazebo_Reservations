import {Badge, Stack} from "react-bootstrap";

export function FiltersBar({reservationsFilter,setReservationsFilter,direction='vertical',className='',disabled = false}) {
    const handleClick = (filter) => {
        if(!disabled)
            setReservationsFilter(filter);
    }
    return (
            <Stack direction={direction} className={'d-flex flex-wrap filters-bar-stack ' + className} gap={innerWidth < 500 ? 2 : 3}>
                <Badge pill bg={"dark"}
                       className={'cursor-pointer user-select-none hover-scale-0_95 '
                           + ((reservationsFilter === 'All' || disabled)? ' opacity-25' : '')}
                       onClick={()=>handleClick('All')} >
                    Όλες
                </Badge>
                <Badge pill bg={"success"} className={'cursor-pointer user-select-none hover-scale-0_95 '
                    + ((reservationsFilter === 'Confirmed' || disabled)? ' opacity-25' : '')}
                       onClick={()=>handleClick('Confirmed')}>
                    Επιβεβαιωμένες
                </Badge>
                <Badge pill bg={"warning"} className={'cursor-pointer user-select-none hover-scale-0_95 '
                    + ((reservationsFilter === 'Pending' || disabled)? ' opacity-25' : '')}
                      onClick={()=>handleClick('Pending')}>
                    Εκκρεμούσες
                </Badge>
                <Badge pill bg={"danger"} className={'cursor-pointer user-select-none hover-scale-0_95 '
                    + ((reservationsFilter === 'Cancelled' || disabled)? ' opacity-25' : '')}
                       onClick={()=>handleClick('Cancelled')}>
                    Ακυρωμένες
                </Badge>
            </Stack>
    )
}
