import Head from 'next/head';

const PersonSchema = ({ data }) => {
  const Person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data[0]?.name || '',
  };

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(Person)}
      </script>
    </Head>
  );
};

export default PersonSchema;
