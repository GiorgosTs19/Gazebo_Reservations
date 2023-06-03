import React, {useContext, useEffect, useRef} from 'react'
import '../../../css/GazepoMap.css'
import '../../ExternalJs/ImgMapResize'
import {Layer, Stage} from "react-konva";
import {resizeCanvas} from "../../ExternalJs/CanvasResize";
import {BookingDetailsContext} from "../../Contexts/BookingDetailsContext";
import {GazepoArea} from "./GazepoArea";
import {CanvasRefContext} from "../../Contexts/CanvasRefContext";

export function GazepoMap({Gazepos}) {
    const {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext),
    canvasRef = useRef(null),imageRef = useRef(null),
    mapRef = useRef(null);

    useEffect(()=>{
        const CanvasContainer = document.getElementsByClassName('konvajs-content').item(0);
        const Canvas = canvasRef.current.canvas._canvas;
        Canvas.removeAttribute('style');
        CanvasContainer.append(imageRef.current);
        CanvasContainer.append(mapRef.current);
        CanvasContainer.removeAttribute('style');
        (mapRef.current !== null ) && imageMapResize(mapRef.current);
       return resizeCanvas(canvasRef.current.canvas._canvas,imageRef.current,
           document.querySelectorAll('area'),canvasRef.current.getLayer(),Gazepos);
    },[]);

    return (
        <CanvasRefContext.Provider value={canvasRef.current}>
                <div className={'map-container'}>
                    <img src={'Images/Gazepo.jpg'} alt="Clickable Image" useMap="#map" className={'Image img-fluid'}
                         ref={imageRef}/>
                    <map name="map" id={'map'} className={'image-map'} style={{ display:'block'}} ref={mapRef}>
                        <GazepoArea AA={1} AvailabilityCoords={"151,158,15"} TableCoords={"117,180,185,260"}></GazepoArea>
                        <GazepoArea AA={2} AvailabilityCoords={"258,158,15"} TableCoords={'225,180,293,260'}></GazepoArea>
                        <GazepoArea AA={3} AvailabilityCoords={"366,158,15"} TableCoords={"331,180,400,260"}></GazepoArea>
                        <GazepoArea AA={4} AvailabilityCoords={"473,158,15"} TableCoords={'439,180,507,260'}></GazepoArea>
                        <GazepoArea AA={5} AvailabilityCoords={"576,158,15"} TableCoords={'545,180,614,260'}></GazepoArea>
                        <GazepoArea AA={6} AvailabilityCoords={"684,158,15"} TableCoords={'652,180,720,260'}></GazepoArea>
                    </map>
                    <Stage width={window.innerWidth} height={window.innerHeight}>
                        <Layer ref={canvasRef}>
                        </Layer>
                    </Stage>
                </div>
        </CanvasRefContext.Provider>
    );
}
