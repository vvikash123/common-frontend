import React, { useState } from 'react';
import s from './Faqs.module.scss'; // Import SCSS module

const CollegeFaq = ({ data = [], ads }) => {
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(0); // Default to no expanded FAQ

  // Toggle FAQ item
  const toggleFaq = (index) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  return (
    <section className={s['Faqs']}>
      {data?.length ? (
        <>
          <h2 className={s['Heading']}>
            <img 
              src="https://static.tnn.in/photo/113701330.cms" 
              alt="Frequently asked questions banner" 
            />
            Frequently Asked Questions
          </h2>

          {data?.map((faq, index) => (
            <article
              key={faq.id || index} // Use a unique key if available
              className={`${s['FaqsRow']} ${expandedFaqIndex === index ? s['expanded'] : ''}`}
            >
              <h3
                className={`${s['FaqsHeading']} ${
                  expandedFaqIndex === index ? s['active'] : ''
                }`}
                onClick={() => toggleFaq(index)}
              >
                {faq?.question}
              </h3>
              {expandedFaqIndex === index && (
                <div
                  className={s['FaqsIntro']}
                  dangerouslySetInnerHTML={{ __html: faq?.answer }}
                ></div>
              )}
            </article>
          ))}
        </>
      ) : (
       null // Fallback message when no FAQs are provided
      )}
    </section>
  );
};

export default CollegeFaq;
