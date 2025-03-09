// src/redux/tasksSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {getAuthToken} from "../utils/utils";

const API_URL = 'http://localhost:8080'; // Update with your backend API URL

const getAuthHeaders = () => {
    const token = getAuthToken()
    return {
        headers: {Authorization: token ? `Bearer ${token}` : ""}
    };
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (projectId, {getState}) => {
    const response = await axios.get(`${API_URL}/projects/${projectId}/tasks`, getAuthHeaders());
    return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task, {getState}) => {
    const newTask = {
        title: task.title,
        description: task.description,
        status: task.status,
    }
    const response = await axios.post(`${API_URL}/projects/${task.projectId}/tasks`, newTask, getAuthHeaders());
    return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task, {getState}) => {
    const taskToUpdate = {
        title: task.title,
        description: task.description,
        status: task.status,
    }
    const response = await axios.put(`${API_URL}/tasks/${task.id}`, taskToUpdate, getAuthHeaders());
    return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, {getState}) => {
    await axios.delete(`${API_URL}/tasks/${taskId}`, getAuthHeaders());
    return taskId;
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.meta.arg.id);
                state.tasks.push(action.payload);
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            });
    },
});

export default tasksSlice.reducer;