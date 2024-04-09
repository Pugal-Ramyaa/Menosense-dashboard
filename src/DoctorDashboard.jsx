import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DoctorDashboardcss.css'; // Import CSS file for styling
import { faUser, faBirthdayCake, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navigation from './navigation/navigation';
import { useParams } from 'react-router-dom';
const DoctorDashboard = () => {
  
  const [patients, setPatients] = useState([]);
  const { id } = useParams();
  // Fetch patients data from backend when component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response  = await fetch(`https://menosenseweb-backend.vercel.app/api/user_info?DoctorId=${id}`);
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  // Function to calculate age from birthday date
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

  return (
    <div className='body'>
      <Navigation />
      <div className='header'>
        <span className='heading1'>Patient's list</span>
        <br />
        <span className='heading2'>Patient's who have connected with you</span>
      </div>
      <div className="patient-list">
        {patients.map(patient => (
          <Link key={patient._id} to={`/dash/${patient.email}`} className="patient-box">
          <div className="circle">
            {patient.name.charAt(0)}
          </div>
          <div className="info">
            <div><FontAwesomeIcon icon={faUser} /> <bold>{patient.name}</bold></div>
            <div><FontAwesomeIcon icon={faBirthdayCake} /> {calculateAge(patient.birthday)}</div>
            <div><FontAwesomeIcon icon={faEnvelope} /> {patient.email}</div>
          </div>
        </Link>
        ))}
      </div>
    </div>
  );
};

export default DoctorDashboard;
