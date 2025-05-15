import React, { useState } from 'react';
import s from './Faqs.module.scss'; // Import SCSS module
import FaqSchema from '@/helpers/seo/schemas/FaqSchema';

const Faqs = ({ data, ads }) => {
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(0);
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

  // Toggle FAQ item
  const toggleFaq = (index) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };
  return (
    <>
      {/* Add structured data for SEO */}
      <FaqSchema data={faqs} />

      <div className={s['Faqs']}>
        <h2 className={s['Heading']}>
          <img src="https://static.tnn.in/photo/113701330.cms" alt="Frequently asked questions" />
          Frequently asked questions
        </h2>

        {faqs?.length > 0 &&
          faqs?.map((faq, index) => (
            <div
              key={index}
              className={s['FaqsRow']}
              onClick={() => toggleFaq(index)}
            >
              <h3
                className={`${s['FaqsHeading']} ${
                  expandedFaqIndex === index ? s['active'] : ''
                }`}
              >{faq?.name}</h3>
              {expandedFaqIndex === index && (
                <p className={s['FaqsIntro']}>{faq?.acceptedAnswer?.text}</p>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default Faqs;
