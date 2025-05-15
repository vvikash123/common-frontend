import React from 'react';
import style from './SymptomsCard.module.scss';
import Button from '../Button/Button';
import NextImage from "@/utils/NextImage"

function SymptomsCard(props) {
    const { changeStyle, buttonText, buttonType, iconName, isAnchor, key, seopath } = props;
    return (
        <div className={`${style['symptoms-card-box']}`}>
            <div className={`${style['button-box']}`}>
                <Button
                    buttonType={'text'}
                    buttonText={'Common Cold'}
                    changeStyle={'symptoms-checker-button'}
                />
            </div>
            <div className={`${style['up-bar-box']}`}>
                <NextImage src="/assets/icons/health/UpBar.svg" />
            </div>
            <h3 className={`${style['box-title']}`}>
                287+
            </h3>
            <p className={`${style['box-para']}`}>
                <strong>new cases</strong> of Common Cold identified in <strong>New Delhi</strong>
            </p>
        </div>
    )
}

SymptomsCard.defaultProps = {
    changeStyle: 'default',
    buttonText: '',
    iconName: 'grayShareIcon',
    isAnchor: false,
    key: '',
    seopath: ''
}

export default SymptomsCard;
