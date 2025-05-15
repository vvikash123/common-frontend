import LazyImage from 'components/common/LazyImage';
import { getNewImageUrl, getSlug, getTargetURL } from 'utils/common';
import s from '../SidebarSearch.scss';
import { langConsumer } from '../../../../../lang/langProvider';

// import s from './SidebarSearch.scss';

const SuggestionList = (props) => {
  const {
    searchedSuggestion,
    handleClick,
    webstorieslink,
    loading,
    inputValue,
    MIN_CHAR_COUNT,
    translations,
    langConstant,
  } = props;
  if (
    searchedSuggestion &&
    searchedSuggestion?.all &&
    searchedSuggestion?.all?.length &&
    Array.isArray(searchedSuggestion?.all)
  ) {
    return (
      inputValue.length >= MIN_CHAR_COUNT &&
      searchedSuggestion?.all?.slice(0, 10).map((suggestion) => (
        <>
          <a
            key={suggestion.msid}
            className={s['suggestion__list']}
            to={getTargetURL({
              ...(suggestion?.overridelink && {
                overrideString: suggestion?.overridelink || '',
              }),
              normalString: `/${
                suggestion?.seopath && suggestion?.seopath
              }-${getSlug(suggestion.cmstype)}-${webstorieslink(
                suggestion && suggestion,
              )}`,
              storyType: suggestion?.cmstype,
              msid: webstorieslink(suggestion && suggestion),
              seoPath: suggestion.seopath.replace('amp_stories/', ''),
            })}
            onClick={(event) => {
              handleClick();
              props.getMSID(webstorieslink(suggestion && suggestion));
            }}
          >
            <div className={`${s['']} ${s['search-list']}`}>
              <div className="col">
                <p className={s['suggestion__list__title']}>
                  {' '}
                  {suggestion?.title}
                </p>
                {/* <span className={s["type"]}> Indian television actress</span> */}
              </div>
              <div className={`${s['col']}`}>
                <LazyImage
                  datasrc={
                    getNewImageUrl({
                      msid: suggestion?.msid || null,
                      imgSize:
                        suggestion?.imageSize || suggestion.thumbsize || '',
                      updatedAt:
                        suggestion?.cmsassoc && suggestion[0]?.updatedate,
                      isArticleBanner: true,
                    }) || langConstant['IMG_DEFAULT']
                  }
                  alt={suggestion?.title || null}
                  useOriginalSource
                />
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
          <span>{translations['NO_RESULT_FOUND']}</span>
        )}
      </div>
    );
  }
};

export default langConsumer(SuggestionList);
