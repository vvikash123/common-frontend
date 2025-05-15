import { overRideLink } from 'constants';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import {
  getNewImageUrl,
  getSlug,
  getTargetURL,
  removeHtmlTags,
} from 'utils/common';

class ImageObjectSchema extends React.Component {
  constructor(props) {
    super(props);
  }
  webstorieslink = (item) => {
    return !item?.seopath?.includes('amp_stories/')
      ? item?.cmstype != 'IMAGES'
        ? item?.msid
        : item?.parentid
      : item.parentid;
  };

  render() {
    const { data } = this.props;
    const listOfRoutes = data && data.length > 0 ? data : [];
    const jsonListItem = [];
    let url = '';
    listOfRoutes.forEach((list, index) => {
      url = getTargetURL({
        ...(list?.overridelink && {
          overrideString: overRideLink(list.overridelink),
        }),
        seoPath: list?.seopath,
        msid: this.webstorieslink(list && list),
        storyType: list?.cmstype || '',
        normalString: `/${list.seopath && list.seopath}/${getSlug(
          list.cmstype,
        )}/${this.webstorieslink(list && list)}`,
      });

      if (!url?.includes(process.env.PRODUCTION_DOMAIN)) {
        url = process.env.NEXT_PUBLIC_WEBAPP_BASE_URL + url;
      }

      const listItem = {
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        caption: list.title,
        description: removeHtmlTags(list?.synopsis),
        contentUrl: url,
        thumbnailUrl: ` https://static.tnnbt.in/photo/msid-${list?.msid}/${list?.msid}.jpg`,
        height: 700,
        width: 528,
      };
      jsonListItem.push(listItem);
    });

    return (
      <Helmet>
        <script type="application/ld+json">
          {`${JSON.stringify(jsonListItem)}`}
        </script>
      </Helmet>
    );
  }
}
ImageObjectSchema.propTypes = {
  data: PropTypes.array,
};
ImageObjectSchema.defaultProps = {
  data: [],
};

export default ImageObjectSchema;
