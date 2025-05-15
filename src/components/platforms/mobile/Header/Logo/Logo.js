import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import Link from 'components/common/Link';
import s from './Logo.scss';
import { TnnLogo } from 'components/common/Svg/Svg';
import { isAMPRequest } from 'utils/serverUtils';
import { langConsumer } from 'lang/langProvider';

class Logo extends React.Component {
  constructor() {
    super();
    this.state = {
      flip: false,
    };
  }
  render() {
    const { flip } = this.state;
    const { langConstant, addLangPath } = this.props;
    const { TNNLOGO = React.Fragment } = langConstant?.LOGO_PATH_MOBILE || {};
    return (
      <div
        className={`${s.container} ${flip ? s.flip : ''}`}
        ref={(logoContainer) => {
          if (logoContainer) {
            this.logoContainer = logoContainer;
          }
        }}
      >
        <a
          className={`${s.logo}`}
          href={isAMPRequest() ? addLangPath('/amp') : addLangPath('/')}
        >
          <TNNLOGO />
        </a>
      </div>
    );
  }
}
Logo.propTypes = {};

export default withStyles(s)(langConsumer(Logo));
