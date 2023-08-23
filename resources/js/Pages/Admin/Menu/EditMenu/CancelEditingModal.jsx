import {Button, Modal} from "react-bootstrap";
import React, {useContext} from "react";
import {useState} from "react";
import {MenuEditModeContext} from "../../Contexts/MenuEditModeContext";
import {ActiveTabKeyContext} from "../../Contexts/ActiveTabKeyContext";
import {Inertia} from "@inertiajs/inertia";

export function CancelEditingModal({hasChanges,menu, checkRequirements}) {
    const [show, setShow] = useState(false),
    {editingMenu,setEditingMenu} = useContext(MenuEditModeContext),
    {activeMenusTabKey,setActiveMenusTabKey}  = useContext(ActiveTabKeyContext),
    [menu_id,menuName,menuItems,menuType,menuCategory] = menu;

    const handleClose = () => {setShow(false)};
    const handleShow = () => {
        if(hasChanges)
            setShow(true);
        else {
            setEditingMenu(null);
            setActiveMenusTabKey('Existing');
        }
    };

    const handleCancelEditing = () => {
        setEditingMenu(null);
        setActiveMenusTabKey('Existing');
        setShow(false)
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!checkRequirements())
            Inertia.patch(route('Edit_Menu'),{Menu_ID:menu_id,Menu_Name:menuName,Menu_Items:menuItems,
                    Menu_Type:menuType,Menu_Category:menuCategory},
                {preserveState:true,preserveScroll:true,onSuccess:
                        ()=>{
                            setActiveMenusTabKey('Existing');
                            setEditingMenu(null);
                            setShow(false);
                        }
                });
    };
    return (
        <>
            <Button type={'button'} variant={'outline-danger'} style={{width:'fit-content'}} onClick={handleShow}
                    className={'mx-auto rounded-5 shadow-sm'}>
                Ακύρωση Επεξεργασίας
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ακύρωση Επεξεργασίας Μενού {editingMenu.Name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={'text-center'}>
                    <p className={'text-danger'}>Είστε σίγουροι ότι θέλετε να σταματήσετε την επεξεργασία του Μενού;</p>
                    <p className={'text-danger'}> Οι αλλαγές που έχετε κάνει θα χαθούν.</p>
                    <p className={'text-success'}>Αν θέλετε να διατηρηθούν , πατήστε αποθήκευση αλλαγών.</p>
                    <p className={'mx-auto text-secondary'}>Αν θέλετε να κάνετε περαιτέρω αλλαγές πιέστε το [ Χ ].</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'outline-danger'} onClick={handleCancelEditing} className={'mx-auto rounded-5 shadow-sm'}>
                        Ακύρωση Επεξεργασίας
                    </Button>
                    <Button type={'submit'} variant={'outline-success'} style={{width:'fit-content'}} onClick={handleSubmit}
                        disabled={!hasChanges || !(menuName !== '' && menuItems.length>0)} className={'mx-auto rounded-5 shadow-sm'}>
                        Αποθήκευση Αλλαγών
                    </Button>
                </Modal.Footer>
            </Modal></>
    )
}
