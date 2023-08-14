export function WeeklyViewSVG({className,width=50,height=50,onClick = ()=>{}, disabled, rotation = '0deg'}) {
    return (
        <img
            width={width}
            height={height}
            className={(disabled ? 'opacity-25 ' : ' ') + className}
            onClick={onClick}
            style={{rotate:rotation}}
            src={'Images/ViewIcons/WeeklyView.png'}
            alt={'Ανά Εβδομάδα'}
        />
    )
}
