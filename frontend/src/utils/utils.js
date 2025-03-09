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