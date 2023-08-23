export function TodayViewSVG({className,width=52,height=52,onClick = ()=>{}, disabled, rotation= '0deg'}) {
    return (
        <img
            width={width}
            height={height}
            className={(disabled ? 'opacity-25 ' : ' ') + className}
            onClick={onClick}
            style={{rotate:rotation}}
            src={'Images/ViewIcons/TodaysView.png'}
            alt={'Σήμερα'}
        />
    )
}
