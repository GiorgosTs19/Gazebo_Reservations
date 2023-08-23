import {useContext, useState} from "react";
import {DinnerMenus} from "./DinnerMenus";
import {SeaBedMenus} from "./SeaBedMenus";
import {Form, FormCheck, Stack} from "react-bootstrap";
import {ActiveReservationTypeContext} from "../Contexts/ActiveReservationTypeContext";

export function ExistingMenus({Menus}) {
    const Dinner_Menus = Menus.Dinner,
        Bed_Menus = Menus.Bed,
        {reservationType,setReservationType} = useContext(ActiveReservationTypeContext);
    return (
        <div className={'p-3 overflow-y-auto h-100'} >
            {reservationType === 'Dinner' ? <DinnerMenus DinnerMenus={Dinner_Menus}></DinnerMenus> :
            <SeaBedMenus BedMenus={Bed_Menus}></SeaBedMenus>}
        </div>
    )
}
