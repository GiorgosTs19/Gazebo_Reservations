import {Accordion, Button, Card, Col, ListGroup, Row, Stack} from "react-bootstrap";
import {MenuItem} from "./MenuItem";
import {MenuDeletionModal} from "./MenuDeletionModal";
import {useContext, useState} from "react";
import {MenuEditModeContext} from "../Contexts/MenuEditModeContext";
import {ActiveTabKeyContext} from "../Contexts/ActiveTabKeyContext";

export function Menu({menu,index,inModal}) {
    const {editingMenu,setEditingMenu} = useContext(MenuEditModeContext),
        {activeMenusTabKey,setActiveMenusTabKey} = useContext(ActiveTabKeyContext),
    handleEditMenu = (bypass = false) => {
        if(!bypass)
            setEditingMenu(menu);
        setActiveMenusTabKey('Edit');
    };
    return (
        <Accordion.Item eventKey={index} key={menu.id} className={'border-start-0 border-end-0 border-top-0'}>
            <Accordion.Header>{menu.Name}</Accordion.Header>
            <Accordion.Body className={'px-0'}>
                <Card className="px-4 mx-sm-auto mx-3 border-0">
                    <Row>
                        <Col lg={!inModal ? 9 : 12} className={'mx-auto px-0 ' + (innerWidth > 992 ? (!inModal && ' border-end') : ' border-bottom')} style={{ width:(innerWidth >992 ? '' : 'fit-content')}}>
                            <Card.Body as={'div'} className={'h-100 d-flex flex-column'}>
                                <ListGroup as="ol" numbered className={'my-auto'}>
                                    {menu.Items.map((item)=>{
                                        return <MenuItem item={item} key={item.id}></MenuItem>;
                                    })}
                                </ListGroup>
                            </Card.Body>
                        </Col>
                        {!inModal && <Col lg={3} className={'d-flex flex-column ' + ( innerWidth > 992 ? 'border-start' : 'border-top')}>
                            <Card.Footer style={{backgroundColor: 'white'}} className={'border-top-0 my-auto'}>
                                <Stack gap={3}>
                                    {!inModal &&  ( editingMenu === null ? <Button variant={'outline-info'} className={'rounded-5 shadow-sm'}
                                         onClick={()=>handleEditMenu(false)}>
                                            Επεξεργασία
                                    </Button> : (editingMenu.id === menu.id ? <>
                                        <p className={'fw-bold'}>Επεξεργάζεστε ήδη αυτό το μενού</p>
                                        <Button variant={'outline-dark'} className={'rounded-5'} onClick={()=>handleEditMenu(true)}>Εμφάνιση</Button>
                                    </>: <p className={'fw-bold'}>Επεξεργάζεστε ήδη άλλο μενού</p>))
                                    }
                                    {!inModal && <MenuDeletionModal menu={menu}></MenuDeletionModal>}
                                </Stack>
                            </Card.Footer>
                        </Col>}
                    </Row>
                </Card>
            </Accordion.Body>
        </Accordion.Item>
    )
}
