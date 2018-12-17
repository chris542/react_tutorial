import React from 'react';
import './footer.scss';
import { Link } from 'react-router-dom';
import { CURRENT_YEAR } from '../../config'; 

const Footer = (props) => {
    return (
        <div className="footer">
            <Link to="/" className="logo">
                <img src="/images/nba_logo.png" alt="nba logo"/>
            </Link>
            <div className="rights">
                @NBA {CURRENT_YEAR} All rights reserved.
            </div>
        </div>
    );
}

export default Footer;
