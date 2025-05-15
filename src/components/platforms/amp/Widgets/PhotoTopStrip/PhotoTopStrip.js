import style from './PhotoTopStrip.module.scss'
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";

  import {
    sendGAPageView,
    setGAValue,
    
  } from '@/helpers/analytics/gaUtils';

import SocialShareIcons from '@/components/platforms/desktop/SocialShareIcon/SocialShareIcon';
import NextImage from '@/utils/NextImage';
import { getAuthorImageComp, getAuthorImageUrl, getNewImageUrl, isMobile } from '@/utils/common';
import dayjs from 'dayjs';
import isAMPRequest from '@/utils/serverUtils';
import { IMG_DEFAULT_MOB, IMG_DEFAULT_MOB_AUTH } from '@/constants';
export const PhotoTopStrip = (props) => {
  const {  
    authors = [],
    byline = {},
    updatedate,
    disableTimestamp = false,
    seoAuthor,
    isAuthor,
    item,
  } = props;

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
                    href=
                      {`/author/${elem?.seoname || ''}-${elem?.id || ''}`
                    }
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
                    href={`/author/${elem?.seoname || ''}-${elem?.id || ''}`
                       }
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

  let seoAuthorId =
      seoAuthor?.url &&
      seoAuthor?.url?.split('-') &&
      seoAuthor?.url?.split('-').length > 0
        ? seoAuthor?.url.split('-')[seoAuthor?.url.split('-').length - 1]
        : null;

    let showDesignation = ['columns'].includes(
      props.navigation?.category,
    );
    let authorDesc =
      authors && authors.length > 0 && authors[0] && authors[0].desc
        ? `${authors[0].desc}`
        : '';

    let authorsImg = '';
    if (
      (byline &&
        Object.keys(byline).length == 1 &&
        byline[Object.keys(byline)[0]].length == 1) ||
      (byline && Object.keys(byline).length == 0)
    ) {
      authorsImg = 'image';
    }
    let authorName =
      authors && authors.length > 0 && authors[0] && authors[0].name
        ? `${authors[0].name}`
        : authors && authors.name
        ? `${authors.name}`
        : '';

    if (seoAuthor && seoAuthor.name) {
      authorName = seoAuthor.name;
    }
    authorName =
      byline &&
      Object.keys(byline) &&
      Object.keys(byline)[0] &&
      byline[Object.keys(byline)[0]] &&
      byline[Object.keys(byline)[0]][0] &&
      byline[Object.keys(byline)[0]][0].name
        ? byline[Object.keys(byline)[0]][0].name
        : authorName;
    let authorId =
      authors && authors.length > 0 && authors[0] && authors[0].id
        ? `${authors[0].id}`
        : '';

    authorId =
      byline &&
      Object.keys(byline) &&
      Object.keys(byline)[0] &&
      byline[Object.keys(byline)[0]] &&
      byline[Object.keys(byline)[0]][0] &&
      byline[Object.keys(byline)[0]][0].name
        ? byline[Object.keys(byline)[0]][0].id
        : authorId;
    let agencyId = authors && authors.id ? `${authors.id}` : '';

    authorId = seoAuthorId ? seoAuthorId : authorId;

    let authorSeoName =
      authors && authors.length > 0 && authors[0] && authors[0].seoname
        ? `${authors[0].seoname}`
        : '';
    let authorDesignation =
      authors && authors.length > 0 && authors[0] && authors[0].designation
        ? `${authors[0].designation}`
        : '';
  
const shareOnFacebook = () => {
  setGAValue('event', 'click', {
    event_category: 'Share',
    event_label: `facebook | ${window.location}`,
  });
};
const shareOnTwitter = () => {
  setGAValue('event', 'click', {
    event_category: 'Share',
    event_label: `twitter | ${window.location}`,
  });
};
const shareOnLinkedIn = () => {
  setGAValue('event', 'click', {
    event_category: 'Share',
    event_label: `linkedin | ${window.location}`,
  });
};
const shareOnWhatsapp = () => {
  setGAValue('event', 'click', {
    event_category: 'Share',
    event_label: `whatsapp | ${window.location}`,
  });
};


authorId=null
    return (
        <div className='PhotoTopStrip'>
            <ContainerBox>
                <div className='PhotoTopStripRow'>
                    <div className='authorinfoRow'>
                        <div className='authorinfo'><i>
                        { authorId ? (
                    <a
                    key={authorId}
                    href={`/author/${authorSeoName || ""}-${authorId || ""}`}
                  >
                  {getAuthorImageComp(authorId, authorSeoName)}
                  </a>
                  ) : (
                    <amp-img
                      src={`${IMG_DEFAULT_MOB_AUTH}`}
                      width="auto"
                      height="60"
                      layout="fixed-height"
                      alt={`${authorSeoName || ""}`}
                    ></amp-img>
                  )
                  }
                          </i><strong> 
                             <div className={`${style['author_row']} ${style['align_center']}`}>
              {byline &&
              Object.keys(byline) &&
              Object.keys(byline)[0] &&
              byline[Object.keys(byline)[0]] &&
              byline[Object.keys(byline)[0]][0] ? (
                <div className={style['multiple_byline']}>
                  {!isMobile()
                    ? Object.keys(byline).map((elem, indx) =>
                        getAuthors(
                          byline[Object.keys(byline)[indx]],
                          Object.keys(byline)[indx],
                          isAuthor,
                        ),
                      )
                    : getAuthors(
                        byline[Object.keys(byline)[0]],
                        Object.keys(byline)[0],
                        isAuthor,
                      )}
                  {byline && Object.keys(byline) && Object.keys(byline)[1] && (
                    <>
                      {isMobile()
                        ? byline &&
                          Object.keys(byline) &&
                          Object.keys(byline)[1] &&
                          byline[Object.keys(byline)[1]] &&
                          byline[Object.keys(byline)[1]][0]
                          ? getAuthors(
                              byline[Object.keys(byline)[1]],
                              Object.keys(byline)[1],
                              isAuthor,
                            )
                          : null
                        : null}
                      {isMobile()
                        ? byline &&
                          Object.keys(byline) &&
                          Object.keys(byline)[2] &&
                          byline[Object.keys(byline)[2]] &&
                          byline[Object.keys(byline)[2]][0]
                          ? getAuthors(
                              byline[Object.keys(byline)[2]],
                              Object.keys(byline)[2],
                              isAuthor,
                            )
                          : null
                        : null}
                    </>
                  )}
                </div>
              ) : seoAuthor ? (
                <a
                  key={authorId}
                  href={
                    Object.keys(seoAuthor).length
                      ? seoAuthor?.url
                      : `/author/${authorSeoName}-${authorId}`
                  }
                >
                  {authorName ? (
                    <strong className={style['author_detail']}>
                      <span className={style['author-name']}>{authorName}</span>
                    </strong>
                  ) : null}
                </a>
              ) : authorId ? (
                <a
                  key={authorId}
                  href={`/author/${authorSeoName || ''}-${authorId || ''}`}
                >
                  {authorName ? (
                    <strong className={style['author_detail']}>
                      <span className={style['author-name']}>{authorName}</span>
                      {showDesignation && authorDesignation ? (
                        <span className={style['author_desgination']}>
                          {authorDesignation}
                        </span>
                      ) : null}
                    </strong>
                  ) : null}
                </a>
              ) : authorName ? (
                <strong className={style['author_detail']}>
                  <span className={style['author-name']}>{authorName}</span>
                  {showDesignation && authorDesignation ? (
                    <span className={style['author_desgination']}>
                      {authorDesignation}
                    </span>
                  ) : null}
                </strong>
              ) : null}
           
                            </div>
      
                            </strong> <span>{updatedate  ? (
                <p className='update-time'>
                  {'Updated ' +
                    dayjs
                      .tz(Number(updatedate), 'Asia/Calcutta')
                      .format(
                        `MMM D, YYYY${
                          disableTimestamp ? ' ' : '[ | ] hh:mm A [IST]'
                        }`,
                      )}
                </p>
              ) : (
                ''
              )}</span> </div>
                        <span className='Verified'>Verified By
                            <amp-img
                                src="/assets/health-images/images/himalaya-logo.png"
                                alt="himalaya-logo"
                                fallback=""
                                width="auto"
                                height="60"
                                layout="fixed-height"
                               

                            ></amp-img>
                        </span>
                    </div>
                    <div className='shareIcon'>
                    <SocialShareIcons
                   data={item}
                   lang={''}
                   shareOnFacebook={shareOnFacebook}
                   shareOnTwitter={shareOnTwitter}
                   shareOnLinkedIn={shareOnLinkedIn}
                   shareOnWhatsapp={shareOnWhatsapp}
                 />
                 </div>
                </div>
            </ContainerBox>
            <style jsx global>
            {`
      
      .PhotoTopStrip {
       width: 100%;
     
       padding: 20px 0px 0;
       
    }
    
     .PhotoTopStrip .PhotoTopStripRow {
     
       display: block;
         height: auto;
    }
    
     .PhotoTopStrip .PhotoTopStripRow .authorinfoRow {
       display: flex;
       align-items: center;
    }
     .PhotoTopStrip .PhotoTopStripRow .authorinfoRow .authorinfo {
       display: flex;
       color: rgba(15, 47, 79, 1);
       
       font-weight: 700;
       text-align: left;
       align-items: flex-start;
       font-size: 12px;
       flex-wrap: wrap;
    }
     
     .PhotoTopStrip .PhotoTopStripRow .authorinfoRow .authorinfo i {
       min-width: 34px;
       min-height: 34px;
       border-radius: 100px;
       margin-right: 10px;
           max-height: 30px;
    position: relative;
    top: -9px;
    }
     .PhotoTopStrip .PhotoTopStripRow .authorinfoRow .authorinfo i img {
       display: block;
       min-width: 34px;
       min-height: 34px;
       border-radius: 100px;
    }
     .PhotoTopStrip .PhotoTopStripRow .authorinfoRow .authorinfo > span {
      color: #fff;
      font-size: 12px;
      font-weight: 400;
      width: 100%;
      padding-left: 43px;
      position: relative;
      top: -15px;
    }
    .PhotoTopStrip .PhotoTopStripRow .authorinfoRow .authorinfo strong a{
      color: #fff;
    }
     .PhotoTopStrip .PhotoTopStripRow .authorinfoRow .Verified {
       display: flex;
       align-items: center;
       opacity: 1;
       color: #fff;
       font-size: 14px;
       font-weight: 400;
       line-height: 20px;
       margin-left: 14px;
       background-image: url(/assets/health-images/images/Verified.png);
       background-repeat: no-repeat;
       background-position: left center;
       padding-left: 31px;
       display: none;
    }
    
     .PhotoTopStrip .PhotoTopStripRow .authorinfoRow .Verified img {
       display: block;
       min-width: 34px;
       min-height: 34px;
    }
     .PhotoTopStrip .PhotoTopStripRow .authorinfoRow > span {
       color: #fff;
       font-size: 14px;
       font-weight: 400;
       padding-left: 10px;
       font-size: 12px;
    }
    
     .PhotoTopStrip .PhotoTopStripRow ul {
       display: flex;
       align-items: center;
       list-style-type: none;
       justify-content: center;
       border-top: 1px #e1e4e9 solid;
       padding-top: 12px;
       margin-top: 12px;
    }
   
     .PhotoTopStrip .PhotoTopStripRow ul li {
       padding-left: 16px;
    }
     .PhotoTopStrip .PhotoTopStripRow ul li a img {
       display: block;
    }
     .tnn__share-icon-g {
       display: flex;
    }
     .tnn__share-icon-g a {
       display: block;
       margin: 0 4px;
    }
     .tnn__share-icon-g a svg {
       width: 30px;
       height: 30px;
    }
    .shareIcon div {
     display: flex;
     justify-content: center;
     border-top: 1px #E1E4E9 solid;
     padding-top: 12px;
     margin-top: 2px;
     align-items: center;
     list-style-type: none;
   }
   
     .shareIcon a svg {
     width: 40px;
     height: 40px;
     display: block;
   }
   
   .shareIcon a {
     width: 40px;
         margin: 0 6px;
   }
   
   .shareIcon {
     width: 100%;
   }
   `}
    </style>
        </div>
    )
}