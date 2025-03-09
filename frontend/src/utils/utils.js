import { useState, useEffect } from 'react';

export const getAuthToken = () => localStorage.getItem("token");

export const setAuthToken = (token) => localStorage.setItem("token", token);

export const removeAuthToken = () => localStorage.removeItem("token");

export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const useAuthToken = () => {
    const [token, setToken] = useState(getAuthToken());
    useEffect(() => {
        const updateToken = () => setToken(getAuthToken());
        window.addEventListener("storage", updateToken);
        window.addEventListener("tokenChanged", updateToken);
        return () => {
            window.removeEventListener("storage", updateToken);
            window.removeEventListener("tokenChanged", updateToken);
        };
    }, []);
    return token;
};

export default useAuthToken;