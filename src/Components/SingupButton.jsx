import React from "react";
import "./SingupButton.css";
import { Link } from 'react-router-dom';
function SingupButton () {
    return(
        <Link to="/singform">
        <button className="singup-btn" type="submit">Sing up</button>
        </Link>
    );
};


export default SingupButton;