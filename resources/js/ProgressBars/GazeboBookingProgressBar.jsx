import {Breadcrumb, Button} from "react-bootstrap";
import React from "react";
import {useContext} from "react";
import {FormProgressContext} from "../Contexts/FormProgressContext";
import {BookingDetailsContext} from "../Contexts/BookingDetailsContext";

export function GazeboBookingProgressBar() {
    const {progress,setProgress} = useContext(FormProgressContext),
        {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext),
        handleChangeReservationTypeClick = () => {
            setProgress('Type');
            setBookingDetails({
                date:'',
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
            case 'Type':
                switch (progress) {
                    case 'Type' :
                        return false;
                    default :
                        return false;
                }
            case 'Table':
                switch (progress) {
                    case 'Type' :
                        return false;
                    default :
                        return true;
                }
            case 'Details':
                switch (progress) {
                    case 'Type' :
                    case 'Table' :
                        return false;
                    default :
                        return true;
                }
            case 'Menu':
                switch (progress) {
                    case 'Type' :
                    case 'Table' :
                    case 'Details' :
                        return false;
                    default :
                        return true;
                }
            case 'Finalize':
                switch (progress) {
                    case 'Type' :
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
        <div className={'mt-3 mx-auto border-bottom bg-transparent'}>
            {/*<p className={Theme}>Navigation</p>*/}
            {progress === 'Date' &&
                <Button size={'sm'} variant={'outline-dark'} className={'my-1 rounded-5 shadow-sm reservation-button'}
                    onClick={handleChangeReservationTypeClick}>
                    Change Reservation Type
                </Button>
            }
            <Breadcrumb>

                {/*{checkRequirements('Type') &&*/}
                    <Breadcrumb.Item onClick={()=>setProgress('Type')} active={progress === 'Type'} className={'navigation-item'}>
                        Date
                    </Breadcrumb.Item>
                {checkRequirements('Table') &&
                    <Breadcrumb.Item onClick={()=>setProgress('Table')} active={progress === 'Table'} className={'navigation-item'}>
                        Table
                    </Breadcrumb.Item>}
                {checkRequirements('Details') &&
                    <Breadcrumb.Item onClick={()=>setProgress('Details')} active={progress === 'Details'} className={'navigation-item'}>
                        Details
                    </Breadcrumb.Item>}
                {checkRequirements('Menu') &&
                    <Breadcrumb.Item onClick={()=>setProgress('Menu')} active={progress === 'Menu'} className={'navigation-item'}>
                        {bookingDetails.more_rooms ? 'Menus' : 'Menu'}
                    </Breadcrumb.Item>}
                {checkRequirements('Finalize') &&
                    <Breadcrumb.Item onClick={()=>setProgress('Finalize')} active={progress === 'Finalize'} className={'navigation-item '}>
                        Finalize
                    </Breadcrumb.Item>}
            </Breadcrumb>
        </div>
    )
}
