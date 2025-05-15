import React from 'react';
class ViewActionSchema extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const ViewAction = {
      '@context': 'https://schema.org',
      '@type': 'ViewAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: process.env.NEXT_PUBLIC_WEBAPP_BASE_URL,
      },
    };
    return (
        <script type="application/ld+json">
          {`${JSON.stringify(ViewAction)}`}
        </script>
    );
  }
}

export default ViewActionSchema;
