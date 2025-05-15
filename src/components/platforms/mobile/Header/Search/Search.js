import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import _get from 'lodash.get';
import makeRequest from 'utils/makeRequest';
import { getLocalStorage, setLocalStorage } from 'utils/storageUtils';
import { debounce, removeUnsupportedCharacters } from 'utils/common';
import { sendGAEvent } from 'helpers/analytics/gaUtils';
import { RECENT_SEARCHES_LOCAL_STORAGE_KEY } from '../../../../config/public';
import styles from './Search.scss';
import console from 'utils/logger';
import { langConsumer } from 'lang/langProvider';
class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchResults: null,
      searchKeyword: '',
      defaultData: null,
    };
    this.debouncedOnSearchInput = debounce(this.onSearchInput, 300);
  }

  componentDidMount() {
    const url = `/gnow/mweb/list/search/json`;

    makeRequest
      .get(url)
      .then((response) => {
        const defaultData = {
          trending: _get(
            response,
            'data.jsonFeed.sections["Trending Searches"]',
          ),
        };
        this.setState({
          defaultData,
        });
      })
      .catch((error) => {
        console.error(`Error in search data call : ${error}`);
      });
  }

  onSearchInput = (e) => {
    const keyword = removeUnsupportedCharacters(e.target.value);
    const { dataGA } = this.props;

    if (keyword) {
      // #todo - change to web
      const url = `/gnow/mweb/list/search/json?path=/search/keyword/&keyword=${keyword}`;

      makeRequest.get(url).then((response) => {
        this.setState({
          searchResults: _get(response, 'data.jsonFeed.data', []),
          searchKeyword: keyword,
        });
      });

      sendGAEvent({
        action: `Hamburger_Search`,
        ...dataGA,
        label: keyword,
      });
    } else {
      this.setState({
        searchResults: null,
        searchKeyword: '',
      });
    }
  };

  clearSearchInput = () => {
    this.searchInput.value = '';
    this.searchInput.focus();
    this.setState({
      searchResults: null,
      searchKeyword: '',
    });
  };

  getRecentSearchesData = () => {
    let recentSearches = getLocalStorage(RECENT_SEARCHES_LOCAL_STORAGE_KEY);

    if (recentSearches) {
      try {
        recentSearches = JSON.parse(recentSearches);
      } catch (e) {
        console.warn(
          'error parsing recentlySearches as JSON in Search component',
        );
      }
    }

    const recentSearchItems = _get(recentSearches, 'data', null);

    return recentSearchItems;
  };

  getRecentSearches = () => {
    const { dataGA } = this.props;
    const recentSearches = this.getRecentSearchesData();
    if (!(recentSearches && recentSearches.length)) {
      return null;
    }
    return (
      <>
        <h6 className={styles.recent}>Recent</h6>
        <ul className={styles.recent_searches}>
          {recentSearches.map((item) => (
            <li
              key={item.id || item.name}
              onClick={() => {
                sendGAEvent({
                  action: 'Hamburger_Search_Recent',
                  ...dataGA,
                  label: item.name,
                });
                this.gotoSearchItemLink(item);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </>
    );
  };

  gotoSearchItemLink = (item, setInRecent) => {
    PodcastShow;
    if (setInRecent) {
      this.setRecentSearchesData(item);
    }
    let url = item.url || item.wu;
    if (url.indexOf('/') === 0 && url.indexOf('//') !== 0) {
      url = `${this.props?.lang?.baseUrl}${url}`;
    }
    window.location.href = url;
  };

  setRecentSearchesData = (item) => {
    let existingRecentSearches = this.getRecentSearchesData();

    let updatedRecentSearches = [];

    // add current item
    updatedRecentSearches.push({
      name: item.Product_name,
      url: item.url,
    });

    if (existingRecentSearches && existingRecentSearches.length) {
      // filter out current item from existing recent items list
      existingRecentSearches = existingRecentSearches.filter(
        (existingItem) => existingItem.name !== item.Product_name,
      );
      // keep 2 items from the existing items. 3 items to be max
      updatedRecentSearches = updatedRecentSearches.concat(
        existingRecentSearches.slice(0, 2),
      );
    }

    setLocalStorage(
      RECENT_SEARCHES_LOCAL_STORAGE_KEY,
      JSON.stringify({
        data: updatedRecentSearches,
      }),
    );
  };

  getTrendingSearches = () => {
    const { dataGA } = this.props;
    const { defaultData } = this.state;
    const trendingSearches = _get(defaultData, 'trending.data.items', []);

    if (!trendingSearches.length) {
      return null;
    }

    let trendingSearchesAfterExclusion = trendingSearches;

    const recentSearches = this.getRecentSearchesData();

    if (recentSearches && recentSearches.length) {
      trendingSearchesAfterExclusion = trendingSearchesAfterExclusion.filter(
        (item) =>
          !recentSearches.find((recentItem) => recentItem.name === item.hl),
      );
    }

    return (
      <>
        <h6 className={styles.trending}>Trending</h6>
        <ul>
          {trendingSearchesAfterExclusion.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                sendGAEvent({
                  action: 'Hamburger_Search_Trending',
                  ...dataGA,
                  label: item.hl,
                });
                this.gotoSearchItemLink(item);
              }}
            >
              {item.hl}
            </li>
          ))}
        </ul>
      </>
    );
  };

  getKeywordSearchResults = () => {
    const { translations } = this.props;
    const { searchResults, searchKeyword } = this.state;
    const resultObj = searchResults.find((obj) => obj.gadgets);
    const resultItems = _get(resultObj, 'gadgets.data');

    if (!resultItems) {
      return (
        <div className={styles.no_results}>
          {translations['NO_RESULT_FOUND']}
        </div>
      );
    }

    const resultsHTML = (
      <ul className={styles.keywordsearch}>
        {resultItems.map((item) => {
          const itemHTML = item.Product_name.replace(
            new RegExp(searchKeyword, 'gi'),
            (match) => `<mark>${match}</mark>`,
          );

          return (
            <li
              key={item.Product_name}
              onClick={() => {
                this.gotoSearchItemLink(item, true);
              }}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: itemHTML,
              }}
            />
          );
        })}
      </ul>
    );

    return resultsHTML;
  };

  render() {
    const { searchResults } = this.state;
    const { active, toggleVisibility, translations } = this.props;
    return (
      <div
        className={classNames({
          [styles.customDropdown]: true,
          [styles.active]: active,
        })}
        ref={(searchContainerRef) => {
          if (searchContainerRef) {
            this.searchContainerRef = searchContainerRef;
          }
        }}
      >
        <div className={styles.searchead}>
          <div className={styles.back} onClick={toggleVisibility}>
            {translations['BACK']}
          </div>
          <div className={styles.searchBox}>
            <label htmlFor="search_input">
              <span className={styles.search_label}>
                {translations['SEARCH']}
              </span>
              <input
                type="text"
                id="search_input"
                placeholder="Search Gadgets"
                onChange={(e) => {
                  e.persist();
                  this.debouncedOnSearchInput(e);
                }}
                ref={(el) => {
                  if (el) {
                    this.searchInput = el;
                  }
                }}
                autoComplete="off"
                onPaste={(e) => {
                  e.preventDefault();
                  return false;
                }}
              />
            </label>
            {/* {!searchResults && <span className={styles.searchBtn} />} */}
            {searchResults && (
              <span className={styles.closeBtn} onClick={this.clearSearchInput}>
                {translations['CLEAR']}
              </span>
            )}
          </div>
        </div>
        <div className={styles.results_box}>
          {!searchResults && (
            <>
              {this.getRecentSearches()}
              {this.getTrendingSearches()}
            </>
          )}
          {searchResults && this.getKeywordSearchResults()}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  dataGA: PropTypes.shape({}).isRequired,
  active: PropTypes.bool,
  toggleVisibility: PropTypes.func.isRequired,
};

Search.defaultProps = {
  active: false,
};

export default withStyles(styles)(langConsumer(Search));
