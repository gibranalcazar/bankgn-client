import { NavLink } from "react-router-dom"
import '@popperjs/core/dist/umd/popper.min.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import Tooltip from "@mui/material/Tooltip";
import React from 'react';
import { auth } from '../config/firebase-conf';
import {onAuthStateChanged } from 'firebase/auth';


function Navbar1(){
    const {useState, useEffect} = React;
    const [logged, setLogged] = useState(false);
 
    onAuthStateChanged(auth, usr => {
        usr ? setLogged(true) : setLogged(false)
    });

    console.log('NavBar logged: ' + logged);

    return(
        <nav className="navbar navbar-dark navbar-expand-sm bg-gn">
            {/* <nav className="navbar navbar-dark navbar-expand-lg bg-gn"> */}
            <div className="nav-bar-gn">
            {/* <div className="container-fluid"> */}
                <Tooltip title="This is the Landing page" arrow placement="bottom">
                <NavLink className="navbar-brand" exact to="/" activeClassName="active-link" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Here you can find the landing page!">
                    <img src="favicon.png" alt="" width="30" className="d-inline-block align-text-top"/>
                     &nbsp;Bank
                </NavLink>
                </Tooltip>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav">
                    <li className="nav-item muted">
                    <Tooltip title="Here you can create a new account" arrow placement="bottom">
                        <NavLink className="nav-link" to="/createAccount/" activeClassName="active-link" >
                            Create Account
                        </NavLink>
                    </Tooltip>
                    </li>
                    { !logged && (
                    <>
                        <li className="nav-item">
                        <Tooltip title="Here you can login your account" arrow placement="bottom">
                            <NavLink className="nav-link" to="/login/" activeClassName="active-link">
                                Login
                            </NavLink>
                        </Tooltip>
                        </li>
                    </>)}
                    
                    { logged && (
                    <>
                        <li className="nav-item">
                        <Tooltip title="Here you can logout your account" arrow placement="bottom">
                            <NavLink className="nav-link" to="/login/" activeClassName="active-link">
                                Logout
                            </NavLink>
                        </Tooltip>
                        </li>
                        <li className="nav-item">
                        <Tooltip title="Here you can make deposits" arrow placement="bottom">
                            <NavLink className="nav-link" to="/deposit/" activeClassName="active-link">
                                Deposit
                            </NavLink>
                            </Tooltip>
                        </li>
                        <li className="nav-item">
                        <Tooltip title="Here you can withdraw" arrow placement="bottom">
                            <NavLink className="nav-link" to="/withdraw/" activeClassName="active-link">
                                Withdraw
                            </NavLink>
                        </Tooltip>
                        </li>

                        <li className="nav-item">
                        <Tooltip title="Here you'll find the database" arrow placement="bottom">
                            <NavLink className="nav-link" to="/alldata/" activeClassName="active-link">
                                All Data
                            </NavLink>
                        </Tooltip>
                        </li>
                    </>
                    )}

                </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar1