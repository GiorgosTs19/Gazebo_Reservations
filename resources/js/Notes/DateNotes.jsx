import React from 'react';
export function DateNotes() {
    return (
        <div className={'my-2'}>
            <h6 className={'text-danger'}>* Next Day reservations cannot be made after 23:00 on the previous day.</h6>
            <h6 className={'text-danger'}>** Reservations made after 23:00 on any given day,
                will only be accepted for dates occurring two days later or beyond.</h6>
        </div>
    )
}
