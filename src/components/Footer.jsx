import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const [isHidden, setIsHidden] = React.useState(false);

    React.useEffect(() => {
        setIsHidden(location.pathname.startsWith('/missions'));
    }, [location.pathname]);

    return (
        <>
             
                <div className="center navigation">
                    <div className="links d-flex">
                        
                    <NavLink
                            to="/leaderboard"
                            className={({ isActive }) => isActive ? "center active" : "center"}
                        >
                            <img src="podium.png" alt="Stats" />
                            <p>Ranks</p>
                        </NavLink>
                        <NavLink
                            to="/tasks"
                            className={({ isActive }) => isActive ? "center active" : "center"}
                        >
                            <img src="tasks.png" alt="Tasks" />
                            <p>Tasks</p>
                        </NavLink>
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? "center active" : "center"}
                        >
                            <img src="coin.png" alt="Tap" />
                            <p>Tap</p>
                        </NavLink>
                       
                       
                        <NavLink
                            to="/boost"
                            className={({ isActive }) => isActive ? "center active" : "center"}
                        >
                            <img src="shuttle.png" alt="Boost" />
                            <p>Boost</p>
                        </NavLink>
                        <NavLink
                            to="/stats"
                            className={({ isActive }) => isActive ? "center active" : "center"}
                        >
                            <img src="spreadsheet-app.png" alt="Stats" />
                            <p>Stats</p>
                        </NavLink>



                    </div>
                </div>
             
        </>
    );
};

export default Footer;
