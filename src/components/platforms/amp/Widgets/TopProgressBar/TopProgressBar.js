import React, { useState, useEffect } from 'react';
import style from './TopProgressBar.module.scss';
// import Link from '../../Link';
// import { removeHtmlTags } from 'utils/common';
// import Button from 'components/common/Health/Button/Button';

function TopProgressBar(props) {
    const { inlineStyle = {} } = props;

    const [scrollPercentage, setScrollPercentage] = useState(0);

    // Function to update scroll percentage
    const updateScrollPercentage = () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const percentage = (scrollTop / scrollHeight) * 100;
        setScrollPercentage(percentage);
    };

    useEffect(() => {
        // Add scroll event listener
        window.addEventListener('scroll', updateScrollPercentage);
        // Clean up on component unmount
        return () => window.removeEventListener('scroll', updateScrollPercentage);
    }, []);

    return (
        <div className={`${style['body-panel']}`} style={{ ...inlineStyle }}>
            <span className={`${style['progress-bar']}`} style={{ width: scrollPercentage.toFixed(2) + '%' }}></span>
        </div>
    )
}


export default TopProgressBar;
