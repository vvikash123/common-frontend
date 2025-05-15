import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSEOFriendlyDate } from '@/utils/dateUtils';
import { getNewImageUrl, removeHtmlTags } from '@/utils/common';
import { TNN_HEALTH_MSID, overRideLink } from '../../../constants/index';

const ImageGallerySchema = ({ data }) => {
  const router = useRouter();
  const { pathname , asPath } = router;

  const imageCaption = data?.cmsassoc?.some(i => i.cmstype === 'IMAGES') 
    ? data.cmsassoc.find(i => i.cmstype === 'IMAGES')?.title || '' 
    : '';

  const isAmpPage = pathname?.includes('/amp') || pathname?.includes('amp_');

  const imageUrl = data?.msid ? getNewImageUrl(data.msid, data.thumbsize, 1280, 720) : '';
  const imageAmpUrl = imageUrl;

  const updatedDate = data?.metainfo?.LastPublishMilliTime?.value 
    ? getSEOFriendlyDate(data.metainfo.LastPublishMilliTime.value) 
    : '';

  const image = {
    '@type': 'ImageObject',
    url: imageUrl,
    height: 720,
    width: 1280,
    caption: imageCaption,
  };

  const imageAmp = {
    '@type': 'ImageObject',
    url: imageAmpUrl,
    height: 720,
    width: 1280,
  };

  const logo = {
    '@type': 'ImageObject',
    url: `${process.env.NEXT_PUBLIC_PHOTO_API}/photo/msid-${TNN_HEALTH_MSID}/${TNN_HEALTH_MSID}.jpg`,
    width: 600,
    height: 60,
  };

  const pub = {
    '@type': 'Organization',
    name: 'Unilist',
    logo,
  };

  const authors = data?.authors || [];
  const authorName = authors[0]?.name || 'Unilist';
  const authorUrl = authors[0]?.seoname 
    ? `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}/author/${authors[0].seoname}-${authors[0].id}` 
    : process.env.NEXT_PUBLIC_WEBAPP_BASE_URL;

  const byline = data?.Byline || {};
  let author = Object.keys(byline).flatMap(key =>
    byline[key].map(elem => ({
      '@type': 'Person',
      name: elem.name,
    }))
  );

  if (!author.length) {
    author = [{
      '@type': 'Person',
      name: authorName,
    }];
  }

  author = [...new Map(author.map(item => [item.url, item])).values()];

  const headline = data?.title?.replace(/["]/gi, '').substr(0, 110) || '';
  const des = data?.synopsis ? removeHtmlTags(data.synopsis) : '';
  const articleBody = data?.text ? removeHtmlTags(data.text) : '';
  // const url = data?.overridelink 
  //   ? overRideLink(data.overridelink) 
  //   : `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_WEBAPP_BASE_URL}${pathname}`;
    let url;

    const mainEntity = (url =
      data && data?.overridelink
        ? `${overRideLink(data?.overridelink)}`
        : process.env.NEXT_PUBLIC_WEBAPP_BASE_URL + asPath);
  const keywords = (data?.keywords || []).reduce((result, item) => `${result}${item.name},`, '');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    mainEntityOfPage: mainEntity,
    url,
    articleBody,
    datePublished: updatedDate,
    dateModified: updatedDate,
    headline,
    name: headline,
    keywords,
    description: des,
    image: isAmpPage ? imageAmp : image,
    author,
    publisher: pub,
  };

  return (
    <Head>
      <script type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};

export default ImageGallerySchema;
