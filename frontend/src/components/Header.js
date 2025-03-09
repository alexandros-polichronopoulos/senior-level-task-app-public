import React from "react";

const Header = ({title, logo}) => {
    return (
        <header style={styles.header}>
            {logo && <img src={logo} alt="Logo" style={styles.logo}/>}
            <h1 style={styles.title}>{title}</h1>
        </header>
    );
};

const styles = {
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 20px",
        backgroundColor: "#282c34",
        color: "white",
    },
    logo: {
        height: "40px",
        marginRight: "10px",
    },
    title: {
        fontSize: "1.5rem",
    },
};

export default Header;
