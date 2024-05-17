import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupLogin from './SignupLogin'; // Import SignupLogin component
import  MassMailDispatcher from './MassMailDispatcher';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignupLogin />} /> {/* Default route */}
                <Route path="/login" element={<SignupLogin />} /> {/* Route for authentication */}
                <Route path="/MassMailDispatcher" element={<MassMailDispatcher />} /> {/* Protected route for NewsTree */}
            </Routes>
        </Router>
    );
};

export default App;
