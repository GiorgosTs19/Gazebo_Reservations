import {getMenuName} from "../../../../../ExternalJs/Util";

export function SelectedMenus({Menus, MenuCatalog, Type}) {
    const getContent = (menu) => {
      switch (Type) {
          case 'Dinner' : {
              return `{ K: ${getMenuName(menu.Main,MenuCatalog,true,'Dinner')} , E: ${getMenuName(menu.Dessert,MenuCatalog,true, Type)} }`
          }
          case 'Bed' : {
              return `Π: ${getMenuName(menu.Main,MenuCatalog,true,'Bed')}`
          }
      }
    };

    return (
        <>
            <div>
                {Menus?.map((menu,index)=>{
                    return <p key={index} className={'user-select-none'}><i>{menu.Room}</i> {getContent(menu)}</p>
                })}
            </div>
            {Type === 'Dinner' ? <p className={'text-muted user-select-none'}>(Κ: Κυρίως, Ε: Επιδόρπιο)</p> :
                <p className={'text-muted user-select-none'}>(Π: Πακέτο)</p>}
        </>
    )
}
