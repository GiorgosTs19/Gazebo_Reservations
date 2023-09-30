import {useEffect, useState} from "react";
import {Alert, Offcanvas} from "react-bootstrap";
import {InfoSVG} from "../SVGS/InfoSVG";
import useUpdateEffect from "../CustomHooks/useUpdateEffect";


export function AlertMessage({duration=5, variant = 'primary',header ='', errors = {},
                             onClose = ()=>{}, className='', shouldShow, bookingDetails}) {
    const [show, setShow] = useState(shouldShow);

    const handleClose = () => {
        setShow(false);
        onClose();
    }

    useEffect(()=>{
        setShow(shouldShow)
    },[shouldShow]);

    const isMobile = innerWidth < 768;

    const Errors = Object.keys(errors).map((error, index)=>{
        return <Alert key={index} variant={variant} show={show} onClose={handleClose} dismissible={!isMobile} className={`${className} ${isMobile ? '' : 'mt-3'}`}>
            {!isMobile && <Alert.Heading>{header}</Alert.Heading>}
            <span>
                <InfoSVG className={'m-auto'}/> {errors[error]}
            </span>
        </Alert>
    });

    return (
        !isMobile ? Errors :
            <Offcanvas show={show} onHide={handleClose} placement={"bottom"} className={'bg-light overflow-y-auto'}
                       style={{height:`fit-content`, borderRadius:'30px 30px 0 0 '}}>
                <Offcanvas.Header closeButton className={'py-2 px-5 text-center d-flex'}>
                    <Offcanvas.Title >{header}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className={'pt-1 pb-0 px-2 text-center'}>
                    {Errors}
                </Offcanvas.Body>
            </Offcanvas>
    );
}
