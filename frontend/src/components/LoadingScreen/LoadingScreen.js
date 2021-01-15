import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";


const Loading = ({loading}) => {
    const styles={
        position: "absolute",
        width: "100%",
        height: "100%",
        padding: "10rem",
        zIndex: "9999",
        background: "white",
        display : "flex",
        justifyContent: "center",
    }
    return (
        <>
        <div style={styles}>
            <ClipLoader color="#76948F" loading={loading} size={100} /> 
        </div>
        
        </>
    );
};

export default Loading;