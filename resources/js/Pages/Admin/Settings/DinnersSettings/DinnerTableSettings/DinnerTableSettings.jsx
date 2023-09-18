import {useState,useContext} from "react";
import {Card, Col, Image, Row} from "react-bootstrap";
import {SetTablesUnavailableModal} from "../../../Modals/SetTablesUnavailableModal";
import {GazebosContext} from "../../../../../Contexts/GazebosContext";

export function DinnerTableSettings() {
    const Gazebos = useContext(GazebosContext);

    const renderGazebos = () => {
        let gazeboChunks = [];
        for(let i=0;i<Gazebos.length;i+=6) {
            gazeboChunks = [...gazeboChunks,Gazebos.slice(i,i+6)];
        }
        return gazeboChunks.map((chunk,index) => {
            return <Row className={'my-0 my-xxl-auto user-select-none'} key={`Gazebo_Row${index}`}>
                {
                    chunk.map((gazebo)=>{
                        return <Col key={`Gazebo${gazebo.ascending_number}`} xs={4} lg={2}
                            className={'my-3 my-xxl-0'}>
                            <h5>{gazebo.ascending_number}</h5>
                            <SetTablesUnavailableModal gazebo={gazebo}/>
                        </Col>
                    })
                }
            </Row>
        })
    }
    return (
        <Card className={'box_shadow mt-4 mt-xxl-0 w-100 h-fit-content'} >
            <Card.Header className={'bg-transparent user-select-none'}>
                Διαχείριση Διαθεσιμότητας Gazebo
            </Card.Header>
                <Card.Body className={'d-flex flex-column table-settings-stack  overflow-y-auto overflow-x-hidden p-2'}>
                    {
                        renderGazebos()
                    }
                </Card.Body>
        </Card>
    )
}
