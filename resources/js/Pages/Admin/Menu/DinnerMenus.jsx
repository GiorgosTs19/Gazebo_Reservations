import {Menu} from "./Menu";
import {Accordion, Col, Row, Stack} from "react-bootstrap";
import {useContext} from "react";
import {InnerWidthContext} from "../../../Contexts/InnerWidthContext";

export function DinnerMenus({DinnerMenus}) {
    const Mains = DinnerMenus.Mains,
    Desserts = DinnerMenus.Desserts,
    innerWidth = useContext(InnerWidthContext);
    return (
        <Row>
            <Col sm={12} lg={6} className={innerWidth > 992 ? 'border-end' : ' pb-4 border-bottom'}>
                <h4>Κυρίως Πιάτα</h4>
                <Accordion>
                    {Mains.length === 0 ? <h5 className={'text-muted'}>Δεν έχετε προσθέσει κυρίως πιάτα.</h5> :
                        Mains.map((menu,index)=>{
                            return <Menu menu={menu} index={index} key={menu.id}></Menu>
                        })}
                </Accordion>
            </Col>
            <Col sm={12} lg={6} className={'mt-lg-0 mt-3 h-100'}>
                <h4 className={'mx-auto'}>Επιδόρπια</h4>
                <Accordion className={'my-auto'}>
                    {Desserts.length === 0 ? <h5 className={'text-muted'}>Δεν έχετε προσθέσει επιδόρπια.</h5> :
                        Desserts.map((menu,index)=>{
                            return <Menu menu={menu} index={index} key={menu.id}></Menu>
                        })}
                </Accordion>
            </Col>
        </Row>
    )
}
