import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useState} from "react";
import {StarRating} from "./Star Rating/StarRating";


export default function ReservationReview(props) {
    const Reservation = props.Reservation,
    Menus = Reservation.Menus,
    Gazebo = Reservation.Gazebo;

    const [review, setReview] = useState({
        Overall_Rating: 0,
        Overall_Comments: '',
        Food_Rating: 0,
        Food_Comments: '',
        Space_Rating: 0,
        Space_Comments: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleRatingChange = (field, rating) => {
        setReview((prevReview) => ({
            ...prevReview,
            [field]: rating
        }));
    };

    const handleCommentsChange = (field, value) => {
        setReview((prevReview) => ({
            ...prevReview,
            [field]: value
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform submit logic or API call here
        setSubmitted(true);
    };
    console.log(review);
    console.log(props)
    return (
        <Container fluid className={'p-3 d-flex'}>
            <Card className={'m-auto text-center border-0'}>
                <Card.Header className={'bg-transparent'}>
                    <h4>Share Your Experience</h4>
                </Card.Header>
                <Card.Body>
                    {submitted && (
                        <Alert variant="success">Thank you for your review!</Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group >
                            <Form.Label column>
                                Overall Experience
                            </Form.Label>
                            <Col>
                                <StarRating onSetRating={(rating) => handleRatingChange('Overall_Rating', rating)}></StarRating>
                            </Col>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label column>
                                Comments on Overall Experience
                            </Form.Label>
                            <Col>
                                <Form.Control as="textarea" rows={3} value={review.Overall_Comments}
                                    onChange={(e) =>
                                        handleCommentsChange('Overall_Comments', e.target.value)} style={{resize:'none'}}/>
                            </Col>
                        </Form.Group>
                        <Form.Label column>
                            Food Quality
                        </Form.Label>
                        <Row>
                           <Col>
                               <Form.Group >
                                   <Form.Label as={'p'}>You Ordered {Menus.map((menu,index)=>{
                                       return <span><b><i>{(index > 0 ? ', ' : '') + menu.Main}</i></b></span>

                                   })}</Form.Label>
                                   <StarRating onSetRating={(rating) => handleRatingChange('Food_Rating', rating)}></StarRating>
                               </Form.Group>
                           </Col>
                           <Col>
                               <Form.Group >
                                   <Form.Label column>
                                       Comments on Food
                                   </Form.Label>
                                       <Form.Control as="textarea" rows={3} value={review.Food_Comments}
                                       onChange={(e) =>
                                           handleCommentsChange('Food_Comments', e.target.value)} style={{resize:'none'}}/>
                               </Form.Group>
                           </Col>
                        </Row>
                        <Form.Label column>
                            Space Setup
                        </Form.Label>
                        <Row>
                            <Col>
                                <Form.Group >
                                    <StarRating onSetRating={(rating) => handleRatingChange('Space_Rating', rating)}></StarRating>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group >
                                    <Form.Label column>
                                        Comments on Space Setup
                                    </Form.Label>
                                    <Col>
                                        <Form.Control as="textarea" rows={3} value={review.Space_Comments}
                                                      onChange={(e) =>
                                                          handleCommentsChange('Space_Comments', e.target.value)} style={{resize:'none'}}/>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button type="submit" className={'my-3'}>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
