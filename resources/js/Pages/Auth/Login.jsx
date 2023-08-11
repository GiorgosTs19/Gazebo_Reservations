import { useEffect } from 'react';
import {useForm } from '@inertiajs/inertia-react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
        // Inertia.post(route('login'),data);
    };
    console.log(errors);
    return (
        <Container fluid className={'p-3 vh-100'}>
            <title title="Log in" />

            {status && <div className="mb-4 text-sm ">{status}</div>}
            <Row className={'h-100'}>
                <Col className={'d-flex flex-column h-100'}>
                    <h3 className={'mx-auto mt-5'}>Είσοδος Διαχειριστών</h3>
                    <Form onSubmit={submit} className={'m-auto border border-1 rounded-3 p-3 d-flex flex-column'}>
                        <Form.Group className="my-3 mx-auto text-center" controlId="email">
                            <Form.Label className="my-1">Email</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" value={data.email}
                      onChange={(e) => setData('email', e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="my-3 mx-auto text-center" controlId="password">
                            <Form.Label className="my-1">Κωδικός</Form.Label>
                            <Form.Control type="password" placeholder="Κωδικός" value={data.password}
                          onChange={(e) => setData('password', e.target.value)}/>
                        </Form.Group>

                        <Form.Check // prettier-ignore
                            type={"checkbox"}
                            id={`remember`}
                            label={'Remember me'}
                            checked={data.remember}
                            className={'my-3 mx-auto'}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        {errors.email && <p className={'text-wrap text-danger'}>{errors.email}</p>}
                        <div className="flex items-center justify-end my-3 mx-auto">
                        {/*    {canResetPassword && (*/}
                        {/*        <Link*/}
                        {/*            href={route('password.request')}*/}
                        {/*            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"*/}
                        {/*        >*/}
                        {/*            Forgot your password?*/}
                        {/*        </Link>*/}
                        {/*    )}*/}

                            <Button className="ml-4" disabled={processing} type={'submit'} >
                                Log in
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
