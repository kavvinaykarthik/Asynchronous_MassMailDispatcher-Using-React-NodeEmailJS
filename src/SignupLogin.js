import React, { useState } from 'react';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import styles from './l.css'; // Import CSS module

const firebaseConfig = {
   //config Your's
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

const SignupLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await auth.createUserWithEmailAndPassword(email, password);
      const { user } = response;
      await firestore.collection('users').doc(user.uid).set({ email: user.email });
      setMessage('User signed up successfully!');
      console.log('User signed up successfully:', user.uid);
      window.location.href = '/MassMailDispatcher'; // Navigate to root route after sign up
    } catch (error) {
      setMessage('Error signing up: ' + error.message);
      console.error('Error signing up:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      const { user } = response;
      setMessage('User signed in successfully!');
      console.log('User signed in successfully:', user.uid);
      window.location.href = '/MassMailDispatcher'; // Navigate to root route after sign in
    } catch (error) {
      setMessage('Error signing in: ' + error.message);
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">MassMailDispatcher</h1>
      <h3>Get SignIn</h3>
      <div className="form">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleSignIn}>Sign In</button>
        <p>Don't have an account? Go for SignUp</p>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default SignupLogin;

