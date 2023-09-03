export const checkAttendees = (bookingDetails) => {
    const isArrayFull = bookingDetails.attendees.length === bookingDetails.number_of_people - 1;
    if(!isArrayFull)
        return false;
    return bookingDetails.attendees.every(attendee => attendee !== '');
}

export const checkMenus = (bookingDetails) => {
    if(bookingDetails.more_rooms)
        return bookingDetails.primary_menu.Main !== '' && bookingDetails.secondary_menu.Main !== ''
            && bookingDetails.primary_menu.Dessert !== '' && bookingDetails.secondary_menu.Dessert !== '';

    return bookingDetails.primary_menu.Main !== '' && bookingDetails.primary_menu.Dessert !== '';
}
