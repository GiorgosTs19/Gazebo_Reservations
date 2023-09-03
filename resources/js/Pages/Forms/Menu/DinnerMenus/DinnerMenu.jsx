import {Col, ListGroup, Row} from "react-bootstrap";
import {MenuSelection} from "../MenuSelection";
import {useContext} from "react";
import {MenuContext} from "../../../../Contexts/MenuContext";
import {BookingDetailsContext} from "../../../../Contexts/BookingDetailsContext";

export function DinnerMenu({primary}) {
    const Menus = useContext(MenuContext),
        {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext);
    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className={'p-2 box_shadow border-0 rounded-4 my-2 menu-list'}>
                        <h5>Main Dishes</h5>
                        <ListGroup as="ul">
                            {
                                Menus.Mains?.map((menu,index) => {
                                    return <MenuSelection menu={menu} index={index} key={menu.id} primary={primary}
                                                          onlyOne={Menus.Mains.length === 1}></MenuSelection>
                                })
                            }
                        </ListGroup>
                    </div>
                </Col>
                <Col className={'text-center d-flex flex-column mt-3 mt-lg-2'} xs={12}>
                    <div className={'p-2 box_shadow border-0 rounded-4 my-auto menu-list'}>
                        <h5 className={'text-center'}>Desserts</h5>
                        <ListGroup as="ul" className={'my-auto'}>
                            {
                                Menus.Desserts?.map((menu,index) => {
                                    return <MenuSelection menu={menu} index={index} key={menu.id} primary={primary} dessert
                                                          onlyOne={Menus.Desserts.length === 1}>
                                    </MenuSelection>
                                })
                            }
                        </ListGroup>
                    </div>
                </Col>
            </Row>
        </>
    )
}
