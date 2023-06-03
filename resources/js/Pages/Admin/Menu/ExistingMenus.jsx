import {Accordion} from "react-bootstrap";
import {Menu} from "./Menu";

export function ExistingMenus({Menus}) {
    return (
        <div className={'p-3'}>
            <Accordion>
                {Menus.map((menu,index)=>{
                    return <Menu menu={menu} index={index} key={menu.id}></Menu>
                })}
            </Accordion>
        </div>
    )
}
