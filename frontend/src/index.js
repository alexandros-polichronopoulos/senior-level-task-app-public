// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Notice the change here
import {Provider} from 'react-redux';
import store from './redux/store';
import App from './App';
import './index.css';

// Create a root for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component wrapped in the Redux Provider
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);