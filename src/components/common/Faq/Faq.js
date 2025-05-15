import React, { useState } from 'react';
import styles from "./Faq.module.scss";
import SpriteIcon from '../Svg/SpriteIcon';


const Faq = ({faqs}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.OverViewAccordion}>
      {faqs.map((item, index) => (
        <div key={index} className={`${styles.Row} ${activeIndex === index ? styles.active : ''}`}>
          <span onClick={() => toggleAccordion(index)}>
             <div  dangerouslySetInnerHTML={{ __html: item.label }}></div> <SpriteIcon IconName="menuDownArrow" />
          </span>
          {activeIndex === index && <p dangerouslySetInnerHTML={{ __html: item.text }}></p>}
        </div>
      ))}
    </div>
  );
};

export default Faq;

