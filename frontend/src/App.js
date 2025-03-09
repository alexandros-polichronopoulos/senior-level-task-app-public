// src/App.js
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import UserManagement from './components/UserManagement';
import ProjectDashboard from './components/ProjectDashboard';
import logo from "./logo.png";

const App = () => {

    return (
        <div>
            <Header title="Task Manager" logo={logo}/>
            <UserManagement/>
            <ProjectDashboard/>
            <Footer/>
        </div>
    );
};

export default App;