
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './BottomTitleCardWidget.scss';
import WithConditionaWrapper from 'hoc/withConditionalWrapper';
import { langConsumer } from 'lang/langProvider';

const  BottomTitleCardWidget = (props) => {

    const { langConstant = {}, translations, addLangPath, lang } = props;

  return (
    <div>
      <h2> BottomTitleCardWidget</h2>
      <div>
        Add image tag and title in bottom
      </div>
    </div>
  );
};

BottomTitleCardWidget.defaultProps = {};

export default withStyles(style)(
  WithConditionaWrapper(langConsumer(BottomTitleCardWidget)),
);;
