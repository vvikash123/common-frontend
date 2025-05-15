import ErrorBoundary from 'components/common/ErrorBoundary';
import SvgIcon from 'components/common/Svg/SvgIcon';
import HorizontalSlider from 'components/mobile/HorizontalSlider/HorizontalSlider';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _get from 'lodash.get';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { isAMPRequest } from 'utils/serverUtils';
import { SSO_AUTH } from '../../../../constants';
import history from '../../../../history';
import { loadTrendingData } from '../../../../redux/modules/trending';
import SidebarSearch from '../SidebarSearch/SidebarSearch';
import Accordion from './Accordion/Accordion';
import s from './HamburgerMenu.scss';
import { isFirstPhase, isHealthFirstPhase } from 'utils/common';
import { DarkMode, LightMode, RightArrowIcon } from 'components/common/Svg/Svg';
import { setTheme } from '../../../../redux/modules/config';
import { langConsumer } from 'lang/langProvider';
import CrossLinks from 'components/common/CrossLinks';
import { isAMPURL } from 'utils/common';
import NextImage from '@/utils/NextImage';

class HamburgerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      isTrending: false,
      isDark: false,
      trendingLength: 5,
    };
    this.closeRef = React.createRef();
  }

  signOut() {
    const classContext = this;
    let jsso = new JssoCrosswalk(
      SSO_AUTH.CHANNEL,
      SSO_AUTH.PLATFORM,
      SSO_AUTH.SSO_BASEURL,
      SSO_AUTH.SOCIAL_APP_BASEURL,
    );
    jsso.signOutUser(function (res) {
      if (res.status === 'SUCCESS') {
        classContext.setState({
          success: true,
        });
        //var x = document.getElementById("HamburgerMenu-snackbar-Fchbn");
        //x.className = "HamburgerMenu-show-egJqC";
        setTimeout(function () {
          //x.className = x.className.replace("HamburgerMenu-show-egJqC", "show");
          window.location.reload();
        }, 1000);
        //currentUserStatus= {};
        sessionStorage.clear();
        localStorage.removeItem('userName');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('currentUser');
      } else {
        classContext.setState({ success: false });
      }
    });
  }
  componentDidMount() {
    // this.props.loadTrendingDataFn('article');

    let ab = document.getElementById('close_burger_icon');
    if (ab) {
      let hm = document.getElementById('amp_drawer');
      ab.addEventListener('click', function (event) {
        hm.style.left = '-100%';
      });
    }
    let darkModeValue = localStorage.getItem('themeColor');
    if (darkModeValue === 'dark') {
      this.props.setTheme(true);
    } else {
      this.props.setTheme(false);
    }
  }

  isTrending = async (hide) => {
    this.setState({
      isTrending: hide,
    });
  };

  setActive = (e) => {
    if (
      e.target &&
      e.target.parentNode &&
      e.target.parentNode.nextElementSibling
    ) {
      if (e.target.parentNode.nextElementSibling.style.display == 'block') {
        e.target.parentNode.nextElementSibling.style.display = 'none';
        e.target.parentNode.querySelector('img').src =
          '/assets/icons/svg/open.svg';
      } else {
        e.target.parentNode.nextElementSibling.style.display = 'block';
        e.target.parentNode.querySelector('img').src =
          '/assets/icons/svg/cross.svg';
      }
    }
  };

  //Toggle Active Inactive, Humburger Menu
  handleToggle = (e) => {
    this.setActive(e);
  };

  themeChangeHandler = () => {
    const { isDark } = this.props;
    this.props.setTheme(!isDark);
    if (!isDark) {
      localStorage.setItem('themeColor', 'dark');
      document.body.setAttribute('data-theme', 'dark');
    } else {
      localStorage.setItem('themeColor', 'light');
      document.body.setAttribute('data-theme', 'light');
    }
  };

  render() {
    const {
      data,
      NavigationData,
      getMSID,
      hamburger,
      closeDrawerHandler,
      openTnMenu,
      searchData,
      searchedSuggestion,
      searchInputValue,
      searchHandler,
      onEnterSearchHandler,
      searchInitialState,
      currentUserStatus,
      userInfo,
      trendingData,
      isHamburgerOpen,
      translations,
      addLangPath,
      HeaderData,
      isTNmenuOpen,
      params,
    } = this.props;
    // console.log('this.props',this.props)
    return (
      <>
        <section
          style={{
            left: isHamburgerOpen ? '0px' : '-100%',
          }}
          className={s['drawer__container']}
          id="amp_drawer"
        >
          <div className={s['container-fluid']}>
            <div className={s['sidebar']}>
              <div className={s['side-menu']}>
                <div className={s['menu']}>
                  <div className={s.menu__left_side}>
                    <button
                      onClick={closeDrawerHandler}
                      id={'close_burger_icon'}
                      on="tap:ampHamburger.toggle"
                      type="button"
                      className={s['icon_button']}
                      ref={this.closeRef}
                      aria-label="Hamburger Button"
                    >
                      <SvgIcon IconName="CloseIconBig" size="sm" />
                    </button>
                  </div>

                  {!isFirstPhase && !isHealthFirstPhase && (
                    <div className={s.menu__right_side}>
                      {HeaderData?.networks?.length > 0 && (
                        <div className={`${s['sub-header-center']}`}>
                          {this.props && isAMPURL(params?.pathname) ? (
                            <>
                              <amp-lightbox id="my-lightbox" layout="nodisplay">
                                <div
                                  class="lightbox"
                                  on="tap:my-lightbox.close"
                                  role="button"
                                  tabindex="0"
                                >
                                  <ul>
                                    <li>
                                      <button>
                                        Group Sites{' '}
                                        <SvgIcon
                                          size="sm"
                                          IconName="CloseIconBig"
                                        />
                                      </button>
                                    </li>
                                    <ErrorBoundary>
                                      <CrossLinks data={HeaderData?.networks} />
                                    </ErrorBoundary>
                                  </ul>
                                </div>
                              </amp-lightbox>
                              <button
                                on="tap:my-lightbox"
                                className={`${s['arrowopen']}`}
                              >
                                Group Sites <RightArrowIcon />
                              </button>
                            </>
                          ) : (
                            <>
                              <a
                                id="group-sites-btn"
                                className={`${
                                  isTNmenuOpen
                                    ? s['arrowopen']
                                    : s['arrowclose']
                                } ${s['sub-header-btn']} sub-header-btn`}
                                onClick={openTnMenu}
                              >
                                Group Sites <RightArrowIcon />
                              </a>
                              <ul
                                id="groups-site-menu"
                                className={`${
                                  isTNmenuOpen ? s['menuopen'] : s['menuclose']
                                }`}
                              >
                                <ErrorBoundary>
                                  <CrossLinks data={HeaderData?.networks} />
                                </ErrorBoundary>
                              </ul>
                            </>
                          )}
                        </div>
                      )}
                      <div className={s.live_tv}>
                        <a
                          key={'live-tv'}
                          to={addLangPath(`/live-tv`)}
                          className={`${s.anchor}`}
                          onClick={(event) => {
                            document
                              .querySelector('#close_burger_icon')
                              .click();
                          }}
                          title={translations['LIVE_TV']}
                        >
                          <button
                            type="button"
                            aria-label="live tv button"
                            className={s['icon_button']}
                          >
                            <SvgIcon IconName="LiveTvIcon" size="sm" />
                            <p>{translations['LIVE_TV']}</p>
                          </button>
                        </a>
                      </div>
                      <>
                        {!isAMPRequest() ? (
                          <div className={s['dark-mode']}>
                            <label
                              htmlFor="darkCheckBox"
                              className={s['icon_button']}
                              onClick={() => {
                                closeDrawerHandler();
                              }}
                            >
                              <div className={`${s['switch-theme']}`}>
                                <p>{translations['THEME']}</p>
                                {/* <DarkMode /> */}
                                <NextImage
                                  src="/assets/icons/svg/dark-mode.svg"
                                  alt="dark mode"
                                />
                              </div>
                              <input
                                style={{ display: 'none' }}
                                type="checkbox"
                                id="darkCheckBox"
                                value={this.props.isDark}
                                checked={this.props.isDark}
                                onChange={this.themeChangeHandler}
                              />
                            </label>
                          </div>
                        ) : (
                          ''
                        )}
                      </>
                    </div>
                  )}
                  {/* </div> */}
                </div>
                <div className={s['side-menu-content']}>
                  <div className={s.menu__left_side}>
                    {userInfo && userInfo.dp ? (
                      <div className={s.menu__right_side_img}>
                        <NextImage src={userInfo.dp} alt="profile photo" />
                      </div>
                    ) : (
                      ''
                    )}
                    {userInfo && userInfo.firstName ? (
                      <p>Hi, {userInfo.firstName}</p>
                    ) : (
                      translations['WELCOME']
                    )}
                  </div>
                  {currentUserStatus && currentUserStatus.valid ? (
                    <div
                      className={`${s.menu__right_side} ${s.Rectangle}`}
                      onClick={this.signOut.bind(this)}
                    >
                      {' '}
                      {translations['LOGOUT']}{' '}
                    </div>
                  ) : (
                    !isFirstPhase && !isHealthFirstPhase && (
                      <div
                        className={`${s.menu__right_side} ${s.Rectangle}`}
                        onClick={() => {
                          history.push(addLangPath('/login/phone'));
                          closeDrawerHandler();
                        }}
                      >
                        {isAMPRequest() ? (
                          <a
                            href={addLangPath('/login/phone')}
                            className={`${s.Signin}`}
                          >
                            {translations['SIGN_IN']}
                          </a>
                        ) : (
                          translations['SIGN_IN']
                        )}
                      </div>
                    )
                  )}
                </div>
                {this.state.success && (
                  <div className={s.successMessage}>
                    {translations['YOU_HAVE_LOGGED_OUT_SUCCESSFULLY']}
                  </div>
                )}
                {/* <div className={`${s['search']} ${s['pd-20']}`}>
                  <div className={s['search-input']}>
                    <input type="text" placeholder="Search article, videos, images…" />
                    <div className={s['search-icon']}>
                      <SearchIcon />
                    </div>
                  </div>
                  {(currentUserStatus && currentUserStatus.valid) ? <div className={s.menu__right_side} onClick={this.signOut}> Logout </div> : ''}
                </div> */}
                <ErrorBoundary key="m_sidebar_eb">
                  {!isFirstPhase &&
                    this.props &&
                    !isAMPURL(params?.pathname) && (
                      <SidebarSearch
                        isTrending={this.isTrending}
                        isSearch={false}
                        closeDrawerHandler={closeDrawerHandler}
                        hamburger={this.props.hamburger}
                        isHamburgerOpen={this.props.isHamburgerOpen}
                        getMSID={this.props.getMSID}
                      />
                    )}
                </ErrorBoundary>
              </div>
              <>
                {trendingData && Array.isArray(trendingData) && (
                  <div className={s['trending']}>
                    {this.state.isTrending && this.props.trendingData ? (
                      <>
                        {' '}
                        <h4>Trending</h4>
                        <HorizontalSlider
                          data={trendingData?.slice(
                            0,
                            this.state.trendingLength,
                          )}
                          isTrendingCard={true}
                        />{' '}
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                )}
              </>
            </div>
            <ErrorBoundary key="m_acc_eb">
              <Accordion
                data={data}
                getMSID={getMSID}
                closeDrawerHandler={closeDrawerHandler}
                handleToggle={this.handleToggle}
                NavigationData={NavigationData}
                closeR={this.closeRef}
              />
            </ErrorBoundary>
          </div>
        </section>
        {/* <div id={s['snackbar']}>You have logged out successfully.</div> */}
      </>
    );
  }
}

HamburgerMenu.propTypes = {
  getMSID: PropTypes.func,
};

HamburgerMenu.defaultProps = {
  getMSID: () => {},
};

const mapStateToProps = (state) => ({
  trendingData: _get(state, 'trending.data'),
  isDark: _get(state, 'config.isDark'),
});
const mapDispatchToProps = (dispatch) => ({
  loadSearchDataFn: (searchTerm) => {
    dispatch(loadSearchData(searchTerm));
  },
  loadTrendingDataFn: (term) => {
    dispatch(loadTrendingData(term));
  },
  setTheme: (theme) => {
    dispatch(setTheme(theme));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(s)(langConsumer(HamburgerMenu)));

//export default withStyles(s)(HamburgerMenu);
