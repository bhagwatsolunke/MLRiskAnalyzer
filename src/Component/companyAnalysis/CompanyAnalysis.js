import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CompanyAnalysis.css';

export default function CompanyAnalysis({ companyId }) {
  const [modelScores, setModelScores] = useState([]);
  const [sentimentScore, setSentimentScore] = useState('');

  useEffect(() => {
    const getCompanyAnalysis = async () => {
      try {
       // const res = await axios.get(`http://localhost:8080/api/companyanalysis/${companyId}`);
       const res = await axios.get(`http://localhost:8080/api/companyanalysis/8`);
       setModelScores(res.data.modelScores || []); // Ensuring modelScores is an array
        setSentimentScore(res.data.sentimentScore || ''); // Default to empty string if not available
      } catch (error) {
        console.error('Error fetching company analysis details: ', error);
      }
    };
    getCompanyAnalysis();
  }, [companyId]);

  function ScoreColor(score) {
    if (score > 8) {
      return 'very-high';
    } else if (score > 6) {
      return 'high';
    } else if (score > 4) {
      return 'medium';
    } else if (score > 2) {
      return 'low';
    } else if (score >= 0) {
      return 'very-low';
    }
  }

  return (
    <div className='companyAnalysis'>
      <div className='analysis first-row'>
        <p className={`sentiment-score ${ScoreColor(sentimentScore)}`}>Sentiment Score: {sentimentScore}</p>
      </div>
      <div className='analysis second-row'>
        {modelScores.map((modelData, index) => (
          <div key={index} className='analysis-col'>
            <h3>Reviewed with {modelData.model} Model</h3>
            <table className='sentiment-table'>
              <thead>
                <tr>
                  <th>Origin</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {modelData.scores.map((scoreData, idx) => (
                  <tr key={idx}>
                    <td>{scoreData.origin}</td>
                    <td>{scoreData.score !== undefined ? scoreData.score.toFixed(2) : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <div className='analysis third-row'>
        <h3>Analysis Details</h3>
        <p className='analysis-details'>RNN-Accuracy 52 % -- Data Cleaning -- Labelling -- 72%  Time_2.7s </p>
        <p className='analysis-details'>CNN-Accuracy 67 % -- Data Cleaning -- Labelling -- 76%  Time_3.5s</p>
        <p className='analysis-details'>Transformer-Accuracy 73 % -- Data Cleaning -- Labelling -- 82%  Time_1.5s</p>
      </div>
      <div className='analysis notice'>
        <p>*Notice : All the analysis performed are on <b>Data Available</b> in the last <b>2 Months</b>, and does not reflect old data.</p>
      </div>
    </div>
  );
}
