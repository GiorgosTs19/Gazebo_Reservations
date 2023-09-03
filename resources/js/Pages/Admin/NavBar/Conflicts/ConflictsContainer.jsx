import {Badge, Button, OverlayTrigger, Popover, Tab, Tabs} from "react-bootstrap";
import {ConflictsList} from "./ConflictsList";
import {BellSVG} from "../../../../SVGS/BellSVG";
import usePrevious from "../../../../CustomHooks/usePrevious";

export function ConflictsContainer({conflicts}) {
    const {Disabled_Dates_Reservations, Disabled_Table_Reservations} = conflicts;
    const previousConflicts = usePrevious(conflicts);

    const date_conflicts_diff = previousConflicts ?
        Disabled_Dates_Reservations.length - previousConflicts.Disabled_Dates_Reservations.length : 0;
    const table_conflicts_diff = previousConflicts ?
        Disabled_Table_Reservations.length - previousConflicts.Disabled_Table_Reservations.length : 0;

    const popOver = <Popover id={`Conflicts`} className={'my-4'}>
        <Popover.Header className={'text-center'} as="h3">Κρατήσεις που απαιτούν αλλαγές</Popover.Header>
        <Popover.Body className={'px-1'}>
            <Tabs defaultActiveKey="Day" id="justify-tab-example" className="mb-3 flex-row" fill>
                <Tab eventKey="Day" title={<>
                    Ημέρα {date_conflicts_diff > 0 && <Badge bg={'light'} pill text={'dark'}
                                  className={'p-1 mx-1'}>{`+ ${date_conflicts_diff}`}</Badge>}
                </>}>
                    <ConflictsList reservations={Disabled_Dates_Reservations} type={'Date'}></ConflictsList>
                </Tab>
                <Tab eventKey="Table" title={<>
                    Τραπέζι {table_conflicts_diff > 0 && <Badge bg={'light'} pill text={'dark'}
                                    className={'p-1 mx-1'}>{`+ ${table_conflicts_diff}`}</Badge>}
                </>}>
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
            <section className={'me-xl-1'}>
                <Button className={'bg-transparent border-0 text-dark px-1 '}><BellSVG height={24} width={24} className={'mx-0 hover-scale-1_1'}/></Button>
                {(date_conflicts_diff > 0  || table_conflicts_diff > 0) && <Badge pill bg={'primary'} text={'dark'} className={'p-1 mx-1'}>{` `}</Badge>}
            </section>
        </OverlayTrigger>
    )
}
