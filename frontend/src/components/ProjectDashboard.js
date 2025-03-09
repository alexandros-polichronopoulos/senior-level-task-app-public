// src/components/ProjectDashboard.js
import React, {useState} from 'react';
import TaskList from './TaskList';

const ProjectDashboard = () => {
    const [projectId] = useState(1); // Assuming a single project for simplicity


    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Project Dashboard</h1>
            <h2 style={styles.subHeader}>Project ID: {projectId}</h2>
            <TaskList projectId={projectId}/>
            <br></br>
            <br></br>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        textAlign: 'center'
    },
    header: {
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#333',
    },
    subHeader: {
        fontSize: '20px',
        fontWeight: '500',
        marginBottom: '20px',
        color: '#555',
    }
};

export default ProjectDashboard;