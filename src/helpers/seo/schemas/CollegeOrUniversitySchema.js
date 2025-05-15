import Head from "next/head";
const CollegeOrUniversitySchema = ({data}) => {
  const collegeSchema = {
    "@context" : "http://schema.org",
    "@type" : "CollegeOrUniversity",
    name  : data?.name || "",
    url  : data?.url || "",
    email  : data?.email || "",
    telephone  : data?.phone || "",
    address  : data?.collegeLocation?.address || "",
    logo  : ""
    }
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeSchema) }}
      />
    </Head>
  );
};

export default CollegeOrUniversitySchema;
