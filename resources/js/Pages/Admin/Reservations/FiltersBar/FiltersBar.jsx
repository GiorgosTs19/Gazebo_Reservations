import {Badge, Stack} from "react-bootstrap";

export function FiltersBar({reservationsFilter,setReservationsFilter,direction='vertical',className='',disabled = false}) {
    const handleClick = (filter) => {
        if(!disabled)
            setReservationsFilter(filter);
    }
    return (
            <Stack direction={direction} className={'d-flex flex-wrap filters-bar-stack ' + className} >
                <Badge pill bg={"dark"}
                       className={'cursor-pointer user-select-none ' + (direction === 'vertical' ? 'my-2 ' : ' mx-auto mx-lg-2' )
                           + ((reservationsFilter === 'All' || disabled)? ' opacity-25' : '')}
                       onClick={()=>handleClick('All')} >
                    Όλες
                </Badge>
                <Badge pill bg={"success"} className={'cursor-pointer user-select-none ' + (direction === 'vertical' ? 'my-2 ' : 'mx-auto mx-lg-2' )
                    + ((reservationsFilter === 'Confirmed' || disabled)? ' opacity-25' : '')}
                       onClick={()=>handleClick('Confirmed')}>
                    Επιβεβαιωμένες
                </Badge>
                <Badge pill bg={"warning"} className={'cursor-pointer user-select-none ' + (direction === 'vertical' ? 'my-2 '
                        : 'mx-auto mx-lg-2 my-2 my-xxl-0' )
                    + ((reservationsFilter === 'Pending' || disabled)? ' opacity-25' : '')}
                      onClick={()=>handleClick('Pending')}>
                    Εκκρεμούσες
                </Badge>
                <Badge pill bg={"danger"} className={'cursor-pointer user-select-none ' + (direction === 'vertical' ? 'my-2 '
                        : 'mx-auto mx-lg-2 my-2 my-xxl-0' )
                    + ((reservationsFilter === 'Cancelled' || disabled)? ' opacity-25' : '')}
                       onClick={()=>handleClick('Cancelled')}>
                    Ακυρωμένες
                </Badge>
            </Stack>
    )
}
