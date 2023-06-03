import {ProgressBar} from "react-bootstrap";
import React from "react";
import {useContext} from "react";
import {FormProgressContext} from "../Contexts/FormProgressContext";

export function GazepoBookingProgressBar() {
    const {progress,setProgress} = useContext(FormProgressContext),
        /**
         *
         * @param label
         * @returns {boolean}
         */
        checkRequirements = (label) => {
        switch (label) {
            case 'Date':
                return true;
            case 'Table':
                switch (progress) {
                    case 'Date' :
                        return false;
                    default :
                        return true;
                }
            case 'Details':
                switch (progress) {
                    case 'Date' :
                    case 'Table' :
                        return false;
                    default :
                        return true;
                }
            case 'Menu':
                switch (progress) {
                    case 'Date' :
                    case 'Table' :
                    case 'Details' :
                        return false;
                    default :
                        return true;
                }
            case 'Finalize':
                switch (progress) {
                    case 'Date' :
                    case 'Table' :
                    case 'Details' :
                    case 'Menu' :
                        return false;
                    default :
                        return true;
                }
        }
    };
    return (
        <ProgressBar style={{width:'90%'}} className={'mx-auto'}>
            {checkRequirements('Date') && <ProgressBar variant={progress === 'Date' ? 'warning' : 'success'} now={20} key={1} label={'Date'}
                          className={'border-end'} onClick={()=>setProgress('Date')}/>}
            {checkRequirements('Table') && <ProgressBar variant={progress === 'Table' ? 'warning' : 'success'} now={20} key={2} label={'Table'}
                          className={'border-end'} onClick={()=>setProgress('Table')}/>}
            {checkRequirements('Details') && <ProgressBar variant={progress === 'Details' ? 'warning' : 'success'} now={20} key={3} label={'Details'}
                          className={'border-end'} onClick={()=>setProgress('Details')}/>}
            {checkRequirements('Menu') && <ProgressBar variant={progress === 'Menu' ? 'warning' : 'success'} now={20} key={4} label={'Menu'}
                          className={'border-end'} onClick={()=>setProgress('Menu')}/>}
            {checkRequirements('Finalize') && <ProgressBar variant={progress === 'Finalize' ? 'warning' : 'success'} now={20} key={5} label={'Finalize'}
                          className={'border-end'} onClick={()=>setProgress('Finalize')}/>}
        </ProgressBar>
    )
}
