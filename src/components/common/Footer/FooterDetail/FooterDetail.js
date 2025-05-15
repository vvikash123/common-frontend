import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './FooterDetail.scss';
import WithConditionaWrapper from 'hoc/withConditionalWrapper';
import { langConsumer } from 'lang/langProvider';
import SocialCard from 'components/common/Health/SocialCard/SocialCard';
import TitleComponent from 'components/common/Health/TitleComponent/TitleComponent';
import Typography from 'components/common/Health/Typography/Typography';

function FooterDetail(props) {
  const { langConstant = {}, translations, addLangPath, lang, cardType, title, para, icons } = props;
  return (
    <div className={`${style['FooterDetail']}`}>
      <TitleComponent
        titleType={'h2'}
        titleText={'Health HQ'}
        boldText={'HQ'}
        marginBottom={15}
      />
      <Typography
        elementType={'p'}
        textValue={'Health HQ is a part of Times Group. We provide easy-to-understand, medical expert-reviewed educational content across a number of vertices and topics across the health sector.'}
        marginBottom={15}
        lineClamp={'inherit'}
      />
      <div className={`${style['footer-panel']}`}>
        <SocialCard
          textValue={'FOLLOW US ON'}
        />
      </div>
    </div>
  )
}

FooterDetail.propTypes = {}
FooterDetail.defaultProps = {
  cardType: 'AyurvedaHerbals',
  title: 'Ayurveda & Herbals',
  para: 'Explore the  eastern way of medicinal treatments',
  icons: 'upArrowIconWhiteBg',
};

export default withStyles(style)(
  WithConditionaWrapper(langConsumer(FooterDetail))
);
