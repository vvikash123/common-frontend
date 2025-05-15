import Head from 'next/head';
import { removeHtmlTags } from '@/utils/common';

const FaqSchema = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) return null; //Prevents invalid schema
  const jsonListItem = data?.map((item) => ({
    '@type': 'Question',
    name: removeHtmlTags(item?.name || item?.question),
    acceptedAnswer: {
      '@type': 'Answer',
      text: removeHtmlTags(item?.acceptedAnswer?.text || item?.answer),
    },
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: jsonListItem,
  };
  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </Head>
  );
};

export default FaqSchema;

