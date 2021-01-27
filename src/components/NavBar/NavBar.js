import React from 'react';
import './NavBar.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleMenu = this.handleMenu.bind(this);
    }

    handleMenu() {
        var e = document.getElementById("nav");
        if (e.className === "topnav") {
            e.className += " responsive";
        } else {
            e.className = "topnav";
        }
    }

    render() {
        return (
            
                <nav className="topnav" id="nav">
                    <a href="home" className="active">HOME</a>
                    <a href="discover">DISCOVER</a>
                    <a href="movies">MOVIES</a>
                    <a href="shows">TV SHOWS</a>
                    <a href="people">PEOPLE</a>
                    <a className="icon" onClick={this.handleMenu}><i className="fa fa-bars"></i></a>
                    {/* <Link to="/">HOME</Link>
                    <Link to="/discover">DISCOVER</Link>
                    <Link to="/movies">MOVIES</Link>
                    <Link to="/tv">TV SHOWS</Link>
                    <Link to="/people">PEOPLE</Link>
                    <a className="icon" onClick={this.handleMenu}><i className="fa fa-bars"></i></a> */}
                </nav>
            
        )
    }
}

export default NavBar;