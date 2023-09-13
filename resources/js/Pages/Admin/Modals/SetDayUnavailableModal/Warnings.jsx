import {Form, Image} from "react-bootstrap";
import {changeDateFormat, getFormattedDate} from "../../../../ExternalJs/Util";

export function Warnings({reservations,aboutExistingReservations,show,dates}) {
    const {allowExistingReservations, setAllowExistingReservations} = aboutExistingReservations,
        {dateIsRange, formatted_date, selectedDate} = dates;
    const getWarningMessage = () => {
        switch (allowExistingReservations) {
            case false : {
                switch (reservations.length) {
                    case 1 : {
                        return <>
                            <p className={'info-text'}>ΠΡΕΠΕΙ να γίνει αλλαγή ημερομηνίας στην κράτηση</p>
                            <p className={'info-text'}>Η κράτηση θα εμφανιστεί στο καμπανάκι ( ώς υπενθύμιση ),
                                στο πάνω αριστερό μέρος της οθόνης σας, για να πραγματοποιηθεί η αλλαγή που χρειάζεται.</p>
                        </>
                    }
                    default : {
                        return <>
                            <p className={'info-text'}>ΠΡΕΠΕΙ να γίνει αλλαγή ημερομηνίας στις κρατήσεις</p>
                            <p className={'info-text'}>Οι κρατήσεις θα εμφανιστούν στο καμπανάκι ( ώς υπενθύμιση ),
                                στο πάνω αριστερό μέρος της οθόνης σας, για να πραγματοποιηθούν οι αλλαγές που χρειάζεται.</p>
                        </>
                    }
                }
            }
            case true : {
                switch (reservations.length) {
                    case 1 : {
                        return <p className={'info-text'}>Η κράτηση θα πραγματοποιηθεί κανονικά</p>
                    }
                    default : {
                        return <p className={'info-text'}>Οι κρατήσεις θα πραγματοποιηθούν κανονικά</p>
                    }
                }
            }
        }
    };

    const dateRangeWarningMessage = dateIsRange && show && (reservations.length > 0 ?
        <h6 className={'my-4'}>{`${reservations.length === 1 ? 'Υπάρχει' : 'Υπάρχουν'} ${reservations.length} ${reservations.length === 1 ? 'κράτηση' : 'κρατήσεις'} από τις ${changeDateFormat(getFormattedDate(selectedDate[0]),'-')}
            μέχρι τις ${changeDateFormat(getFormattedDate(selectedDate[1]),'-')}`}</h6> :
        '')
    const handleChangeAllowExistingReservations = value => {
        setAllowExistingReservations(value);
    }
    return (
        <>
            <section className={'fw-bold'}>
                Είστε σίγουροι πως θέλετε να απενεργοποιήσετε {!dateIsRange ? `την ${formatted_date}` : `τις ημέρες από ${formatted_date[0]} έως ${formatted_date[1]}`};
            </section>
            <section className={'my-3 info-text-lg ' + (reservations.length > 0 ? 'border-bottom pb-3 ' : '')}>
                Δεν θα μπορούν να καταχωρηθούν {reservations.length > 0 ? 'άλλες' : ''} {!dateIsRange ?
                'κρατήσεις, μέχρι να την ξανά ενεργοποιήσετε.' :
                'κρατήσεις, μέχρι να τις ξανά ενεργοποιήσετε.'}
            </section>
            {reservations.length > 0 &&
                <section className={'my-2'}>
                    <h6 >Οι υπάρχουσες κρατήσεις</h6>
                    <Form className={'my-2'}>
                        <Form.Check
                            inline
                            label="Μπορούν να πραγματοποιηθούν."
                            name="Existing_Reservations_Allowance"
                            className={'my-2'}
                            type={"radio"}
                            checked={allowExistingReservations === true}
                            onChange={()=>handleChangeAllowExistingReservations(true)}
                        />
                        <Form.Check
                            inline
                            label="Δεν μπορούν να πραγματοποιηθούν."
                            name="Existing_Reservations_Allowance"
                            className={'my-2'}
                            type={"radio"}
                            checked={allowExistingReservations === false}
                            onChange={()=>handleChangeAllowExistingReservations(false)}
                        />
                    </Form>
                {getWarningMessage()}
            </section>}
            {dateIsRange && <section>
                {dateRangeWarningMessage}
            </section>}
        </>
    )
}
