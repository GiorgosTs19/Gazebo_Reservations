import {Image, ListGroup} from "react-bootstrap";

export function MenuItem({item,inModal = false}) {
    const hasAllergens = item.is_gluten_free || item.is_lactose_free || item.is_wheat_free || item.is_vegan || item.is_vegetarian;
    return (
        <ListGroup.Item as="li"  key={item.id} className={'border-start-0 border-end-0 border-top-0'}>
            {item.Name}
            {inModal && hasAllergens ?
                <p>
                    {item.is_gluten_free && <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/gluten_free.png'}/></span>}
                    {item.is_lactose_free && <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/lactose_free.png'}/></span>}
                    {item.is_wheat_free && <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/wheat_free.png'}/></span>}
                    {item.is_vegan && <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/vegan.png'}/></span>}
                    {item.is_vegetarian && <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/vegetarian.png'}/></span>}
                </p>
                :
                <>
                    {item.is_gluten_free && <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/gluten_free.png'}/></span>}
                    {item.is_lactose_free && <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/lactose_free.png'}/></span>}
                    {item.is_wheat_free && <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/wheat_free.png'}/></span>}
                    {item.is_vegan && <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/vegan.png'}/></span>}
                    {item.is_vegetarian && <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/vegetarian.png'}/></span>}
                </>
            }
        </ListGroup.Item>
    )
}
