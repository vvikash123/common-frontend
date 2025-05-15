import s from './NewSearchBar.module.scss';
const TopicsSuggetionList = (props) => {
  const {
    searchedSuggestion,
    loading,
    inputValue,
    MIN_CHAR_COUNT,
  } = props;
  if (
    searchedSuggestion &&
    searchedSuggestion?.length &&
    Array.isArray(searchedSuggestion)
  ) {    
    return (
      inputValue.length >= MIN_CHAR_COUNT &&
      searchedSuggestion?.slice(0, 10).map((suggestion, index) => (
        <>
          <a
            key={`topic-sugge-${index}`}
            className={s['suggestion__list']}
            href={`/${suggestion.seopath}`}
          >
            <div className={`${s['']} ${s['search-list']}`}>
              <div className="col">
                <p className={s['suggestion__list__title']}>
                  {' '}
                  {suggestion?.title}
                </p>
              </div>
            </div>
          </a>
        </>
      ))
    );
  } else {    
    return (
      <div className={s['no-resultWrap']}>
        {loading ? (
          <span>Loading....</span>
        ) : (
          <span>{'NO RESULT FOUND'}</span>
        )}
      </div>
    );
  }
};

export default TopicsSuggetionList;
