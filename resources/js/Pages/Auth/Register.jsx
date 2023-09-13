import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name:'',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <Container fluid className={'vh-100'}>
            <title title="Sign Up" />
            <Row className={'h-100'}>
                <Col className={'d-flex flex-column h-100'}>
                    <h3 className={'mx-auto  my-5'}>Δημιουργία Λογαριασμού Διαχειριστών</h3>
                    <Form onSubmit={submit} className={'m-auto border border-1 rounded-3 p-3 d-flex flex-column'}>
                        <div className={'my-2 d-flex flex-column'}>
                            <p className={'mx-auto'}>Έχεις ήδη λογαριασμό;</p>
                            <a href={route('login')} className={'mx-auto'}>Συνδέσου</a>
                        </div>
                        <Form.Group className="my-3 mx-auto text-center" controlId="first_name">
                            <Form.Label className="my-1">Όνομα</Form.Label>
                            <Form.Control type="text" placeholder="Όνομα" value={data.first_name} autoComplete={'first_name'}
                            onChange={(e) => setData('first_name', e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="my-3 mx-auto text-center" controlId="last_name">
                            <Form.Label className="my-1">Επίθετο</Form.Label>
                            <Form.Control type="text" placeholder="Επίθετο" value={data.last_name} autoComplete={'last_name'}
                                          onChange={(e) => setData('last_name', e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="my-3 mx-auto text-center" controlId="email">
                            <Form.Label className="my-1">Email</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" value={data.email} autoComplete={'email'}
                                          onChange={(e) => setData('email', e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="my-3 mx-auto text-center" controlId="password">
                            <Form.Label className="my-1">Κωδικός</Form.Label>
                            <Form.Control type="password" placeholder="Κωδικός" value={data.password} autoComplete={'password'}
                                          onChange={(e) => setData('password', e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="my-3 mx-auto text-center" controlId="password_confirmation">
                            <Form.Label className="my-1">Επαλήθευση Κωδικού</Form.Label>
                            <Form.Control type="password" placeholder="Επαλήθευση Κωδικού" value={data.password_confirmation} autoComplete={'password_confirmation'}
                          onChange={(e) => setData('password_confirmation', e.target.value)}/>
                        </Form.Group>
                        {errors.password && <p className={'text-wrap text-danger m-auto'}>{errors.password}</p>}
                        {errors.email && <p className={'text-wrap text-danger m-auto'}>{errors.email}</p>}
                        <div className="flex items-center justify-end my-3 mx-auto">
                            <Button className="ml-4" disabled={processing} type={'submit'} >
                                Δημιουργία Λογαριασμού
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
// <div className="flex items-center justify-end mt-4">
//     <Link
//         href={route('login')}
//         className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//     >
//         Already registered?
//     </Link>
// </div>
