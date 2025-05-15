import Head from 'next/head';
import { getTargetURL, getSlug } from '@/utils/common';
import { overRideLink } from '@/constants/index';

const ItemSchema = ({ data=[] }) => {

  const webstorieslink = (item) => {
    return !item?.seopath?.includes('amp_stories/') && item.cmstype === 'IMAGES'
      ? item?.msid || item?.parentid
      : item.msid;
  };

  const listOfRoutes = data && data.length > 0 ? data : [];
  const jsonListItem = [];
  let url = '';

  listOfRoutes.forEach((list, index) => {
    url = getTargetURL({
      ...(list?.overridelink && {
        overrideString: overRideLink(list.overridelink),
      }),
      seoPath: list?.seopath,
      msid: webstorieslink(list),
      storyType: list?.cmstype || '',
      normalString: `/${list?.seopath && list?.seopath}-${getSlug(list.cmstype)}-${webstorieslink(list)}`,
    });
    if (!url?.includes(process.env.NEXT_PUBLIC_WEBAPP_BASE_URL)) {
      url = process.env.NEXT_PUBLIC_WEBAPP_BASE_URL + url;
    }

    const listItem = {
      '@type': 'ListItem',
      position: index + 1,
      url,
      name: list.title,
    };
    jsonListItem.push(listItem);
  });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: jsonListItem,
  };

  return (
    <Head>
      <script type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};

export default ItemSchema;
