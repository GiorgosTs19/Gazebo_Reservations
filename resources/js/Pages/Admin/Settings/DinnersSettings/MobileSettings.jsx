import {Carousel} from "react-bootstrap";
import {DinnerDateSettings} from "./DinnerDateSettings/DinnerDateSettings";
import {DinnerTableSettings} from "./DinnerTableSettings/DinnerTableSettings";
import {useState} from "react";

export function MobileSettings({children}) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    console.log(children)
    return (
        <Carousel variant={'dark'} className={'px-2 text-center h-100'} slide={false} activeIndex={index}
                  onSelect={handleSelect} interval={null}>
            <Carousel.Item className={'h-85'}>
                {children[2]}
                {children[0]}
            </Carousel.Item>
            <Carousel.Item className={'h-85'}>
                {children[2]}
                {children[1]}
            </Carousel.Item>
            <Carousel.Item className={'h-85'}>
                <DinnerDateSettings></DinnerDateSettings>
            </Carousel.Item>
            <Carousel.Item className={'h-85'}>
                <DinnerTableSettings></DinnerTableSettings>
            </Carousel.Item>
        </Carousel>
    )
}
