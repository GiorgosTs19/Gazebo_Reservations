import {Image, Stack} from "react-bootstrap";
import {useContext} from "react";
import '../../../../../css/GazeboCarousel.css'
import {GazebosContext} from "../../../../Contexts/GazebosContext";
import {PinSVG} from "../../../../SVGS/PinSVG";

export function GazeboLocation({index, className, width, gap=3, children, showWave = true}) {
    const Gazebos = useContext(GazebosContext);
    return (
        <div className={'mx-auto ' + className}>
            {showWave ? <div className="beach rounded-2 mx-auto d-flex">
                <div className="wave"></div>
                {children[1]}
            </div> : children[0]}
            <Stack direction="horizontal" gap={gap} className={'mx-auto text-center d-flex'}
            style={{width:'fit-content'}}>
                {Gazebos.map((gazepo,number)=>{
                    return gazepo.ascending_number === index ? <PinSVG key={number} className={'mt-auto pb-2 current-gazebo-pin'}/>
                        : <Image src={'Images/Icons/gazebo_icon.png'} key={number}
                  className={`${!showWave ? 'mt-0' :'mt-4'} mx-0 perspective-1000px rounded-3 p-1 p-md-2 opacity-50`}></Image>
                })}
            </Stack>
        </div>
    )
}
