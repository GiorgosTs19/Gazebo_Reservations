import React from 'react';
import {Button} from "react-bootstrap";
export default function Overlay({setVisibility}) {

    return (
        <div className="overlay-container p-0">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <Button variant={'outline-light'} id="signIn" className={'mx-auto'}
                        onClick={()=>{setVisibility('Login');document.title = 'Seaside Dinner';}} size={'sm'}>
                        Book Seaside Dinner
                    </Button>
                </div>
                <div className="overlay-panel overlay-right">
                    <Button variant={'outline-light'} id="signUp"
                        onClick={()=>{setVisibility('Register');document.title = 'Beach Beds';}} size={'sm'}>
                        Book a Beach Bed
                    </Button>
                </div>
            </div>
        </div>
    );
}
