import {Form} from "react-bootstrap";

export function MenuTypeSelectionRadios({menuType, handleTypeChange}) {
    return (
        <div className={'my-2 border-bottom p-2'}>
            <h6>Τύπος Μενού</h6>
            <Form.Check
                inline
                label="Βραδινό Μενού"
                name="Menu_Type"
                type={'radio'}
                checked={menuType === 'Dinner'}
                onChange={()=>{handleTypeChange('Dinner')}}
            />
            <Form.Check
                inline
                label="Πρωινό Πακέτο"
                name="Menu_Type"
                type={"radio"}
                checked={menuType === 'Bed'}
                onChange={()=>{handleTypeChange('Bed')}}
            />
        </div>
    )
}
