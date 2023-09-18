import {Col, Image, Row} from "react-bootstrap";
import {useContext} from "react";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {FormProgressContext} from "../../../Contexts/FormProgressContext";
import gsap from "gsap";

export function TypeOptionsRow() {
    const {bookingDetails, setBookingDetails} = useContext(BookingDetailsContext),
        {progress, setProgress} = useContext(FormProgressContext),
        handleImageClick = (value) => {
            if(progress === 'Type') {
                setBookingDetails(prev=>{return{...prev,type:value,more_rooms:false}});
                switch (value) {
                    case 'Bed' : {
                        gsap.fromTo('#sun-img', 2, {rotation:0, transformOrigin:"50% 50%"},{rotation:180, transformOrigin:"50% 50%"});
                        break;
                    }
                    case 'Dinner' : {
                        gsap.fromTo('#moon-img', 1, {rotation:90, transformOrigin:"50% 50%"},{rotation:0, transformOrigin:"50% 50%"});
                        break;
                    }
                }
            }
        };
    return (
        <Row className={'m-auto w-100'}>
            <Col className={'p-2 border-blue border border-start-0 border-top-0 border-bottom-0 d-flex ' + (progress !== 'Type' ? 'opacity-50' : '')}
                 style={{backgroundColor:bookingDetails.type ==='Dinner' ? 'rgba(79,158,178,0.7)' : '',borderRadius:'15px 0 0 15px',userSelect:'none',
                     cursor:progress === 'Type' ? "pointer" : 'default'}}
                 onClick={()=>handleImageClick('Dinner')}>
                <Image src={'Images/Icons/moon.png'} width={'20px'} height={'20px'} className={'ms-2 my-auto'} id={'moon-img'}></Image>
                <h6 className={'m-auto'}>
                    Seaside Dinner
                </h6>
            </Col>
            <Col className={'p-2 d-flex me-0 me-lg-3 ' + (progress !== 'Type' ? 'opacity-50' : '')}
                 style={{backgroundColor:bookingDetails.type ==='Bed'?'rgba(217,232,112,0.7)':''
                     ,borderRadius:'0 15px 15px 0',userSelect:'none',cursor:progress === 'Type' ? "pointer" : 'default'}} onClick={()=>handleImageClick('Bed')}>
                <h6 className={'m-auto'}>
                    Sun Bed
                </h6>
                <Image src={'Images/Icons/sun.png'} width={'24px'} height={'24px'} id={'sun-img'} className={'my-auto'}></Image>
            </Col>
        </Row>
    )
}
