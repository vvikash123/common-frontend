import Head from 'next/head';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { getAssetPath, getNewImageUrl } from '@/utils/common';
import { getSEOFriendlyDate } from '@/utils/dateUtils';
import { LIVE_CHANNEL_ID, TNN_HINDI_MSID, overRideLink } from '@/constants/index';
import { useRouter } from 'next/router';

dayjs.extend(duration);

const VideoSchema = ({ data, path }) => {
  const router = useRouter();
  const {asPath } = router;
  const isAmpPage = !!(path && (path.indexOf('/amp') >= 0 || path.indexOf('amp_') >= 0));
  let imageUrl = '';
  let imageAMPUrl = '';
  let publishDate = '';
  let updatedDate = '';
  const defaultDate = dayjs(new Date()).format('yyyy-MM-ddTHH:mm:ss+05:30');

  if (data && data?.msid) {
    const leadImageMsid = data?.leadImage?.msid || data?.msid;
    const leadImageThumbsize = data?.leadImage?.thumbsize || data?.thumbsize;
    imageUrl = imageAMPUrl = getNewImageUrl({ msid: leadImageMsid, imgSize: leadImageThumbsize, imgWidth: 1280, imgHeight: 720 });
  }

  if (data?.title === 'Unilist') {
    imageUrl = getAssetPath(data?.title);
    imageAMPUrl = getAssetPath(data?.title);
    publishDate = defaultDate;
  }

  if (data && data?.insertdate) {
    publishDate = getSEOFriendlyDate(data?.insertdate);
  }

  if (data && data?.updatedate) {
    updatedDate = getSEOFriendlyDate(data?.updatedate);
  }

  const logo = {
    '@type': 'ImageObject',
    url: `${process.env.NEXT_PUBLIC_PHOTO_API}/photo/msid-${TNN_HINDI_MSID}/${TNN_HINDI_MSID}.jpg`,
    width: 600,
    height: 60,
  };

  const pub = {
    '@type': 'Organization',
    name: 'Unilist',
    logo,
  };

  const image = {
    '@type': 'ImageObject',
    url: imageUrl,
    height: 720,
    width: 1280,
  };

  const imageAmp = {
    '@type': 'ImageObject',
    url: imageAMPUrl,
    height: 720,
    width: 1280,
  };

  const slikeApiKey = process.env.SLIKE_API_KEY_MWEB;
  let videoID = '';
  if (data?.cmsassoc?.length && data?.cmsassoc[0].cmstype === 'MEDIAVIDEO') {
    videoID = data?.cmsassoc[0]?.media?.id;
  } else {
    videoID = data?.media?.id || LIVE_CHANNEL_ID;
  }

  // const contentUrl = `https://tvid.in/sdk/stg/embed/plugin.html#apikey=${slikeApiKey}&videoid=${videoID}&env=stg&v=3.5.10&playlist=true&skipad=true`;
  const lastIndex = data?.seopath?.lastIndexOf('/');
  const slikeTitle = data?.seopath?.substring(lastIndex + 1);
  const embedUrl = `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}/embedvideo/${data?.msid ? `${data?.msid}/` : '/'}${data?.media?.id}`;

  const mainEntity = data?.overridelink ? `${overRideLink(data?.overridelink)}` : `${path}`;
  const keywords = data?.keywords?.length > 0 ? data?.keywords : [];
  const jsonListKeywords = keywords.reduce((result, item) => `${result}${item.name},`, '');

  let time = '';
  let convert_time, hours, minutes, seconds;
  const durationMs = data?.cmsassoc?.[0]?.media?.durationms || data?.media?.durationms;

  if (durationMs) {
    convert_time = dayjs.duration(durationMs, 'milliseconds');
    hours = convert_time.hours() ? Math.floor(convert_time.hours()) : '';
    minutes = convert_time.minutes() ? Math.floor(convert_time.minutes()) : '0';
    seconds = convert_time.seconds() ? Math.floor(convert_time.seconds()) : '0';

    time = `PT${hours && hours < 10 ? '0' + hours + 'H' : hours >= 10 ? hours + 'H' : ''}${minutes && minutes < 10 ? '0' + minutes + 'M' : minutes >= 10 ? minutes + 'M' : ''}${seconds && seconds < 10 ? '0' + seconds + 'S' : seconds + 'S'}`;
  }
const mainPath=`${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}/${asPath}`
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    mainEntityOfPage: mainPath,
    url: mainPath,
    name: data?.title,
    ContentUrl: mainPath,
    embedUrl,
    description: data?.synopsis || data?.title,
    datePublished: publishDate,
    dateModified: updatedDate,
    thumbnailUrl: isAmpPage ? imageAMPUrl : imageUrl,
    uploadDate: updatedDate,
    keywords: jsonListKeywords,
    headline: data?.title,
    duration: time,
    thumbnail: isAmpPage ? imageAmp : image,
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


export default VideoSchema;
