import React, {useEffect, useState} from 'react';
import { useForm } from '@inertiajs/inertia-react';
import {Button} from "react-bootstrap";

export default function Beach_Beds() {
    const [iEE, setIEE] = useState(false),
        [showingPasswordStored,setShowingPasswordStored] = useState(false),
        { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        iee:false,
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
    };
    return (
            <div className="form-container sign-up-container h-100 overflow-scroll">
                <form onSubmit={submit} className={'fcr'}>
                    <h1 className='my-3'>Book a beach bed</h1>
                    <Button variant={'outline-info'} id="signUp" className={'mt-2'} size={'lg'}>
                        Book a Beach Bed
                    </Button>
                </form>
            </div>
    );
}
