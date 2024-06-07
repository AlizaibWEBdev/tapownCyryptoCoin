import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isBack, setIsBack] = React.useState(false);

    // Check if the current path matches the pattern for missions
    React.useEffect(() => {
        setIsBack(location.pathname.startsWith('/missions'));
    }, [location.pathname]);

    const handleGoBack = () => {
        navigate(-1); // Go back one step in history
    };

    const handleClose = () => {
        window.Telegram.WebApp.close();
    };


    return (
        <header className='d-flex'>
            <div className='d-flex hading-close'>
            {isBack ? <span onClick={handleGoBack}>&lt;</span> : <div className="close" onClick={handleClose}>&#10006;</div>}
                
                <h2>TapOwn</h2>
            </div>
           
            <span>&#x22EE;</span>
        </header>
    );
};

export default Header;
