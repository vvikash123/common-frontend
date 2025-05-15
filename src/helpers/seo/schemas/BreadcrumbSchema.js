import Head from 'next/head';

const BreadCrumbSchema = ({ data }) => {
  const jsonListItem = data && data.map((list, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: index < 2 ? {
      '@type': 'Thing',
      '@id': list?.link?.replace('/amp', ''),
      name: list?.label?.split('/')[0],
    } :
    {
      '@type': 'Thing',
      name: list?.label?.split('/')[0],
    },
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: jsonListItem,
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};

export default BreadCrumbSchema;
