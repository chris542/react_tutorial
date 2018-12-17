import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import SideNav from './SideNav/sideNav';

const Header = (props) => {

    const navBars = () => (
        <div className="bars">
            <FontAwesome name="bars"
                onClick={props.onOpenNav}
                style={{
                    color:'#dfdfdf',
                    padding:'10px',
                    cursor:'pointer'
                }}/>
        </div>
    )

    const logo = () => (
        <Link to="/" className="logo">
            <img src="/images/nba_logo.png" alt="nba logo"/>
        </Link>
    )

    return (
        <header className="header">
            <div className="headerOpt">
                <SideNav {...props}/>
                {navBars()}
                {logo()}
            </div>
        </header>
    );
}

export default Header;
