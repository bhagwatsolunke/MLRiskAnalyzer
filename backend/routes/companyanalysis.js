const express = require('express');
const router = express.Router(); 

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
  



  module.exports = router;