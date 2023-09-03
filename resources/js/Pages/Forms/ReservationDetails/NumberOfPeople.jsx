import {Button, Form, InputGroup} from "react-bootstrap";
import {useContext} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";


export function NumberOfPeople() {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
        handleNOPChange = (selectedOption)=>{
        // Handles the Number of People Select field change.
        // If the selection is not the currently selected it also resets the MoreRooms Boolean.
        let more_rooms = bookingDetails.more_rooms, attendees = bookingDetails.attendees;
        if(bookingDetails.number_of_people !== selectedOption) {
            more_rooms = false;
            attendees = []
        }
        setBookingDetails({...bookingDetails,number_of_people:parseInt(selectedOption.value),more_rooms:more_rooms,attendees:attendees});
    }
    const Options = bookingDetails.type === 'Dinner' ? [
        {value: 1,
            label: `1 guest`
        },{value: 2,
            label: `2 guests`
        },{value: 3,
            label: `3 guests`
        },{value: 4,
            label: `4 guests`
        }
    ] :
    [
        {value: 1,
            label: `1 guest`
        },{value: 2,
            label: `2 guests`
        }
    ];
    const handleDecrease = () => {
        if(bookingDetails.number_of_people === 0)
            return;
        return setBookingDetails(prev=> {
            return {...bookingDetails,number_of_people:prev.number_of_people -1};
        })
    }
    const handleIncrease = () => {
        switch (bookingDetails.type) {
            case 'Dinner' : {
                if(bookingDetails.number_of_people === 4)
                    return;
                return setBookingDetails(prev=> {
                    return {...bookingDetails,number_of_people:prev.number_of_people + 1};
                });
            }
            case 'Bed' : {
                if(bookingDetails.number_of_people === 2)
                    return;
                return setBookingDetails(prev=> {
                    return {...bookingDetails,number_of_people:prev.number_of_people + 1};
                });
            }
        }
    }
    return (
        <>
            {/*<Select size="sm" defaultValue={bookingDetails.number_of_people ?? "Please Select"}*/}
            {/*        className={'my-2 text-center '} isDisabled={bookingDetails.type === ''} isSearchable={false}*/}
            {/*             onChange={handleNOPChange} value={bookingDetails.number_of_people !== 0 ?*/}
            {/*    Options.find(obj => obj.value === parseInt(bookingDetails.number_of_people)) : 'Select'}*/}
            {/*        options={Options}*/}
            {/*        >*/}
            {/*</Select>*/}
            <InputGroup className="mb-3 mx-auto">
                <Button variant={'outline-dark'} className={'bg-transparent hover-scale-1_03'} onClick={handleDecrease}
                    disabled={bookingDetails.number_of_people === 0}>-</Button>
                <Form.Control
                    className={'bg-transparent text-center border-dark'}
                    value={bookingDetails.number_of_people}
                    readOnly
                />
                <Button variant={'outline-dark'} className={'bg-transparent hover-scale-1_03'} onClick={handleIncrease}
                disabled={bookingDetails.type === 'Dinner' ? (bookingDetails.number_of_people === 4) : (bookingDetails.number_of_people === 2)}>+</Button>
            </InputGroup>
        </>
    )
}
