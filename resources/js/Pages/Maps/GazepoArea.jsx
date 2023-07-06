import {AvailabilityArea} from "./AvailabilityArea";
import {getAvailabilityByDate, getGazepoAvailabilityColor} from "../../ExternalJs/Util";
import {TableArea} from "./TableArea";
import {useContext} from "react";
import {BookingDetailsContext} from "../../Contexts/BookingDetailsContext";
import {GazeboAvailabilityContext} from "../../Contexts/GazeboAvailabilityContext";
import {ContainerRefContext} from "../../Contexts/ContainerRefContext";
import {GazebosContext} from "../../Contexts/GazebosContext";

export function GazepoArea({AvailabilityCoords,TableCoords, AA}) {
    const {bookingDetails,setBookingDetails} = useContext(BookingDetailsContext),
    Availability = useContext(GazeboAvailabilityContext),
    ContainerRef = useContext(ContainerRefContext),
    Gazepos = useContext(GazebosContext),
    getID = (number)=> {
        for(let gazepo of Gazepos){
            if(parseInt(gazepo.ascending_number) === parseInt(number))
                return gazepo.id;
        }
    },
    markSelected = (title)=>{
        // console.log(shapes)
        // console.log(getGazepoShapesByTitle(title,shapes))
    },
    Color = getGazepoAvailabilityColor(getID(AA),getAvailabilityByDate(bookingDetails.date,Availability)),
    IsAvailable = Color === '#00A36C',
    ClickTable = (e)=>{
        if(IsAvailable){
            const area = e.target;
            const table = getID(area.title.split(' ')[1]);
            ContainerRef.scrollTo({top: ContainerRef.scrollHeight,behavior:'smooth'});
            markSelected(area.title);
            setBookingDetails({...bookingDetails,table:table});
        }
    };

    return (
        <>
            <AvailabilityArea title={"Table " + AA + " Availability"} coords={AvailabilityCoords}
                              color={Color}>
            </AvailabilityArea>
            <TableArea title={"Table " + AA} coords={TableCoords} onClick={ClickTable} isAvailable={IsAvailable}></TableArea>
        </>
    )
}
