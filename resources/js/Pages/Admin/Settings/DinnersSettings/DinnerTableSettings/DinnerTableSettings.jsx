import {useState,useContext} from "react";
import {Card, Col, Image, Row} from "react-bootstrap";
import {SetTablesUnavailableModal} from "../../../Modals/SetTablesUnavailableModal";
import {GazebosContext} from "../../../../../Contexts/GazebosContext";

export function DinnerTableSettings() {
    const Gazebos = useContext(GazebosContext);

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
                Διαχείριση Διαθεσιμότητας Gazebo
            </Card.Header>
                <Card.Body className={'d-flex flex-column table-settings-stack  overflow-y-auto'}>
                    {
                        renderGazebos()
                    }
                </Card.Body>
        </Card>
    )
}
