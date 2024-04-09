import React, { useState } from 'react';
import './AuthForm.css'; // Import CSS file with the necessary styles
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
	const navigate = useNavigate();

	const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [hospital, setHospital] = useState('');
  const [hospitaladdress, setHospitalAddress] = useState('');
  const [contact, setContact] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [userInfo, setUserInfo] = useState(null);
	const BACKEND_URL = 'https://menosenseweb-backend.vercel.app/';
    const [isSignIn, setIsSignIn] = useState(false);
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
	const handleRegister = async () => {
		try {
		  const response = await fetch('https://menosenseweb-backend.vercel.app/api/add_dr', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			  name,
			  email,
			  password,
			  id,
			  speciality,
			  hospital,
			  hospitaladdress,
			  contact,
			}),
		  });
		  const data = await response.json();
		  console.log(data);

		  if (response.ok) {
            // If registration is successful, navigate to the doctor dashboard
            const { id } = data;
			console.log(id);
    		navigate(`/doctordashboard/${id}`);
        } 
		} catch (error) {
		  console.error('Error registering:', error);
		}
	  };
    const handleSignUpClick = () => {
        setIsSignIn(false);
        setIsRightPanelActive(true);
    };
	const handleSignInClick = () => {
        setIsSignIn(false);
        setIsRightPanelActive(false);
    };
	const handleLogin = async () => {
		try {
			console.log("hi");
			const response = await fetch(`https://menosenseweb-backend.vercel.app/api/login`, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			  id,
			  password,
			}),
		  });
		  
		  const data = await response.json();
		  if (response.ok) {
			setIsSignIn(true);
			setIsRightPanelActive(false);
    		const { id } = data;
			console.log(id);
    		navigate(`/doctordashboard/${id}`);
		  } else {
			setLoginError(data.message);
		  }
		} catch (error) {
		  console.error('Error logging in:', error);
		}
	  };
  
    return (
      <div className='body1'>
        <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
	<div class="form-container sign-up-container">
	<form action="#">
			<h1>Create Account</h1>
			<input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
			<input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
			<input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
			<input type="text" placeholder="ID" onChange={(e) => setId(e.target.value)} />
			<input type="text" placeholder="Speciality" onChange={(e) => setSpeciality(e.target.value)} />
			<input type="text" placeholder="Hospital" onChange={(e) => setHospital(e.target.value)} />
			<input type="text" placeholder="Hospital Address" onChange={(e) => setHospitalAddress(e.target.value)} />
			<input type="text" placeholder="Contact" onChange={(e) => setContact(e.target.value)} />
			<button onClick={handleRegister}>Register</button>
			</form>
	</div>
	<div class="form-container sign-in-container">
		<form action="#">
			<h1>Sign in</h1>
			<input type="text" placeholder="ID" onChange={(e) => setId(e.target.value)} />
			<input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
			<a href="#">Forgot your password?</a>
			<button onClick={handleLogin}>Sign In</button>
			
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Menosense</h1>
				<p class='para-left'> Sign in to securely manage patient records, view statistics, and access reports at your fingertips."</p>
				<button class="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Menosense</h1>
				<p class='para-right'>Register to effortlessly access patient details, view statistics, and review reports online.</p>
				<button class="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
			</div>
		</div>
	</div>
</div>


      </div>
    );
  };
  

export default AuthForm;
