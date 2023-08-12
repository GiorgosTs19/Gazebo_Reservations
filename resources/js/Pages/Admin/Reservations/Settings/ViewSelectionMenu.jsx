import {Button, Form, ListGroup, Row} from "react-bootstrap";
import {useContext} from "react";
import {ViewContext} from "../../../../Contexts/ViewContext";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {FiltersBar} from "../FiltersBar/FiltersBar";

export function ViewSelectionMenu() {
    const {activeView,setActiveView} = useContext(ViewContext),
    {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
    innerWidth = useContext(InnerWidthContext),
    handleSetActiveView = (view) =>{
        setActiveView(view);
        setActiveReservation(null);
    }

    return (
        <div className={'box_shadow px-0 px-xl-4 rounded-4 py-2 border'}>
            <h5>Εμφάνιση Κρατήσεων</h5>
            <ListGroup horizontal className={'p-0 my-auto'}>
                <ListGroup.Item className={'border-0 mx-auto ' + (activeView === 'Today' ? 'opacity-25' : '') + (innerWidth < 992 ? ' d-flex' : '')}>
                    <Button variant={"dark"} className={'my-2 ' } style={{flex:(innerWidth < 992 ? '1' : '')}}
                            size={'sm'} onClick={()=>handleSetActiveView('Today')}
                            disabled={activeView ==='Today'}>
                        Σήμερα
                    </Button>
                </ListGroup.Item>
                <ListGroup.Item className={'border-0 mx-auto ' + (activeView === 'Weekly' ? 'opacity-25' : '') + (innerWidth < 992 ? ' d-flex' : '')}>
                    <Button variant={"dark"} className={'my-2 ' + (innerWidth < 992 ? 'd-flex' : '')} style={{flex:(innerWidth < 992 ? 1 : '')}}
                            size={'sm'} onClick={()=>handleSetActiveView('Weekly')} disabled={activeView === 'Weekly'}>
                        Ανά Εβδομάδα
                    </Button>
                </ListGroup.Item>
                <ListGroup.Item className={'border-0 mx-auto ' + (activeView === 'Monthly' ? 'opacity-25' : '') + (innerWidth < 992 ? ' d-flex' : '')}>
                    <Button variant={"dark"} className={'my-2 ' + (innerWidth < 992 ? 'd-flex' : '')}  style={{flex:(innerWidth < 992 ? 1 : '')}}
                            size={'sm'} onClick={()=>handleSetActiveView('Monthly')} disabled={activeView === 'Calendar'}>
                        Ανά Μήνα
                    </Button>
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}
