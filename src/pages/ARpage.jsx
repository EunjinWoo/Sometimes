import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ar_page.css';

const ARpage = () => {
    const navigate = useNavigate();

    const handleBackToMainPage = () => {
        navigate('/');
    };

    return (
        <div className="container">
            <a-scene embedded arjs='sourceType: webcam;'>
                <a-marker preset="hiro">
                    <a-image
                        src="/images/heart_image.png"
                        position="0 0 0"
                        rotation="-90 0 0"
                        height="1"
                        width="1">
                    </a-image>
                </a-marker>
                <a-entity camera></a-entity>
            </a-scene>
            <button
                onClick={handleBackToMainPage}
                className="backButton">
                Back to Main
            </button>
        </div>
    );
};

export default ARpage;
