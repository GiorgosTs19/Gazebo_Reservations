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
                        return <b>ΠΡΕΠΕΙ να γίνει μεταφορά της σε άλλη μέρα έπειτα από συνεννόηση με τον πελάτη.</b>
                    }
                    default : {
                        return <b>ΠΡΕΠΕΙ να γίνει μεταφορά τους σε άλλη μέρα έπειτα από συνεννόηση με τους πελάτες.</b>
                    }
                }
            }
            case true : {
                switch (reservations.length) {
                    case 1 : {
                        return <b>Η υπάρχουσα κράτηση θα πραγματοποιηθεί κανονικά.</b>
                    }
                    default : {
                        return <b>Οι υπάρχουσες κρατήσεις θα πραγματοποιηθούν κανονικά.</b>
                    }
                }
            }
        }
    };

    const dateRangeWarningMessage = dateIsRange && show && (reservations.length > 0 ?
        <h6 className={'my-4'}>Υπάρχουν {reservations.length} κρατήσεις από τις {changeDateFormat(getFormattedDate(selectedDate[0],'-',1),'-')} μέχρι τις {changeDateFormat(getFormattedDate(selectedDate[1],'-',1),'-')}</h6> :
        <h6 className={'my-4'}>Δεν υπάρχει καμία κράτηση από τις {getFormattedDate(selectedDate[0],'-',1)} μέχρι τις {getFormattedDate(selectedDate[1],'-',1)}</h6>)
    const handleChangeAllowExistingReservations = value => {
        setAllowExistingReservations(value);
    }
    return (
        <>
            <section className={'text-warning'}>
                Είστε σίγουροι πως θέλετε να θέσετε {!dateIsRange ? `την ${formatted_date}` : `τις ημέρες από ${formatted_date[0]} έως ${formatted_date[1]}`} ως μή {!dateIsRange ? 'διαθέσιμη' : 'διαθέσιμες'}?
            </section>
            <section className={'text-warning ' + (reservations.length ? 'border-bottom pb-3 ' : '')}>
                Δεν θα μπορούν να καταχωρηθούν {reservations.length ? 'άλλες' : ''} {!dateIsRange ?
                'κρατήσεις για αυτήν την μέρα, μέχρι να την ξανά ορίσετε ώς διαθέσιμη.' :
                'κρατήσεις για αυτές τις μέρες, μέχρι να τις ξανά ορίσετε διαθέσιμες.'}
            </section>
            {reservations.length > 0 && <section className={'p-2 my-1'}>
                <p>
                    <Image src={'Images/Icons/warning.png'} className={'my-1'}></Image>
                </p>
                <section className={'my-2'}>
                    <h6 className={'mb-4'}>Οι υπάρχουσες κρατήσεις</h6>
                    <Form className={'my-4'}>
                        <Form.Check
                            inline
                            label="Μπορούν να πραγματοποιηθούν."
                            name="Existing_Reservations_Allowance"
                            className={'my-3'}
                            type={"radio"}
                            checked={allowExistingReservations === true}
                            onChange={()=>handleChangeAllowExistingReservations(true)}
                        />
                        <Form.Check
                            inline
                            label="Δεν μπορούν να πραγματοποιηθούν."
                            name="Existing_Reservations_Allowance"
                            className={'my-3'}
                            type={"radio"}
                            checked={allowExistingReservations === false}
                            onChange={()=>handleChangeAllowExistingReservations(false)}
                        />
                    </Form>
                </section>
                {getWarningMessage()}
            </section>}
            {!reservations.length && !dateIsRange && <section className={'my-3'}>
                <h6>Δεν υπάρχει κάποια κράτηση για αυτήν την ημέρα.</h6>
            </section>}
            {dateIsRange && <section>
                {dateRangeWarningMessage}
            </section>}
        </>
    )
}
{/*<div>*/}
{/*    {!allowExistingReservations && !dateIsRange && getReservationCountMessage()}*/}
{/*</div>*/}
