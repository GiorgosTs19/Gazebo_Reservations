import {useState,useContext} from "react";
import {Card, Col, Image, Row} from "react-bootstrap";
import {SetTablesUnavailableModal} from "../../../Modals/SetTablesUnavailableModal";
import {GazebosContext} from "../../../../../Contexts/GazebosContext";

export function DinnerTableSettings() {
    const [reservations,setReservations] = useState([]),
    Gazebos = useContext(GazebosContext);

    // useEffect(()=>{
    //     setSelectedTable(0) ;
    // },[selectedDate]);

    // useEffect(()=> {
    //     if(selectedDate === '')
    //         return ;
    //     if(selectedDate === ['',''])
    //         return
    //         if(!Array.isArray(selectedDate)){
    //             return Inertia.get(route('Get_Availability_For_Date'), {date: getFormattedDate(selectedDate,'-',1),get_reservations:true},{
    //                 only:['availability_for_date'],
    //                 preserveScroll:true,
    //                 preserveState:true,
    //                 onSuccess:(res)=>{
    //                     console.log('Response From Single Date',res.props)
    //                     setReservations(res.props.availability_for_date) ;
    //                 }
    //             });
    //         }
    //         else {
    //             return Inertia.get(route('Get_Availability_For_Dates'), {date_start: getFormattedDate(selectedDate[0],'-',1),
    //                 date_end:getFormattedDate(selectedDate[1],'-',1)},{
    //                 only:['availability_for_date_range'],
    //                 preserveScroll:true,
    //                 preserveState:true,
    //                 onSuccess:(res)=>{
    //                     console.log('Response From Range',res.props)
    //                     setReservations(res.props.availability_for_date_range);
    //                 }
    //             });
    //         }
    // },[selectedDate]);
    const renderGazebos = () => {
        let gazeboChunks = [];
        for(let i=0;i<Gazebos.length;i+=2) {
            gazeboChunks = [...gazeboChunks,Gazebos.slice(i,i+2)];
        }
        return gazeboChunks.map((chunk,index) => {
            return <Row className={'my-0 my-xxl-auto user-select-none'} key={`Gazebo_Row${index}`}>
                {
                    chunk.map((gazebo)=>{
                        return <Col key={`Gazebo${gazebo.ascending_number}`} xs={12} lg={6}
                            className={'my-3 my-xxl-0'}>
                            <Card>
                                <Row>
                                    <Col xs={4} className={'pe-0'}>
                                        <Card.Header>
                                            <div className="image-container">
                                                <Image src="Images/Icons/gazebo_icon.png" alt="Your Image" width={80} height={80}/>
                                                <span className="overlay-number">{gazebo.ascending_number}</span>
                                            </div>
                                        </Card.Header>
                                    </Col>
                                    <Col className={'d-flex px-0'}>
                                        <SetTablesUnavailableModal gazebo={gazebo}/>
                                    </Col>
                                </Row>
                            </Card>

                        </Col>
                    })
                }
            </Row>
        })
    }
    return (
        <Card className={'box_shadow mt-4 mt-xxl-0 w-100'} >
            <Card.Header className={'bg-transparent user-select-none'}>
                Διαχείριση Διαθεσιμότητας Τραπεζιών
            </Card.Header>
                <Card.Body className={'d-flex flex-column mh-600px overflow-y-auto'}>
                    {
                        renderGazebos()
                    }
                    {/*{(dateIsRange ? (selectedDate[0] !== '' && selectedDate[1] !== '' ) : selectedDate !== '' ) ?*/}
                    {/*    :*/}
                    {/*    <h5 className={'my-3 text-wrap'}>Επιλέξτε { dateIsRange ? 'ένα εύρος ημερών' : ' μία ημέρα'} για να δείτε τις επιλογές σας.</h5>}*/}
                </Card.Body>
        </Card>
    )
}
