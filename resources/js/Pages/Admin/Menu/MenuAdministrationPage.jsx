import {Col, Row, Tab, Tabs} from "react-bootstrap";
import {NewMenuForm} from "./NewMenu/NewMenuForm";
import {ExistingMenus} from "./ExistingMenus";
import {useState} from "react";
import {EditingMenuForm} from "./EditMenu/EditingMenuForm";
import {MenuEditModeContext} from "../Contexts/MenuEditModeContext";
import {ActiveTabKeyContext} from "../Contexts/ActiveTabKeyContext";

export function MenuAdminPanel({Menus}) {
    const [editingMenu,setEditingMenu] = useState(null),
    [activeTabKey, setActiveTabKey] = useState('Existing');
    const handleTabSelect = (k) => {
        // if(activeTabKey === 'Edit')
        setActiveTabKey(k)
    }
    return (
        <div className={'text-center'}>
            <h4 className={''}>Διαχείριση Menu</h4>
            <Row className={'p-2'}>
                <MenuEditModeContext.Provider value={{editingMenu,setEditingMenu}}>
                    <ActiveTabKeyContext.Provider value={{activeTabKey, setActiveTabKey}}>
                        <Tabs defaultActiveKey="Existing" className="mb-3" activeKey={activeTabKey}
                              onSelect={(k) => handleTabSelect(k)}>
                            <Tab eventKey="Existing" title="Υπάρχοντα Menu">
                                <Col>
                                    <ExistingMenus Menus={Menus}></ExistingMenus>
                                </Col>
                            </Tab>
                            <Tab eventKey="New" title="Δημιουργία Menu">
                                <Col>
                                    <NewMenuForm></NewMenuForm>
                                </Col>
                            </Tab>
                            {editingMenu !== null &&
                                <Tab title={'Επεξεργασία ' + editingMenu.Name} eventKey={'Edit'}>
                                    <EditingMenuForm menu={editingMenu}></EditingMenuForm>
                            </Tab>}
                        </Tabs>
                    </ActiveTabKeyContext.Provider>
                </MenuEditModeContext.Provider>
            </Row>
        </div>
    )
}
