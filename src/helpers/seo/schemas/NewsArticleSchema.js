  import React from 'react';
  import { getSEOFriendlyDate } from '@/utils/dateUtils';
  import { getBaseUrlNew, getNewImageUrl, removeHtmlTags } from '@/utils/common';
  import Head from 'next/head';

  import {
    TNN_SHOPPING_MSID,
    overRideLink,
    DefaultLang,
  } from '@/constants/index';

  class NewsSchema extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const { data, pathname } = this.props;
      let imageCaption = '';

      if (data) {
        const caption =
          data?.cmsassoc &&
          data.cmsassoc.length &&
          data.cmsassoc.some((i) => i.cmstype == 'IMAGES') &&
          Object.values(data.cmsassoc)
            ? data.cmsassoc.filter((i) => i.cmstype == 'IMAGES')
            : [];

        imageCaption = caption[0]?.title || '';
      }

      const isAmpPage =
        pathname &&
        (pathname.indexOf('/amp') >= 0 || pathname.indexOf('amp_') >= 0);

      let imgaeUrl = '';
      let imgaeAMPUrl = '';
      let publishDate = '';
      let updatedDate = '';

      if (data && data.msid) {
        imgaeAMPUrl = imgaeUrl = getNewImageUrl({
          msid: data?.leadImage?.msid ? data?.leadImage?.msid : data?.msid,
          imgSize: data?.leadImage?.thumbsize
            ? data?.leadImage?.thumbsize
            : data?.thumbsize,
          imgWidth: 1280,
          imgHeight: 720,
        });
      }

      if (data && data.insertdate) {
        publishDate = getSEOFriendlyDate(data.insertdate);
      }

      if (data && data.updatedate) {
        updatedDate = getSEOFriendlyDate(data?.updatedate);
      }
      const image = {
        '@type': 'ImageObject',
        url: imgaeUrl,
        height: 720,
        width: 1280,
        caption: imageCaption,
      };

      const imageAmp = {
        '@type': 'ImageObject',
        url: imgaeAMPUrl,
        height: 720,
        width: 1280,
      };
      const logo = {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_PHOTO_API}/photo/msid-${TNN_SHOPPING_MSID}/${TNN_SHOPPING_MSID}.jpg`,
        width: 600,
        height: 60,
      };
      const sameAs = [
        "https://www.facebook.com/unilist.in",
        "https://x.com/UnilistIn",
        "https://www.instagram.com/unilist.in",
      ];

      const pub = {
        '@type': 'Organization',
        name: 'Unilist',
        url: process.env.NEXT_PUBLIC_WEBAPP_BASE_URL,
        ethicsPolicy: `${getBaseUrlNew()}/info/privacy-policy`,
        sameAs: sameAs,
        logo,
      };

      const authors = data?.authors;
      let authorName =
        authors && authors[0] && authors[0]?.name
          ? `${authors[0]?.name}`
          : 'Unilist';
      let authorUrl =
        authors && authors[0] && authors[0]?.seoname
          ? `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}/author/${authors[0].seoname}-${authors[0].id}`
          : process.env.NEXT_PUBLIC_WEBAPP_BASE_URL;

      if (data?.cmstype == 'LIVEBLOG') {
        authorName = data?.metainfo?.ImageCreditAuthor?.value
          ? data?.metainfo?.ImageCreditAuthor?.value
          : authorName;
        authorUrl = data?.metainfo?.ImageCreditAuthoHomeUrl?.value
          ? data?.metainfo?.ImageCreditAuthoHomeUrl?.value
          : authorUrl;
      }

      const byline = data?.Byline;
      let author = [];
      const authorArr = [];
      byline &&
      Object.keys(byline) &&
      Object.keys(byline)[0] &&
      byline[Object.keys(byline)[0]] &&
      byline[Object.keys(byline)[0]][0]
        ? Object.keys(byline).map((currElem, indx) => {
            byline[Object.keys(byline)[indx]].map((elem) => {
              if (!authorArr.includes(elem.id)) {
                authorArr.push(elem.id);
                const listItem = {
                  '@type': 'Person',
                  name: elem.name,
                  // url: `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}/author/${elem.seoname}-${elem.id}`,
                };
                author.push(listItem);
              }
            });
          })
        : (author = authorName
            ? [
                {
                  '@type': 'Person',
                  name: authorName,
                  url: authorUrl,
                },
              ]
            : undefined);
      let headline = '';
      if (data && data.title) {
        headline = data.title.replace(/["]/gi, '').substr(0, 110);
      }
      let des = data && data.synopsis ? removeHtmlTags(data.synopsis) : '';
      const type = 'NewsArticle';
      let articleBody = data && data.text ? removeHtmlTags(data.text) : '';
      if (data?.cmstype == 'LIVEBLOG') {
        des =
          data &&
          data?.metainfo?.Altdescription &&
          data?.metainfo?.Altdescription?.value
            ? removeHtmlTags(data.metainfo.Altdescription.value)
            : removeHtmlTags(data.synopsis);
        des = data?.metainfo?.Prefix?.value
          ? removeHtmlTags(data?.metainfo?.Prefix?.value)
          : des;
        articleBody =
          data && data?.synopsis ? removeHtmlTags(data?.synopsis) : des;
      }
      let url;
      let mainEntity = (url =
        data && data?.overridelink
          ? `${overRideLink(data?.overridelink)}`
          : pathname);
      const keywords =
        data && data.keywords && data.keywords.length > 0 ? data.keywords : [];
      const jsonListKeywords = keywords.reduce((result, item) => {
        return `${result}${item.name},`;
      }, '');
      if (!mainEntity?.includes(process.env.NEXT_PUBLIC_WEBAPP_BASE_URL)) {
        mainEntity = process.env.NEXT_PUBLIC_WEBAPP_BASE_URL + mainEntity;
      }
      const schema = {
        '@context': 'https://schema.org',
        '@type': type,
        mainEntityOfPage: mainEntity,
        url,
        articleBody,
        datePublished: publishDate,
        dateModified: updatedDate,
        articleSection: data?.parenttitle,
        inLanguage: DefaultLang,
        headline,
        name: headline,
        keywords: jsonListKeywords,
        description: des,
        thumbnailUrl: imgaeUrl,
        image: isAmpPage ? imageAmp : image,
        // author,
        publisher: pub,
      };
      return (
        <Head>
           <script type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
        </Head>
      );
    }
  }

export default NewsSchema;
