import {useContext} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import Select from "react-select";


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
        setBookingDetails(prev=>{return {...prev,number_of_people:parseInt(selectedOption.value),more_rooms:more_rooms,attendees:attendees}});
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

    return (
        <>
            <Select size="sm" defaultValue={bookingDetails.number_of_people ?? "Please Select"}
                    className={'my-2 text-center '} isDisabled={bookingDetails.type === ''} isSearchable={false}
                         onChange={handleNOPChange} value={bookingDetails.number_of_people !== 0 ?
                Options.find(obj => obj.value === parseInt(bookingDetails.number_of_people)) : 'Select'}
                    options={Options}
                    >
            </Select>
        </>
    )
}
