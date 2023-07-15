import Form from "react-bootstrap/Form";
import {getTableAA, getTableAvailabilityBoolean} from "../../../../../../ExternalJs/Util";
import {Button, Col, Row} from "react-bootstrap";
import {useContext} from "react";
import {GazebosContext} from "../../../../../../Contexts/GazebosContext";

export function SelectedDateTableSettings({isDateDisabled, handleSelectTable, selectedTable, Reservations}) {
    const Gazebos = useContext(GazebosContext),
        isSelectedTableUnavailable = getTableAvailabilityBoolean(selectedTable,Reservations,true);
    return (
        <>
            <Row>
                <h5 className={(isDateDisabled ? 'text-muted' : '') + ' mb-4 mb-xl-3'}>Διαθεσιμότητα Τραπεζιών Ημέρας</h5>
                <Col className={'d-flex flex-column'}>
                    <div className={'my-auto'}>
                        <Form.Select value={selectedTable} onChange={handleSelectTable} className={'mx-auto text-center'}
                                     disabled={isDateDisabled} style={{width:'fit-content'}}>
                            <option value={0} hidden>Επιλογή Τραπεζιού</option>
                            {Gazebos.map(item=>{
                                return <option value={item.id} key={item.id}
                                               className={getTableAvailabilityBoolean(item.id,Reservations,true) ? 'text-danger' : 'text-success'}>
                                    {item.ascending_number}
                                </option>
                            })}
                        </Form.Select>
                        <Button variant={'outline-danger'} className={'p-2 my-2'}
                                disabled={isDateDisabled || isSelectedTableUnavailable}>
                            Ορισμός τραπεζιού {getTableAA(selectedTable,Gazebos)} ως μη διαθέσιμo
                        </Button>
                    </div>
                </Col>
                {(isSelectedTableUnavailable || isDateDisabled) && <Col className={'d-flex flex-column'}>
                    {isSelectedTableUnavailable &&
                        <p className={'text-warning my-auto'}>Το τραπέζι {getTableAA(selectedTable, Gazebos)} είναι κρατημένο,
                            δεν μπορούν να γίνουν
                            αλλαγές.</p>}
                    {isDateDisabled &&
                        <p className={'text-warning my-auto'}>Η ημέρα είναι μη διαθέσιμη, δεν μπορούν να γίνουν αλλαγές στα
                            τραπέζια.</p>}
                    {isSelectedTableUnavailable &&
                        <p className={'text-warning my-auto'}>Αν το τραπέζι πρέπει οπωσδήποτε να τεθεί μη διαθέσιμο, πρέπει να
                            γίνει μεταφορά της κράτησης σε άλλο τραπέζι,
                            είτε σε άλλη ημερομηνία έπειτα από συνεννόηση με τον πελάτη</p>}
                </Col>}
            </Row>
        </>
    )
}
