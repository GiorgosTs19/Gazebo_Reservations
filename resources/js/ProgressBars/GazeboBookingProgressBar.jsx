import {Breadcrumb, Button, ProgressBar} from "react-bootstrap";
import React from "react";
import {useContext} from "react";
import {FormProgressContext} from "../Contexts/FormProgressContext";
import {BookingDetailsContext} from "../Contexts/BookingDetailsContext";

export function GazeboBookingProgressBar() {
    const {progress,setProgress} = useContext(FormProgressContext),
        {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext),
        handleChangeReservationTypeClick = () =>{
            setBookingDetails({
                date:null,
                table:'',
                number_of_people:0,
                more_rooms:false,
                first_name:'',
                last_name:'',
                email:'',
                phone_number:'',
                primary_room:'',
                secondary_room:'',
                attendees:[],
                primary_menu:'',
                secondary_menu:'',
                notes:'',
                type:'',
            })
        },
        /**
         *
         * @param label
         * @returns {boolean}
         */
        checkRequirements = (label) => {
        switch (label) {
            case 'Date':
                switch (progress) {
                    case 'Date' :
                        return false;
                    default :
                        return true;
                }
            case 'Table':
                switch (progress) {
                    case 'Date' :
                        return false;
                    default :
                        return true;
                }
            case 'Details':
                switch (progress) {
                    case 'Date' :
                    case 'Table' :
                        return false;
                    default :
                        return true;
                }
            case 'Menu':
                switch (progress) {
                    case 'Date' :
                    case 'Table' :
                    case 'Details' :
                        return false;
                    default :
                        return true;
                }
            case 'Finalize':
                switch (progress) {
                    case 'Date' :
                    case 'Table' :
                    case 'Details' :
                    case 'Menu' :
                        return false;
                    default :
                        return true;
                }
        }
    };
    return (
        <div className={'m-auto border-bottom'}>
            <p>Navigation</p>
            {progress === 'Date' &&
                <Button size={'sm'} variant={'outline-danger'} className={'my-1 rounded-5 shadow-sm'}
                    onClick={handleChangeReservationTypeClick}>
                    Change Reservation Type
                </Button>
            }
            <Breadcrumb>
                {checkRequirements('Date') &&
                    <Breadcrumb.Item onClick={()=>setProgress('Date')} active={progress === 'Date'}>
                        Date
                    </Breadcrumb.Item>}
                {checkRequirements('Table') &&
                    <Breadcrumb.Item onClick={()=>setProgress('Table')} active={progress === 'Table'}>
                        Table
                    </Breadcrumb.Item>}
                {checkRequirements('Details') &&
                    <Breadcrumb.Item onClick={()=>setProgress('Details')} active={progress === 'Details'}>
                        Details
                    </Breadcrumb.Item>}
                {checkRequirements('Menu') &&
                    <Breadcrumb.Item onClick={()=>setProgress('Menu')} active={progress === 'Menu'}>
                        {bookingDetails.more_rooms ? 'Menus' : 'Menu'}
                    </Breadcrumb.Item>}
                {checkRequirements('Finalize') &&
                    <Breadcrumb.Item onClick={()=>setProgress('Finalize')} active={progress === 'Finalize'}>
                        Finalize
                    </Breadcrumb.Item>}
            </Breadcrumb>
        </div>
    )
}
