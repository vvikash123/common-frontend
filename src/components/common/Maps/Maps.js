import React from 'react';
import style from './Maps.module.scss';
import NextImage from "@/utils/NextImage"

const Maps = (props) => {

    const { } = props;

    return (
        <div className={`${style['MapsBox']}`}>
            <div className={`${style['body-panel']}`}>
                <NextImage src="/assets/health-images/images/map.png" />
            </div>
            {/* <div className={`${style['footer-panel']}`}></div> */}
        </div>
    );
};

Maps.defaultProps = {};

export default Maps;
