import {Accordion, Button, ListGroup} from "react-bootstrap";
import {MenuItem} from "./MenuItem";
import {MenuDeletionModal} from "./MenuDeletionModal";

export function Menu({menu,index,inModal}) {
    return (
        <Accordion.Item eventKey={index} key={menu.id}>
            <Accordion.Header>{menu.Name}</Accordion.Header>
            <Accordion.Body>
                {!inModal && <Button variant={'outline-info'} className={'me-2 mb-2'}>Επεξεργασία</Button>}
                {!inModal && <MenuDeletionModal menu={menu}></MenuDeletionModal>}
                <ListGroup as="ol" numbered>
                    {menu.items.map((item)=>{
                        return <MenuItem item={item} key={item.id}></MenuItem>
                    })}
                </ListGroup>
            </Accordion.Body>
        </Accordion.Item>
    )
}
