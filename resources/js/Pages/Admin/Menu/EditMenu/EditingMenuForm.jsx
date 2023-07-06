import React, {useContext, useEffect, useRef, useState} from "react";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {Inertia} from "@inertiajs/inertia";
import {Button, Card, Col, FloatingLabel, Form, InputGroup, Row, Stack} from "react-bootstrap";
import {MenuEditModeContext} from "../../Contexts/MenuEditModeContext";
import {ActiveTabKeyContext} from "../../Contexts/ActiveTabKeyContext";
import {isEqual} from "lodash";
import {MenuTypeSelectionRadios} from "../Components/MenuTypeSelectionRadios";
import {MenuCategorySelectionRadios} from "../Components/MenuCategorySelectionRadios";
import {MenuNameField} from "../Components/MenuNameField";
import {MenuItemsList} from "../Components/MenuItemsList";
import {CancelEditingModal} from "./CancelEditingModal";

export function EditingMenuForm({menu}) {
    const [originalMenu, setOriginalMenu] = useState(menu),
        [menuItems, setMenuItems] = useState(menu?.Items),
        [submitButtonClicked, setSubmitButtonClicked] = useState(false),
        [menuName,setMenuName] = useState(menu.Name),formRef = useRef(),
        innerWidth = useContext(InnerWidthContext),
        [menuType,setMenuType] = useState(menu?.Type),
        [menuCategory,setMenuCategory] = useState(menu?.Category),
        {editingMenu,setEditingMenu} = useContext(MenuEditModeContext),
        {activeTabKey, setActiveTabKey} = useContext(ActiveTabKeyContext),
        [hasChanges, setHasChanges] = useState(false);

    const checkFormChanges = () => {
        const formHasChanges =
            menuName !== originalMenu?.Name || !isEqual(menuItems, originalMenu?.Items) ||
            menuType !== originalMenu.Type || menuCategory !== originalMenu.Category;
        console.log(isEqual(menuItems, originalMenu?.Items));
        setHasChanges(formHasChanges);
    };

    const handleAddMenuItem = () => {
            setMenuItems(prevItems => [...prevItems, {Name:'',is_lactose_free:false,is_gluten_free:false,is_wheat_free:false,
                is_vegan:false,is_vegetarian:false
            }]);
        },
        handleChangeName = (e) => {
            setMenuName(e.target.value);
        };

    useEffect(() => {
        checkFormChanges();
    }, [menuName, menuItems, menuCategory, menuType]);


    const checkRequirements = () => {
            if(menuName === '')
                return true
            if(menuCategory === '')
                return true
            if(menuType === '')
                return true
            if(menuItems.length === 0)
                return true;
            else if(menuItems.length > 0)
                return !menuItems?.some((item) => item.Name.trim() !== '');
        };

    const handleSubmit = (e) => {
        setSubmitButtonClicked(true);
        e.preventDefault();
        if(!checkRequirements())
            Inertia.patch(route('Edit_Menu'),{Menu_ID:menu.id,Menu_Name:menuName,Menu_Items:menuItems,
                Menu_Type:menuType,Menu_Category:menuCategory},
                {preserveState:true,preserveScroll:true,onSuccess:
                    ()=>{
                        setActiveTabKey('Existing');
                        setEditingMenu(null);
                    }
                });
    };
    const handleTypeChange = (value) => {
        setMenuType(value);
    };

    const handleCategoryChange = (value) => {
        setMenuCategory(value);
    };

    return (
        <Form className={'p-1'} onSubmit={handleSubmit} ref={formRef} style={{overflowY:'auto',maxHeight:'80vh', overflowX:'hidden'}}>
            <Card className="p-1 mx-sm-auto mx-3 border-0">
                <Row>
                    <Col md={{span:7,order:1}} lg={{span:3,order:2}} className={'mx-auto ' + (innerWidth > 992 ? ' border-end' : ' border-bottom')}
                         style={{ width:(innerWidth >992 ? '' : 'fit-content')}}>
                        <Card.Header as={'div'} style={{backgroundColor:'white',width:'fit-content'}} className={'border-0 my-3 mx-auto'}>
                            <MenuTypeSelectionRadios handleTypeChange={handleTypeChange} menuType={menuType}>
                            </MenuTypeSelectionRadios>
                            {menuType === 'Dinner' &&
                                <MenuCategorySelectionRadios handleCategoryChange={handleCategoryChange} menuCategory={menuCategory}>
                                </MenuCategorySelectionRadios>
                            }
                            <MenuNameField menuType={menuType} handleChangeName={handleChangeName}
                            submitButtonClicked={submitButtonClicked} menuName={menuName}></MenuNameField>
                        </Card.Header>
                    </Col>
                    <Col md={{span:12,order:3}} lg={{span:6,order:2}}>
                        <Card.Body as={'div'}>
                            <MenuItemsList menu={menu} menuItemsState={{menuItems,setMenuItems}} checkRequirements={checkRequirements}
                            action={'Edit'}>
                            </MenuItemsList>
                        </Card.Body>
                    </Col>
                    <Col md={{span:5,order:2}} lg={{span:3,order:3}} className={innerWidth > 992 ? 'border-start' : 'border-top'}>
                        <Card.Footer style={{backgroundColor:'white'}} className={'border-top-0 my-5'}>
                            <Stack gap={3}>
                                <Card.Subtitle className="mb-2 text-muted text-wrap mx-auto" style={{width:'fit-content'}}>
                                    Πιέστε το <h5 className={'text-success'}>[+]</h5> για να προσθέσετε προϊόντα.
                                </Card.Subtitle>
                                <Button variant="success" style={{width:'fit-content'}} onClick={handleAddMenuItem}
                                        className={'mx-auto rounded-5 shadow-sm'}>
                                    +
                                </Button>
                                {!hasChanges && <p className={'text-danger'}>Δεν έχει γίνει κάποια αλλαγή.</p>}
                                <Button type={'submit'} variant={'outline-success'} style={{width:'fit-content'}} onClick={handleSubmit}
                                        disabled={!hasChanges || !(menuName !== '' && menuItems.length>0)} className={'mx-auto rounded-5 shadow-sm'}>
                                    Αποθήκευση Αλλαγών
                                </Button>
                                <CancelEditingModal hasChanges={hasChanges} checkRequirements={checkRequirements}
                                menu={[menu.id,menuName,menuItems,menuType,menuCategory]}></CancelEditingModal>
                            </Stack>
                        </Card.Footer>
                    </Col>
                </Row>
            </Card>
        </Form>
    )
}
