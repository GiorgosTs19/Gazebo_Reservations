import {useState} from "react";
import {useContext} from "react";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {LargeDevicesWeeklyView} from "./LargeDevicesWeeklyView";
import {MobileWeeklyView} from "./MobileWeeklyView";

export function WeeklyReservationsView() {
    const [currentDate, setCurrentDate] = useState(new Date()),
    [direction,setDirection] = useState('vertical'),
    innerWidth = useContext(InnerWidthContext);

    const goToPreviousWeek = () => {
        const previousWeek = new Date(currentDate.getTime());
        previousWeek.setDate(currentDate.getDate() - 7);
        setCurrentDate(previousWeek);
    };

    const goToNextWeek = () => {
        const nextWeek = new Date(currentDate.getTime());
        nextWeek.setDate(currentDate.getDate() + 7);
        setCurrentDate(nextWeek);
    };

    const getBorder = (index) => {
        switch (index) {
            case 0 : {
                if(direction === 'horizontal')
                    return ' border-end-0';
                return 'border-bottom';
            }
            case 6 : {
                if(direction === 'horizontal')
                    return ' border-end';
                return 'border-top'
            }
            default : {
                if(direction === 'horizontal')
                    return ' border-end-0';
                return 'border-bottom border-top';
            }
        }
    }



    return (
        <>
            {innerWidth > 1200
                ?
                <LargeDevicesWeeklyView getBorder={getBorder} currentDate={currentDate}
                    direction={direction} goToNextWeek={goToNextWeek}
                    goToPreviousWeek={goToPreviousWeek}>
                </LargeDevicesWeeklyView>
                :
                <MobileWeeklyView getBorder={getBorder} currentDate={currentDate}
                    direction={direction} goToNextWeek={goToNextWeek}
                    goToPreviousWeek={goToPreviousWeek}>
                </MobileWeeklyView>
            }
        </>
    );
}
// className={direction === 'vertical' ? 'pe-3 border-end' : ''}
