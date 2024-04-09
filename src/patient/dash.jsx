import React, { useState, useEffect } from 'react';
import './dash.css';
import './index.tsx';
import { Symptoms } from './Symptoms.tsx';
import { useParams } from 'react-router-dom';
import Navigation from '../navigation/navigation.jsx';
import doctor from '../images/dr.png';
const Dash = () => {
    const { email } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [vitalData, setVitalData] = useState(null);
  const [averageSymptoms, setAverageSymptoms] = useState([]);
  const [averageValues, setAverageValues] = useState([]);
  const symptomList = [
    'sleepingProblems',
    'hotFlashes',
    'nightSweats',
    'chills',
    'fatigue',
    'headAche',
    'vaginalDryness',
    'moodSwings',
    'weight',
    'heartRate'
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [latestPrediction, setLatestPrediction] = useState(null);

  
    

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`https://menosenseweb-backend.vercel.app/api/user_info_mail?email=${email}`);
        const data = await response.json();
        if (response.ok) {
          setPatientData(data);
        } else {
          console.error('Error fetching patient data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    const fetchVitalData = async () => {
      try {
        const response = await fetch(`https://menosenseweb-backend.vercel.app/api/vitals/${email}`);
        const data = await response.json();
        if (response.ok) {
          setVitalData(data);
        } else {
          console.error('Error fetching vital data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching vital data:', error);
      }
    };
    const fetchAverageSymptoms = async () => {
      try {
        const response = await fetch(`https://menosenseweb-backend.vercel.app/api/average?email=${email}&year=${new Date().getFullYear()}`);
        const data = await response.json();
        if (response.ok) {
          setAverageSymptoms(data.averageSymptoms);
        } else {
          console.error('Error fetching average symptoms data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching average symptoms data:', error);
      }
    };
    

      const fetchLatestPrediction = async () => {
        try {
          const response = await fetch(`https://menosenseweb-backend.vercel.app/api/getpred/${email}`);
          const data = await response.json();
          if (response.ok) {
            setLatestPrediction(data);
            console.log(data);
          } else {
            console.error('Error fetching latest prediction:', data.message);
          }
        } catch (error) {
          console.error('Error fetching latest prediction:', error);
        }
    };

    fetchPatientData();
    fetchVitalData();
    fetchAverageSymptoms();
    fetchLatestPrediction();
    // fetchAverageValues();
  }, [email]);

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
    
  };
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const handleForward = () => {
    if (currentIndex < symptomList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Start from the beginning if end of list is reached
    }
  };
  const getBackgroundColor = () => {
    if (latestPrediction) {
      const severity = latestPrediction.prediction;
      if (severity === 'Mild') {
        return '#9ae69d';
      } else if (severity === 'Moderate') {
        return '#FEE768';
      } else if (severity === 'Severe') {
        return '#ef234a';
      }
    }
    return 'transparent'; // Default background color
  };
  
  
  const handleBackward = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(symptomList.length - 1); // Go to the end of list if at the beginning
    }
  };
  return (
    <div className="app">
      <div className="left-screen">
        <div className="left-screen-content">
            <div className="blue-box">
                <h3  style={{ fontFamily: 'Roboto', fontSize: '23px' }} className="box-text">Track and monitor the patient's progress over time, documenting improvements, setbacks, and any changes in their health status or treatment response.</h3>
                <img src={doctor} alt="Image" className="box-image" />
            </div>
            <div className="row-of-boxes">
            <div className="box" style={{ backgroundColor: getBackgroundColor() }}>
              <div className="info-icon"onClick={togglePopup}>ℹ️</div>
              Post Menopause Severity Prediction:
              <br/>
              <span>{latestPrediction ? latestPrediction.prediction : 'N/A'}</span>
            </div>
            {showPopup && (
              <div className="popup">
                <p>The severity prediction is based on machine learning algorithms. Users input their data, and the system uses this information to predict the severity.</p>
                <button onClick={togglePopup}>Close</button>
              </div>
            )}
            <div className="box">
            <div className="recommendations-box">
            <span>Recommendation Predicted</span>
              <ul>
                {latestPrediction && latestPrediction.recommendation && latestPrediction.recommendation.length > 0 ? (
                  latestPrediction.recommendation.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))
                ) : (
                  <li>{latestPrediction ? 'No recommendation available' : 'N/A'}</li>
                )}
              </ul>
            </div>

            </div>
          
        </div>
        <div className="medical-history">
          <h2>Medical History</h2>
          {patientData && (
            <div className='history'>
              Cardiovascular Disease: {patientData[0].Cardiovascular_disease ? 'Yes' : 'No'}
              <br />
              Diabetes: {patientData[0].Diabetes ? 'Yes' : 'No'}
              <br />
              Menstrual Irregularity: {patientData[0].Menstrual_Irregularity ? 'Yes' : 'No'}
              <br />
              Obesity: {patientData[0].Obesity ? 'Yes' : 'No'}
              <br />
              Hypertension: {patientData[0].Hypertension ? 'Yes' : 'No'}
              <br />
              PCOS: {patientData[0].PCOS ? 'Yes' : 'No'}
              <br />
              Thyroid problem: {patientData[0].Thyroid_problem ? 'Yes' : 'No'}
            </div>
          )}
        </div>
        <div className="new-rectangular-box">
            <div >
              <Symptoms averageSymptoms={averageSymptoms} currentSymptom={symptomList[currentIndex]} />

                <div className='buttons'>
                  <button  onClick={handleBackward}>&lt;</button>
                  <button >{symptomList[currentIndex]}</button>
                  <button  onClick={handleForward}>&gt;</button>
                </div>
              </div>
            </div>
        </div>
        <div className="row-of-boxes">
            <div className="box1" >
            <h2>Vitals</h2>
            <ul>
              <li style={{ textAlign: 'left' }}>HB:<span style={{ float: 'right', fontSize:'15px',paddingRight:'20px' }}> {vitalData?.hb} </span></li>
              <li style={{ textAlign: 'left' }}>FSH:<span style={{ float: 'right', fontSize:'15px',paddingRight:'20px' }}>{vitalData?.fsh} </span> </li>
              <li style={{ textAlign: 'left' }}>DBP:<span style={{ float: 'right', fontSize:'15px',paddingRight:'20px' }}> {vitalData?.dbp} </span></li>
              <li style={{ textAlign: 'left' }}>SBP:<span style={{ float: 'right', fontSize:'15px',paddingRight:'20px' }}> {vitalData?.sbp}</span></li>
              <li style={{ textAlign: 'left' }}>Prolactin: <span style={{ float: 'right', fontSize:'15px',paddingRight:'20px' }}>{vitalData?.prl}</span></li>
              <li style={{ textAlign: 'left' }}>Estrogen:<span style={{ float: 'right', fontSize:'15px',paddingRight:'20px' }}> {vitalData?.e2} </span></li>
              <li style={{ textAlign: 'left' }}>LH:<span style={{ float: 'right', fontSize:'15px',paddingRight:'20px' }}> {vitalData?.lh}</span></li>
              <li style={{ textAlign: 'left' }}>Progesterone:<span style={{ float: 'right', fontSize:'15px',paddingRight:'20px' }}> {vitalData?.p4}</span></li>
              <li style={{ textAlign: 'left' }}>Vitamin D:<span style={{ float: 'right', fontSize:'15px',paddingRight:'20px' }}> {vitalData?.vd}</span></li>
              <li style={{ textAlign: 'left' }}>FT3:<span style={{ float: 'right', fontSize:'15px',paddingRight:'20px' }}> {vitalData?.ft3}</span></li>
              <li style={{ textAlign: 'left' }}>FT4:<span style={{ float: 'right', fontSize:'15px',paddingRight:'20px' }}> {vitalData?.ft4}</span></li>
              <li style={{ textAlign: 'left' }}>GnRH: <span style={{ float: 'right', fontSize:'15px',paddingRight:'20px' }}> {vitalData?.gnrh}</span></li>
              <li style={{ textAlign: 'left' }}>HDL: <span style={{ float: 'right', fontSize:'15px' ,paddingRight:'20px'}}> {vitalData?.hdl}</span></li>
              <li style={{ textAlign: 'left' }}>TG: <span style={{ float: 'right', fontSize:'15px',paddingRight:'20px' }}>{vitalData?.tg}</span></li>
              <li style={{ textAlign: 'left' }}>Heart Rate:  <span style={{ float: 'right', fontSize:'15px',paddingRight:'20px' }}> {vitalData?.hr}</span></li>
            </ul>
            </div>
            <div className="box2">
              <h2> Abnormal Vitals Signs</h2>

              <ul>
              {vitalData?.hb && (vitalData.hb < 12 || vitalData.hb > 16) && (
    <li style={{ textAlign: 'left' }}>
      HB: 
      <span className='vitalbutton' style={{ 
        backgroundColor: vitalData.hb < 12 ? '#FEE768' : (vitalData.hb > 16 ? '#ef234a' : 'transparent'), 
        float: 'right', 
        fontSize: '15px', 
        paddingRight: '20px' 
      }}>
        {vitalData.hb < 12 ? 'Low' : (vitalData.hb > 16 ? 'High' : null)}
      </span>
    </li>
  )}

  {vitalData?.fsh && (vitalData.fsh < 25.8 || vitalData.fsh > 134.8) && (
    <li style={{ textAlign: 'left' }}>
      FSH: 
      <span className='vitalbutton' style={{ 
        backgroundColor: vitalData.fsh < 25.8 ? '#FEE768' : (vitalData.fsh > 134.8 ? '#ef234a' : 'transparent'), 
        float: 'right', 
        fontSize: '15px', 
        paddingRight: '20px' 
      }}>
        {vitalData.fsh < 25.8 ? 'Low' : (vitalData.fsh > 134.8 ? 'High' : null)}
      </span>
    </li>
  )}

  {vitalData?.dbp && (vitalData.dbp < 60 || vitalData.dbp > 80) && (
    <li style={{ textAlign: 'left' }}>
      DBP: 
      <span className='vitalbutton' style={{ 
        backgroundColor: vitalData.dbp < 60 ? '#FEE768' : (vitalData.dbp > 80 ? '#ef234a' : 'transparent'), 
        float: 'right', 
        fontSize: '15px', 
        paddingRight: '20px' 
      }}>
        {vitalData.dbp < 60 ? 'Low' : (vitalData.dbp > 80 ? 'High' : null)}
      </span>
    </li>
  )}

  {vitalData?.sbp && (vitalData.sbp < 90 || vitalData.sbp > 120) && (
    <li style={{ textAlign: 'left' }}>
      SBP: 
      <span className='vitalbutton' style={{ 
        backgroundColor: vitalData.sbp < 90 ? '#FEE768' : (vitalData.sbp > 120 ? '#ef234a' : 'transparent'), 
        float: 'right', 
        fontSize: '15px', 
        paddingRight: '20px' 
      }}>
        {vitalData.sbp < 90 ? 'Low' : (vitalData.sbp > 120 ? 'High' : null)}
      </span>
    </li>
  )}

{vitalData?.ft3 && (vitalData.ft3 < 2.3 || vitalData.ft3 > 4.1) && (
    <li style={{ textAlign: 'left' }}>
      FT3: 
      <span className='vitalbutton' style={{ 
        backgroundColor: vitalData.ft3 < 2.3 ? '#FEE768' : (vitalData.ft3 > 4.1 ? '#ef234a' : 'transparent'), 
        float: 'right', 
        fontSize: '15px', 
        paddingRight: '20px' 
      }}>
        {vitalData.ft3 < 2.3 ? 'Low' : (vitalData.ft3 > 4.1 ? 'High' : null)}
      </span>
    </li>
  )}

  {vitalData?.ft4 && (vitalData.ft4 < 0.8 || vitalData.ft4 > 1.8) && (
    <li style={{ textAlign: 'left' }}>
      FT4: 
      <span className='vitalbutton' style={{ 
        backgroundColor: vitalData.ft4 < 0.8 ? '#FEE768' : (vitalData.ft4 > 1.8 ? '#ef234a' : 'transparent'), 
        float: 'right', 
        fontSize: '15px', 
        paddingRight: '20px' 
      }}>
        {vitalData.ft4 < 0.8 ? 'Low' : (vitalData.ft4 > 1.8 ? 'High' : null)}
      </span>
    </li>
  )}

  {vitalData?.p4 && (vitalData.p4 < 0.2 || vitalData.p4 > 1) && (
    <li style={{ textAlign: 'left' }}>
      Progesterone: 
      <span className='vitalbutton' style={{ 
        backgroundColor: vitalData.p4 < 0.2 ? '#FEE768' : (vitalData.p4 > 1 ? '#ef234a' : 'transparent'), 
        float: 'right', 
        fontSize: '15px', 
        paddingRight: '20px' 
      }}>
        {vitalData.p4 < 0.2 ? 'Low' : (vitalData.p4 > 1 ? 'High' : null)}
      </span>
    </li>
  )}

  {vitalData?.hdl && (vitalData.hdl < 40 || vitalData.hdl > 60) && (
    <li style={{ textAlign: 'left' }}>
      HDL: 
      <span className='vitalbutton' style={{ 
        backgroundColor: vitalData.hdl < 40 ? '#FEE768' : (vitalData.hdl > 60 ? '#ef234a' : 'transparent'), 
        float: 'right', 
        fontSize: '15px', 
        paddingRight: '20px' 
      }}>
        {vitalData.hdl < 40 ? 'Low' : (vitalData.hdl > 60 ? 'High' : null)}
      </span>
    </li>
  )}

  {vitalData?.tg && (vitalData.tg < 150 || vitalData.tg > 200) && (
    <li style={{ textAlign: 'left' }}>
      TG: 
      <span className='vitalbutton' style={{ 
        backgroundColor: vitalData.tg < 150 ? '#FEE768' : (vitalData.tg > 200 ? '#ef234a' : 'transparent'), 
        float: 'right', 
        fontSize: '15px', 
        paddingRight: '20px' 
      }}>
        {vitalData.tg < 150 ? 'Low' : (vitalData.tg > 200 ? 'High' : null)}
      </span>
    </li>
  )}

  {vitalData?.hr && (vitalData.hr < 60 || vitalData.hr > 100) && (
    <li style={{ textAlign: 'left' }}>
      Heart Rate: 
      <span className='vitalbutton' style={{ 
        backgroundColor: vitalData.hr < 60 ? '#FEE768' : (vitalData.hr > 100 ? '#ef234a' : 'transparent'), 
        float: 'right', 
        fontSize: '15px', 
        paddingRight: '20px' 
      }}>
        {vitalData.hr < 60 ? 'Low' : (vitalData.hr > 100 ? 'High' : null)}
      </span>
    </li>
  )}

  {vitalData?.vd && (vitalData.vd < 20 || vitalData.vd > 40) && (
    <li style={{ textAlign: 'left' }}>
      Vitamin D: 
      <span className='vitalbutton' style={{ 
        backgroundColor: vitalData.vd < 20 ? '#FEE768' : (vitalData.vd > 40 ? '#ef234a' : 'transparent'), 
        float: 'right', 
        fontSize: '15px', 
        paddingRight: '20px' 
      }}>
        {vitalData.vd < 20 ? 'Low' : (vitalData.vd > 40 ? 'High' : null)}
      </span>
    </li>
  )}

  {vitalData?.e2 && (vitalData.e2 < 30 || vitalData.e2 > 400) && (
    <li style={{ textAlign: 'left' }}>
      Estrogen: 
      <span className='vitalbutton' style={{ 
        backgroundColor: vitalData.e2 < 30 ? '#FEE768' : (vitalData.e2 > 400 ? '#ef234a' : 'transparent'), 
        float: 'right', 
        fontSize: '15px', 
        paddingRight: '20px' 
      }}>
        {vitalData.e2 < 30 ? 'Low' : (vitalData.e2 > 400 ? 'High' : null)}
      </span>
    </li>
  )}

  {vitalData?.lh && (vitalData.lh < 14.2 || vitalData.lh > 52.3) && (
    <li style={{ textAlign: 'left' }}>
      LH: 
      <span className='vitalbutton' style={{ 
        backgroundColor: vitalData.lh < 14.2 ? '#FEE768' : (vitalData.lh > 52.3 ? '#ef234a' : 'transparent'), 
        float: 'right', 
        fontSize: '15px', 
        paddingRight: '20px' 
      }}>
        {vitalData.lh < 14.2 ? 'Low' : (vitalData.lh > 52.3 ? 'High' : null)}
      </span>
    </li>
  )}

  {vitalData?.gnrh && (vitalData.gnrh < 2 || vitalData.gnrh > 10) && (
    <li style={{ textAlign: 'left' }}>
      GnRH: 
      <span className='vitalbutton' style={{ 
        backgroundColor: vitalData.gnrh < 2 ? '#FEE768' : (vitalData.gnrh > 10 ? '#ef234a' : 'transparent'), 
        float: 'right', 
        fontSize: '15px', 
        paddingRight: '20px' 
      }}>
        {vitalData.gnrh < 2 ? 'Low' : (vitalData.gnrh > 10 ? 'High' : null)}
      </span>
    </li>
  )}

  {vitalData?.tsh && (vitalData.tsh < 0.46 || vitalData.tsh > 4) && (
    <li style={{ textAlign: 'left' }}>
      TSH: 
      <span className='vitalbutton' style={{ 
        backgroundColor: vitalData.tsh < 0.46 ? '#FEE768' : (vitalData.tsh > 4 ? '#ef234a' : 'transparent'), 
        float: 'right', 
        fontSize: '15px', 
        paddingRight: '20px' 
      }}>
        {vitalData.tsh < 0.46 ? 'Low' : (vitalData.tsh > 4 ? 'High' : null)}
      </span>
    </li>
  )}
  {vitalData?.prl && (vitalData.prl < 2 || vitalData.prl > 25) && (
    <li style={{ textAlign: 'left' }}>
      Prolactin: 
      <span className='vitalbutton' style={{ 
        backgroundColor: vitalData.prl < 2 ? '#FEE768' : (vitalData.prl > 25 ? '#ef234a' : 'transparent'), 
        float: 'right', 
        fontSize: '15px', 
        paddingRight: '20px' 
      }}>
        {vitalData.prl < 2 ? 'Low' : (vitalData.prl > 25 ? 'High' : null)}
      </span>
    </li>
  )}
              </ul>


            </div>
            </div>
      </div>
      <div className="right-screen">
      {patientData && (
        <div className='container2'>
          <div className="circle1">{patientData[0].name.charAt(0)}</div>
          <div className='details'>
            <span className='name'>{patientData[0].name}</span>
            <br />
            <span className='email'>{patientData[0].email}</span>
            <br />
            <br />
            <span className='detailstext'>Details</span>
            <hr />
            <span className='deets'>
              <span className='left'>Age:</span>
              <span className='right'> {calculateAge(patientData[0].birthday)}</span>
            </span>
            <br />
            <span className='deets'>
              <span className='left'>Height (cm):</span>
              <span className='right'>{patientData[0].height}</span>
            </span>
            <br />
            <span className='deets'>
              <span className='left'>Weight (kg):</span>
              <span className='right'>{patientData[0].weight}</span>
            </span>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default Dash