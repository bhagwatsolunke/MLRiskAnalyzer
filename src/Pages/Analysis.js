import React, { useEffect,useState } from 'react';
import axios from 'axios';

export default function Analysis(props) {

  const [textInput, setTextInput] = useState('');
  const [results, setResults] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user information from localStorage
    const storedUser = localStorage.getItem('user');
    
    // Parse the stored user information
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    setUser(parsedUser);
  }, []);


  const handleTextChange = (event) => {
      setTextInput(event.target.value);
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      props.showAlert("Review Submitted Successfully", "success");
      // Perform any validation if needed

      // Send data to the backend
      await sendDataToBackend(textInput);
  };

  const sendDataToBackend = async (textData) => {
      try {
          const response = await axios.post('http://localhost:5000/predict', {
              text: textData,
          });

          setResults(response.data);
          console.log(results, 'success');
      } catch (error) {
          console.error('Error sending data to backend:', error);
          // Handle errors
      }
  };

  const getOverallSentiment = () => {
      if(results && results.length > 0) {
          const negativescore = results[0].score; 
          const positivescore = results[2].score; 
          const Neutralscore= results[1].score;
          if (negativescore>Neutralscore && negativescore>positivescore) {
              return 'Negative';
          } else if (positivescore>Neutralscore && positivescore>negativescore) {
              return 'Positive';
          } else {
              return 'Neutral';
          }
      }

      return 'No Results';
  };

  return (
    <div >
      {user && <h4>Welcome back, {user.name}!</h4>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={textInput}
                        onChange={handleTextChange}
                        style={{ width: '100%', height: '100px', padding: '10px', margin: '5px' }}
                    ></input>
                </div>
                <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', marginLeft: '20px' }} >
                    Submit
                </button>
            </form>

            <div  style={{ justifyContent: 'center', marginLeft: '20px' }}> 
                <h2>Results:</h2>
                {results && results.length >= 3 && (
                    <>
                        <ul>
                            <li style={{ color: 'green' }}>
                                <strong>Label: Positive</strong>, <strong>Score:</strong> {results[2].score}
                            </li>
                            <li style={{ color: 'gray' }}>
                                <strong>Label: Neutral</strong>, <strong>Score:</strong> {results[1].score}
                            </li>
                            <li style={{ color: 'red' }}>
                                <strong>Label: Negative</strong>, <strong>Score:</strong> {results[0].score}
                            </li>
                        </ul>

                    </>
                )}
                 </div>
                <div style={{ justifyContent: 'center', marginLeft: '20px' }} >
                <h2>Overall Sentiment:</h2>
                <h4>{getOverallSentiment()}</h4>
                </div>
                
           
        </div>
    );
}
