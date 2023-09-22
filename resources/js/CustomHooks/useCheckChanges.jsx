import {useEffect, useState} from "react";
import {Alert, Col, Row} from "react-bootstrap";
import useTimeout from "./useTimeout";
import {changeDateFormat, getTableAA} from "../ExternalJs/Util";
import {CheckSVG} from "../SVGS/CheckSVG";
import {InfoSVG} from "../SVGS/InfoSVG";

export default function useCheckChanges(previous, next, Gazebos) {
    const [hasChanges, setHasChanges] = useState(false);

    const [alert, setAlert] = useState({variant:'success', message:'', heading:'', footer:''});

   useEffect(()=>{
       if(!previous || !next && hasChanges) {
           return setHasChanges(false);
       }
       if(previous.id !== next.id)
           return setHasChanges(false);

       const gazeboHasChanged = previous.gazebo_id !== next.gazebo_id;

       if(previous.Date !== next.Date) {
           setAlert({variant: 'success', message:`Η κράτηση μεταφέρθηκε από τις ${changeDateFormat(previous.Date)} στις ${changeDateFormat(next.Date)}`
       , heading: 'Αλλαγή Ημερομηνίας', footer: gazeboHasChanged ? `Αλλαγή Gazebo από το ${getTableAA(previous.gazebo_id, Gazebos)} στο ${getTableAA(next.gazebo_id, Gazebos)}` : ''});
           setHasChanges(true);
       }

       if(gazeboHasChanged && previous.Date === next.Date) {
           setAlert({variant: 'success', message:`Αλλαγή Gazebo από το Gazebo ${getTableAA(previous.gazebo_id, Gazebos)} στο Gazebo ${getTableAA(next.gazebo_id, Gazebos)}`
               , heading: 'Αλλαγή Gazebo', footer:''});
           setHasChanges(true);
       }

       if(previous.Status !== next.Status) {
           switch (next.Status) {
               case 'Confirmed' : {
                   setHasChanges(true);
                   setAlert({variant:'success', message:'Η κράτηση επιβεβαιώθηκε', heading: '', footer: ''});
                   break;
               }
               case 'Cancelled' : {
                   setHasChanges(true);
                   setAlert({variant:'warning', message:'Η κράτηση ακυρώθηκε', heading: '',
                       footer: 'Η κράτηση θα εμφανίζεται πλέον, μόνο στην καρτέλα Ακυρωμένες'});
                   break;
               }
           }
       }
   },[previous, next]);

   useTimeout(()=>{
       if(hasChanges)
           setHasChanges(false);
   }, alert.variant === 'success' ? 3500 : 5500);

 return <Alert show={hasChanges} onClose={()=>setHasChanges(false)} variant={alert.variant} dismissible className={'px-2 py-3 text-center'}>
     <CheckSVG width={24} height={24} className={'mb-2'}/>
     {alert.heading !== '' && <Alert.Heading as={"h6"}>{alert.heading}</Alert.Heading>}
            <p className={'info-text-lg mb-1'}>
                {alert.message}
            </p>
     {alert.footer !== '' && <>
         <hr/>
         <p className={'text-muted info-text mb-0 fst-italic'}>
             {alert.footer}
         </p>
     </>}
    </Alert>;
}
