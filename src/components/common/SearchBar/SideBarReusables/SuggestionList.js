'use client'
//import LazyImage from 'components/common/LazyImage';
import { getNewImageUrl, getSlug, getTargetURL } from '@/utils/common';
import s from '../NewSearchBar.module.scss';
import NextImage from "@/utils/NextImage"

const SuggestionList = (props) => {
  const url = process.env.NEXT_PUBLIC_WEBAPP_BASE_URL
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
            href={suggestion.cmstype === 'DEFINITION'? url+'/'+suggestion?.seopath :getTargetURL({
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
          >
            <div className={`${s['']} ${s['search-list']}`}>
              <div className="col">
                <p className={s['suggestion__list__title']}>
                  {' '}
                  {suggestion?.title}
                </p>
                {/* <span className={s["type"]}> Indian television actress</span> */}
              </div>
              <div className={`${s['col']} ${s['col-img']}`}>
                <NextImage
                  src={
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
          <span>{'NO RESULT FOUND'}</span>
        )}
      </div>
    );
  }
};

export default SuggestionList;
