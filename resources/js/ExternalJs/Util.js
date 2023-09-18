/**
 * @param date A date object
 * @param prefix Can either be ' - ' or ' / '
 * @param selection Selection 1: Year (prefix) Month (prefix) Day, Selection 2: Day (prefix) Month (prefix) Year
 * @returns a string based on the selection ( date format ) and the prefix given.
 */
export function getFormattedDate(date, prefix='-', selection=1) {
    switch (selection) {
        case 1:{
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`
        }
        case 2:
            return date?.getDate() + prefix + (date?.getMonth()+1) + prefix +  date?.getFullYear();
        case 3:
            return date?.getDate() + prefix + (date?.getMonth()+1);
    }
}

/**
 * @param date A date object
 * @param oldPrefix The prefix used on the old date string.
 * @param newPrefix The prefix that will be used on the new date string. ( Default : oldPrefix )
 * @param withTime
 * @returns the new date string using the new prefix (for example : Y-m-d -> d-m-Y, d-m-Y -> Y-m-d).
 */
export function changeDateFormat(date,oldPrefix='-',newPrefix=oldPrefix,withTime=false) {
    const date_parts = withTime ? date?.split(' ')[0].split(oldPrefix) : date?.split(oldPrefix);
    if(date_parts)
        return date_parts[2] + newPrefix + date_parts[1] + newPrefix + date_parts[0];
}

/**
 *
 * @param menu_id Requested ID
 * @param Menus_Array Array of all Menus and their items
 * @param isMenuDestructured
 * @param menuType The type of the menu passed into the function. Bed package or Dinner Menu.
 * @returns {string} the name of the Menu whose ID matches the ID passed into the function.
 */
export function getMenuName(menu_id,Menus_Array,isMenuDestructured = false, menuType='Dinner') {
    switch (menuType) {
        case 'Dinner' : {
            if(!isMenuDestructured) {
                const Mains = Menus_Array.Dinner.Mains,
                    Desserts = Menus_Array.Dinner.Desserts;
                const MainFound = Mains.find(menu=>menu.id===menu_id),
                    DessertFound = Desserts.find(menu=>menu.id===menu_id);
                if(MainFound === undefined && DessertFound === undefined)
                    return 'Menu';
                if(MainFound !== undefined) {
                    if(MainFound.Items.length === 1)
                        return MainFound.Items[0].Name;
                    return MainFound.Name;
                }
                else if(DessertFound !== undefined) {
                    if(DessertFound.Items.length === 1)
                        return DessertFound.Items[0].Name;
                    return DessertFound.Name;
                }
            }
            else {
                const Mains = Menus_Array.Mains,
                    Desserts = Menus_Array.Desserts;
                const MainFound = Mains.find(menu=>menu.id===menu_id),
                    DessertFound = Desserts.find(menu=>menu.id===menu_id);
                if(MainFound === undefined && DessertFound === undefined)
                    return 'Menu';
                if(MainFound !== undefined) {
                    if(MainFound.Items.length === 1)
                        return MainFound.Items[0].Name;
                    return MainFound.Name;
                }
                else if(DessertFound !== undefined) {
                    if(DessertFound.Items.length === 1)
                        return DessertFound.Items[0].Name;
                    return DessertFound.Name;
                }
            }
            return 'Menu';
        }

        case 'Bed' : {
            const MenusFound =  Menus_Array.find(menu=>menu.id === menu_id);
            if(MenusFound !== undefined) {
                if(MenusFound.Items.length === 1)
                    return MenusFound.Items[0].Name;
                return MenusFound.Name;
            }
        }
    }
    return 'Menu';
}

/**
 *
 * @param id Requested Gazebo's ID
 * @param Gazebos_Array Array of all Gazebos
 * @returns the Gazebo object's ascending number whose id matches the ID passed into the function.
 */
export function getTableAA (id,Gazebos_Array) {
    const foundTable = Gazebos_Array.find(gazepo=>gazepo.id===id);
    if(typeof foundTable !== "undefined")
        return foundTable.ascending_number;
}

/**
 *
 * @param date
 * @param AvailabilityArray
 */
export function getAvailabilityByDate(date,AvailabilityArray) {
    if (typeof date === 'string') {
        return AvailabilityArray.find(item => item.Date === date)?.Available;
    }
    else if (typeof date === 'object') {
        return AvailabilityArray.find(item => item.Date === getFormattedDate(date, '-', 1))?.Available;
    }
}

export function getReservationsByDate(date,ReservationsArray) {
    if (typeof date === 'string') {
        const reservations =  ReservationsArray.find(item=>item.Date === date)?.Reservations;
            return reservations ?? [];
    }
    else if (typeof date === 'object') {
        const reservations = ReservationsArray.find(item=>item.Date === getFormattedDate(date,'-',1))?.Reservations;
            return reservations ?? [];
    }
}

export function extractReservationsForDate(date, ReservationsArray) {
    if (typeof date === 'string') {
        return ReservationsArray.filter(item=>item.Date === date);
    }
    else if (typeof date === 'object') {
        return ReservationsArray.filter(item=>item.Date === getFormattedDate(date,'-',1));
    }
}

export function getTableAvailabilityBoolean(gazepo_id, current_date_availability) {
    const tableFound = current_date_availability.find(obj => obj.id === gazepo_id);
    if(!tableFound)
        return false;
    return tableFound.isAvailable;
}

export function formatDateInGreek(dateString) {
    const daysOfWeek = [
        'Κυριακή',
        'Δευτέρα',
        'Τρίτη',
        'Τετάρτη',
        'Πέμπτη',
        'Παρασκευή',
        'Σάββατο'
    ];

    const months = [
        'Ιανουαρίου',
        'Φεβρουαρίου',
        'Μαρτίου',
        'Απριλίου',
        'Μαΐου',
        'Ιουνίου',
        'Ιουλίου',
        'Αυγούστου',
        'Σεπτεμβρίου',
        'Οκτωβρίου',
        'Νοεμβρίου',
        'Δεκεμβρίου'
    ];

    const date = new Date(dateString);

    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
}

export function getDateTime(given_date) {
    const date = new Date(given_date);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    // const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}-${month}-${year}, ${hours}:${minutes}`;
}

/**
 * @param time1
 * @param time2
 * @param isNextDay
 * @returns {number}
 * -1 if time1 is earlier than time2,
 * 1 if time1 is later than time2,
 * 0 if time1 is equal to time2,
 **/
export function compareTimes(time1, time2, isNextDay = false) {
    const [hours1, minutes1] = time1.split(':');
    const [hours2, minutes2] = time2.split(':');

    const date1 = new Date();
    date1.setHours(hours1, minutes1, 0);

    const date2 = new Date();
    date2.setHours(hours2, minutes2, 0);

    if (isNextDay) {
        date2.setDate(date2.getDate() + 1); // Add 1 day to time2
    }

    if (date1 < date2) {
        return -1; // time1 is earlier than time2
    } else if (date1 > date2) {
        return 1; // time1 is later than time2
    } else {
        return 0; // time1 and time2 are the same
    }
}

export function getTimeDifferenceInMinutes(time1, time2) {
    // Create Date objects from the time strings
    const startTime = new Date(`1970-01-01T${time1}`);
    const endTime = new Date(`1970-01-01T${time2}`);

    // Calculate the difference in milliseconds
    const timeDiff = endTime.getTime() - startTime.getTime();

    // Convert milliseconds to minutes
    return Math.floor(timeDiff / (1000 * 60));
}

export function isDateDisabledByAdmin (givenDate,Disabled_Days_Array) {
    if(typeof givenDate === 'string') {
        const itemFound = Disabled_Days_Array.find(item => item.Date === givenDate);
        if(itemFound)
            return [true,itemFound.Allow_Existing_Reservations];
        return [false,true];
    }
    if(typeof givenDate === 'object') {
        const newDate = getFormattedDate(givenDate,'-',1);
        const itemFound = Disabled_Days_Array.find(item => item.Date === newDate);
        if(itemFound)
            return [true,itemFound.Allow_Existing_Reservations];
        return [false,true];
    }
}

export function getFirstAndLastDateOfMonth(month, lastAllowedDate) {
    const today = new Date();
    const year = today.getFullYear();

    if (month === today.getMonth() + 1) {
        // If the provided month is the current month, use today as the start date
        // Calculate the last day of the current month
        const lastDate = lastAllowedDate && (lastAllowedDate.getMonth() + 1 === month) ? lastAllowedDate : new Date(year, month, 0);

        return [today, lastDate];
    } else {
        // If the provided month is not the current month, use the first and last day of that month
        const firstDate = new Date(year, month - 1, 1);
        const lastDate = lastAllowedDate && (lastAllowedDate.getMonth() +1 === month) ? lastAllowedDate : new Date(year, month, 0);

        return [firstDate, lastDate];
    }
}
// export function getAvailabilityPercentage (Availability_Array) {
//     const totalTables = Availability_Array.length;
//     let availableTables = 0;
//     for (let index in Availability_Array) {
//         if(Availability_Array[index].isAvailable === true)
//             availableTables++;
//     }
//     return [availableTables,totalTables,availableTables/totalTables];
// }

export function ensureDate (date,returnType = 'Object') {
    switch (returnType) {
        case 'Object' : {
            if (typeof date === 'string') {
                return new Date(date);
            }
            else if (typeof date === 'object')
                return date;
            break;
        }
        case 'String' : {
            if (typeof date === 'string') {
                return date;
            }
            else if (typeof date === 'object')
                return getFormattedDate(date);
        }
    }
}

Date.prototype.addDays = function(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
