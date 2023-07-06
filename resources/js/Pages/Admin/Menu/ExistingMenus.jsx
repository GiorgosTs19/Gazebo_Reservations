import {useState} from "react";
import {DinnerMenus} from "./DinnerMenus";
import {SeaBedMenus} from "./SeaBedMenus";
import {Form, FormCheck, Stack} from "react-bootstrap";

export function ExistingMenus({Menus}) {
    const Dinner_Menus = Menus.Dinner,
        Bed_Menus = Menus.Bed,
    [menusToShow,setMenusToShow] = useState('Dinner'),
    handleMenusToShowChange = (event) => {
        setMenusToShow(event.target.checked ? 'Dinner' : 'Bed');
    };
    return (
        <div className={'p-3'} style={{overflowY:'auto',height:'75vh'}}>
            <div className={'d-flex mb-4'}>
                <Stack direction={'horizontal'} className={'mx-auto border-bottom'}>
                    <h5>Πρωινά Πακέτα</h5>
                    <Form.Switch className={'mx-3'} checked={menusToShow === 'Dinner'}
                        onChange={handleMenusToShowChange}></Form.Switch>
                    <h5>Βραδινά Μενού</h5>
                </Stack>
            </div>
            {menusToShow === 'Dinner' ? <DinnerMenus DinnerMenus={Dinner_Menus}></DinnerMenus> :
            <SeaBedMenus BedMenus={Bed_Menus}></SeaBedMenus>}
        </div>
    )
}
