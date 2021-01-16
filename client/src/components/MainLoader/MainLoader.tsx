import React from 'react';
import './style.css';

const MainLoader: React.FC = () => {
    return (
        <div className='loadingContainer'>
            <div>
                <div className="loader"></div>
                <h1>Loading...</h1>
            </div>

        </div>
    );
};

export default MainLoader;
