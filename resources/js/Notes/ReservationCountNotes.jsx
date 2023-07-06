export function ReservationCountNotes() {
    return (
        <div className={'my-3'}>
            <h6 className={'m-0'} style={{color:'#42C618'}}>&#9632; 0-33% Πληρότητα ( Low Capacity )</h6>
            <h6 className={'m-0'} style={{color:'#E7EA2B'}}>&#9632; 34-66% Πληρότητα ( Moderate Capacity )</h6>
            <h6 className={'m-0'} style={{color:'#F68908'}}>&#9632; 67-99% Πληρότητα ( High Capacity )</h6>
            <h6 className={'m-0'} style={{color:'#D2042D'}}>&#9632; 100% Πληρότητα ( Full Capacity )</h6>
        </div>
    )
}
