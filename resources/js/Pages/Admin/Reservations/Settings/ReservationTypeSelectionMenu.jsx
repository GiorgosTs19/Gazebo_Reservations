import {Form} from "react-bootstrap";
import {useContext} from "react";
import {ActiveReservationTypeContext} from "../../Contexts/ActiveReservationTypeContext";

export function ReservationTypeSelectionMenu() {
    const {reservationType,setReservationType} = useContext(ActiveReservationTypeContext),
        handleOnChange = (value) => {
            setReservationType(value);
        };

    return (
        <Form className="mx-auto">
            <h5>
                <Form.Check // prettier-ignore
                    type={'radio'}
                    label={`Kρατήσεις Seaside Dinner`}
                    name={'ReservationType'}
                    value={'Dinner'}
                    checked={reservationType === 'Dinner'}
                    onChange={()=>handleOnChange('Dinner')}
                />
            </h5>
            <h5>
                <Form.Check
                    type={'radio'}
                    label={'Kρατήσεις Sea Bed'}
                    name={'ReservationType'}
                    value={'Bed'}
                    checked={reservationType === 'Bed'}
                    onChange={()=>handleOnChange('Bed')}
                />
            </h5>
        </Form>
    )
}
