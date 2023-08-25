import {Col, Row, Tab, Tabs} from "react-bootstrap";
import {NewMenuForm} from "./NewMenu/NewMenuForm";
import {ExistingMenus} from "./ExistingMenus";
import {useContext, useState} from "react";
import {EditingMenuForm} from "./EditMenu/EditingMenuForm";
import {MenuEditModeContext} from "../Contexts/MenuEditModeContext";
import {ActiveTabKeyContext} from "../Contexts/ActiveTabKeyContext";

export function MenuAdminPanel({Menus,activeKey}) {
    const {activeMenusTabKey,setActiveMenusTabKey} = activeKey,
    {editingMenu,setEditingMenu} = useContext(MenuEditModeContext);
    const renderContent = () => {
        // if(activeTabKey === 'Edit')
        switch (activeMenusTabKey) {
            case 'Existing' : {
                return <ExistingMenus Menus={Menus}></ExistingMenus>;
            }
            case 'New' : {
                return <NewMenuForm MenuTabKeys={{activeMenusTabKey,setActiveMenusTabKey}}></NewMenuForm>;
            }
            case 'Edit' : {
                return <EditingMenuForm menu={editingMenu}></EditingMenuForm>;
            }
        }
    }
    return (
        <div className={'text-center h-100'}>
            <Row className={'p-2 h-100'}>
                <ActiveTabKeyContext.Provider value={{activeMenusTabKey,setActiveMenusTabKey}}>
                    {renderContent()}
                </ActiveTabKeyContext.Provider>
            </Row>
        </div>
    )
}
