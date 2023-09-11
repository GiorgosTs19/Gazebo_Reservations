import Calendar from "react-calendar";

export function MonthlyCalendarSkeleton({activeStartDate}) {
    return (
        <Calendar className={'m-auto rounded box_shadow'}
        tileContent={()=><h6 className={'m-0 user-select-none'}
        style={{color:'#42C618'}}>0</h6>} activeStartDate={activeStartDate}
        prev2Label={null} next2Label={null} showNeighboringMonth={false} minDetail={'month'}/>
    )
}
