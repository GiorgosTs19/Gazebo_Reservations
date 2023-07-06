import {Form} from "react-bootstrap";

export function MenuCategorySelectionRadios({menuCategory,handleCategoryChange}) {
    return (
        <div className={'my-2 border-bottom p-3'}>
            <h6>Κατηγορία Μενού</h6>
            <Form.Check
                inline
                label="Κυρίως Πιάτα"
                name="Menu_Category"
                type={'radio'}
                checked={menuCategory === 'Main'}
                onChange={() => {handleCategoryChange('Main')}}
            />
            <Form.Check
                inline
                label="Επιδόρπιο"
                name="Menu_Category"
                type={"radio"}
                checked={menuCategory === 'Dessert'}
                onChange={() => {handleCategoryChange('Dessert')}}/>
        </div>
    )
}
