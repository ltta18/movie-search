import React from 'react';
import './NavBar.css';

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
            <div className="topnav" id="nav">
                <a href="home" className="active">HOME</a>
                <a href="discover">DISCOVER</a>
                <a href="movies">MOVIES</a>
                <a href="shows">TV SHOWS</a>
                <a href="people">PEOPLE</a>
                <a className="icon" onClick={this.handleMenu}><i className="fa fa-bars"></i></a>
            </div>
        )
    }
}

export default NavBar;