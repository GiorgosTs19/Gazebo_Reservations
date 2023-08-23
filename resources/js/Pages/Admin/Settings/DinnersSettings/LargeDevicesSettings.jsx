import {Button, Col, Row} from "react-bootstrap";
import {DinnerTimeSettings} from "./DinnerTimeSettings/DinnerTimeSettings";
import {DinnerDateSettings} from "./DinnerDateSettings/DinnerDateSettings";
import {DinnerTableSettings} from "./DinnerTableSettings/DinnerTableSettings";

export function LargeDevicesSettings({children}) {
    return (
        <Row className={'px-3 py-2 mt-0 mt-lg-2 text-center'}>
            <Col className={'my-auto'}>
                {children}
            </Col>
            <Col xxl={4} className={'d-flex mt-4 mt-lg-0'}>
                <DinnerDateSettings></DinnerDateSettings>
            </Col>
            <Col xxl={4} className={'d-flex'}>
                <DinnerTableSettings></DinnerTableSettings>
            </Col>
        </Row>
    )
}
