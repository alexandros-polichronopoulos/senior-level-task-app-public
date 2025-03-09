import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {fetchTasks, deleteTask} from "../redux/tasksSlice";
import {formatDate} from "../utils/utils";
import TaskForm from "./TaskForm";

const TaskList = ({projectId}) => {
    const dispatch = useDispatch();
    const {tasks, loading, error} = useSelector((state) => state.tasks);

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleOpenModal = (task = null) => {
        setSelectedTask(task); // If task is null, it means we are adding a new one
        setModalOpen(true);
    };

    useEffect(() => {
        dispatch(fetchTasks(projectId));
    }, [dispatch, projectId]);

    const handleDelete = (taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            dispatch(deleteTask(taskId));
        }
    };

    if (loading) return <p>Loading tasks...</p>;
    if (error) return <p style={{color: "red"}}>Error loading tasks: {error}</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Tasks</h2>

            <button style={styles.addButton} onClick={() => handleOpenModal()}>New Task</button>

            {(tasks.length === 0) && <p>No tasks available.</p>}

            {(tasks.length !== 0) &&
                <ul style={styles.list}>
                {tasks.map((task) => (
                    <li key={task.id} style={styles.taskItem}>
                        <div style={styles.taskInfo}>
                            <h3 style={styles.taskTitle}>
                                <strong>Title:</strong> {task.title}
                            </h3>
                            <p style={styles.description}>
                                <strong>Description:</strong> {task.description}
                            </p>
                            <p style={styles.status}>
                                <strong>Status:</strong> {task.status}
                            </p>
                            <p style={styles.project}>
                                <strong>Created:</strong> {formatDate(task.createdDate)}
                            </p>
                            <p style={styles.project}>
                                <strong>Updated:</strong> {formatDate(task.updatedDate)}
                            </p>
                        </div>

                        <button style={styles.editButton} onClick={() => handleOpenModal(task)}>
                            Edit
                        </button>
                        <button style={styles.deleteButton} onClick={() => handleDelete(task.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            }

            {isModalOpen && (
                <TaskForm
                    projectId={1}
                    task={selectedTask}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
};

// Inline Styles
const styles = {
    container: {
        maxWidth: "600px",
        margin: "20px auto",
        padding: "15px",
        paddingBottom: '20px',
        marginBottom: '20px',
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
    },
    heading: {
        textAlign: "center",
        color: "#333",
    },
    list: {
        listStyleType: "none",
        padding: 0,
    },
    taskItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        borderBottom: "1px solid #ddd",
    },
    taskInfo: {
        flex: 1,
    },
    taskTitle: {
        fontSize: "1.2rem",
        fontWeight: "bold",
        margin: "0 0 5px 0",
    },
    description: {
        fontSize: "0.9rem",
        color: "#555",
        marginBottom: "5px",
    },
    status: {
        fontSize: "0.9rem",
        color: "#007bff",
    },
    project: {
        fontSize: "0.9rem",
        fontWeight: "bold",
        color: "#28a745",
    },
    deleteButton: {
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        padding: "8px 12px",
        margin: "5px",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background 0.2s",
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

export default TaskList;