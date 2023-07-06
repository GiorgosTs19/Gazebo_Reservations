import {useEffect, useState} from "react";
import Select from "react-select";
import {Stack} from "react-bootstrap";

export function TimePicker({onChange,inputValue}) {
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const valueHours = inputValue.split(':')[0],valueMinutes = inputValue.split(':')[1];
    const handleHoursChange = (selectedOption) => {
        setHours(selectedOption.value);
    };

    const handleMinutesChange = (selectedOption) => {
        setMinutes(selectedOption.value);
    };

    const hourOptions = Array.from(Array(24).keys()).map((hour) => ({
        value: hour < 10 ? `0${hour}` : `${hour}`,
        label: hour < 10 ? `0${hour}` : `${hour}`,
    }));

    const minuteOptions = Array.from(Array(60).keys()).filter((minute) => minute % 5 === 0).map((minute) => ({
        value: minute < 10 ? `0${minute}` : `${minute}`,
        label: minute < 10 ? `0${minute}` : `${minute}`,
    }));

    useEffect(()=>{
        onChange(hours + ':' + minutes);
    },[hours,minutes]);
    // console.log(hours + ' ' + minutes)
    return (
        <div className={'d-flex flex-row'}>
            <Stack direction={'horizontal'} className={'mx-auto'}>
                <Select
                    id="hours"
                    value={inputValue ? { value: valueHours, label: valueHours } : { value: hours, label: hours }}
                    options={hourOptions}
                    onChange={handleHoursChange}
                    className={'mx-1'}
                />
                <Select
                    id="minutes"
                    value={ inputValue ? { value: valueMinutes, label: valueMinutes } : { value: minutes, label: minutes }}
                    options={minuteOptions}
                    onChange={handleMinutesChange}
                    className={'mx-1'}
                />
            </Stack>
        </div>
    );
}
