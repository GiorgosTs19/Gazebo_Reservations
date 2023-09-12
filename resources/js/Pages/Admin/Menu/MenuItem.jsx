import {Image, ListGroup} from "react-bootstrap";

export function MenuItem({item,inModal = false, className = ''}) {
    const hasAllergens = item.is_gluten_free || item.is_lactose_free || item.is_wheat_free || item.is_vegan || item.is_vegetarian;
    return (
        <ListGroup.Item as="li"  key={item.id} className={`border-start-0 border-end-0 border-top-0 text-start ${className}`}>
            <span className={'text-start'}>{item.Name}</span>
            {inModal && hasAllergens ?
                <>
                    {item.is_gluten_free && <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/gluten_free.png'} width={20} height={20}/></span>}
                    {item.is_lactose_free && <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/lactose_free.png'} width={20} height={20}/></span>}
                    {item.is_wheat_free && <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/wheat_free.png'} width={20} height={20}/></span>}
                    {item.is_vegan && <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/vegan.png'} width={20} height={20}/></span>}
                    {item.is_vegetarian && <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/vegetarian.png'} width={20} height={20}/></span>}
                </>
                :
                <>
                    {item.is_gluten_free && <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/gluten_free.png'} width={20} height={20}/></span>}
                    {item.is_lactose_free && <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/lactose_free.png'} width={20} height={20}/></span>}
                    {item.is_wheat_free && <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/wheat_free.png'} width={20} height={20}/></span>}
                    {item.is_vegan && <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/vegan.png'} width={20} height={20}/></span>}
                    {item.is_vegetarian && <span className={'mx-2'}><Image src={'Images/Icons/MenuAllergensIcons/vegetarian.png'} width={20} height={20}/></span>}
                </>
            }
        </ListGroup.Item>
    )
}
