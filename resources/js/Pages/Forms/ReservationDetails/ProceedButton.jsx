import {Button} from "react-bootstrap";
import {useContext} from "react";
import {FormProgressContext} from "../../../Contexts/FormProgressContext";
import {useEffect} from "react";

export function ProceedButton({shouldProceed}) {
    const {progress, setProgress} = useContext(FormProgressContext),
    handleNextClick = ()=>{
        // Handles the click on the To Menu Selection Button
        // Sets progress to "Menu" to move forward to the MenuSelection tab
        if(!shouldProceed)
            return;
        setProgress('Menu');
    };


    useEffect(()=>{
        const handleProceed = (ev) => {
            if(ev.key === 'Enter') {
                handleNextClick();
            }
        }
        window.addEventListener('keypress',handleProceed);
        return () => {
            window.removeEventListener('keypress', handleProceed);
        };
    },[]);

    return (
       <Button variant={'outline-light'} onClick={handleNextClick}
          className={'box_shadow border-0 mx-auto mt-3 px-2 py-1 reservation-button text-dark'} style={{width:'fit-content'}}>
            To Menu Selection
        </Button>
    )
}
