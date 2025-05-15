import React from 'react'
import styles from "@/styles/widgets/widgetB.module.scss";


const Widget2 = ({ id }) => {
    return (
        <div className={styles.news_card}>
          <a href='#'>
          <h3>Alia Bhatt: Behind Every Uniform Is A Mother Who Hasn't Slept</h3>
          <div className={styles.cardImg}>
              <img src='https://images.timesnownews.com/thumb/msid-151621025,thumbsize-27268,width-135,height-76,false/151621025.jpg' alt=''/>
          </div>
          </a>
        </div>
      );
    };

export default Widget2