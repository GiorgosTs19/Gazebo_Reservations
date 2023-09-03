import {Accordion} from "react-bootstrap";
import {Menu} from "./Menu";

export function SunBedMenus({BedMenus}) {
    return (
        <div>
            <Accordion>
                {BedMenus.length === 0 ? <h5 className={'text-muted'}>Δεν έχετε προσθέσει κάποιο πρωινό πακέτο.</h5> :
                    BedMenus.map((menu,index)=>{
                        return <Menu menu={menu} index={index} key={menu.id}></Menu>
                    })}
            </Accordion>
        </div>
    )
}
