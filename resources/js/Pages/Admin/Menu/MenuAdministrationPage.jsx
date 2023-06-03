import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import React from 'react';
import {NewMenuForm} from "./NewMenuForm";
import {ExistingMenus} from "./ExistingMenus";

export default function MenuAdministrationPage(props) {
    console.log(props)
    const Menus = props.Menus;
    return (
        <Container fluid className={'p-4 text-center'}>
            <h2>Διαχείριση Menu</h2>
            <Row className={'p-2'}>
                <Tabs defaultActiveKey="Existing" className="mb-3">
                    <Tab eventKey="Existing" title="Υπάρχοντα Menu">
                        <Col>
                            <ExistingMenus Menus={Menus}></ExistingMenus>
                        </Col>
                    </Tab>
                    <Tab eventKey="New" title="Δημιουργία Menu">
                        <Col>
                            <NewMenuForm></NewMenuForm>
                        </Col>
                    </Tab>
                </Tabs>
            </Row>
        </Container>
    )
}
