import {useEffect, useState} from "react";
import {Alert} from "react-bootstrap";
import useTimeout from "./useTimeout";
import {changeDateFormat} from "../ExternalJs/Util";

export default function useCheckChanges(previous, next) {
    const [hasChanges, setHasChanges] = useState(false);

    const [alert, setAlert] = useState({variant:'success', message:'', heading:'', footer:''});

   useEffect(()=>{
       if(!previous || !next && hasChanges) {
           return setHasChanges(false);
       }
       if(previous.id !== next.id)
           return setHasChanges(false);

       if(previous.Date !== next.Date) {
           setAlert({variant: 'success', message:`Η ημερομηνία μεταφέρθηκε από ${changeDateFormat(previous.Date)} στις ${changeDateFormat(next.Date)}`
       , heading: 'Αλλαγή Ημερομηνίας', footer: ``});
           setHasChanges(true);
       }

       if(previous.Status !== next.Status) {
           switch (next.Status) {
               case 'Confirmed' : {
                   setHasChanges(true);
                   setAlert({variant:'success', message:'Η κράτηση επιβεβαιώθηκε', heading: 'Αλλαγή Κατάστασης', footer: ''});
                   break;
               }
               case 'Cancelled' : {
                   setHasChanges(true);
                   setAlert({variant:'warning', message:'Η κράτηση ακυρώθηκε', heading: 'Αλλαγή Κατάστασης',
                       footer: 'Η κράτηση θα βρίσκεται πλέον μόνο στην καρτέλα με τις ακυρωμένες κρατήσεις'});
                   break;
               }
           }
       }
   },[previous, next]);

   useTimeout(()=>{
       if(hasChanges)
           setHasChanges(false);
   }, 3000);

 return <Alert show={hasChanges} variant={alert.variant}>
     <Alert.Heading as={"h6"}>{alert.heading}</Alert.Heading>
     <p className={'info-text-lg mb-1'}>
         {alert.message}
     </p>
     {alert.footer !== '' && <>
         <hr/>
         <p className={'text-muted info-text mb-1'}>
             {alert.footer}
         </p>
     </>}
    </Alert>;
}
