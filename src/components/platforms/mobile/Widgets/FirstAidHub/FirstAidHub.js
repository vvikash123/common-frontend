
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './FirstAidHub.scss';
import WithConditionaWrapper from 'hoc/withConditionalWrapper';
import { langConsumer } from 'lang/langProvider';

const  FirstAidHub = (props) => {

    const { langConstant = {}, translations, addLangPath, lang } = props;

  return (
    <div className={style['tnn_container']}>
      <h2> FirstAidHub</h2>
    </div>
  );
};

FirstAidHub.defaultProps = {};

export default withStyles(style)(
  WithConditionaWrapper(langConsumer(FirstAidHub))
);
