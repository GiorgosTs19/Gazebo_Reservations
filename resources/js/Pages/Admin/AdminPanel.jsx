import {Col, Container, Tab, Tabs} from "react-bootstrap";
import {MenuAdminPanel} from "./Menu/MenuAdministrationPage";
import React, {useEffect, useState} from "react";
import {InnerWidthContext} from "../../Contexts/InnerWidthContext";
import {ReservationsPanel} from "./Reservations/ReservationsPanel";
import {GazebosContext} from "../../Contexts/GazebosContext";
import '../../../css/Admin.css'
import {SettingsPanel} from "./Settings/SettingsPanel";
import 'react-calendar/dist/Calendar.css';

export default function AdminPanel(props) {
    const Menus = props.Menus,
    Dinner_Reservations = props.Dinner_Reservations,
    Bed_Reservations = props.Bed_Reservations,
    [innerWidth, setInnerWidth] = useState(window.innerWidth),
    Gazebos = props.Gazebos;
    console.log(props)
    useEffect(() => {
        const handleResize = () => {
            setInnerWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <InnerWidthContext.Provider value={innerWidth}>
            <GazebosContext.Provider value={Gazebos}>
                <Container fluid className={'px-3 py-3 '  + (innerWidth<992 ? 'overflow-auto' : '')}>
                    <Tabs defaultActiveKey="Reservations" className="mb-3">
                        <Tab eventKey="Reservations" title="Κρατήσεις">
                            <Col>
                                <ReservationsPanel Bed_Reservations={Bed_Reservations}
                                    Dinner_Reservations={Dinner_Reservations}>
                                </ReservationsPanel>
                            </Col>
                        </Tab>
                        <Tab eventKey="Menus" title="Μενού">
                            <Col>
                                <MenuAdminPanel Menus={Menus}></MenuAdminPanel>
                            </Col>
                        </Tab>
                        <Tab eventKey="Settings" title="Ρυθμίσεις">
                            <Col>
                                <SettingsPanel Bed_Reservations={Bed_Reservations}
                                   Dinner_Reservations={Dinner_Reservations}></SettingsPanel>
                            </Col>
                        </Tab>
                    </Tabs>
                </Container>
            </GazebosContext.Provider>
        </InnerWidthContext.Provider>
    )
}
