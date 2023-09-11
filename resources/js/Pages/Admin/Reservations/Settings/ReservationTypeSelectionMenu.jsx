import {Form} from "react-bootstrap";
import {useContext} from "react";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";
import {ViewContext} from "../../../../Contexts/ViewContext";
import {ActiveReservationContext} from "../../Contexts/ActiveReservationContext";

export function ReservationTypeSelectionMenu({activeTabKey}) {
    const {reservationType,setReservationType} = useContext(ActiveReservationTypeContext),
        {activeReservationsView,setActiveReservationsView} = useContext(ViewContext),
        {activeReservation,setActiveReservation} = useContext(ActiveReservationContext),
        handleOnChange = (value) => {
            setReservationType(value);
            setActiveReservation(null);
        };

    return (
        <Form className="m-auto pt-2 d-flex w-100">
            <h5 className={'user-select-none w-50'}>
                <Form.Check // prettier-ignore
                    inline
                    type={'radio'}
                    label={`Βραδινές Κρατήσεις`}
                    name={'ReservationType'}
                    value={'Dinner'}
                    disabled={(activeTabKey === 'Reservations' && activeReservationsView === 'Search' ) || activeTabKey === 'ResolveConflict'}
                    checked={reservationType === 'Dinner'}
                    onChange={()=>handleOnChange('Dinner')}
                />
            </h5>
            <h5 className={'user-select-none w-50'}>
                <Form.Check
                    inline
                    type={'radio'}
                    label={'Πρωινές Κρατήσεις'}
                    name={'ReservationType'}
                    value={'Bed'}
                    disabled={(activeTabKey === 'Reservations' && activeReservationsView === 'Search'  ) || activeTabKey === 'ResolveConflict'}
                    checked={reservationType === 'Bed'}
                    onChange={()=>handleOnChange('Bed')}
                />
            </h5>
        </Form>
    )
}
