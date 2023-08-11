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
                <Col md={bookingDetails.more_rooms ? 12 : 6}>
                    <div className={'p-2 border rounded-4 my-2 menu-list'}>
                        {/*Show this message only if a menu is not selected for each room.*/}
                        {(primary ? (bookingDetails.primary_menu.Main === '') : (bookingDetails.secondary_menu.Main === '') ) &&
                            <p className={'text-info'}>Please select a menu</p>}
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
                <Col className={'text-center d-flex flex-column'} md={bookingDetails.more_rooms ? 12 : 6}>
                    <div className={'p-2 border rounded-4 my-auto menu-list'}>
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
