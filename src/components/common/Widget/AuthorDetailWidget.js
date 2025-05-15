import dayjs from 'dayjs';
import { isAMPRequest } from '@/utils/serverUtils';
import { showAuthorDesignation } from '../../../constants';
import { isMobile } from '@/utils/isMobile';
const DefaultUser ='/assets/icons/svg/user.jpg';
import style from './AuthorDetailWidget.module.scss';
import LinkWrapper from '../LinkWrapper/LinkWrapper';

const AuthorDetailWidget = ({
  authors,
  byline,
  updatedate,
  disableTimestamp,
  seoAuthor,
  isAuthor,
  type,
  agency,
  navigation,
}) => {
  // const lang = useContext(LangContext);

  const getAuthors = (item, index, isAuthor) => {
    return (
      <>
        {item.length == 1 && item ? (
          <>
            {item.map((elem, ind) => {
              return elem?.id ? (
                <>
                  {ind == 0 && isAuthor ? <strong>{index}: </strong> : null}
                  <a
                    key={elem?.id}
                    to={`/author/${elem?.seoname || ''}-${elem?.id || ''}`}
                  >
                    {ind && isMobile() > 0 ? ', ' : null}
                    <span>{elem?.name}</span>
                  </a>
                </>
              ) : null;
            })}
          </>
        ) : (
          <>
            {item.map((elem, ind) => {
              return elem?.id ? (
                <>
                  {ind == 0 && isAuthor ? <strong>{index}: </strong> : null}
                  <a
                    key={elem?.id}
                    to={`/author/${elem?.seoname || ''}-${elem?.id || ''}`}
                  >
                    {ind && isMobile() > 0 ? ', ' : null}
                    <span>{elem?.name}</span>
                  </a>
                </>
              ) : null;
            })}
          </>
        )}
      </>
    );
  };

  let seoAuthorId = seoAuthor?.url?.split('-')?.pop() || null;
  let showDesignation = showAuthorDesignation?.includes(navigation?.category);
  let authorDesc = authors?.[0]?.desc || '';
  let authorsImg = '';

  if (
    (byline && Object.keys(byline).length == 1 && byline[Object.keys(byline)[0]].length == 1) ||
    (byline && Object.keys(byline).length == 0)
  ) {
    authorsImg = 'image';
  }

  let authorName = authors?.[0]?.name || authors?.name || '';
  if (seoAuthor?.name) authorName = seoAuthor.name;

  authorName =
    byline?.[Object.keys(byline)?.[0]]?.[0]?.name || authorName;

  let authorId = authors?.[0]?.id || '';
  authorId =
    byline?.[Object.keys(byline)?.[0]]?.[0]?.id || authorId;

  authorId = seoAuthorId || authorId;

  let authorSeoName = authors?.[0]?.seoname || '';
  let authorDesignation = authors?.[0]?.designation || '';

  let dataAttr = {};
  if (isAMPRequest()) {
    dataAttr = {
      'data-width': '30',
      'data-height': '30',
      'data-layout': 'responsive',
    };
  }

  const renderAuthorWidget = () => {
    switch (type) {
      case 'TOP_AUTHOR_WIDGET':
        return (
          <div className={`tnn__details-user-profile ${style['tnn__details-user-profile']}`}>
            <div className={`${style['author_row']} ${style['align_center']}`}>
              {byline?.[Object.keys(byline)?.[0]]?.[0] ? (
                <div className={style['multiple_byline']}>
                  {!isMobile()
                    ? Object.keys(byline).map((elem, indx) =>
                        getAuthors(byline[Object.keys(byline)[indx]], Object.keys(byline)[indx], isAuthor)
                      )
                    : getAuthors(byline[Object.keys(byline)[0]], Object.keys(byline)[0], isAuthor)}
                </div>
              ) : seoAuthor ? (
                <a
                  key={authorId}
                  to={seoAuthor?.url || `/author/${authorSeoName}-${authorId}`}
                >
                  {authorName && (
                    <strong className={style['author_detail']}>
                      <span className={style['author-name']}>{authorName}</span>
                    </strong>
                  )}
                </a>
              ) : authorId ? (
                <a
                  key={authorId}
                  to={`/author/${authorSeoName || ''}-${authorId || ''}`}
                >
                  {authorName && (
                    <strong className={style['author_detail']}>
                      <span className={style['author-name']}>{authorName}</span>
                      {showDesignation && authorDesignation && (
                        <span className={style['author_desgination']}>
                          {authorDesignation}
                        </span>
                      )}
                    </strong>
                  )}
                </a>
              ) : authorName ? (
                <strong className={style['author_detail']}>
                  <span className={style['author-name']}>{authorName}</span>
                  {showDesignation && authorDesignation && (
                    <span className={style['author_desgination']}>
                      {authorDesignation}
                    </span>
                  )}
                </strong>
              ) : null}
              {updatedate && (
                <p className={style['update-time']}>
                  {'Updated ' +
                    dayjs(Number(updatedate))
                      .tz('Asia/Calcutta')
                      .format(`MMM D, YYYY${disableTimestamp ? ' ' : '[,] hh:mm A [IST]'}`)}
                </p>
              )}
            </div>
            {byline?.[Object.keys(byline)?.[1]] && (
              <div className={style['multiple_byline']}>
                {isMobile() &&
                  byline?.[Object.keys(byline)?.[1]]?.[0] &&
                  getAuthors(byline[Object.keys(byline)[1]], Object.keys(byline)[1], isAuthor)}
                {isMobile() &&
                  byline?.[Object.keys(byline)?.[2]]?.[0] &&
                  getAuthors(byline[Object.keys(byline)[2]], Object.keys(byline)[2], isAuthor)}
              </div>
            )}
          </div>
        );
      case 'BOTTOM_AUTHOR_WIDGET':
        if (!(authorName && authorId)) return '';
        return (
          <a
            key={authorId}
            to={seoAuthor?.url || `/author/${authorSeoName}-${authorId}`}
            className={`${style['authorfot']}`}
          >
            <div className={style['footer-author']}>
              <div className={style['author-img']}>
                {authorId ? (
                  !isAMPRequest() ? (
                    ''
                  ) : (
                    <amp-img
                      src={`${process.env.NEXT_PUBLIC_PHOTO_API}/authorthumb/${authorId}.cms?width=60&height=60`}
                      width="auto"
                      height="60"
                      layout="fixed-height"
                      alt={`${authorSeoName || ''}`}
                    >
                      <amp-img
                        fallback=""
                        src={`${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}${DefaultUser}`}
                        width="auto"
                        height="60"
                        layout="fixed-height"
                        alt={`${authorSeoName || ''}`}
                      ></amp-img>
                    </amp-img>
                  )
                ) : (
                  <img
                    src={`${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}${DefaultUser}`}
                    width="auto"
                    height="30"
                    layout="fixed-height"
                    alt={`${authorSeoName || ''}`}
                  />
                )}
              </div>
              <div className={style['author-title']}>
                <div className={style['name-title']}>
                  <a key={authorId} to={seoAuthor?.url || `/author/${authorSeoName}-${authorId}`}>
                    {authorName && (
                      <strong className={style['author_detail']}>
                        <span className={style['author-name']}>{authorName}</span>
                      </strong>
                    )}
                  </a>
                  <span>Author</span>
                </div>
                <p>{authorDesc}</p>
              </div>
            </div>
          </a>
        );
      case 'AGENCY_AUTHOR_WIDGET':
        return (
          <LinkWrapper
            condition={agency?.seoname ? true : false}
            wrapper={(children) => (
              <a to={`/author/${agency.seoname}-${agency.id}`}>
                {children}
              </a>
            )}
          >
            <div className={`tnn__details-user-profile ${style['tnn__details-user-profile']}`}>
              <div className={`${style['author_row']} ${style['align_center']}`}>
                {agency?.name && (
                  <strong className={style['author_detail']}>
                    <span className={style['author-name']}>{agency?.name}</span>
                  </strong>
                )}
                {updatedate && (
                  <p className={style['update-time']}>
                    {'Updated ' +
                      dayjs(Number(updatedate))
                        .tz('Asia/Calcutta')
                        .format(`MMM D, YYYY${disableTimestamp ? ' ' : '[,] hh:mm A [IST]'}`)}
                  </p>
                )}
              </div>
            </div>
          </LinkWrapper>
        );
      default:
        return '';
    }
  };

  return renderAuthorWidget();
};

export default AuthorDetailWidget;
