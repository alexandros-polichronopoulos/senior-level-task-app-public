import React from "react";

const Footer = ({text}) => {
    return (
        <footer style={styles.footer}>
            <p style={styles.text}>
                {text}
                © 2025 🔨 with React & Spring Boot.
            </p>
        </footer>
    );
};

const styles = {
    footer: {
        position: "fixed",
        bottom: 0,
        width: "100%",
        textAlign: "center",
        padding: "10px 20px",
        backgroundColor: "#282c34",
        color: "white",
    },
    text: {
        margin: 0,
        fontSize: "1rem",
    }
};

export default Footer;
