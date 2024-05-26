import React from 'react'; 
import CompanyData from '../../Component/companyData/CompanyData';
import CompanyAnalysis from "../../Component/companyAnalysis/CompanyAnalysis"
import { useParams } from 'react-router-dom'; 

export default function CompanyProfile() { 
  const {companyId} = useParams();
 // console.log(companyId);
  return (
    <>
      <CompanyData companyId = {companyId}/>
      <CompanyAnalysis companyId = {companyId}/>
    </>
  );
}
