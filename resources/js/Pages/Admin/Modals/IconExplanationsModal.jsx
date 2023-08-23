import {Badge, Col, Modal, Row, Stack} from "react-bootstrap";
import {useState} from "react";
import {InfoSVG} from "../../../SVGS/InfoSVG";
import {BellSVG} from "../../../SVGS/BellSVG";
import {TodayViewSVG} from "../../../SVGS/TodayViewSVG";
import {WeeklyViewSVG} from "../../../SVGS/WeeklyViewSVG";
import {MonthlyViewSVG} from "../../../SVGS/MonthlyViewSVG";

export function IconExplanationsModal() {
    const [show, setShow] = useState(false);
    return (
        <>
            <InfoSVG className={'my-auto'} onClick={() => setShow(true)}/>
            <Modal size="lg" show={show} onHide={() => setShow(false)} className={'text-center'} scrollable
            style={{maxHeight:'80vh'}}>
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Οδηγίες Χρήσης
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className={'border-bottom py-1 my-3'}>
                        <Col xs={12} lg={2} className={'icon-info d-flex'}><BellSVG className={'m-auto'}/></Col>
                        <Col xs={12} lg={10}>
                            <p>
                                ( Στο μενού ) Εμφανίζει τις κρατήσεις οι οποίες απαιτούν αλλαγές
                                λόγω απενεργοποιημένης ημέρας ή τραπεζιού.
                            </p>
                            <p>
                                ( Σε μία κράτηση ) Δηλώνει πως αυτή η κράτηση απαιτεί αλλαγές λόγω
                                απενεργοποιημένης ημέρας ή τραπεζιού. Πατώντας πάνω στην κράτηση, μπορείτε να δείτε
                                το είδος αλλαγής που απαιτείται.
                            </p>
                        </Col>
                    </Row>
                    <Row className={'border-bottom pb-2 my-3'}>
                        <Col xs={12} lg={2} className={'icon-info d-flex'}>
                            <Badge pill className={'m-auto'} bg={'secondary'}>Κατάσταση</Badge>
                        </Col>
                        <Col xs={12} lg={10}>Υποδηλώνει την κατάσταση της κράτησης. <span className={'text-success'}> Πράσινο </span>: Επιβεβαιωμένη,
                            <span className={'text-warning'}> Κίτρινο </span> : Εκκρεμούσα, <span className={'text-danger'}> Κόκκινο </span> : Ακυρωμένη
                        </Col>
                    </Row>
                    <Row className={'border-bottom pb-2 my-3'}>
                        <Col xs={12} lg={2} className={'icon-info disabled-day'}>Ημερομηνία</Col>
                        <Col xs={12} lg={10}>Μία ημερομηνία με γραμμή, υποδηλώνει πως η ημερομηνία αυτή είναι απενεργοποιημένη.</Col>
                    </Row>
                    <Row className={'border-bottom pb-2 my-3'}>
                        <Col xs={12} lg={2} className={'icon-info'}><TodayViewSVG/></Col>
                        <Col xs={12} lg={10}>Εμφανίζει τις κρατήσεις για την τρέχουσα ημέρα.</Col>
                    </Row>
                    <Row className={'border-bottom pb-2 my-3'}>
                        <Col xs={12} lg={2} className={'icon-info'}><WeeklyViewSVG/></Col>
                        <Col xs={12} lg={10}>Εμφανίζει τις κρατήσεις ανά εβδομάδα, ξεκινώντας από την τρέχουσα ημέρα.</Col>
                    </Row>
                    <Row className={'border-bottom pb-2 my-3'}>
                        <Col xs={12} lg={2} className={'icon-info'}><MonthlyViewSVG/></Col>
                        <Col xs={12} lg={10}>Εμφανίζει τις κρατήσεις ανά μήνα, ξεκινώντας από τον τρέχων μήνα.</Col>
                    </Row>
                    <h6 className={'my-3'}>Αλλαγές Κρατήσεων</h6>
                    <Row className={'border-bottom pb-2 my-3'}>
                        <p><b>-</b> Αλλαγές στις κρατήσεις, επιτρέπονται μόνο εφόσον προηγηθεί η επιβεβαίωση με τον πελάτη. </p>
                        <p><b>-</b> Σε περίπτωση απενεργοποιημένης ημέρας, ή τραπεζιού, επιτρέπεται μόνο η αλλαγή που αναγράφεται στην κράτηση.</p>
                        <p><b>-</b> Σε περίπτωση ακύρωσης μίας κράτησης, πρέπει να γίνει καινούργια κράτηση από τον πελάτη.</p>
                    </Row>
                    <h6 className={'my-3'}>Ρυθμίσεις</h6>
                    <p><b>Οι ρυθμίσεις για το κάθε είδος κρατήσεων, είναι ξεχωριστές.</b></p>
                    <Row className={'border-bottom pb-2 my-3'}>
                        <p><b>-</b> Όσον αφορά την απενεργοποίηση ημερομηνιών, είτε τραπεζιών, μπορεί να γίνει μαζικά
                            ( επιλέγοντας πολλές ημερομηνίες στην κάθε περίπτωση ).</p>
                        <p><b>-</b> Η ενεργοποίηση αυτών, πρέπει να γίνει μία προς μία ημερομηνία.</p>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}
