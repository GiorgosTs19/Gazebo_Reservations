import Form from "react-bootstrap/Form";
import {getTableAA, getTableAvailabilityBoolean} from "../../../../../../ExternalJs/Util";
import {Button} from "react-bootstrap";
import {useContext} from "react";
import {GazebosContext} from "../../../../../../Contexts/GazebosContext";

export function SelectedDateTableSettings({isDateDisabled, handleSelectTable, selectedTable, Reservations}) {
    const Gazebos = useContext(GazebosContext),
        isSelectedTableUnavailable = getTableAvailabilityBoolean(selectedTable,Reservations,true);
    return (
        <>
            <h5 className={(isDateDisabled ? 'text-muted' : '') + ' mb-4 mb-xl-3'}>Διαθεσιμότητα Τραπεζιών Ημέρας</h5>
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
                Ορισμός τραπεζιού {getTableAA(selectedTable,Gazebos)} ως μη Διαθέσιμo
            </Button>
            {isSelectedTableUnavailable && <p className={'text-warning'}>Το τραπέζι {getTableAA(selectedTable, Gazebos)} είναι κρατημένο, δεν μπορούν να γίνουν
                αλλαγές.</p>}
            {isDateDisabled && <p className={'text-warning'}>Η ημέρα είναι μη διαθέσιμη, δεν μπορούν να γίνουν αλλαγές στα τραπέζια.</p>}
        </>
    )
}
