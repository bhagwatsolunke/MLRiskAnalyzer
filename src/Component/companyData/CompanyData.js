import {useEffect} from "react";
import "./CompanyData.css"
import {useState} from "react";
import axios from 'axios';


export default function CompanyData({companyId}){
    
    const [company,setCompany] = useState(null);
    const [stockPrice,setStockPrice] = useState(null);
    const [valuation,setValuation] = useState(null);

    useEffect(()=>{
        const getCompany= async ()=>{
            try{
                const res = await axios.get(`http://localhost:8080/api/company/${companyId}`);
                setCompany(res.data);
            }catch(error)
            {
                console.error('Error fecthing company details:',error);
            }
            
        };
        getCompany();
    },[companyId])

    useEffect(()=>{
        if(company){
        const fecthData =async()=>{
            try{
                const response = await fetch(`http://localhost:8080/api/details/${company.symbol}`);
                if(!response.ok)
                {
                    throw new Error('Network response was not Ok');
                }
                const data = await response.json();
                setStockPrice(data.stockPrice);
                setValuation(data.valuation);
            }catch(error){
                console.error('Error fetching data:',error);
            }
        };
        fecthData();
        }
    },[company]);

    return (
        <div>
        {company && (
            <div className="company">
                <div className="company-title">{company.companyname}</div>
                <div className="company-data">
                    <div className="left">
                        <div className="first-row">
                            <div className="first-row-left">Listed: {company.listed}</div>
                        </div>
                        <div className="second-row">
                            <div className="second-row-left">Founded: {company.founded}</div>
                        </div>
                        <div className="third-row">
                            Industry: {company.industry}
                        </div>
                        <div className="fourth-row">
                            <div className="fourth-row-left">Stock Price: {stockPrice}</div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="first-row">
                            <div className="first-row-right">Symbol: {company.symbol}</div>
                        </div>
                        <div className="second-row">
                            <div className="second-row-right">Listing-Date: {company.listingDate}</div>
                        </div>
                        <div className="third-row">
                            <br></br>
                        </div>
                        <div className="fourth-row">
                            <div className="fourth-row-right">Total Market Valuation: {valuation ? valuation.toFixed(2): 'N/A'} Cr</div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
    );

}
