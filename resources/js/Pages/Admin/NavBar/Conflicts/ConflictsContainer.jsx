import {Badge, Button, OverlayTrigger, Popover, Tab, Tabs} from "react-bootstrap";
import {ConflictsList} from "./ConflictsList";
import {BellSVG} from "../../../../SVGS/BellSVG";
import usePrevious from "../../../../CustomHooks/usePrevious";
import {useContext, useEffect, useState} from "react";
import {ConflictsContext} from "../../Contexts/ConflictsContext";

export function ConflictsContainer() {
    const [Disabled_Dates_Reservations, Disabled_Table_Reservations] = useContext(ConflictsContext);
    const previousDateConflicts = usePrevious(Disabled_Dates_Reservations);
    const previousTableConflicts = usePrevious(Disabled_Table_Reservations);
    const [show, setShow] = useState(false);
    const date_conflicts_diff = previousDateConflicts ?
        Disabled_Dates_Reservations.length - previousDateConflicts.length : 0;
    const table_conflicts_diff = previousTableConflicts ?
        Disabled_Table_Reservations.length - previousTableConflicts.length : 0;
    const totalConflictsCount = Disabled_Dates_Reservations.length  + Disabled_Table_Reservations.length;
    const [showBlueDot, setShowBlueDot] = useState(date_conflicts_diff > 0 || table_conflicts_diff > 0);
    const handleDisableBlueDot = () =>{
        if(showBlueDot)
            setShowBlueDot(false);
    }
    const handleClose = () => {
        setShow(false);
    }
    useEffect(()=> {
        if(showBlueDot)
            return;
        setShowBlueDot(date_conflicts_diff > 0 || table_conflicts_diff > 0);
    },[date_conflicts_diff, table_conflicts_diff]);


    const popOver = <Popover id={`Conflicts`} className={'my-4'} hidden={!show}>
        <Popover.Header className={'text-center'} as="h3">Κρατήσεις που απαιτούν αλλαγές</Popover.Header>
        <Popover.Body className={'px-1'}>
            <Tabs defaultActiveKey="Day" id="justify-tab-example" className="mb-3 flex-row" fill>
                <Tab eventKey="Day" title={<>
                    Ημέρα <span className={'info-text'}>({Disabled_Dates_Reservations.length})</span> {date_conflicts_diff > 0 && <Badge bg={'light'} pill text={'dark'}
                    className={'p-1 mx-1 info-text'}>{`+ ${date_conflicts_diff}`}</Badge>}
                </>}>
                    <ConflictsList reservations={Disabled_Dates_Reservations} overlayVisibility={{show, setShow}}/>
                </Tab>
                <Tab eventKey="Table" title={<>
                    Gazebo <span className={'info-text'}>({Disabled_Table_Reservations.length})</span> {table_conflicts_diff > 0 && <Badge bg={'light'} pill text={'dark'}
                    className={'p-1 mx-1 info-text'}>{`+ ${table_conflicts_diff}`}</Badge>}
                </>}>
                    <ConflictsList reservations={Disabled_Table_Reservations} overlayVisibility={{show, setShow}}/>
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
            onExit={handleClose}
            overlay={popOver} onToggle={handleDisableBlueDot}>
            <section className={'me-xl-1'}>
                <Button className={`${show ? 'bg-secondary-subtle' : 'bg-transparent'} border-0 text-dark px-1`} onClick={()=>setShow(!show)}><BellSVG height={24} width={24} className={'mx-0 hover-scale-1_1'}/><span className={'info-text'}>({totalConflictsCount})</span></Button>
                {(date_conflicts_diff > 0  || table_conflicts_diff > 0) && showBlueDot && <Badge pill bg={'primary'} text={'dark'} className={'p-1 mx-1'}>{` `}</Badge>}
            </section>
        </OverlayTrigger>
    )
}
