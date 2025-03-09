// src/App.js
import Header from './components/Header';
import Footer from './components/Footer';
import UserManagement from './components/UserManagement';
import ProjectDashboard from './components/ProjectDashboard';
import logo from "./logo.png";
import useAuthToken from "./utils/utils";

const App = () => {
    const token = useAuthToken();
    return (
        <div>
            <Header title="Task Manager" logo={logo}/>
            <UserManagement/>
            {token && <ProjectDashboard/>}
            <Footer/>
        </div>
    );
};

export default App;