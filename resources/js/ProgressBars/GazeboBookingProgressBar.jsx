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
        <div className={'mt-3 mx-auto bg-transparent d-flex'}>
            <Breadcrumb className={'mx-auto'}>
                    <Breadcrumb.Item onClick={()=>setProgress('Type')} active={progress === 'Type'} className={'navigation-item info-text'}>
                        {progress === 'Type' ? 'Date Selection' : 'Date'}
                    </Breadcrumb.Item>
                {checkRequirements('Table') &&
                    <Breadcrumb.Item onClick={()=>setProgress('Table')} active={progress === 'Table'} className={'navigation-item info-text'}>
                        {progress === 'Table' ? 'Gazebo Selection' : 'Gazebo'}
                    </Breadcrumb.Item>}
                {checkRequirements('Details') &&
                    <Breadcrumb.Item onClick={()=>setProgress('Details')} active={progress === 'Details'} className={'navigation-item info-text'}>
                        {progress === 'Details' ? 'Reservation Details' : 'Details'}
                    </Breadcrumb.Item>}
                {checkRequirements('Menu') &&
                    <Breadcrumb.Item onClick={()=>setProgress('Menu')} active={progress === 'Menu'} className={'navigation-item info-text'}>
                        {progress === 'Menu' ? 'Menu Selection' : (bookingDetails.more_rooms ? 'Menus' : 'Menu')}
                    </Breadcrumb.Item>}
                {checkRequirements('Finalize') &&
                    <Breadcrumb.Item onClick={()=>setProgress('Finalize')} active={progress === 'Finalize'} className={'navigation-item info-text'}>
                        Finalize
                    </Breadcrumb.Item>}
            </Breadcrumb>
        </div>
    )
}
