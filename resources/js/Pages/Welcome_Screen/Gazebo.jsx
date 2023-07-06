import React, {useEffect} from 'react';
import { useForm } from '@inertiajs/inertia-react';
import {Button, Image} from "react-bootstrap";

export default function Gazebo({status}) {
    useEffect(() => {
        document.title = 'Seaside Dinner';
    }, []);

    return (
        <div className="form-container sign-in-container overflow-scroll p-2">
                <Image fluid src={'/Images/GazeboAtNight.jpg'} className={''}/>
                <Button variant={'outline-info'} className={'m-auto'} size={'sm'}>
                    Book Seaside Dinner
                </Button>
        </div>
    );
}
