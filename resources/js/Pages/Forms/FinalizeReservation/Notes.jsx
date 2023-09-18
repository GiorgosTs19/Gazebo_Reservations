import {Card, Form} from "react-bootstrap";
import {BookingDetailsContext} from "../../../Contexts/BookingDetailsContext";
import {RefContext} from "../../../Contexts/RefContext";
import {useContext, useEffect, useState} from "react";
import {ChevronUpSVG} from "../../../SVGS/ChevronUpSVG";
import {ChevronDownSVG} from "../../../SVGS/ChevronDownSVG";

export function Notes() {
    const {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext),
    [show, setShow] = useState(false),
    ContainerRef = useContext(RefContext),
    // Handles the change of the booking's notes
    handleNotesChange = (e) => {
        if(e.target.value.length > 200)
            return;
        setBookingDetails({...bookingDetails,notes:e.target.value});
    };

    useEffect(()=>{
        if(!show) {
            return setBookingDetails({...bookingDetails,notes:''});
        }
        ContainerRef.current?.scrollTo({top: ContainerRef.current?.scrollHeight,behavior:'smooth'});

    },[show]);

    return (
        <>
            <div className={`d-flex user-select-none`} style={{cursor:'pointer'}} onClick={()=>setShow(!show)}>
                <Card.Subtitle className={'mb-2 mx-auto user-select-none'}>Additional Notes</Card.Subtitle>
                {show && <ChevronUpSVG className={'justify-content-end mb-2'} height={20} width={20} onClick={()=>setShow(false)}/>}
            </div>
            {show ?
                <>
                    <Form.Control as="textarea" placeholder="Notes"
                                  style={{height: '70px', resize: 'none'}}
                                  value={bookingDetails.notes} onChange={handleNotesChange}/>
                    <p className={'mb-0 mt-2 info-text'}>{bookingDetails.notes.length} / 200 chars</p>
                </> : <ChevronDownSVG onClick={() => setShow(true)} className={'m-auto'}/>}
        </>
    )
}
