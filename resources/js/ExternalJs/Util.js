/**
 * @param date A date object
 * @param prefix Can either be ' - ' or ' / '
 * @param selection Selection 1: Year (prefix) Month (prefix) Day, Selection 2: Day (prefix) Month (prefix) Year
 * @returns a string based on the selection ( date format ) and the prefix given.
 */
export function getFormatedDate(date, prefix, selection) {
    switch (selection) {
        case 1:{
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`
        }
        case 2:
            return date?.getDate() + prefix + (date?.getMonth()+1) + prefix +  date?.getFullYear();
    }

}

/**
 * @param date A date object
 * @param oldPrefix The prefix used on the old date string.
 * @param newPrefix The prefix that will be used on the new date string. ( Default : oldPrefix )
 * @returns the new date string using the new prefix (for example : Y-m-d -> d-m-Y, d-m-Y -> Y-m-d).
 */
export function changeDateFormat(date,oldPrefix,newPrefix=oldPrefix) {
    const date_parts = date?.split(oldPrefix);
    if(date_parts)
        return date_parts[2] + newPrefix + date_parts[1] + newPrefix + date_parts[0];
}

/**
 *
 * @param menu_id Requested ID
 * @param Menus_Array Array of all Menus and their items
 * @returns {string} the name of the Menu whose ID matches the ID passed into the function.
 */
export function getMenuName(menu_id,Menus_Array) {
    return (Menus_Array.find(menu=>menu.id===menu_id).Name);
}

/**
 *
 * @param id Requested Gazepo's ID
 * @param Gazepos_Array Array of all Gazepos
 * @returns the Gazepo object's ascending number whose id matches the ID passed into the function.
 */
export function getTableAA (id,Gazepos_Array) {
    if(typeof Gazepos_Array.find(gazepo=>gazepo.id===id) !== "undefined")
        return (Gazepos_Array.find(gazepo=>gazepo.id===id).ascending_number);
}

/**
 *
 * @param date
 * @param AvailabilityArray
 */
export function getAvailabilityByDate(date,AvailabilityArray) {
    if (typeof date === 'string') {
        return AvailabilityArray.find(
            item=>item.Date === date)?.Available;
    }
    else if (typeof date === 'object') {
        return AvailabilityArray.find(
            item=>item.Date === getFormatedDate(date,'-',1))?.Available;
    }
}


export function getGazepoAvailabilityColor(gazepo_id,current_date_availability) {
    if(current_date_availability === 'All')
        return '#00A36C';
    else if(Array.isArray(current_date_availability)){
        if (current_date_availability.some(obj => obj.hasOwnProperty(gazepo_id)))
            return '#00A36C';
        return '#FF5733';
    }
}

export function getGazepoShapesByTitle(title,shapes) {
    const availability =  shapes.find(shape=> shape.className === 'Text' &&
        shape.getAttrs().name === (title + ' Availability')
    );
    const table = shapes.find(shape=> shape.className === 'Rect' &&
        shape.getAttrs().name === title
    );

    return [availability,table];
}
