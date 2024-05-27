import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Analysis.css';

export default function Analysis(props) {
    const [inputValue, setInputValue] = useState('');
    const [sentimentResults, setSentimentResults] = useState({ rnn: '', cnn: '', transformer: '' });
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        setUser(parsedUser);
    }, []);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleReviewClick = async (event) => {
        event.preventDefault();
        props.showAlert("Review is being processed", "success");
        setIsLoading(true);
        try {
            const results = await getSentimentAnalysis1(inputValue);
            setSentimentResults(results);
        } catch (error) {
            console.error('Error during sentiment analysis: ', error);
            props.showAlert("Error processing review", "danger");
        } finally {
            setIsLoading(false);
        }
    };

    const getSentimentAnalysis1 = async (textData) => {
        try {
            const response = await axios.post('http://localhost:5000/predict', {
                text: textData,
            });
            console.log(response.data[2].score);
            const sc = response.data[2].score.toFixed(4);
            setResults(sc);

          //  setResults(response.data[2].score);
            // return {
            //     rnn: response.data.rnn,
            //     cnn: response.data.cnn,
            //     transformer: response.data.transformer,
            // };
        } catch (error) {
            console.error('Error sending data to the model server: ', error);
            throw error;
        }
    };

    return (
        <>
            <div className='analysis-top'>
                <div className='greet'>
                    {user ? `Welcome back, ${user.name}!` : 'Welcome back!'}
                </div>
                <div className='analysis-input'>
                    <textarea
                        value={inputValue}
                        onChange={handleChange}
                        placeholder='Enter text here'
                        rows="5"
                        cols="100"
                    />
                    <button className='review-button' onClick={handleReviewClick} disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Review'}
                    </button>
                </div>
            </div>
            <div className='analysis-bottom'>
                <div className='results'>
                    <div className='column'>
                        <h3>RNN Model</h3>
                        <p>Score:0.0</p>
                        <p>Classification:NA</p>
                        <p>Confidence: NA</p>
                    </div>
                    <div className='column'>
                        <h3>CNN Model</h3>
                        <p>Score:0.00</p>
                        <p>Classification: NA</p>
                        <p>Confidence: Na</p>
                    </div>
                    <div className='column'>
                        <h3>Transformer Model</h3>
                        <p>Score: {results*10||0} </p>
                        <p>Classification:NA</p>
                        <p>Confidence: NA</p>
                    </div>
                </div>
            </div>
        </>
    );
}
