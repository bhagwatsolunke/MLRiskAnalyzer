import "./Companies.css";
import CompanyItem from "../companyItem/Companyitem";

export default function Companies({ companies }) {
  return (
    <div className="companies">
      {companies && companies.length > 0 ? (
        companies.map((company) => (
          <CompanyItem key={company._id} companyItem={company} />
        ))
      ) : (
        <p>No current Data present</p>
      )}
    </div>
  );
}
