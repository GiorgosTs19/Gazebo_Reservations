import {useEffect, useState} from "react";
import {Alert} from "react-bootstrap";


export function AlertMessage({duration=5, variant = 'primary',header ='', message = '',
                             onClose = ()=>{}, className=''}) {
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        onClose();
    }

    useEffect(()=>{
        if(show)
            setTimeout(()=>{
                handleClose();
                console.log('Done')
            },duration*1000);
    },[show]);


    return (
        <Alert variant={variant} show={show} onClose={handleClose} dismissible className={className}>
            <Alert.Heading>{header}</Alert.Heading>
            <p>
                {message}
            </p>
        </Alert>
    );
}
