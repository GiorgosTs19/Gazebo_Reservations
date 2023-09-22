import {Badge, Stack} from "react-bootstrap";

export function FiltersBar({reservationsFilter,setReservationsFilter,direction='vertical',className='',disabled = false}) {
    const handleClick = (filter) => {
        if(!disabled)
            setReservationsFilter(filter);
    }
    return (
            <Stack direction={direction} className={'d-flex flex-wrap filters-bar-stack  border-secondary-subtle border rounded-4 p-2 mw-300px ' + className} gap={innerWidth < 500 ? 2 : 3}>
                <Badge pill bg={"dark"}
                       className={'cursor-pointer user-select-none hover-scale-0_95 flex-fill '
                           + ((reservationsFilter === 'All' || disabled)? ' opacity-25' : '')}
                       onClick={()=>handleClick('All')} >
                    Όλες
                </Badge>
                <Badge pill bg={"warning"} className={'cursor-pointer user-select-none hover-scale-0_95 flex-fill  '
                    + ((reservationsFilter === 'Pending' || disabled)? ' opacity-25' : '')}
                       onClick={()=>handleClick('Pending')}>
                    Εκκρεμείς
                </Badge>
                <Badge pill bg={"success"} className={'cursor-pointer user-select-none hover-scale-0_95 flex-fill  '
                    + ((reservationsFilter === 'Confirmed' || disabled)? ' opacity-25' : '')}
                       onClick={()=>handleClick('Confirmed')}>
                    Επιβεβαιωμένες
                </Badge>
                {/*<Badge pill bg={"danger"} className={'cursor-pointer user-select-none hover-scale-0_95 '*/}
                {/*    + ((reservationsFilter === 'Cancelled' || disabled)? ' opacity-25' : '')}*/}
                {/*       onClick={()=>handleClick('Cancelled')}>*/}
                {/*    Ακυρωμένες*/}
                {/*</Badge>*/}
            </Stack>
    )
}
