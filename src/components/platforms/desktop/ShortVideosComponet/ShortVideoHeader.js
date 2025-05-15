import React from 'react';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './ShortVideosComponet.module.scss';

import { Arrowleft } from '@/components/common/Svg/Svg';
// import SvgIcon from '@/components/common/Svg/SvgIcon';

const ShortVideoHeader = ({ ...props }) => {
  return (
    <div className={style['sv-sec']}>
      <div className={style['top-left']} onClick={() => window.history.back()}>
        <Arrowleft />
      </div>
      {/* <div className={style['top-right']}>
        <a to={`/`}>
          <SvgIcon IconName={props?.langConstant['LOGO_PATH_DESKTOP']['SIGNIN'] || 'TnnLogoLarge'} />
        </a>
      </div> */}
    </div>
  );
};

export default ShortVideoHeader;
