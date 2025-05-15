
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './LeftArrowedLabel.scss';
import WithConditionaWrapper from 'hoc/withConditionalWrapper';
import { langConsumer } from 'lang/langProvider';

const  LeftArrowedLabel = (props) => {

    const { langConstant = {}, translations, addLangPath, lang } = props;

  return (
    <div>
      <h2> LeftArrowedLabel</h2>
    </div>
  );
};

LeftArrowedLabel.defaultProps = {};

export default withStyles(style)(
  WithConditionaWrapper(langConsumer(LeftArrowedLabel))
);
