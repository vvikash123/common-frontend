import React from 'react';
import _get from 'lodash.get';
import { getSEOFriendlyDate, getSEOFriendlyEndDate } from 'utils/dateUtils';
import {
  getImageUrl,
  removeHtmlTags,
  getTargetURL,
  getSlug,
  getNewImageUrl,
} from 'utils/common';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { TNN_SHOPPING_MSID } from '../../../constants';

class LiveBlogPosting extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, pathname, source } = this.props;
    const { LOGO_MSID = TNN_SHOPPING_MSID } = {};
    const isAmpPage =
      pathname &&
      (pathname.indexOf('/amp') >= 0 || pathname.indexOf('amp_') >= 0);

    let imgaeUrl = '';
    let imgaeAMPUrl = '';
    let publishDate = '';
    let updatedDate = '';
    let seoUpdateDate = '';
    let endDate = '';
    let coverageEndTime = '';

    if (data && data.msid) {
      imgaeAMPUrl = imgaeUrl = getNewImageUrl({
        msid: data?.leadImage?.msid ? data?.leadImage?.msid : data?.msid,
        imgSize: data.thumbsize,
        imgWidth: 1280,
        imgHeight: 720,
        // updatedAt: data?.updatedate,
      });
    }

    if (data && data.insertdate) {
      publishDate = getSEOFriendlyDate(data.insertdate);
      endDate = getSEOFriendlyEndDate(data.insertdate);
    }
    if (data && data.updatedate) {
      updatedDate = getSEOFriendlyDate(data.updatedate);
      coverageEndTime = getSEOFriendlyEndDate(data.updatedate);
    }
    if (
      data &&
      data.children &&
      data.children.length > 0 &&
      data.children[0] &&
      data.children[0].updatedate
    ) {
      seoUpdateDate = getSEOFriendlyDate(data.children[0].updatedate);
    }
    const image = {
      '@type': 'ImageObject',
      url: imgaeUrl,
      height: 720,
      width: 1280,
    };

    const imageAmp = {
      '@type': 'ImageObject',
      url: imgaeAMPUrl,
      height: 720,
      width: 1280,
    };

    const logo = {
      '@type': 'ImageObject',
      url: `${process.env.NEXT_PUBLIC_PHOTO_API}/photo/msid-${LOGO_MSID}/${LOGO_MSID}.jpg`,
      width: 600,
      height: 60,
    };

    const pub = {
      '@type': 'Organization',
      name: 'Unilist',
      logo,
    };

    let authors = data.authors ?? '';
    let authorName = authors ? `${authors[0].name}` : '';

    if (data?.metainfo?.ImageCreditAuthor?.value) {
      authorName = data?.metainfo?.ImageCreditAuthor?.value;
    }
    let authorUrl =
      authors && authors[0] && authors[0].seoname
        ? `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}/author/${authors[0].seoname}-${authors[0].id}`
        : process.env.NEXT_PUBLIC_WEBAPP_BASE_URL;

    if (data?.metainfo?.ImageCreditAuthoHomeUrl?.value) {
      authorUrl = data?.metainfo?.ImageCreditAuthoHomeUrl?.value;
    }
    const author = authorName
      ? {
          '@type': 'Person',
          name: authorName,
          Sameas: authorUrl,
        }
      : undefined;
    let headline = '';
    let url = process.env.NEXT_PUBLIC_WEBAPP_BASE_URL + pathname;
    if (data && data.title) {
      headline = data.title.replace(/["]/gi, '');
    }
    let des =
      data && data.metainfo.Altdescription && data.metainfo.Altdescription.value
        ? removeHtmlTags(data.metainfo.Altdescription.value)
        : removeHtmlTags(data.synopsis);
    let type = data && data.cmstype === 'LIVEBLOG' && 'LiveBlogPosting';
    let blogObj = {};
    let liveBlogDataArr = data.children.filter(
      (item) =>
        item.cmstype === 'MEDIAVIDEO' ||
        item.cmstype === 'TEXTSNIPPET' ||
        item.cmstype === 'IMAGES' ||
        item.cmstype === 'SLIDE' ||
        item.cmstype === 'QUOTES' ||
        item.cmstype === 'SCORECARD' ||
        item.cmstype === 'POLL',
    );
    let liveBlogUpdate = liveBlogDataArr.map((item, index) => {
      item.title?.replace(/["]/gi, '');
      if (item.cmstype === 'TEXTSNIPPET') {
        blogObj = {
          '@type': 'BlogPosting',
          headline: item.title?.replace(/["]/gi, ''),
          articleBody: item.synopsis,
          mainEntityOfPage: url,
          url: `${url}#sb_${item?.msid}`,
          datePublished:
            item?.insertdate && getSEOFriendlyDate(item?.insertdate),
          dateModified:
            item?.updatedate && getSEOFriendlyDate(item?.updatedate),
          author: author,
          image: isAmpPage ? imageAmp : image,
          publisher: pub,
        };
      } else if (item.cmstype === 'MEDIAVIDEO') {
        blogObj = {
          '@type': 'BlogPosting',
          headline: item.title?.replace(/["]/gi, ''),
          articleBody: item.synopsis,
          mainEntityOfPage: url,
          url: `${url}#sb_${item?.msid}`,
          datePublished:
            item?.insertdate && getSEOFriendlyDate(item?.insertdate),
          dateModified:
            item?.updatedate && getSEOFriendlyDate(item?.updatedate),
          author: author,
          video: {
            '@type': 'VideoObject',
            thumbnailUrl: `${process.env.NEXT_PUBLIC_PHOTO_API}/thumb/resizemode-4,msid-${item.msid},width-360/${item.msid}.jpg`,
            description: item.synopsis,
            uploadDate: item.updatedate && getSEOFriendlyDate(item.updatedate),
            name: item.title,
            contentUrl: url,
          },
          image: isAmpPage ? imageAmp : image,
          publisher: pub,
        };
      } else if (item.cmstype === 'IMAGES') {
        blogObj = {
          '@type': 'BlogPosting',
          headline: item.title?.replace(/["]/gi, ''),
          articleBody: item.synopsis,
          mainEntityOfPage: url,
          url: `${url}#sb_${item?.msid}`,
          datePublished:
            item?.insertdate && getSEOFriendlyDate(item?.insertdate),
          dateModified:
            item?.updatedate && getSEOFriendlyDate(item?.updatedate),
          author: author,
          image: {
            '@type': 'ImageObject',
            url: `${process.env.NEXT_PUBLIC_PHOTO_API}/thumb/resizemode-4,msid-${item.msid},width-360/${item.msid}.jpg`,
            height: 720,
            width: 1280,
          },
          publisher: pub,
        };
      } else {
        blogObj = {
          '@type': 'BlogPosting',
          headline: item.title?.replace(/["]/gi, '').substr(0, 110),
          articleBody: item.cmstype !== 'SLIDE' ? item.synopsis : '',
          mainEntityOfPage: url,
          url: `${url}#sb_${item?.msid}`,
          datePublished:
            item?.insertdate && getSEOFriendlyDate(item?.insertdate),
          dateModified:
            item?.updatedate && getSEOFriendlyDate(item?.updatedate),
          author: author,
          image: isAmpPage ? imageAmp : image,
          publisher: pub,
        };
      }
      return blogObj;
    });
    let address = {
      '@type': 'PostalAddress',
      name: 'India',
    };
    let location = {
      '@type': 'Place',
      name: 'Noida',
      address: address,
    };
    let liveBlogstatus = '';
    let isUpdated =
      Number(data?.updatedate) > new Date().getTime() - 24 * 60 * 60 * 1000
        ? true
        : false;

    if (data && data?.status) {
      if (
        data?.status == 'INACTIVE' ||
        data?.status == 'CLOSED' ||
        !isUpdated
      ) {
        liveBlogstatus = 'Over';
      }
      if (data?.status == 'ACTIVE' && isUpdated) {
        liveBlogstatus = 'Live';
      }
    }
    let about = {
      '@type': 'Event',
      startDate: publishDate,
      endDate: endDate,
      name: removeHtmlTags(headline),
      description: des,
      eventAttendanceMode: 'Mixed',
      eventStatus: liveBlogstatus,
      image: imgaeUrl,
      location: location,
    };
    const schema = {
      '@context': 'https://schema.org',
      '@type': type,
      '@id': `${url}#`,
      url: url,
      coverageStartTime: publishDate,
      coverageEndTime: endDate,
      datePublished: publishDate,
      dateModified: updatedDate,
      headline: headline,
      description: des,
      about: about,
      publisher: pub,
      author: author,
      image: isAmpPage ? imageAmp : image,
      liveBlogUpdate: liveBlogUpdate,
    };
    return (
      <Helmet
        onChangeClientState={(newState, addedTags, removedTags) =>
          console.log('LiveBlogPosting >> ', newState, addedTags, removedTags)
        }
      >
        <script data-id={source} type="application/ld+json">
          {`${JSON.stringify(schema)}`}
        </script>
      </Helmet>
    );
  }
}
LiveBlogPosting.propTypes = {
  data: PropTypes.shape({}),
};
LiveBlogPosting.defaultProps = {
  data: {},
};

export default LiveBlogPosting;
