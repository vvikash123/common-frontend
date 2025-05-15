import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './FooterForm.scss';
import WithConditionaWrapper from 'hoc/withConditionalWrapper';
import { langConsumer } from 'lang/langProvider';
import TrendingTags from 'components/common/Health/TrendingTags/TrendingTags';

function FooterForm(props) {
    const { langConstant = {}, translations, addLangPath, lang, cardType, title, para, icons } = props;
    return (
        <div className={`${style['FooterForm']}`}>
            <TrendingTags
                isConditionalRendering={true}
                type={'strongText'}
                textValue={'JOIN COMMUNITY FOR FREE'}
                changeStyle={'footer-green-button'}
                wrapper={'button'}
            />
            <TrendingTags
                isConditionalRendering={true}
                type={'strongText'}
                textValue={'EXPLORE GROUPS'}
                changeStyle={'footer-white-button'}
                wrapper={'button'}
            />
        </div>
    )
}

FooterForm.propTypes = {}
FooterForm.defaultProps = {};

export default withStyles(style)(
    WithConditionaWrapper(langConsumer(FooterForm))
);
