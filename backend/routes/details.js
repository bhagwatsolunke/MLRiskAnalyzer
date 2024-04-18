const express = require('express');
const router = express.Router(); 
const { NseIndia } = require("stock-nse-india");

router.get('/:symbol',async (req,res)=>{
    try{
        const symbol = req.params.symbol;

        const nseIndia = new NseIndia();
        const details = await nseIndia.getEquityDetails(symbol);

        const stockPrice = details.priceInfo.lastPrice;
        const issuedSize = details.securityInfo.issuedSize;
        const valuation = (stockPrice * issuedSize)/10000000;

        const company_details = {
            stockPrice : stockPrice,
            valuation : valuation
        };
        res.status(201).json(company_details);
    }catch(error){
        console.error(error);
        res.status(500).json({error:"External sever error"})
    }
});

module.exports = router;