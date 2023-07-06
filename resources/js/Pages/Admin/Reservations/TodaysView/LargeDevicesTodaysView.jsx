import {Stack} from "react-bootstrap";

export function LargeDevicesTodaysView({reservationsToShow}) {
    return (
        <Stack className={'p-3 text-center'} style={{overflowY:'auto',
            height:'70vh'}}>
            {reservationsToShow()}
        </Stack>
    )
}
