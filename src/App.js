import './App.css';
import Homepage from './Pages/homepage/Homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/login/login.js';
import Signup from './Pages/signup/Signup.js';
import Navbar from './Component/navbar/Navbar.js';
import Alert from './Component/alert/Alert.js';
import {useState} from 'react'
import About from './Pages/about/About.js';
import ProfilePage from './Pages/profile/Profile.js';
import Watchlist from './Pages/watchlist/Watchlist.js';
import Analysis from './Pages/analysis/Analysis.js';
import CompanyProfile from './Pages/companyprofile/CompanyProfile.js';
import UpdateProfile from './Pages/updateProfile/Update.js';
import News from './Pages/news/News.js';
import MLRiskAnalyzer from './Pages/mlriskanalyzer/mlriskanalyzer.js';


function App() {

  const  pageSize =5;
  const [progress, setProgress] = useState(0)

  const[alert,setAlert]= useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}

  return (
    <Router>
    <div>
        <Navbar />
        <Alert alert={alert}/>
        <Routes>
          <Route exact path="/mlriskanalyzer" element={<MLRiskAnalyzer/>} />
          <Route exact path="/" element={<Homepage showAlert={showAlert} />} />
          <Route exact path="/company/:companyId" element={<CompanyProfile/>} />         
           <Route exact path="/watchlist" element={<Watchlist showAlert={showAlert} />} />
          <Route exact path="/analysis" element={<Analysis showAlert={showAlert}/>} />
          <Route exact path="/profile" element={<ProfilePage/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/login"  element={<Login showAlert={showAlert}/>}/>
          <Route exact path="/signup"  element={<Signup showAlert={showAlert}/>}/>
          <Route exact path="/updateProfile" element={<UpdateProfile/>}/>
          <Route exact path="/news"element={<News setProgress={setProgress} key="business" pageSize={pageSize}  country="in" category="business" />}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
