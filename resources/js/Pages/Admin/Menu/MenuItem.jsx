import {ListGroup} from "react-bootstrap";

export function MenuItem({item}) {
    return (
        <ListGroup.Item as="li" key={item.id}>{item.Name}</ListGroup.Item>
    )
}
