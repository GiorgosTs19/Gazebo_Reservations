import React, {forwardRef, useContext, useRef, useEffect} from "react";
import {Card, Col, Form, Row} from "react-bootstrap";
import {InnerWidthContext} from "../../../Contexts/InnerWidthContext";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {MultipleRoomsField} from "./MultipleRoomsField";
import {ContactNameFields} from "./ContactNameFields";
import {PrimaryContactDetails} from "./PrimaryContactDetails";
import {RoomNumberFields} from "./RoomNumberFields";
import {AttendeesNamesFields} from "./AttendeesNamesFields";
import {ProceedButton} from "./ProceedButton";

export const ReservationInfoForm = forwardRef(function ReservationInfoForm({classname = ''},ref) {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    innerWidth = useContext(InnerWidthContext),
    colRef = useRef();

    useEffect(()=>{
        colRef.current?.scrollTo({top: colRef.current?.scrollHeight,behavior:'smooth'});
    },[bookingDetails.first_name,bookingDetails.phone_number,bookingDetails.more_rooms]);

    const singleGuest = bookingDetails.number_of_people === 1;

    const checkAttendeesRequirements = (length) => {
        if(bookingDetails.number_of_people === 1)
            return true;

        const containsNoEmptyStrings = bookingDetails.attendees.every(function(element) {
            return element !== "";
        });
        if(!containsNoEmptyStrings)
            return false;
        return bookingDetails.attendees.length === length;
    };

    const checkProceedRequirements = () => {
        // Checks the requirements for proceeding to the Menu Selection Tab
        switch (parseInt(bookingDetails.number_of_people)) {
            case 1:
                return (bookingDetails.last_name.length > 0 && bookingDetails.first_name.length > 0
                    && bookingDetails.email.length > 0 && bookingDetails.phone_number.length > 0 && bookingDetails.primary_room !== '');
            case 2:
            case 3:
            case 4:
                switch (bookingDetails.more_rooms) {
                    case null:
                        return false;
                    case true:{
                        return (bookingDetails.last_name.length > 0 && bookingDetails.first_name.length > 0
                            && bookingDetails.email.length > 0 && bookingDetails.phone_number.length > 0
                            && bookingDetails.primary_room !== '' && bookingDetails.secondary_room !== ''
                            && checkAttendeesRequirements(bookingDetails.number_of_people-1))
                    }
                    case false:
                        return (bookingDetails.last_name.length > 0 && bookingDetails.first_name.length > 0
                            && bookingDetails.email.length > 0 && bookingDetails.phone_number.length > 0 && bookingDetails.primary_room !== ''
                            && checkAttendeesRequirements(bookingDetails.number_of_people-1));
                }
        }
    };


    return (
        <div ref={ref} className={'d-flex'}>
            <Card className={'text-center mh-600px pb-3 my-2 bg-transparent border-0 mx-auto w-100 overflow-y-auto overflow-x-hidden ' +
                ' ' +  (innerWidth < 992 ? ' h-100 ' : '') + classname}
                  ref={colRef}>
                <Card.Body className={'py-0'} >
                    <Form className={'form-container p-2 text-center'}>
                        <Row>
                            <Col xs={12} md={bookingDetails.type === 'Dinner' ? (singleGuest ? 12 : 6) : 12} className={'order-0 order-md-0'}>
                                <ContactNameFields></ContactNameFields>
                                <PrimaryContactDetails></PrimaryContactDetails>
                                <AttendeesNamesFields></AttendeesNamesFields>
                                {(bookingDetails.type === 'Bed' || singleGuest )&& <>
                                    <RoomNumberFields singleGuest={true}></RoomNumberFields>
                                    <ProceedButton></ProceedButton>
                                </>}
                            </Col>
                            {bookingDetails.type === 'Dinner' && !singleGuest && <Col className={'d-flex flex-column order-1 order-md-1'} xs={12} md={6}>
                                <div className={'m-auto'}>
                                    <MultipleRoomsField></MultipleRoomsField>
                                    <RoomNumberFields ></RoomNumberFields>
                                </div>
                                {checkProceedRequirements() && <ProceedButton checkRequirements={checkProceedRequirements}></ProceedButton>}
                            </Col>}
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
});
