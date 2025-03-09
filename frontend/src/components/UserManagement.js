import React, {useState, useEffect} from "react";
import {getAuthToken, removeAuthToken, setAuthToken} from "../utils/utils";

const UserManagement = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(getAuthToken() || "");
    const [isRegistering, setIsRegistering] = useState(false);
    const [credentials, setCredentials] = useState({username: "", password: ""});

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        }
    }, [token]);

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isRegistering ? "register" : "login";
        try {
            const response = await fetch(`http://localhost:8080/${endpoint}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(credentials),
            });
            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
                setAuthToken(data.token);
                setIsLoggedIn(true);
            } else {
                alert(data.message || "Authentication failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleLogout = () => {
        setToken("");
        removeAuthToken()
        setCredentials({username: "", password: ""})
        setIsLoggedIn(false);
    };

    if (isLoggedIn) {
        return (
            <div style={styles.container}>
                <h2>Welcome {credentials.username}! You are logged in.</h2>
                <button style={styles.button} onClick={handleLogout}>Logout</button>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h2>{isRegistering ? "Register" : "Login"}</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    {isRegistering ? "Register" : "Login"}
                </button>
            </form>
            <button onClick={() => setIsRegistering(!isRegistering)} style={styles.switchButton}>
                {isRegistering ? "Already have an account? Login here" : "Don't have an account? Register here"}
            </button>
        </div>
    );
};

const styles = {
    container: {textAlign: "center", padding: "20px"},
    form: {display: "flex", flexDirection: "column", alignItems: "center"},
    input: {margin: "5px", padding: "8px", width: "200px"},
    button: {margin: "5px", padding: "8px", cursor: "pointer"},
    switchButton: {marginTop: "10px", background: "none", border: "none", color: "blue", cursor: "pointer"},
};

export default UserManagement;
