import React, { useEffect, useState } from "react";
import axios from 'axios';

function FormColor() {
    const [data, setData] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState('white');
    const [intervalId, setIntervalId] = useState(null);

    const fetchDataFromBackend = () => {
        axios.get('http://127.0.0.1:8000/api/random/')
            .then(response => {
                setData(response.data);
                updateBackgroundColor(response.data.random_numbers);
            })
            .catch(error => {
                console.error('There was an error fetching the data:', error);
            });
    };

    const startFetchingData = () => {
        const id = setInterval(() => {
            fetchDataFromBackend();
        }, 100);
        setIntervalId(id);
    };

    const stopFetchingData = () => {
        clearInterval(intervalId);
    };

    useEffect(() => {
        return () => {
            clearInterval(intervalId);
        };
    }, [intervalId]);

    const updateBackgroundColor = (numbers) => {
        const newBackgroundColor = `rgb(${numbers.join(',')})`;
        setBackgroundColor(newBackgroundColor);
    };

    useEffect(() => {
        document.querySelector('.form-color').style.backgroundColor = backgroundColor;
    }, [backgroundColor]);

    const formatNumbers = () => {
        if (!data) return null;

        const numbers = data.random_numbers;
        const formattedNumbers = numbers.join(', ');

        return formattedNumbers;
    };

    return (
        <div className="form-color">
            <h2>Hello World</h2>
            {data ? (
                <p>{formatNumbers()}</p>
            ) : (
                <p>Loading...</p>
            )}
            <button onClick={fetchDataFromBackend}>Click ME!</button><br/>
            <div className="button-loop">
                <button onClick={startFetchingData}>Start Fetching</button>
                <button onClick={stopFetchingData}>Stop Fetching</button>
            </div>

        </div>
    );
}

export default FormColor;
