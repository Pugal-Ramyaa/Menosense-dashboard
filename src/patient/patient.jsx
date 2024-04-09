import React, { useState, useEffect } from 'react';
import './patient.css';
import './index.tsx';
import { Symptoms } from './Symptoms.tsx';
import { useParams } from 'react-router-dom';
import Navigation from '../navigation/navigation.jsx';

const Patient = () => {
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
        const response = await fetch(`http://localhost:8080/api/user_info_mail?email=${email}`);
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
        const response = await fetch(`http://localhost:8080/api/vitals/${email}`);
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
        const response = await fetch(`http://localhost:8080/api/average?email=${email}&year=${new Date().getFullYear()}`);
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
          const response = await fetch(`http://localhost:8080/api/getpred/${email}`);
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
  const handleForward = () => {
    if (currentIndex < symptomList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Start from the beginning if end of list is reached
    }
  };
  
  const handleBackward = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(symptomList.length - 1); // Go to the end of list if at the beginning
    }
  };

  return (
    <div className='parent'>
      <Navigation />
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

      <div className='symptoms'>
      <Symptoms averageSymptoms={averageSymptoms} currentSymptom={symptomList[currentIndex]} />

        <div className='list'>
          <button className='problems' onClick={handleBackward}>&lt;</button>
          <button className='problems'>{symptomList[currentIndex]}</button>
          <button className='problems' onClick={handleForward}>&gt;</button>
        </div>
      </div>

      <div className='prediction'>Predicted Severity: {latestPrediction ? latestPrediction.prediction : 'N/A'}</div>
<div className='recommendation'>
  <span className='heading'>Recommendation</span>
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

      <div className='subparent'>
        <div className='heart-weight'>


        </div>

        <div className='vitals'>
          <span className='vital-heading'>Vitals</span>
          <div className='row1'>
            <ul>
              <li>HB: {vitalData?.hb}</li>
              <li>FSH: {vitalData?.fsh}</li>
              <li>DBP: {vitalData?.dbp}</li>
              <li>SBP: {vitalData?.sbp}</li>
              <li>Prolactin: {vitalData?.prl}</li>
              <li>Estrogen: {vitalData?.e2}</li>
              <li>LH: {vitalData?.lh}</li>
              <li>Progesterone: {vitalData?.p4}</li>
            </ul>
          </div>
          <div className='row2'>
            <ul>
              <li>Vitamin D: {vitalData?.vd}</li>
              <li>FT3: {vitalData?.ft3}</li>
              <li>FT4: {vitalData?.ft4}</li>
              <li>GnRH: {vitalData?.gnrh}</li>
              <li>HDL: {vitalData?.hdl}</li>
              <li>TG: {vitalData?.tg}</li>
              <li>Heart Rate: {vitalData?.hr}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patient;
