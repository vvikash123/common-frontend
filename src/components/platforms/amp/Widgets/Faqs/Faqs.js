import React from 'react';
import s from './Faqs.module.scss'; // Import SCSS module
import FaqSchema from '@/helpers/seo/schemas/FaqSchema';

const Faqs = ({ data }) => {
  // Parse data from string to object if necessary
  let parsedData = [];
  try {
    if (typeof data === 'string') {
      parsedData = JSON.parse(data);
    } else if (Array.isArray(data) && data.length > 0) {
      parsedData = JSON.parse(data[0]);
    } else {
      parsedData = data;
    }
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }

  const faqs = parsedData?.mainEntity || [];

  return (
    <>
      {/* Add structured data for SEO */}
      <FaqSchema data={faqs} />

      <div className="Faqs">
        <h2 className="Heading">
          <img
            src="https://static.tnn.in/photo/113701330.cms"
            alt="Frequently asked questions"
          />
          Frequently asked questions
        </h2>

        {/* Use AMP Accordion for FAQs */}
        {faqs?.length > 0 && (
          <amp-accordion>
            {faqs.map((faq, index) => (
              <section key={index} expanded={index === 0 ? '' : undefined}>
                <h3>{faq?.name}</h3>
                <p>{faq?.acceptedAnswer?.text}</p>
              </section>
            ))}
          </amp-accordion>
        )}
      </div>

      <style jsx>
        {`
        .Faqs {
    padding: 15px;
    width: 100%;
    background: #f8f8f8;
  margin: auto;
        }
         .Faqs h3{
  font-weight: bold;
  cursor: pointer;
  background-image: url("https://static.tnn.in/photo/113702904.cms");
  background-repeat: no-repeat;
  background-position: 98%;
  display: block;
  background-size: 22px;
  padding-right: 30px;
    background-size: 20px;
    padding: 14px;
    padding-right: 30px;
    box-shadow: 0px 17px 19px rgba(0, 0, 0, 0.0509803922);
    width: 100%;
    background-color: #FFFFFF;
    border: 0;
    font-size: 15px;
}

.Faqs section[expanded] h3 {
  background-image: url("https://static.tnn.in/photo/115683760.cms");
  display: none;
}

.Faqs p{
letter-spacing: 0;
    color: #000;
    font-size: 14px;
    line-height: 24px;
    box-shadow: 0px 17px 25px rgba(0, 0, 0, 0.1);
    background: #fff;
    padding: 0px 12px 12px;
}
  .Faqs section{
      margin-bottom: 12px;
  }
        `}
      </style>

    </>
  );
};

export default Faqs;
