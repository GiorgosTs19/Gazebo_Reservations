import {Carousel} from "react-bootstrap";
import {DinnerDateSettings} from "./DinnerDateSettings/DinnerDateSettings";
import {DinnerTableSettings} from "./DinnerTableSettings/DinnerTableSettings";
import {useState} from "react";
import {ArrivalSettings} from "./DinnerTimeSettings/ArrivalSettings";
import {ArrivalMessageSettings} from "./DinnerTimeSettings/ArrivalMessageSettings";

export function MobileSettings({children}) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel variant={'dark'} className={'px-2 text-center h-100 admin-carousel'} slide={false} activeIndex={index}
                  onSelect={handleSelect} interval={null}>
            <Carousel.Item className={'h-85'}>
                {children[2]}
                <ArrivalSettings/>
            </Carousel.Item>
            <Carousel.Item className={'h-85'}>
                {children[2]}
                <ArrivalMessageSettings/>
            </Carousel.Item>
            <Carousel.Item className={'overflow-x-hidden h-85 overflow-y-auto'}>
                {children[2]}
                {children[1]}
            </Carousel.Item>
            <Carousel.Item className={'h-90 overflow-y-auto'}>
                <DinnerDateSettings></DinnerDateSettings>
            </Carousel.Item>
            <Carousel.Item className={'h-85 overflow-y-auto'}>
                <DinnerTableSettings></DinnerTableSettings>
            </Carousel.Item>
        </Carousel>
    )
}
