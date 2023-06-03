import React from 'react';
import {Button} from "react-bootstrap";
export default function Overlay({setVisibility}) {

    return (
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <Button variant={'outline-light'} id="signIn"
                        onClick={()=>{setVisibility('Login');document.title = 'Gazepos';}} size={'lg'}>
                        Book a Gazepo
                    </Button>
                </div>
                <div className="overlay-panel overlay-right">
                    <Button variant={'outline-light'} id="signUp"
                        onClick={()=>{setVisibility('Register');document.title = 'Beach Beds';}} size={'lg'}>
                        Book a Beach Bed
                    </Button>
                </div>
            </div>
        </div>
    );
}
