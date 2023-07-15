import {useEffect, useState} from "react";
import Select from "react-select";
import {Stack} from "react-bootstrap";
import {value} from "lodash/seq";

export function TimePicker({onChange, inputValue,className,textPrefix}) {
    const hourOptions = Array.from(Array(24).keys()).map((hour) => ({
        value: hour < 10 ? `0${hour}` : `${hour}`,
        label: hour < 10 ? `0${hour}` : `${hour}`,
    }));

    const minuteOptions = Array.from(Array(60).keys()).filter((minute) => minute % 5 === 0).map((minute) => ({
        value: minute < 10 ? `0${minute}` : `${minute}`,
        label: minute < 10 ? `0${minute}` : `${minute}`,
    }));

    const [hours, setHours] = useState(hourOptions.find(obj => obj.value === inputValue.split(':')[0]));
    const [minutes, setMinutes] = useState(minuteOptions.find(obj => obj.value === inputValue.split(":")[1]));

    const handleHoursChange = (selectedOption) => {
        setHours(selectedOption);
    };
    const handleMinutesChange = (selectedOption) => {
        setMinutes(selectedOption);
    };
    useEffect(()=>{
        if(hours !== undefined && minutes !== undefined)
            onChange(hours.value + ':' + minutes.value);
    },[hours,minutes]);

    return (
        <div className={'d-flex flex-row'}>
            <Stack className={'' + className}>
                {<span
                    className={'text-muted fst-italic mb-2 p-0'}>{(textPrefix ?? '') + ' ' + ((hours?.value ?? '') + ':' + (minutes?.value ?? ''))}</span>}
                <Stack direction={'horizontal'} className={'mx-auto'}>
                    <Select
                        id="hours"
                        value={hourOptions.find(obj => obj.value === inputValue.split(':')[0])}
                        options={hourOptions}
                        onChange={handleHoursChange}
                        className={'mx-1'}
                    />
                    <Select
                        id="minutes"
                        value={minuteOptions.find(obj => obj.value === inputValue.split(':')[1])}
                        options={minuteOptions}
                        onChange={handleMinutesChange}
                        className={'mx-1'}
                    />
                </Stack>
            </Stack>
        </div>
    );
}
