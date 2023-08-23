import {Button, OverlayTrigger, Popover, Tab, Tabs} from "react-bootstrap";
import {ConflictsList} from "./ConflictsList";
import {BellSVG} from "../../../../SVGS/BellSVG";

export function ConflictsContainer({conflicts}) {
    const {Disabled_Dates_Reservations, Disabled_Table_Reservations} = conflicts;
    const popOver = <Popover id={`Conflicts`} className={'my-4'}>
        <Popover.Header className={'text-center'} as="h3">Κρατήσεις που απαιτούν αλλαγές</Popover.Header>
        <Popover.Body className={'px-1'}>
            <Tabs defaultActiveKey="Day" id="justify-tab-example" className="mb-3 flex-row" fill>
                <Tab eventKey="Day" title="Ημέρα">
                    <ConflictsList reservations={Disabled_Dates_Reservations} type={'Date'}></ConflictsList>
                </Tab>
                <Tab eventKey="Table" title="Τραπέζι">
                    <ConflictsList reservations={Disabled_Table_Reservations} type={'Bed'}></ConflictsList>
                </Tab>
            </Tabs>
        </Popover.Body>
    </Popover>

    return (
        <OverlayTrigger
            rootClose
            trigger="click"
            key={'bottom'}
            placement={'bottom'}
            overlay={popOver}>
            <Button className={'bg-transparent border-0 text-dark'} ><BellSVG height={24} width={24} className={'mx-0 mx-lg-4'}/></Button>
        </OverlayTrigger>
    )
}
