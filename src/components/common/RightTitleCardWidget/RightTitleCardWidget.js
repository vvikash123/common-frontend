
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './RightTitleCardWidget.scss';
import WithConditionaWrapper from 'hoc/withConditionalWrapper';
import { langConsumer } from 'lang/langProvider';

const  RightTitleCardWidget = (props) => {

    const { langConstant = {}, translations, addLangPath, lang } = props;

  return (
    <div>
      <h2> RightTitleCardWidget</h2>
      <div>
        Add image tag and title in right
      </div>
    </div>
  );
};

RightTitleCardWidget.defaultProps = {};

export default withStyles(style)(
  WithConditionaWrapper(langConsumer(RightTitleCardWidget)),
);;
