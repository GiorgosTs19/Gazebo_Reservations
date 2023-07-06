import {Card, FloatingLabel, Form} from "react-bootstrap";

export function MenuNameField({menuType,menuName,handleChangeName,submitButtonClicked}) {
    return (
        <>
            <FloatingLabel controlId="floatingInput" label={"Όνομα " +
                (menuType === 'Dinner' ? 'Μενού' : 'Πακέτου')} className="my-3 mx-auto"
                           style={{ width: "fit-content" }}>
                <Form.Control
                    type="text" placeholder="Όνομα Menu" style={{ width: "auto" }} onChange={handleChangeName}
                    value={menuName} required isInvalid={submitButtonClicked && menuName.value === ""}
                />
                <Form.Control.Feedback type="invalid">Το όνομα του Menu είναι υποχρεωτικό.</Form.Control.Feedback>
            </FloatingLabel>
            <Card.Subtitle className="my-2 text-muted text-wrap mx-auto" style={{width:'fit-content'}}>
                <p className={''}>* Όλα τα πεδία είναι υποχρεωτικά.</p>
            </Card.Subtitle>
            <Card.Subtitle as={'div'} className="mb-2 text-muted text-wrap mx-auto" style={{width:'fit-content'}}>
                <p className={'mb-0'}>** Αν κάποιο προϊόν δεν χρειάζεται,</p>
                <p className={'mt-0'}> αφαιρέστε το για να συνεχίσετε.</p>
            </Card.Subtitle>
        </>
    )
}
