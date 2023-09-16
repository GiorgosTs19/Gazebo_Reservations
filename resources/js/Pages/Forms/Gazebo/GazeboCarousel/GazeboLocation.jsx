import {Image, Stack} from "react-bootstrap";
import {useContext} from "react";
import '../../../../../css/GazeboCarousel.css'
import {GazebosContext} from "../../../../Contexts/GazebosContext";
import {PinSVG} from "../../../../SVGS/PinSVG";

export function GazeboLocation({index, className, width, gap=3, children}) {
    const Gazebos = useContext(GazebosContext);
    return (
        <div className={'mx-auto ' + className}>
            <div className="beach rounded-2 mx-auto d-flex">
                <div className="wave"></div>
                {children}
            </div>
            <Stack direction="horizontal" gap={gap} className={'mx-auto text-center d-flex'}
            style={{width:'fit-content'}}>
                {Gazebos.map((gazepo,number)=>{
                    return gazepo.ascending_number === index ? <PinSVG key={number} className={'mt-auto pb-2'} height={innerWidth > 992 ? 40 : 30} width={innerWidth > 992 ? 40 : 30}/>
                        : <Image src={'Images/Icons/gazebo_icon.png'} key={number}
                                  height={innerWidth > 992 ? 48 : 37}
                                  width={innerWidth > 992 ? 48 : 37}
                  className={`mt-4 mx-0 perspective-1000px rounded-3 p-1 p-md-2 opacity-50`}></Image>
                })}
            </Stack>
        </div>
    )
}
