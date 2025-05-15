import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './SocialCard.scss';
import { langConsumer } from 'lang/langProvider';
import Typography from 'components/common/Health/Typography/Typography';
import CommonGridBox from 'components/common/CommonGridBox/CommonGridBox';
import { SpriteIcon } from 'components/common/Svg/SpriteIcon';

function SocialCard(props) {
    const { langConstant = {}, translations, addLangPath, lang, changeStyle, textValue, marginTop, marginBottom } = props;
    return (
        <CommonGridBox gridType={'divFlexBox'} xGap={10} changeStyle={'social-card'}>
            <Typography
                elementType={'p'}
                textValue={'Follow Us:'}
                changeStyle={'social_para'}
                lineClamp={'inherit'}
            />
            <CommonGridBox gridType={'flexBox'} yGap={16}>
                <li className={`${style['social-list']}`}>
                    <a href="#">
                        <SpriteIcon IconName="twOutlineIcon" />
                    </a>
                </li>
                <li className={`${style['social-list']}`}>
                    <a href="#">
                        <SpriteIcon IconName="whatsappOutlineIcon" />
                    </a>
                </li>
                <li className={`${style['social-list']}`}>
                    <a href="#">
                        <SpriteIcon IconName="instaOutlineIcon" />
                    </a>
                </li>
                <li className={`${style['social-list']}`}>
                    <a href="#">
                        <SpriteIcon IconName="ytOutlineIcon" />
                    </a>
                </li>
                <li className={`${style['social-list']}`}>
                    <a href="#">
                        <SpriteIcon IconName="fbOutlineIcon" />
                    </a>
                </li>
            </CommonGridBox>
        </CommonGridBox>
    )
}

SocialCard.propTypes = {}
SocialCard.defaultProps = {
    changeStyle: 'default',
    textValue: '',
    marginTop: 0,
    marginBottom: 0,
};

export default (withStyles(style)(langConsumer(SocialCard)));