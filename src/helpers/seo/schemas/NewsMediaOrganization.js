import { SOCIAL_FOLLOW_US_LINK } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

class NewsMediaOrganizaltion extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const NewsMediaOrganizaltionData = {
      '@context': 'https://schema.org',
      '@type': 'NewsMediaOrganization',
      name: 'Unilist',
      url: process.env.NEXT_PUBLIC_WEBAPP_BASE_URL,
      sameAs: [
        "https://www.facebook.com/unilist.in",
        "https://x.com/UnilistIn",
        "https://www.instagram.com/unilist.in",
      ],

      logo: {
        '@type': 'ImageObject',
        url: 'https://static.tnn.in/photo/msid-108009580/108009580.jpg',
        width: 600,
        height: 60,
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '',
        addressLocality: '',
        addressRegion: 'India',
        postalCode: 201301,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '',
        contactType: 'Customer Service',
        areaServed: 'IN',
        availableLanguage: 'English',
      },
      //   hoursAvailable: {
      //     '@type': 'OpeningHoursSpecification',
      //     opens: '09:00',
      //     closes: '18:00',
      //   },
    };
    return (
      <Helmet>
        <script type="application/ld+json">
          {`${JSON.stringify(NewsMediaOrganizaltionData)}`}
        </script>
      </Helmet>
    );
  }
}
NewsMediaOrganizaltion.propTypes = {
  data: PropTypes.shape({}),
};
NewsMediaOrganizaltion.defaultProps = {
  data: {},
};

export default NewsMediaOrganizaltion;
