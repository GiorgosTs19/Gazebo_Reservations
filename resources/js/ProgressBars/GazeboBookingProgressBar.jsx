import {Breadcrumb, Button} from "react-bootstrap";
import React from "react";
import {useContext} from "react";
import {FormProgressContext} from "../Contexts/FormProgressContext";
import {BookingDetailsContext} from "../Contexts/BookingDetailsContext";

export function GazeboBookingProgressBar() {
    const {progress,setProgress} = useContext(FormProgressContext),
        {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext),
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
        <div className={'my-2 my-md-1 mx-auto bg-transparent d-flex flex-column text-center'}>
            <span className={'info-text'}>Navigation</span>
            <Breadcrumb className={'m-auto'}>
                    <Breadcrumb.Item onClick={()=>setProgress('Type')} active={progress === 'Type'} className={'navigation-item bold-info-text text-nowrap'}>
                        {bookingDetails.type === '' ? 'Type Selection' : (bookingDetails.number_of_people === 0 ? 'Guest Count Selection' : (progress === 'Type' ? 'Date Selection' : 'Date'))}
                    </Breadcrumb.Item>
                {checkRequirements('Table') &&
                    <Breadcrumb.Item onClick={()=>setProgress('Table')} active={progress === 'Table'} className={'navigation-item bold-info-text text-nowrap'}>
                        {progress === 'Table' ? 'Gazebo Selection' : 'Gazebo'}
                    </Breadcrumb.Item>}
                {checkRequirements('Details') &&
                    <Breadcrumb.Item onClick={()=>setProgress('Details')} active={progress === 'Details'} className={'navigation-item bold-info-text text-nowrap'}>
                        {progress === 'Details' ? 'Reservation Details' : 'Details'}
                    </Breadcrumb.Item>}
                {checkRequirements('Menu') &&
                    <Breadcrumb.Item onClick={()=>setProgress('Menu')} active={progress === 'Menu'} className={'navigation-item bold-info-text text-nowrap'}>
                        {progress === 'Menu' ? 'Menu Selection' : (bookingDetails.more_rooms ? 'Menus' : 'Menu')}
                    </Breadcrumb.Item>}
                {checkRequirements('Finalize') &&
                    <Breadcrumb.Item onClick={()=>setProgress('Finalize')} active={progress === 'Finalize'} className={'navigation-item bold-info-text text-nowrap'}>
                        Finalize
                    </Breadcrumb.Item>}
            </Breadcrumb>
        </div>
    )
}
