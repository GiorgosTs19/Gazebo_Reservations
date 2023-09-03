import {useContext, useEffect} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {RoomMenuSelection} from "./RoomMenuSelection";
import {Button, Col, Row} from "react-bootstrap";
import {FormProgressContext} from "../../../Contexts/FormProgressContext";
import { forwardRef } from 'react';
import {LargeDevicesMenus} from "./LargeDevicesMenus";
import {MobileMenus} from "./MobileMenus";

export const MenuSelectionForm = forwardRef(function MenuSelectionForm({...props},ref) {
    const {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext),
    {progress, setProgress} = useContext(FormProgressContext),
    checkRequirement = () => {
        if(bookingDetails.type === 'Dinner')
            switch (bookingDetails.more_rooms) {
                case true : {
                    return bookingDetails.primary_menu.Main !== '' && bookingDetails.secondary_menu.Main !== '' &&
                        bookingDetails.primary_menu.Dessert !== '' && bookingDetails.secondary_menu.Dessert !== '';
                }
                case false : {
                    return bookingDetails.primary_menu.Main !== '' && bookingDetails.primary_menu.Dessert !== '';
                }
            }
        return bookingDetails.primary_menu.Main !== '';
    },
    handleFinalize = () => {
        setProgress('Finalize');
    };
    useEffect(()=>{
        if(checkRequirement()){
            ref.current.scrollTo({top: ref.current?.scrollHeight,behavior:'smooth'})
        }
    },[bookingDetails.primary_menu,bookingDetails.secondary_menu]);
    return (
        <div className={'px-4 overflow-y-auto mh-600px'} ref={ref}>
            {innerWidth > 1300 ? <LargeDevicesMenus bookingDetails={bookingDetails}></LargeDevicesMenus> :
            <MobileMenus bookingDetails={bookingDetails}></MobileMenus>}
            {checkRequirement() &&
                <Button variant={'outline-light'} onClick={handleFinalize} className={'rounded-3 box_shadow border-0 mb-3 reservation-button text-dark position-relative'}>Finalize Reservation</Button>
            }
        </div>
    )
});

