import {Col, Row} from "react-bootstrap";
import {DinnerDateSettings} from "./DinnerDateSettings/DinnerDateSettings";
import {DinnerTableSettings} from "./DinnerTableSettings/DinnerTableSettings";

export function LargeDevicesSettings({children}) {
    return (
        <Row className={'px-3 py-2 mt-0 mt-lg-2 text-center h-95'}>
            <Col className={'h-100 overflow-y-auto'}>
                <Row className={'h-100'}>
                    <Col>
                        {children[0]}
                    </Col>
                    <Col>
                        {children[1]}
                    </Col>
                </Row>
            </Col>
            <Col xxl={4} className={'d-flex mt-4 mt-lg-0'}>
            </Col>
            <Col xxl={4} className={'d-flex flex-column gap-2'}>
                <DinnerTableSettings></DinnerTableSettings>
                <DinnerDateSettings></DinnerDateSettings>
            </Col>
        </Row>
    )
}
