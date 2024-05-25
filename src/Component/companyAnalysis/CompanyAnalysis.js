import React, { useState } from 'react';
import {useEffect} from "react";
import axios from 'axios';
import './CompanyAnalysis.css';

export default function CompanyAnalysis({companyId}) {

  // const [scores, setScores] = useState([]);

  const scores = [
    { origin: 'Money Control', score: 5.75 },
    { origin: 'Economic Times', score: 8.4 },
    { origin: 'NDTV', score: 7.15 },
    { origin: 'Times of India', score: 6.8 },
    { origin: 'Glassdoor', score: 6.9 },
    { origin: 'Business Today', score: 8.2 },
    { origin: 'Livemint', score: 7.6 },
];

  // useEffect(()=>{
  //     const getCompanyAnalysis = async () =>{
  //       try{
  //         const res = await axios.get(`http://localhost:8080/api/analysis/${companyId}`);
  //         setScores(res.data);
  //       }catch(error)
  //       {
  //         console.error('Error fecthing companyAnalysis details: ',error);
  //       }
  //     };
  //     getCompanyAnalysis();
  // },[scores])

  function ScoreColor( score ) {
    if (score > 8) {
     return'very-high';
    } else if (score > 6) {
     return'high';
    } else if (score > 4) {
      return'medium';
    } else if(score >2)
    {
      return 'low'
    }else if(score>=0){
      return 'very-low'
    }
  }

  return (
    <div className='companyAnalysis'>
      <div className='analysis first-row'>
        <p className={`sentiment-score ${ScoreColor(8.0)}`}>Sentiment Score: 8.45</p>
      </div>
      <div className='analysis second-row'>
        {/* RNN model */}
        <div className = 'analysis-col'>
          <h3>Reviewed with RNN Model</h3>
            <table className='sentiment-table'>
              <thead>
                <tr>
                  <th>Origin</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((scoreData,index)=>(
                  <tr key = {index}>
                    <td>{scoreData.origin}</td>
                    <td>{scoreData.score.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
        {/* CNN Model */}
        <div className = 'analysis-col'>
          <h3>Reviewed with CNN Model</h3>
            <table className='sentiment-table'>
              <thead>
                <tr>
                  <th>Origin</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((scoreData,index)=>(
                  <tr key = {index}>
                    <td>{scoreData.origin}</td>
                    <td>{scoreData.score.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
        {/* Transformer Model */}
        <div className = 'analysis-col'>
          <h3>Reviewed with Transformer Model</h3>
            <table className='sentiment-table'>
              <thead>
                <tr>
                  <th>Origin</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((scoreData,index)=>(
                  <tr key = {index}>
                    <td>{scoreData.origin}</td>
                    <td>{scoreData.score.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
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
  )
}
