import {useContext, useEffect} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {RoomMenuSelection} from "./RoomMenuSelection";
import {Button, Col, Row} from "react-bootstrap";
import {FormProgressContext} from "../../../Contexts/FormProgressContext";
import { forwardRef } from 'react';
import {LargeDevicesMenus} from "./LargeDevicesMenus";
import {MobileMenus} from "./MobileMenus/MobileMenus";

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

    useEffect(()=>{
        const handleProceed = (ev) => {
            if(ev.key === 'Enter' && checkRequirement()) {
                handleFinalize();
            }
        }
        window.addEventListener('keypress',handleProceed);
        return () => {
            window.removeEventListener('keypress', handleProceed);
        };
    },[]);

    return (
        <div className={'px-1 overflow-y-auto overflow-x-hidden mh-660px '} ref={ref}>
            {innerWidth > 1300 ? <LargeDevicesMenus bookingDetails={bookingDetails}></LargeDevicesMenus> :
            <MobileMenus bookingDetails={bookingDetails}></MobileMenus>}
            {checkRequirement() &&
                <Button variant={'outline-light'} onClick={handleFinalize}
                className={'rounded-3 border-0 mb-3 reservation-button text-dark position-relative'}>
                    Preview
                </Button>
            }
        </div>
    )
});

