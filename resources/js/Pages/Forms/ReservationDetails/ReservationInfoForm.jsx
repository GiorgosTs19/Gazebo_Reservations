import React, {useContext, useRef} from "react";
import {Button, Card, Col, Form, Row, Stack} from "react-bootstrap";
import {FormProgressContext} from "../../../Contexts/FormProgressContext";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {NumberOfPeople} from "./NumberOfPeople";
import {MultipleRoomsField} from "./MultipleRoomsField";
import {ContactNameFields} from "./ContactNameFields";
import {PrimaryContactDetails} from "./PrimaryContactDetails";
import {RoomNumberFields} from "./RoomNumberFields";
import {AttendeesNamesFields} from "./AttendeesNamesFields";
import {ProceedButton} from "./ProceedButton";
import {InnerWidthContext} from "../../../Contexts/InnerWidthContext";
import {useEffect} from "react";

export function ReservationInfoForm({classname}) {
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
            <Card className={'text-center p-3 my-2 mx-sm-auto mx-3 ' +  (innerWidth < 992 ? 'h-100 ' : '') + classname} style={{overflowY:'auto'}}>
                <Row className={'px-3'}>
                    <Col md={6} sm={12} className={'d-flex p-3'}>
                        <Stack gap={3}>
                            <Card.Img className={"d-block w-75 mx-auto rounded-5 shadow-lg gazepo-img my-auto img-fluid"}
                                      src="Images/GazeboAtNight.jpg" alt="" >
                            </Card.Img>
                            <ProceedButton></ProceedButton>
                        </Stack>
                    </Col>
                    <Col md={6} sm={12} style={{maxHeight: (innerWidth >= 768 && innerWidth <=992) ? '65vh' : '45vh', overflowY: 'auto', overflowX: 'hidden'}}
                    className={'my-lg-0 my-1 mb-0'} ref={colRef}>
                        <Card.Body className={'py-0'}>
                            <Form className={'form-container p-2 text-center'}>
                                <NumberOfPeople></NumberOfPeople>
                                <MultipleRoomsField></MultipleRoomsField>
                                <ContactNameFields requirementsCheck={checkShowRequirements}></ContactNameFields>
                                <PrimaryContactDetails requirementsCheck={checkShowRequirements}></PrimaryContactDetails>
                                <RoomNumberFields requirementsCheck={checkShowRequirements}></RoomNumberFields>
                                <AttendeesNamesFields requirementsCheck={checkShowRequirements}></AttendeesNamesFields>
                            </Form>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
    )
}

{/*<Card.Header style={{backgroundColor:'white'}} className={'w-75 mx-auto'}>*/}
{/*    <Button variant={'outline-dark'} className={'my-2 rounded-4 shadow-sm'}*/}
{/*            onClick={handlePreviousClick} size={'sm'}>*/}
{/*        Back to Table Selection*/}
{/*    </Button>*/}
{/*    <h5>Reservation Date : {changeDateFormat(bookingDetails.date,'-','-')}</h5>*/}
{/*</Card.Header>*/}
