import {useContext, useEffect} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {RoomMenuSelection} from "./RoomMenuSelection";
import {Button, Col, Row} from "react-bootstrap";
import {FormProgressContext} from "../../../Contexts/FormProgressContext";
import { forwardRef } from 'react';

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
        <div className={'px-4 overflow-y-auto'} style={{maxHeight:'650px'}} ref={ref}>
            {/*<Button variant={'outline-dark'} className={'my-2 rounded-4 shadow-sm'} onClick={handleBackToDetails}>Back to Details</Button>*/}
            {/*<p className={'my-1 ' + Theme}>* Number of Portions are adjusted</p>*/}
            {/*<p className={'my-1 ' + Theme}> to the number of people per room.</p>*/}
            <Row>
               <Col>
                   <RoomMenuSelection Room={bookingDetails.primary_room} primary></RoomMenuSelection>
               </Col>
                {bookingDetails.secondary_room !== '' && <Col>
                    <RoomMenuSelection Room={bookingDetails.secondary_room}></RoomMenuSelection>
               </Col>}
            </Row>

            {checkRequirement() &&
                <Button variant={'outline-dark'} onClick={handleFinalize} className={'rounded-4 shadow-sm reservation-button'}>Finalize Reservation</Button>
            }
        </div>
    )
});

