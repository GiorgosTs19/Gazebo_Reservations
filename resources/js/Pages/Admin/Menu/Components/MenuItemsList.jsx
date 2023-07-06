import {Button, Col, Form, Image, InputGroup, ListGroup, Row, Stack} from "react-bootstrap";
import {useRef} from "react";
import {useEffect} from "react";
import {useState} from "react";

export function MenuItemsList({menuItemsState,checkRequirements,menu,action}) {
    const stackRef = useRef(null),
    [showToTopButton,setShowToTopButton]= useState(false),
    {menuItems,setMenuItems} = menuItemsState;

    const handleToTopClick = () => {
        stackRef.current.scrollTo({top:0});
    };

    const handleDeleteMenuItem = (index) => {
        const updatedMenuItems = [...menuItems];
        updatedMenuItems.splice(index, 1);
        setMenuItems(updatedMenuItems);
    };

    const handleMenuItemChange = (e, index,property_name) => {
        const value = e.target.value;
        // console.log(e.target.checked)
        setMenuItems(prevItems => {
            const newItems = [...prevItems];
            switch (property_name) {
                case 'is_vegan':{
                    newItems[index] = {...newItems[index],is_vegan:e.target.checked};
                    break;
                }
                case 'is_vegetarian' :{
                    newItems[index] = {...newItems[index],is_vegetarian:e.target.checked};
                    break;
                }
                case 'is_gluten_free':{
                    newItems[index] = {...newItems[index],is_gluten_free:e.target.checked};
                    break;
                }
                case 'is_lactose_free' :{
                    newItems[index] = {...newItems[index],is_lactose_free:e.target.checked};
                    break;
                }
                case 'is_wheat_free' : {
                    newItems[index] = {...newItems[index],is_wheat_free:e.target.checked};
                    break;
                }

                default : {
                    newItems[index] = {...newItems[index],Name:value};
                    break;
                }
            }
            return newItems;
        });
    };

    const getLabel = (index,item) =>{
        switch (action) {
            case 'Edit' : {
                if(menu.Items[index] === undefined)
                    return 'Προϊόν ' + (index + 1);
                return item.Name;
            }
            case 'Create' : {
                return 'Όνομα Προϊόντος ' + (index + 1);
            }
        }
        // action === 'Edit' ? (menu?.Items[index]?.Name  'Προϊόν ' + (index + 1)) : 'Προϊόν ' + (index + 1)
    };

    useEffect(() => {
        function handleScroll() {
            setShowToTopButton(stackRef?.current?.scrollTop > 0)
        }

        stackRef?.current?.addEventListener('scroll', handleScroll);

        return () => {
            stackRef?.current?.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(()=>{
        stackRef?.current.scrollTo({top:stackRef.current.scrollHeight});
    },[menuItems]);

    return (
        <>
            <Button type={"button"} className={'mb-3 rounded-5'} variant={'success'} onClick={handleToTopClick}
                    disabled={!showToTopButton} hidden={menuItems.length === 0}>&#8593;</Button>
            <ListGroup gap={2} className={'my-2  p-4'} style={{overflowY:'auto',
                maxHeight:'500px'}} ref={stackRef}>
                {menuItems.map((item, index) => (
                    <ListGroup.Item key={index} className={'border-end-0 border-start-0 border-top-0'}>
                        <Row>
                            <Col lg={3} md={6}>
                                <Stack>
                                    <span className={'mx-2 fw-bold fst-italic'}>Χωρίς</span>
                                    <Stack direction={'horizontal'} className={'mx-auto mx-md-auto mx-lg-auto'}>
                                        <Form.Check type={'checkbox'} label={'Λακτόζη'} className={'mx-2'} checked={menuItems[index].is_lactose_free}
                                            onChange={(e)=>handleMenuItemChange(e, index,'is_lactose_free')}/>
                                        <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/lactose_free.png'}/></span>
                                    </Stack>
                                    <Stack direction={'horizontal'} className={'mx-auto mx-md-auto mx-lg-auto'}>
                                        <Form.Check type={'checkbox'} label={'Γλουτένη'} className={'mx-2'} checked={menuItems[index].is_gluten_free}
                                            onChange={(e)=>handleMenuItemChange(e, index,'is_gluten_free')}/>
                                        <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/gluten_free.png'}/></span>
                                    </Stack>
                                    <Stack direction={'horizontal'} className={'mx-auto mx-md-auto mx-lg-auto'}>
                                        <Form.Check type={'checkbox'} label={'Σιτάρι'} className={'mx-2'} checked={menuItems[index].is_wheat_free}
                                            onChange={(e)=>handleMenuItemChange(e, index,'is_wheat_free')}/>
                                        <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/wheat_free.png'}/></span>
                                    </Stack>
                                </Stack>
                            </Col>
                            <Col lg={3} md={6} className={'mt-3 mt-md-0'}>
                                <Stack>
                                    <span className={'mx-2 fw-bold fst-italic'}>Ιδανικό για</span>
                                    <Stack direction={'horizontal'} className={'mx-auto mx-md-auto mx-lg-auto'}>
                                        <Form.Check type={'checkbox'} label={'Vegan'} className={'mx-2'} checked={menuItems[index].is_vegan}
                                            onChange={(e)=>handleMenuItemChange(e, index,'is_vegan')}/>
                                        <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/vegan.png'}/></span>
                                    </Stack>
                                    <Stack direction={'horizontal'} className={'mx-auto mx-md-auto mx-lg-auto'}>
                                        <Form.Check type={'checkbox'} label={'Vegetarian'} className={'mx-2'} checked={menuItems[index].is_vegetarian}
                                            onChange={(e)=>handleMenuItemChange(e, index,'is_vegetarian')}/>
                                        <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/vegetarian.png'}/></span>
                                    </Stack>
                                </Stack>
                            </Col>
                            <Col lg={6}>
                                <Stack direction={'horizontal'}>
                                    <InputGroup size="sm" className="mb-3" key={index} >
                                        <div className="input-container mx-auto">
                                            <input className="input-field mx-auto text-center" type="text" value={menuItems[index].Name} placeholder={item.Name}
                                                   onChange={(e) => handleMenuItemChange(e, index,'Name')}
                                                   required />
                                            <label htmlFor="input-field" className="input-label">{getLabel(index,item)}</label>
                                            <span className="input-highlight"></span>
                                        </div>
                                        <Form.Control.Feedback type="invalid">Το πεδίο είναι υποχρεωτικό.</Form.Control.Feedback>
                                    </InputGroup>
                                    <Button variant={'danger'} style={{height:'fit-content'}} className={'my-auto mx-auto mx-lg-0'} onClick={() => handleDeleteMenuItem(index)}>
                                        X
                                    </Button>
                                </Stack>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            {
                checkRequirements() && <>
                    <p className={'text-danger'}>Προσθέστε τουλάχιστον ένα προϊόν</p>
                    <p className={'text-danger'}>( Καθώς και το όνομά του )</p>
                </>
            }
        </>
    )
}
