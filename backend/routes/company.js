const express = require('express');
const router = express.Router(); 

const Company = require("../models/Company");
const User = require('../models/User');


// Create a new company
router.post("/", async (req, res) => {
    try {
        // Check if required fields are present in the request body
        if (!req.body.companyname) {
            return res.status(400).json({ error: 'Name not present' });
        }

        const newCompany = new Company({
            companyname: req.body.companyname,
            industry: req.body.industry,
            symbol : req.body.symbol,
            listingDate:req.body.listingDate,
            founded : req.body.founded,
            listed : req.body.listed,
        });

        const savedCompany = await newCompany.save();
        res.status(201).json(savedCompany); // Use 201 status code for successful creation
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Internal server error' });
    }
});


//to get all company list
router.get("/", async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// To get a single company
router.get("/:companyId", async (req, res) => {
    try {
        // Extract company ID from request parameters
        const companyId = req.params.companyId;

        // Find the company by ID in the database
        const company = await Company.findById(companyId);

        // Check if company exists
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        // If company exists, return it
        res.status(200).json(company);
        // console.log(company);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Internal server error' });
    }
});


// to add company to watchlist of user 
router.put("/:userId/addwatchlist", async (req, res) => {
    if (req.body.companyId) {
        try {
            const user = await User.findById(req.params.userId);
            const companyToAdd = req.body.companyId;

            if (!user.watchlist.includes(companyToAdd)) {
                // Add the company to the user's watchlist
                await user.updateOne({ $push: { watchlist: companyToAdd } });
                res.status(200).json("Company has been added to the watchlist");
            } else {
                res.status(403).json("You already have this company in your watchlist");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(400).json("Company ID is required");
    }
});

//to remove from watchlist

router.put("/:userId/removewatchlist", async (req, res) => {
    if (req.body.companyId) {
        try {
            const user = await User.findById(req.params.userId);
            const companyToRemove = req.body.companyId;

            if (user.watchlist.includes(companyToRemove)) {
                // Remove the company from the user's watchlist
                await user.updateOne({ $pull: { watchlist: companyToRemove } });
                res.status(200).json("Company has been removed from the watchlist");
            } else {
                res.status(403).json("This company is not in your watchlist");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(400).json("Company ID is required");
    }
});




// Route to get all watchlist companies of a user
router.get("/watchlist/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate('watchlist');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Use Promise.all to await all company lookups
        const fev = await Promise.all(
            user.watchlist.map((companyId) => {
                return Company.findById(companyId);
            })
        );

        // Map the fev array to create the watchlist array
        const watchlist = fev.map((company) => ({
            _id: company._id,
            companyname: company.companyname, // Adjust field names based on your Company schema
            industry: company.industry // Adjust field names based on your Company schema
        }));
      
        res.status(200).json(watchlist);
    //    console.log("Watchlist fetched successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
        console.log("Error fetching watchlist");
    }
});



module.exports = router; // Export the router for use in other files
