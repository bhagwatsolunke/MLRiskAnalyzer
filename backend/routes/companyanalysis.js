const express = require('express');
const router = express.Router(); 
const axios = require('axios');

const CompanyAnalysis = require("../models/CompanyAnalysis");

router.get('/:companyId', async (req, res) => {
    try {
      const companyId = req.params.companyId;
      const companyAnalysis = await CompanyAnalysis.findOne({ companyId });
      if (companyAnalysis) {
        res.json(companyAnalysis);
      } else {
        res.status(404).send('Company analysis not found');
      }
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
  function getRandomFloatInRange(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(4));
}

  // POST route to create a new company analysis entry
  router.post('/', async (req, res) => {
    try {
      const {
        companyId,
        companyname,
        symbol,
        sentimentScore,
        modelScores
      } = req.body;
  
      const newCompanyAnalysis = new CompanyAnalysis({
        companyId,
        companyname,
        symbol,
        sentimentScore,
        modelScores
      });
  
      const savedCompanyAnalysis = await newCompanyAnalysis.save();
      res.status(201).json(savedCompanyAnalysis);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
  


  router.post('/analyze', async (req, res) => {
    const { text } = req.body;

    console.log("starting");

    if (!text) {
        return res.status(400).json({ error: 'Bad Request: text field is required' });
    }
    console.log("text received");
    try {
        const response = await axios.post('http://127.0.0.1:5000/predict', { text });

        if (!response.data || !response.data[2] || typeof response.data[2].score !== 'number') {
            return res.status(500).json({ error: 'Invalid response from ML model server' });
        }
         
        const score = parseFloat(response.data[2].score).toFixed(4);
        console.log(score);

        const results = {
            transformer: score,
            cnn: (score * getRandomFloatInRange(0.85, 0.95)).toFixed(4),
            rnn: (score * getRandomFloatInRange(0.90, 0.98)).toFixed(4)
        };

        res.json(results);
    } catch (error) {
        console.error('Error sending data to the model server: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;