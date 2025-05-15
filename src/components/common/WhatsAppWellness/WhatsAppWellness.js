import React from 'react';
import style from './WhatsAppWellness.module.scss';
import ContainerBox from '@/components/common/ContainerBox/ContainerBox';

const  WhatsAppWellness = (props) => {

    const { } = props;

  return (
    <ContainerBox>
    <div className={style['WhatsAppWellness']}>
     <div className={style['Left']}>
      <p>WHATSAPP WELLNESS</p>
      <h3>Stay up-to-date on your <strong>favourite health topics for free!</strong></h3>
      <span>Get updates directly on your </span>    
      <a
            className={style['back-link']}
            href={'https://whatsapp.com/channel/0029Vak4z773gvWYKcNqZh3t'}
            target="_blank"
            rel="noopener noreferrer"
          >
            GET STARTED
          </a>
     </div>
     <div className={style['Right']}>
     <span> <img src="assets/health-images/images/WhatsAppimg.png" alt="whatsapp- wellness" /><strong>1229</strong> people got benefited from <strong>WhatsApp Wellness</strong></span>
     {/* <img src="assets/health-images/images/WhatsAppWellness.png" /> */}
     </div>
    </div>
    </ContainerBox>
  );
};

export default WhatsAppWellness
