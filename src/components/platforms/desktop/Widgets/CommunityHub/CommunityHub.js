
import React from 'react';
import style from './CommunityHub.module.scss';

const  CommunityHub = (props) => {

    const { langConstant = {}, translations, addLangPath, lang } = props;

  return (
    <div className={style['tnn_container']}>
      {/* <h2> CommunityHub</h2> */}
    </div>
  );
};

CommunityHub.defaultProps = {};

export default CommunityHub;
