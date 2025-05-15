import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './FooterCard.scss';
import WithConditionaWrapper from 'hoc/withConditionalWrapper';
import { langConsumer } from 'lang/langProvider';
import SpriteIcon from 'components/common/Svg/SpriteIcon';
import Typography from 'components/common/Health/Typography/Typography';
import TitleComponent from 'components/common/Health/TitleComponent/TitleComponent';
import FooterForm from 'components/common/Health/Footer/FooterForm/FooterForm';

function FooterCard(props) {
    const { langConstant = {}, translations, addLangPath, lang, cardType, title, titleStyle, para, paraStyle, icons, boldText, smallTextIcon, isMoreButtons } = props;
    return (
        <div className={`${style['FooterCard']} ${cardType === 'WhatsappWellness' && style['WhatsappWellness']} ${cardType === 'HealthNewsletter' && style['HealthNewsletter']} ${cardType === 'CommunityHub' && style['CommunityHub']}`}>
            <div className={`${style['head-panel']}`}>
                <Typography
                    elementType={'p'}
                    textValue={title}
                    smallTextIcon={smallTextIcon}
                    changeStyle={titleStyle}
                    marginBottom={0}
                />
                <SpriteIcon IconName={icons} />
            </div>
            <div className={`${style['footer-panel']}`}>
                <TitleComponent
                    titleType={'p'}
                    titleText={para}
                    boldText={boldText}
                    marginBottom={0}
                    changeStyle={paraStyle}
                />
            </div>

            {isMoreButtons &&
                <FooterForm
                    isConditionalRendering={true}
                />
            }

        </div>
    )
}

FooterCard.propTypes = {}
FooterCard.defaultProps = {
    cardType: 'FooterCard',
    smallTextIcon: '',
    titleStyle: '',
    title: '',
    para: '',
    icons: '',
    boldText: [],
    paraStyle: '',
    isMoreButtons: false,
};

export default withStyles(style)(
    WithConditionaWrapper(langConsumer(FooterCard))
);
