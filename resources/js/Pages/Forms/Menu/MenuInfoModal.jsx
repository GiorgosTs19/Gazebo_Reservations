import {Badge, Col, Image, ListGroup, Modal, Row, Stack} from "react-bootstrap";
import {useState} from "react";
import {MenuItem} from "../../Admin/Menu/MenuItem";
import {InfoSVG} from "../../../SVGS/InfoSVG";

export function MenuInfoModal({menu}) {
    const [show, setShow] = useState(false);
    return (
        <>
            <Badge bg="transparent" pill className={'my-auto'} onClick={() => setShow(true)}>
                <InfoSVG/>
            </Badge>
            <Modal size="sm" show={show} onHide={() => setShow(false)} className={'text-center'} scrollable
            style={{maxHeight:'80vh'}}>
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        {menu.Name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className={'pb-3'}>The {menu.Name} menu contains the following</h6>
                    <ListGroup as="ol" numbered variant={'flush'}>
                    {menu.Items.map((item)=>{
                        return <MenuItem item={item} key={item.id} inModal></MenuItem>
                    })}
                    </ListGroup>
                    <Row>
                        <p className={'text-info my-1'}>Allergens</p>
                        <Col xs={6}>
                            <Stack gap={1} className={'text-center my-2'}>
                                <span className={''}><Image src={'Images/Icons/MenuAllergensIcons/gluten_free.png'}/> Gluten Free</span>
                                <span className={''}><Image src={'Images/Icons/MenuAllergensIcons/lactose_free.png'}/> Lactose Free</span>
                                <span className={''}><Image src={'Images/Icons/MenuAllergensIcons/wheat_free.png'}/> Wheat Free</span>
                            </Stack>
                        </Col>
                        <Col xs={6}>
                            <Stack gap={1} className={'text-center my-2'}>
                                <span className={'mx-auto'}><Image src={'Images/Icons/MenuAllergensIcons/vegetarian.png'}/> Vegetarian</span>
                                <span className={'mx-auto'}><Image src={'Images/Icons/MenuAllergensIcons/vegan.png'}/> Vegan</span>
                            </Stack>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}
