import {Col, ListGroup, Row} from "react-bootstrap";
import {MenuSelection} from "../MenuSelection";
import {useContext} from "react";
import {MenuContext} from "../../../../Contexts/MenuContext";
import {BookingDetailsContext} from "../../../../Contexts/BookingDetailsContext";

export function BedPackage() {
    const Menus = useContext(MenuContext),
        {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext);
    return (
        <>
            <Row>
                <Col>
                    <div className={'p-2 border rounded-4 my-2 menu-list'}>
                        {/*Show this message only if a menu is not selected for each room.*/}
                        {(bookingDetails.primary_menu.Main === '') &&
                            <p className={'text-info'}>Please select a menu</p>}
                        {/*<h5>Available Menus</h5>*/}
                        <ListGroup as="ul">
                            {
                                Menus?.map((menu,index) => {
                                    return <MenuSelection menu={menu} index={index} key={menu.id} primary={true}
                                    onlyOne={Menus.length === 1}></MenuSelection>
                                })
                            }
                        </ListGroup>
                    </div>
                </Col>
            </Row>
        </>
    )
}
