// src/components/ProjectDashboard.js
import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchProjects} from "../redux/tasksSlice";
import TaskList from './TaskList';
import ProjectForm from "./ProjectForm";

const ProjectDashboard = () => {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.tasks.projects);
    const [projectId, setProjectId] = useState(null);
    const [project, setProject] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalProjectId, setModalProjectId] = useState(null);

    const handleOpenModal = (modalProjectId = null) => {
        setModalProjectId(modalProjectId);
        setModalOpen(true);
    };

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    // Automatically set the first project as default (if available)
    useEffect(() => {
        if (projects && projects.length > 0 && projectId === null) {
            setProjectId(projects[0].id);
        }
    }, [projects]);

    useEffect(() => {
        setProject(projects && projects.filter((p) => p.id === projectId)[0] || null);
    }, [projectId, projects]);

    return (
        <div style={styles.container}>

            <div style={styles.header}>Project</div>

            {projects && <select
                value={projectId || ''}
                onChange={(e) => setProjectId(Number(e.target.value))}
                style={styles.dropdown}
            >
                {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                        {project.name}
                    </option>
                ))}
            </select>}

            {projectId && (
                <>
                    <button style={styles.editButton} onClick={() => handleOpenModal({projectId})}>Project Details</button>
                    <div>
                        <button style={styles.addButton} onClick={() => handleOpenModal()}>New Project</button>
                    </div>
                    <TaskList projectId={projectId} />
                </>
            )}

            {isModalOpen && (
                <ProjectForm
                    projectId={modalProjectId}
                    project={modalProjectId && project || null}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        marginBottom: '100px',
        paddingBottom: '40px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        textAlign: 'center'
    },
    header: {
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: '#333',
    },
    subHeader: {
        fontSize: '20px',
        fontWeight: '500',
        marginBottom: '20px',
        color: '#555',
    },
    dropdown: {
        padding: '10px',
        fontSize: '16px',
        marginBottom: '20px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        cursor: 'pointer'
    },
    editButton: {
        backgroundColor: "#3578dc",
        color: "#fff",
        border: "none",
        padding: "8px 12px",
        margin: "5px",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background 0.2s",
    },
    addButton: {
        backgroundColor: "#35dc89",
        color: "#fff",
        border: "none",
        padding: "8px 12px",
        margin: "5px",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background 0.2s",
    },
};

export default ProjectDashboard;