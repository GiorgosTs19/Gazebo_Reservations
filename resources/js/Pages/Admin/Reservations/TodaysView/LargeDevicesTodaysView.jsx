import {Col, Row, Stack} from "react-bootstrap";
import {FiltersBar} from "../FiltersBar/FiltersBar";
import {ExpandSVG} from "../../../../SVGS/ExpandSVG";
import {useState} from "react";

export function LargeDevicesTodaysView({reservationsToShow,filter,children}) {
    const {reservationsFilter,setReservationsFilter} = filter,
        [showFilters,setShowFilters] = useState(false);
    return (
        <Row className={'pe-3 h-100'}>
            <Col className={'border border-1 rounded-3 d-flex flex-column justify-content-between box_shadow my-3 my-xxl-0 h-100'}
                 xxl={showFilters ? 2 : 1}>
                    {showFilters ? <>
                            <div className={'h-100'}>
                                <p className={'border-bottom'}>
                                    <b>Κατάσταση</b>
                                </p>
                                <FiltersBar setReservationsFilter={setReservationsFilter}
                                            reservationsFilter={reservationsFilter} direction={innerWidth > 1400 ? 'vertical' : 'horizontal'}>
                                </FiltersBar>
                            </div>
                            <h6 onClick={()=>setShowFilters(false)} className={'cursor-pointer'}>
                                Απόκρυψη
                            </h6>
                        </> :
                        <div className={'h-100 d-flex flex-column'}>
                            <ExpandSVG onClick={()=>setShowFilters(true)} className={'m-auto'}></ExpandSVG>
                        </div>}
            </Col>
            <Col xxl={showFilters ? 10 : 11} className={'p-0 h-100'}>
                {children}
                <Stack className={'p-3 text-center d-flex overflow-y-auto h-90'} >
                    {reservationsToShow}
                </Stack>
            </Col>
        </Row>
    )
}
