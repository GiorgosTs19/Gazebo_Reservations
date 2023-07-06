import {Button, Card, Col, Row, Stack} from "react-bootstrap";
import {useContext} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {InnerWidthContext} from "../../../Contexts/InnerWidthContext";
import {IsTouchableContext} from "../../../Contexts/IsTouchableContext";

export function TypeSelectionForm() {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
    handleImageClick = (value) => {
        setBookingDetails({...bookingDetails,type:value,more_rooms:bookingDetails.type === 'Dinner' ? null : false});
    },
    isTouchable = useContext(IsTouchableContext),
    innerWidth = useContext(InnerWidthContext);

    return (
        <div className={'text-center p-2 m-auto w-100'}>
            <Row className={'p-1'}>
                <Col md={6} sm={12} className={'d-flex p-3 ' + (innerWidth > 768 ? 'border-end' : 'border-bottom')}>
                    <Stack>
                        {
                            isTouchable ?
                            <Button size={'sm'} onClick={()=>handleImageClick('Dinner')}
                                variant={'outline-secondary'} style={{width:'fit-content'}} className={'mx-auto rounded-3 shadow-sm'}>
                                Book Seaside Dinner
                            </Button>
                            :
                            <h4>Book Seaside Dinner</h4>
                        }
                        <div className={'p-3 p-lg-5'}>
                            <Card.Img className={"d-block w-100 mx-auto rounded-3 shadow-lg gazepo-type-img rounded-5 img-fluid"}
                                src="Images/GazeboAtNight.jpg" alt=""
                                onClick={()=>handleImageClick('Dinner')} style={{cursor:"pointer"}}>
                            </Card.Img>
                        </div>
                    </Stack>
                </Col>
                <Col md={6} sm={12} className={'d-flex p-3'}>
                    <Stack >
                        {
                            isTouchable ?
                                <Button size={'sm'} onClick={()=>handleImageClick('Dinner')}
                                    variant={'outline-secondary'} style={{width:'fit-content'}} className={'mx-auto rounded-3 shadow-sm'}>
                                    Book a Sea Bed
                                </Button>
                                :
                                <h4>Book a Sea Bed</h4>
                        }
                        <div className={'p-3 p-lg-5'}>
                            <Card.Img className={"d-block w-100 mx-auto rounded-3 shadow-lg gazepo-type-img rounded-5 img-fluid"}
                                src="Images/GazeboAtNight.jpg" alt=""
                                onClick={()=>handleImageClick('Bed')} style={{cursor:"pointer"}}>
                            </Card.Img>
                        </div>
                    </Stack>
                </Col>
            </Row>
        </div>
    )
}
