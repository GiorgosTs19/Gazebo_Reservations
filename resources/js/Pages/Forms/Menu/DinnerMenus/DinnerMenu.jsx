import {Col, ListGroup, Row, Stack} from "react-bootstrap";
import {MenuSelection} from "../MenuSelection";
import {useContext} from "react";
import {MenuContext} from "../../../../Contexts/MenuContext";
import {BookingDetailsContext} from "../../../../Contexts/BookingDetailsContext";

export function DinnerMenu({primary}) {
    const Menus = useContext(MenuContext);
    return (
        <>
            <Row>
                <Col xs={12} className={'px-0 '}>
                    <div className={'p-2 box_shadow border-0 rounded-4 my-2 menu-list bg-white-0_55'}>
                        <h5>Main Dishes</h5>
                        <Stack gap={1}>
                            {
                                Menus.Mains?.map((menu,index) => {
                                    return <MenuSelection menu={menu} index={index} key={menu.id} primary={primary}
                                                          onlyOne={Menus.Mains.length === 1}></MenuSelection>
                                })
                            }
                        </Stack>
                    </div>
                </Col>
                <Col className={'text-center d-flex flex-column mt-3 mt-lg-2 px-0'} xs={12}>
                    <div className={'p-2 box_shadow border-0 rounded-4 my-auto menu-list bg-white-0_55'}>
                        <h5 className={'text-center'}>Desserts</h5>
                        <Stack className={'my-auto menu-list'} gap={2}>
                            {
                                Menus.Desserts?.map((menu,index) => {
                                    return <MenuSelection menu={menu} index={index} key={menu.id} primary={primary} dessert
                                                          onlyOne={Menus.Desserts.length === 1}>
                                    </MenuSelection>
                                })
                            }
                        </Stack>
                    </div>
                </Col>
            </Row>
        </>
    )
}
