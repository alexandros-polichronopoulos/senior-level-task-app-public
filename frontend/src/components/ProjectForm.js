import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {addProject, updateProject} from "../redux/tasksSlice";

const STATUS_OPTIONS = ["PLANNING", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELLED"];

const ProjectForm = ({projectId, project, onClose}) => {
    const [id, setId] = useState(project?.id || null);
    const [name, setName] = useState(project?.name || "");
    const [description, setDescription] = useState(project?.description || "");
    const [status, setStatus] = useState(project?.status || "PLANNING");
    const dispatch = useDispatch();

    useEffect(() => {
        // Reset form fields when a new project is passed
        setId(project?.id || null);
        setName(project?.name || "");
        setDescription(project?.description || "");
        setStatus(project?.status || "PLANNING");
    }, [project]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        const projectData = {
            id: id,
            name: name,
            description: description,
            status: status
        };

        if (project) {
            dispatch(updateProject(projectData));
        } else {
            dispatch(addProject(projectData));
        }

        onClose();
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <h2 style={styles.heading}>{project ? "Edit Project" : "New Project"}</h2>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        style={styles.input}
                        required
                    />

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        style={styles.textarea}
                        rows="3"
                    ></textarea>

                    <div style={styles.label}>Status</div>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={styles.select}
                    >
                        {STATUS_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option.replace("_", " ")}
                            </option>
                        ))}
                    </select>

                    <button type="submit" style={styles.button}>
                        {project ? "Update Project" : "Add Project"}
                    </button>
                    <button type="button" style={styles.cancelButton} onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

// 🎨 Modal Styles
const styles = {
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        width: "100%",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    heading: {
        fontSize: "1.5rem",
        color: "#333",
        marginBottom: "15px",
        textAlign: "center",
    },
    input: {
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "1rem",
    },
    textarea: {
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "1rem",
        resize: "none",
    },
    select: {
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "1rem",
        backgroundColor: "#f9f9f9",
    },
    button: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontSize: "1rem",
        cursor: "pointer",
        marginBottom: "10px",
    },
    cancelButton: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontSize: "1rem",
        cursor: "pointer",
    },
    label: {
        fontSize: "1rem",
        color: "#333",
        marginBottom: "5px",
    },
};

export default ProjectForm;