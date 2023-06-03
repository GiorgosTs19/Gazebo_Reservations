import React, {useEffect} from 'react';
import { useForm } from '@inertiajs/inertia-react';
import {Button} from "react-bootstrap";

export default function Gazepo({status}) {
    useEffect(() => {
        document.title = 'Gazepo';
    }, []);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="form-container sign-in-container overflow-scroll">
            <form onSubmit={submit} className={'fcl'}>
                <h1 className='my-3'>Book a Gazepo</h1>
                <Button variant={'outline-info'} className={'mt-2'} size={'lg'}>
                    Book a Gazepo
                </Button>
            </form>
        </div>
    );
}
