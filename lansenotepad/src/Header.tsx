import React from 'react';

interface HeaderProps {
    statusMessage: string;
}

const Header : React.FunctionComponent<HeaderProps> = (props) => {
    return <nav className="navbar fixed-top navbar-light bg-light">
                <label style={{ marginLeft: "20px" }}>{props.statusMessage}</label>
            </nav>
};

export default Header;