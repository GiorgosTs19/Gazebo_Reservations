import {Button, Card, FloatingLabel, Form, InputGroup, Stack} from "react-bootstrap";
import React, {useRef, useState} from 'react';
import {Inertia} from "@inertiajs/inertia";

export function NewMenuForm() {
    const [menuItems, setMenuItems] = useState([]),
    [submitButtonClicked, setSubmitButtonClicked] = useState(false),
    [menuName,setMenuName] = useState(''),formRef = useRef();

    const handleAddMenuItem = () => {
        setMenuItems(prevItems => [...prevItems, '']);
    },
    handleChangeName = (e) => {
        setMenuName(e.target.value);
    };

    const handleMenuItemChange = (e, index) => {
        const value = e.target.value;
        setMenuItems(prevItems => {
            const newItems = [...prevItems];
            newItems[index] = value;
            return newItems;
        });
    },
    handleDeleteMenuItem = (index) => {
        const updatedMenuItems = [...menuItems];
        updatedMenuItems.splice(index, 1);
        setMenuItems(updatedMenuItems);
    },
    checkRequirements = () => {
        if(menuName === '')
            return true
        if(menuItems.length === 0)
            return true;
        else if(menuItems.length > 0)
            return !menuItems.some((str) => str.trim() !== '');
    },

    handleSubmit = (e) => {
        setSubmitButtonClicked(true);
        // e.preventDefault();
        if(!checkRequirements())
            Inertia.post(route('Create_Menu'),{Menu_Name:menuName,Menu_Items:menuItems});
    };
    return (
        <>
            <Card className={'p-2'}>
                <Form className={'p-1'} onSubmit={handleSubmit} ref={formRef}>
                    <Card.Header as="h6">
                        <FloatingLabel controlId="floatingInput" label="Όνομα Menu" className="my-3 mx-auto" style={{ width: "fit-content" }}>
                            <Form.Control
                                type="text" placeholder="Όνομα Menu" style={{ width: "auto" }} onChange={handleChangeName}
                                value={menuName} required isInvalid={submitButtonClicked && menuName.value === ""}
                            />
                            <Form.Control.Feedback type="invalid">Το όνομα του Menu είναι υποχρεωτικό.</Form.Control.Feedback>
                        </FloatingLabel>
                        <Card.Subtitle className="mb-2 text-muted text-wrap mx-auto" style={{width:'fit-content'}}>
                            Πιέστε το <h5 className={'text-success'}>[+]</h5> για να προσθέσετε προϊόντα.
                        </Card.Subtitle>
                        <Card.Subtitle className="my-2 text-muted text-wrap mx-auto" style={{width:'fit-content'}}>
                            <p className={'text-bg-warning'}>* Όλα τα πεδία είναι υποχρεωτικά.</p>
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted text-wrap mx-auto" style={{width:'fit-content'}}>
                            <p className={'text-bg-warning'}>** Αν κάποιο προϊόν δεν χρειάζεται, αφαιρέστε το για να συνεχίσετε.</p>
                        </Card.Subtitle>
                    </Card.Header>
                    <Card.Body style={{overflowY:'auto',height:350}}>
                        {/*<Card.Text>*/}
                        {/*    Some quick example text to build on the card title and make up the*/}
                        {/*    bulk of the card's content.*/}
                        {/*</Card.Text>*/}

                            {/*<h6>Προσθέστε Προϊόντα</h6>*/}
                            <Stack gap={2}>
                                {menuItems.map((item, index) => (
                                    <InputGroup size="sm" className="mb-3 mx-auto" key={index} >
                                        <Form.Control type="text" value={item} placeholder={'Προϊόν ' + (index + 1)}
                                                      onChange={(e) => handleMenuItemChange(e, index)}
                                                      className={'mx-auto text-center'} size={'sm'} required isInvalid={submitButtonClicked && item === ""}
                                        />
                                        <Button variant={'danger'} onClick={() => handleDeleteMenuItem(index)}>
                                            X
                                        </Button>
                                        <Form.Control.Feedback type="invalid">Το πεδίο είναι υποχρεωτικό.</Form.Control.Feedback>
                                    </InputGroup>
                                ))}
                            </Stack>
                            <InputGroup className="my-3 mx-auto" style={{ width: "fit-content" }}>
                                <Button variant="success" size={'lg'} onClick={handleAddMenuItem}>
                                    +
                                </Button>
                            </InputGroup>
                    </Card.Body>
                    <Card.Footer>
                        {checkRequirements() && <>
                            <p className={'text-danger'}>Προσθέστε τουλάχιστον ένα προϊόν</p>
                            <p className={'text-danger'}>( Καθώς και το όνομά του )</p>
                        </>
                            }
                        <Button type={'submit'} onClick={handleSubmit} disabled={!(menuName !== '' && menuItems.length>0)}>
                            Δημιουργία
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </>
    )
}
