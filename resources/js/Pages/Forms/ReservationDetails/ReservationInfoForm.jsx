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
    colRef = useRef(),
    checkShowRequirements = ()=>{
        // Checks the requirements for each form step to appear
        if(bookingDetails.number_of_people>1 && bookingDetails.type === 'Dinner')
            return bookingDetails.more_rooms !==null;
        return true;
    };
    useEffect(()=>{
        colRef.current?.scrollTo({top: colRef.current?.scrollHeight,behavior:'smooth'});
    },[bookingDetails.first_name,bookingDetails.phone_number,bookingDetails.more_rooms]);

    return (
        <div ref={ref} className={'d-flex'}>
            <Card className={'text-center mh-600px pb-3 my-2 bg-transparent border-0  mx-auto overflow-y-auto overflow-x-hidden ' +
                ' ' +  (innerWidth < 992 ? ' h-100 ' : '') + classname}
                  ref={colRef}>
                <Card.Body className={'py-0'} >
                    <Form className={'form-container p-2 text-center'}>
                        <Row>
                            <Col xs={12} md={bookingDetails.type === 'Dinner' ? 6 : 12} className={'order-0 order-md-0'}>
                                <ContactNameFields requirementsCheck={checkShowRequirements}></ContactNameFields>
                                <PrimaryContactDetails requirementsCheck={checkShowRequirements}></PrimaryContactDetails>
                                <AttendeesNamesFields requirementsCheck={checkShowRequirements}></AttendeesNamesFields>
                                {bookingDetails.type === 'Bed' && <>
                                    <RoomNumberFields requirementsCheck={checkShowRequirements}></RoomNumberFields>
                                    <ProceedButton></ProceedButton>
                                </>}
                            </Col>
                            {bookingDetails.type === 'Dinner' && <Col className={'d-flex flex-column order-1 order-md-1'} xs={12} md={6}>
                                <div className={'m-auto'}>
                                    <MultipleRoomsField></MultipleRoomsField>
                                    <RoomNumberFields requirementsCheck={checkShowRequirements}></RoomNumberFields>
                                </div>
                                <ProceedButton></ProceedButton>
                            </Col>}
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
});

{/*<Card.Header style={{backgroundColor:'white'}} className={'w-75 mx-auto'}>*/}
{/*    <Button variant={'outline-dark'} className={'my-2 rounded-4 shadow-sm'}*/}
{/*            onClick={handlePreviousClick} size={'sm'}>*/}
{/*        Back to Table Selection*/}
{/*    </Button>*/}
{/*    <h5>Reservation Date : {changeDateFormat(bookingDetails.date,'-','-')}</h5>*/}
{/*</Card.Header>*/}
