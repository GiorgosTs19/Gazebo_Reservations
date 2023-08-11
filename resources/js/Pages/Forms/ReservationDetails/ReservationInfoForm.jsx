import React, {forwardRef, useContext, useRef} from "react";
import {Button, Card, Col, Form, Row, Stack} from "react-bootstrap";
import {FormProgressContext} from "../../../Contexts/FormProgressContext";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {MultipleRoomsField} from "./MultipleRoomsField";
import {ContactNameFields} from "./ContactNameFields";
import {PrimaryContactDetails} from "./PrimaryContactDetails";
import {RoomNumberFields} from "./RoomNumberFields";
import {AttendeesNamesFields} from "./AttendeesNamesFields";
import {ProceedButton} from "./ProceedButton";
import {InnerWidthContext} from "../../../Contexts/InnerWidthContext";
import {useEffect} from "react";

export const ReservationInfoForm = forwardRef(function ReservationInfoForm({classname = ''},ref) {
    const {progress, setProgress} = useContext(FormProgressContext),
    {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
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
            <Card className={'text-center pb-3 my-2 bg-transparent border-0  mx-auto ' +  (innerWidth < 992 ? ' h-100 ' : '') + classname}
                  style={{overflowY:'auto',overflowX:'hidden',maxHeight:'600px'}} ref={colRef}>
                {/*<Row className={'px-3'}>*/}
                {/*    <Col md={4} sm={12} className={'d-flex px-3 pb-3 sticky-top'}>*/}
                {/*        <Card.Img className={"d-block mx-auto rounded-5 shadow-lg gazepo-img my-auto img-fluid " + (innerWidth > 992 ? 'w-50' : 'w-100')}*/}
                {/*                  src="Images/GazeboAtNight.jpg" alt="" >*/}
                {/*        </Card.Img>*/}
                {/*    </Col>*/}
                {/*    <Col md={6} sm={12} style={{overflowY: 'auto', overflowX: 'hidden'}}*/}
                {/*    className={'my-lg-0 my-1 mb-0'} ref={colRef}>*/}
                <Card.Body className={'py-0'} >
                    <Form className={'form-container p-2 text-center'}>
                        <Row>
                            <Col className={'d-flex flex-column order-1 order-md-0'} xs={12} md={6}>
                                <div className={'m-auto'}>
                                    <MultipleRoomsField></MultipleRoomsField>
                                    <RoomNumberFields requirementsCheck={checkShowRequirements}></RoomNumberFields>
                                </div>
                                <ProceedButton></ProceedButton>
                            </Col>
                            <Col xs={12} md={6} className={'order-0 order-md-1'}>
                                <ContactNameFields requirementsCheck={checkShowRequirements}></ContactNameFields>
                                <PrimaryContactDetails requirementsCheck={checkShowRequirements}></PrimaryContactDetails>
                                <AttendeesNamesFields requirementsCheck={checkShowRequirements}></AttendeesNamesFields>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
                {/*    </Col>*/}
                {/*</Row>*/}
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
