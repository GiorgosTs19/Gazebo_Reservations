import {useState} from "react";
import {Stack} from "react-bootstrap";

export  function StarRating({ readOnly, numberOfStars, onSetRating, Rating}) {
    const [rating, setRating] = useState(Rating ? Rating : 0);
    const [hover, setHover] = useState(0);
    const NoOfStars = numberOfStars ? numberOfStars : 5;
    const ReadOnly = readOnly ? readOnly : false;

    const handleRatingChange = (index) => {
        if (!ReadOnly) {
            setRating(index);
            onSetRating(index);
        }
    };

    return (
        <Stack direction={'horizontal'}>
            {
                [...Array(NoOfStars)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index}
                            className={'border-0 btn btn-lg'}
                            onClick={() => {
                                if (!ReadOnly) {
                                    handleRatingChange(index);
                                    // Optionally, you can call the `onSetRating` function here
                                }
                            }}
                            disabled={readOnly}
                            style={index <= (hover || rating) ? { color: '#ffea00' } : { color: '#ccc' }}
                            onMouseEnter={() => {
                                !ReadOnly && setHover(index);
                            }}
                            onMouseLeave={() => {
                                !ReadOnly && setHover(rating);
                            }}
                            onDoubleClick={() => {
                                if (!ReadOnly) {
                                    setRating(0);
                                    // Optionally, you can call the `onSetRating` function here with a rating of 0
                                }
                            }}
                        >
                            <span className="star" style={{ fontSize: 'x-large' }}>&#9733;</span>
                        </button>
                    );
                })
            }
        </Stack>
    );
}
