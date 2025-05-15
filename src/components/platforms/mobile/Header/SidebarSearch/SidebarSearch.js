import LazyImage from 'components/common/LazyImage';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _get from 'lodash.get';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce, getImageUrl, getSlug, getTargetURL } from 'utils/common';
import console from 'utils/logger';
import history from '../../../../history';
import { loadSearchData } from '../../../../redux/modules/search';
import { CloseIconBig, SearchIcon } from '../../../common/Svg/Svg';
import s from './SidebarSearch.scss';
import isAMPRequest from 'utils/serverUtils';
import { langConsumer } from 'lang/langProvider';

const MIN_CHAR_COUNT = 3;

class SidebarSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputValue: '',
      isTrendingVisible: false,
      searchSuggestion: true,
      erroMsg: '',
      srchTrm:
        (localStorage.getItem('srchTrm') && localStorage.getItem('srchTrm')) ||
        '',
    };
    this.debouncedOnSearchInput = debounce(this.searchHandler, 300);
  }
  searchHandler = (event) => {
    this.setState({
      searchInputValue: event.target.value.trim(),
    });
    // this.props.isTrending(!(event.target.value.length >= MIN_CHAR_COUNT));
    if (event.target.value.length >= 0) {
      this.setState({
        erroMsg: '',
      });
    }
    if (this.state.searchInputValue.length >= MIN_CHAR_COUNT) {
      this.props.loadSearchDataFn(
        event.target.value,
        'On Type',
        this?.props?.queryParams,
      );
    }
  };

  onEnterSearchHandler = (e) => {
    if (this.props.currentPage != 'search-result') {
      if (e.keyCode === 13 && this.state.searchInputValue.trim() != '') {
        if (typeof this.props.isTouched === 'function') {
          this.props.isTouched();
        }
        localStorage.setItem('srchTrm', this.state.searchInputValue);
        this.hideTrendingHandler();
        let queryParams = this?.props?.queryParams,
          apendQueryParams;
        if (
          queryParams &&
          queryParams.utm_source == 'g' &&
          queryParams.utm_medium !== undefined &&
          !isAMPRequest()
        ) {
          apendQueryParams = `?utm_source=${queryParams?.utm_source}&utm_medium=${queryParams.utm_medium}`;
        }
        this.props.loadSearchDataFn(
          this.state.searchInputValue,
          'On Enter',
          this?.props?.queryParams,
        );
        history.push(
          this.props.addLangPath(
            `/search-result/${this.state.searchInputValue}${
              apendQueryParams ? apendQueryParams : ''
            }`,
          ),
        );
        if (typeof e.target.blur === 'function') {
          e.target.blur();
        }
      }
    } else {
      if (e.keyCode === 13 && this.state.searchInputValue.trim() != '') {
        if (typeof this.props.isTouched === 'function') {
          this.props.isTouched();
        }
        localStorage.setItem('srchTrm', this.state.searchInputValue);
        this.setState({ searchSuggestion: false });
        let queryParams = this?.props?.queryParams,
          apendQueryParams;
        if (
          queryParams &&
          queryParams.utm_source == 'g' &&
          queryParams.utm_medium !== undefined &&
          !isAMPRequest()
        ) {
          apendQueryParams = `?utm_source=${queryParams?.utm_source}&utm_medium=${queryParams.utm_medium}`;
        }
        this.props.loadSearchDataFn(
          this.state.searchInputValue,
          'On Enter',
          queryParams,
        );
        history.push(
          this.props.addLangPath(
            `/search-result/${this.state.searchInputValue}${
              apendQueryParams ? apendQueryParams : ''
            }`,
          ),
        );
        if (typeof e.target.blur === 'function') {
          e.target.blur();
        }
      }
    }
  };
  handleSearchBtn = (e, val) => {
    e.preventDefault();
    if (val.length === 0) {
      this.setState({
        erroMsg: `${this.props.translations['PLEASE_ENTER_SOMETHING']}...`,
      });
    }
    if (val.length >= 1) {
      let queryParams = this?.props?.queryParams,
        apendQueryParams;
      if (
        queryParams &&
        queryParams.utm_source == 'g' &&
        queryParams.utm_medium !== undefined &&
        !isAMPRequest()
      ) {
        apendQueryParams = `?utm_source=${queryParams?.utm_source}&utm_medium=${queryParams.utm_medium}`;
      }
      this.props.loadSearchDataFn(val, 'On Enter', queryParams);
      localStorage.setItem('srchTrm', val);
      this.setState({ searchSuggestion: false });
      if (!this.props.isSearch) {
        this.props.closeDrawerHandler();
      }
      if (typeof this.props.isTouched === 'function') {
        this.props.isTouched();
      }
      history.push(
        this.props.addLangPath(
          `/search-result/${val}${apendQueryParams ? apendQueryParams : ''}`,
        ),
      );
    }
  };

  showTrendingHandler = (e) => {
    if (this.props.currentPage != 'search-result') {
      this.props.isTrending(true);
      // this.setState({
      //   isTrendingVisible: true
      // })
    }
  };

  hideTrendingHandler = (e) => {
    this.props.isTrending(false);
    // this.setState({
    //   isTrendingVisible: false
    // })
  };

  handleClick = () => {
    setTimeout(() => {
      document.querySelector('#search-close-btn')?.click();
      document.querySelector('#close_burger_icon')?.click();
    }, 500);
  };

  onInputFocus = (e) => {
    this.props.isTrending(true);
    e.target.placeholder = ' ';
  };
  onInputBlur = (e) => {
    // this.props.isTrending(false);
    e.target.placeholder =
      this?.props?.translations['SEARCH_ARTICLE_VIDEO_IMAGES'];
  };
  handleClearState = (val) => {
    this.props.isTrending(false);
    if (val) {
      this.searchInput.value = '';
    }
    this.setState({
      searchInputValue: '',
      srchTrm: '',
    });
  };
  handleChange = (e) => {
    this.setState({
      srchTrm: e.target.value,
      searchSuggestion: true,
    });
    localStorage.setItem('srchTrm', e.target.value);
  };

  componentDidMount() {
    if (localStorage.getItem('srchTrm')) {
      localStorage.removeItem('srchTrm');
    }
    try {
      if (
        typeof window !== 'undefined' &&
        history?.location &&
        history?.location?.pathname
      ) {
        const [empty, pageName, prams] =
          history?.location?.pathname?.split('/');
        if (
          pageName &&
          typeof prams === 'string' &&
          pageName === 'search-result'
        ) {
          this.setState({ srchTrm: prams.trim() });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
 
  webstorieslink = (item) => {
    return !item.seopath.includes('amp_stories/') ? item.msid : item.parentid;
  };
  render() {
    const MIN_CHAR_COUNT = 3;
    const {
      searchedSuggestion,
      trendingData,
      hamburger,
      isHamburgerOpen,
      translations,
    } = this.props;
    let suggestionList;
    if (!searchedSuggestion?.msg) {
      if (
        searchedSuggestion &&
        searchedSuggestion.all &&
        searchedSuggestion.all.length &&
        Array.isArray(searchedSuggestion.all)
      ) {
        suggestionList =
          this.state.searchInputValue.length >= MIN_CHAR_COUNT &&
          searchedSuggestion.all
            .slice(0, 10)
            .map((suggestion, listRank, { length }) => (
              <>
                <a
                  key={suggestion.msid}
                  className={s['suggestion__list']}
                  to={getTargetURL({
                    ...(suggestion?.overridelink && {
                      overrideString: suggestion.overridelink,
                    }),
                    normalString: `/${
                      suggestion.seopath && suggestion.seopath
                    }-${getSlug(suggestion.cmstype)}-${this.webstorieslink(
                      suggestion && suggestion,
                    )}`,
                    storyType: suggestion.cmstype,
                    msid: this.webstorieslink(suggestion && suggestion),
                    seoPath: suggestion.seopath.replace('amp_stories/', ''),
                  })}
                  onClick={(event) => {
                    this.handleClick();
                    this.props.getMSID(
                      this.webstorieslink(suggestion && suggestion),
                    );
                  }}
                >
                  <div className={`${s['']} ${s['search-list']}`}>
                    <div className="col">
                      <p className={s['suggestion__list__title']}>
                        {' '}
                        {suggestion.title}
                      </p>
                      {/* <span className={s["type"]}> Indian television actress</span> */}
                    </div>
                    <div className={`${s['col']}`}>
                      <LazyImage
                        datasrc={getImageUrl(
                          suggestion.msid || null,
                          suggestion.imageSize || suggestion.thumbsize || '',
                          60,
                        )}
                        alt={suggestion.title || null}
                        useOriginalSource
                      />
                    </div>
                  </div>
                </a>
                {!searchedSuggestion?.msg ? (
                  searchedSuggestion.all.length > 10 &&
                  length === listRank + 1 ? (
                    <button
                      aria-label="search show all"
                      className={`${s['search-show-all']}`}
                      onClick={(e) =>
                        this.handleSearchBtn(e, this.state.searchInputValue)
                      }
                    >
                      {` ${translations['SHOW_ALL_RESULT']} `}
                    </button>
                  ) : null
                ) : null}
              </>
            ));
      } else {
        suggestionList = (
          <div className={s['search']}>
            {' '}
            <p>{`${translations['NO_RESULT_FOUND']} `}</p>
          </div>
        );
      }
    }
    return (
      <>
        <div
          className={
            this.props.currentPage === 'search-result'
              ? `${s['search']}`
              : `${s['search']} ${s['pb-10']}`
          }
        >
          <div className={s['search-input']}>
            <form
              onSubmit={(e) =>
                this.handleSearchBtn(e, this.state.searchInputValue)
              }
            >
              <input
                autoComplete="off"
                type="text"
                value={this.state.srchTrm}
                placeholder={translations['SEARCH_ARTICLE_VIDEO_IMAGES']}
                onChange={(e) => {
                  e.persist();
                  this.debouncedOnSearchInput(e);
                  this.handleChange(e);
                }}
                onKeyUp={(e) => {
                  this.onEnterSearchHandler(e);
                }}
                onFocus={(e) => {
                  this.onInputFocus(e);
                }}
                onBlur={(e) => {
                  this.onInputBlur(e);
                }}
                ref={(el) => {
                  if (el) {
                    this.searchInput = el;
                  }
                }}
              />
            </form>
            <div>
              {this.state.srchTrm.length === 0 && (
                <div className={s['error-message']}>
                  {this.state.erroMsg && this.state.erroMsg}
                </div>
              )}
            </div>

            <div className={`SidebarSearch-search-icon ${s['search-icon']}`}>
              <button
                className={s['icon_button']}
                aria-label="search icon"
                type="button"
                onClick={(e) =>
                  this.handleSearchBtn(e, this.state.searchInputValue)
                }
              >
                <SearchIcon />
              </button>
              {this.state.searchInputValue && (
                <button
                  id={'search-close-btn'}
                  aria-label="search icon close"
                  className={s['icon_button']}
                  onClick={() => this.handleClearState(true)}
                  type="button"
                >
                  <CloseIconBig />
                </button>
              )}
            </div>
          </div>
        </div>
        {this.state.searchInputValue.length >= MIN_CHAR_COUNT &&
        this.state.searchSuggestion ? (
          <div
            className={
              this.props.currentPage === 'search-result'
                ? `${s['search-suggestion_v1']} ${s['search-suggestion']}`
                : `${s['search-suggestion']}`
            }
          >
            {this.state.searchInputValue.length >= MIN_CHAR_COUNT
              ? this.state.searchSuggestion && suggestionList
                ? suggestionList
                : ''
              : ''}
          </div>
        ) : (
          ''
        )}
      </>
    );
  }
}
SidebarSearch.defaultProps = {
  isSearch: true,
};

const mapStateToProps = (state) => ({
  searchedSuggestion: _get(state, 'search.suggetionList'),
  trendingData: _get(state, 'trending.data'),
  queryParams: _get(state, 'query'),
});
const mapDispatchToProps = (dispatch) => ({
  loadSearchDataFn: (searchTerm, searchType, queryParams) => {
    dispatch(
      loadSearchData(searchTerm, '', 'mobile', 0, searchType, queryParams),
    );
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(s)(langConsumer(SidebarSearch)));

//export default withStyles(s)(SidebarSearch);
