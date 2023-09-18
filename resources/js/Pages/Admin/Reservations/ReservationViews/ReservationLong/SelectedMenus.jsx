import {getMenuName} from "../../../../../ExternalJs/Util";
import {Col, Row} from "react-bootstrap";

export function SelectedMenus({Menus, MenuCatalog, Type}) {
    const multipleRooms = Menus.length > 1;
    const getContent = (menu) => {
      switch (Type) {
          case 'Dinner' : {
              return `
              K: ${getMenuName(menu.Main,MenuCatalog,true,'Dinner')},
              E: ${getMenuName(menu.Dessert,MenuCatalog,true, Type)}`
          }
          case 'Bed' : {
              return `Π: ${getMenuName(menu.Main,MenuCatalog,true,'Bed')}`
          }
      }
    };
    return (
        <>
            <Row>
                {Menus?.map((menu,index)=>{
                    return <Col key={index} className={'user-select-none'}>
                        {multipleRooms && <p className={'mb-1 info-text-lg'}>{menu.Room}</p>}
                        <p className={'mb-1'}>{getContent(menu)}</p>
                    </Col>
                })}
            </Row>
            {Type === 'Dinner' ? <p className={'info-text-lg user-select-none text-center mt-2 mb-1'}>(Κ: Κυρίως, Ε: Επιδόρπιο)</p> :
                <p className={'info-text-lg user-select-none text-center mt-2 mb-1'}>(Π: Πακέτο)</p>}
        </>
    )
}
