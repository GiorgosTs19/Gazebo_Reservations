import {Badge, Col, Modal, Nav, Row} from "react-bootstrap";
import {useState} from "react";
import {BellSVG} from "../../../SVGS/BellSVG";

export function UsefulInfoModal({className}) {
    const [show, setShow] = useState(false);
    return (
        <>
            <Nav.Link className={`my-1 my-xxl-auto primary hover-scale-1_03 ${className}`} onClick={() => setShow(true)}>Χρήσιμες Πληροφορίες</Nav.Link>
            <Modal size="lg" show={show} onHide={() => setShow(false)} className={'text-center'} scrollable
            style={{maxHeight:'80vh'}}>
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Χρήσιμες Πληροφορίες
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className={'border-bottom pb-2 my-3'}>
                        <Col xs={12} lg={2} className={'icon-info disabled-day'}>Ημερομηνία</Col>
                        <Col xs={12} lg={10} className={'info-text-lg'}>Μία ημερομηνία με γραμμή, υποδηλώνει πως η ημερομηνία αυτή είναι απενεργοποιημένη.</Col>
                    </Row>
                    <Row className={'border-bottom py-1 my-3'}>
                        <Col xs={12} lg={2} className={'icon-info d-flex'}><BellSVG className={'m-auto'}/></Col>
                        <Col xs={12} lg={10}>
                            <p className={'info-text-lg'}>
                                ( Στο μενού ) Εμφανίζει τις κρατήσεις οι οποίες απαιτούν αλλαγές
                                λόγω απενεργοποιημένης ημέρας ή τραπεζιού.
                            </p>
                            <p className={'info-text-lg'}>
                                ( Σε μία κράτηση ) Δηλώνει πως αυτή η κράτηση απαιτεί αλλαγές.
                                Πατώντας πάνω στην κράτηση, μπορείτε να δείτε
                                το είδος αλλαγής που απαιτείται.
                            </p>
                        </Col>
                    </Row>
                    <Row className={'border-bottom pb-2 my-3'}>
                        <Col xs={12} lg={2} className={'icon-info d-flex'}>
                            <Badge pill className={'m-auto'} bg={'secondary'}>Κατάσταση</Badge>
                        </Col>
                        <Col xs={12} lg={10}>
                            <p>
                                <span className={'text-success'}> Πράσινο </span>: Επιβεβαιωμένη.
                                <span className={'info-text'}> Έχει επιβεβαιωθεί, έπειτα απο επικοινωνία με τον πελάτη.</span>
                            </p>
                            <p>
                                <span className={'text-warning'}> Κίτρινο </span> : Εκκρεμούσα.
                                <span className={'info-text'}> Δεν έχει υπάρξει επικοινωνία με τον πελάτη.</span>
                            </p>
                            <p>
                                <span className={'text-danger'}> Κόκκινο </span> : Ακυρωμένη.
                                <span className={'info-text'}> Έχει ακυρωθεί, έπειτα απο επικοινωνία με τον πελάτη.</span>
                            </p>
                        </Col>
                    </Row>
                    <h6 className={'my-3'}>Αλλαγές Κρατήσεων</h6>
                    <Row className={'border-bottom pb-2 my-3'}>
                        <p className={'info-text-lg'}><b>-</b> Αλλαγές στις κρατήσεις, επιτρέπονται μόνο εφόσον προηγηθεί η επιβεβαίωση με τον πελάτη. </p>
                        <p className={'info-text-lg'}><b>-</b> Σε περίπτωση απενεργοποιημένης ημέρας, ή τραπεζιού, επιτρέπεται μόνο η αλλαγή που αναγράφεται στην κράτηση.</p>
                        <p className={'info-text-lg'}><b>-</b> Σε περίπτωση ακύρωσης μίας κράτησης, πρέπει να γίνει καινούργια κράτηση από τον πελάτη.</p>
                    </Row>
                    <h6 className={'my-3'}>Ρυθμίσεις</h6>
                    <p><b>Οι ρυθμίσεις για το κάθε είδος κρατήσεων, είναι ξεχωριστές.</b></p>
                    <Row className={'pb-2 my-3'}>
                        <p className={'info-text-lg'}><b>-</b> Όσον αφορά την απενεργοποίηση ημερομηνιών, είτε τραπεζιών, μπορεί να γίνει μαζικά
                            ( επιλέγοντας πολλές ημερομηνίες στην κάθε περίπτωση ).</p>
                        <p className={'info-text-lg'}><b>-</b> Η ενεργοποίηση αυτών, πρέπει να γίνει μία προς μία ημερομηνία / ένα προς ένα τραπέζι.</p>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}
