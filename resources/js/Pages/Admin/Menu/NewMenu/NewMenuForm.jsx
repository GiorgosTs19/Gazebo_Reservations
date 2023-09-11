import {Button, Card, Col, Form, Row, Stack} from "react-bootstrap";
import React, {useContext,useRef, useState} from 'react';
import {Inertia} from "@inertiajs/inertia";
import {InnerWidthContext} from "../../../../Contexts/InnerWidthContext";
import {MenuTypeSelectionRadios} from "../Components/MenuTypeSelectionRadios";
import {MenuCategorySelectionRadios} from "../Components/MenuCategorySelectionRadios";
import {MenuNameField} from "../Components/MenuNameField";
import {MenuItemsList} from "../Components/MenuItemsList";
import {AddSVG} from "../../../../SVGS/AddSVG";

export function NewMenuForm({MenuTabKeys}) {
    const [menuItems, setMenuItems] = useState([]),
    [submitButtonClicked, setSubmitButtonClicked] = useState(false),
    [menuName,setMenuName] = useState(''),formRef = useRef(),
    innerWidth = useContext(InnerWidthContext),
    [menuType,setMenuType] = useState('Dinner'),
    [menuCategory,setMenuCategory] = useState('Main'),
    {activeMenusTabKey,setActiveMenusTabKey} = MenuTabKeys;

    const handleAddMenuItem = () => {
        setMenuItems(prevItems => [...prevItems,
            {Name:'',is_lactose_free:false,is_gluten_free:false,is_wheat_free:false,
                is_vegan:false,is_vegetarian:false
        }]);
    },
    handleChangeName = (e) => {
        setMenuName(e.target.value);
    };

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
            return !menuItems.some((item) => item.Name.trim() !== '');
    },

    handleSubmit = (e) => {
        setSubmitButtonClicked(true);
        e.preventDefault();
        if(!checkRequirements())
            Inertia.post(route('Create_Menu'),{Menu_Name:menuName,Menu_Items:menuItems,
                Menu_Type:menuType,Menu_Category:menuCategory},{onSuccess:()=>{
                    return setActiveMenusTabKey('Existing');
                }});
    },
    handleTypeChange = (value) => {
        setMenuType(value);
    },
    handleCategoryChange = (value) => {
        setMenuCategory(value);
    };

    return (
        <Form className={'p-1'} onSubmit={handleSubmit} ref={formRef} style={{overflowY:'auto',maxHeight:'80vh', overflowX:'hidden'}}>
            <Card className="p-1 mx-sm-auto mx-3 border-0">
                <Row>
                    <Col md={{span:7,order:1}} lg={{span:3,order:2}} className={'mx-auto ' + (innerWidth > 992 ? ' border-end' : ' border-bottom')} style={{ width:(innerWidth >992 ? '' : 'fit-content')}}>
                        <Card.Header as={'div'} style={{backgroundColor:'white',width:'fit-content'}} className={'border-0 my-3 mx-auto'}>
                            <MenuTypeSelectionRadios menuType={menuType} handleTypeChange={handleTypeChange}>
                            </MenuTypeSelectionRadios>
                            {menuType === 'Dinner' &&
                            <MenuCategorySelectionRadios menuCategory={menuCategory} handleCategoryChange={handleCategoryChange}></MenuCategorySelectionRadios>}
                            <MenuNameField menuType={menuType} menuName={menuName} submitButtonClicked={submitButtonClicked}
                            handleChangeName={handleChangeName}></MenuNameField>
                        </Card.Header>
                    </Col>
                    <Col md={{span:12,order:3}} lg={{span:6,order:2}}>
                        <Card.Body as={'div'}>
                            <MenuItemsList menuItemsState={{menuItems,setMenuItems}} checkRequirements={checkRequirements}
                            action={'Create'}>
                            </MenuItemsList>
                        </Card.Body>
                    </Col>
                    <Col md={{span:5,order:2}} lg={{span:3,order:3}} className={innerWidth > 992 ? 'border-start' : 'border-top'}>
                        <Card.Footer style={{backgroundColor:'white'}} className={'border-top-0 my-5'}>
                            <Stack gap={3}>
                                <Card.Subtitle className="mb-2 text-muted text-wrap mx-auto" style={{width:'fit-content'}}>
                                    Πιέστε το <h5 className={'text-success'}>[+]</h5> για να προσθέσετε προϊόντα.
                                </Card.Subtitle>
                                <AddSVG onClick={handleAddMenuItem} width={30} height={30}
                                    className={'mx-auto'}/>
                                <Button type={'submit'} style={{width:'fit-content'}} onClick={handleSubmit}
                                    disabled={!(menuName !== '' && menuItems.length>0)} className={'mx-auto rounded-5 shadow-sm'}>
                                    Δημιουργία
                                </Button>
                            </Stack>
                        </Card.Footer>
                    </Col>
                </Row>
            </Card>
        </Form>
    )
}
