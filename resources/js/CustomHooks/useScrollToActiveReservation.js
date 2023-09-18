import {useEffect} from "react";

export function useScrollToActiveReservation(ref) {
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [ref.current]);
}
