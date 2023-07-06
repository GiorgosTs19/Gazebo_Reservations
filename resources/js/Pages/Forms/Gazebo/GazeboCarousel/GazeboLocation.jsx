import {Stack} from "react-bootstrap";
import {useContext, useRef, useState} from "react";
import '../../../../../css/GazeboCarousel.css'
import {GazebosContext} from "../../../../Contexts/GazebosContext";

export function GazeboLocation({index, className, width,gap=4}) {
    const [show, setShow] = useState(false),
    [target, setTarget] = useState(null),
        ref = useRef(null),
    Gazebos = useContext(GazebosContext);
    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };
    return (
        <div ref={ref} className={'mx-auto ' + className}>
            <div className="beach rounded-2 mx-auto">
                <div className="wave"></div>
            </div>
            <Stack direction="horizontal" gap={gap} className={'mx-auto text-center'}
            style={{width:'fit-content'}}>
                {Gazebos.map((gazepo,number)=>{
                    return <h4 key={number} className={gazepo.ascending_number !== index ? 'opacity-25' :''}>&#x25A2;</h4>
                })}
            </Stack>
            <div className="horizontal_bridge rounded-1 mx-auto">
                <div className="horizontal_bridge-corridor ">
                    {
                        Array(25).fill(null).map((_, number)=>{
                            return <div key={number} className="plank"></div>;
                        })
                    }
                </div>
            </div>
        </div>
    )
}
