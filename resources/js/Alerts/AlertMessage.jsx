import {useEffect, useState} from "react";
import {Alert} from "react-bootstrap";


export function AlertMessage({duration=5, variant = 'primary',header ='', errors = {},
                             onClose = ()=>{}, className=''}) {
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        onClose();
    }

    // useEffect(()=>{
    //     if(show)
    //         setTimeout(()=>{
    //             handleClose();
    //             console.log('Done')
    //         },duration*1000);
    // },[show]);

    // console.log('errors',errors)
    return (
        Object.keys(errors).map((error, index)=>{
            console.log('error',error)
            return <Alert key={index} variant={variant} show={show} onClose={handleClose} dismissible className={className}>
                <Alert.Heading>{header}</Alert.Heading>
                <p>
                    {errors[error]}
                </p>
            </Alert>
        })
    );
}
