import React from "react";
import "./EnterenceButton.css";
import { Link } from 'react-router-dom';
function EnterenceButton () {
    return(
        <Link to="/dashboard">
        <button className="enterence-btn" type="submit">Sing up</button>
        </Link>
    );
};


export default EnterenceButton;