import React from 'react';
import style from './QuotesWidget.module.scss';
import { QuoteIcon } from '@/components/platforms/amp/Widgets/Svg/Svg';

const QuotesWidget = (props) => {
  const { data = {} } = props;
 
    let auname = data['auname'] ? `- ${data['auname']}` : '';
 
    return (
      <>
        <div className={style['container']}>
          <section className={style['quote-section']}>
            <div className={`${style['quote-icon']} ${style['lt-tp']}`}>
              <QuoteIcon />
            </div>
            <div className={`${style['quote-text']}`}>
              <blockquote>{data['text'] || data['title']}</blockquote>
              <p className={style['author-name']}>{auname}</p>
            </div>
            <div className={`${style['quote-icon']} ${style['rt-bt']}`}>
              <QuoteIcon />
            </div>
          </section>
        </div>
      </>
    );
}

export default QuotesWidget; 
 
// class QuotesWidget extends React.Component {
//   constructor(props) {
//     super(props);
//   }
 
//   render() {
//     const { data = {} } = this.props;
 
//     let auname = data['auname'] ? `- ${data['auname']}` : '';
 
//     return (
//       <>
//         <div className={style['container']}>
//           <section className={style['quote-section']}>
//             <div className={`${style['quote-icon']} ${style['lt-tp']}`}>
//               <QuoteIcon />
//             </div>
//             <div className={`${style['quote-text']}`}>
//               <blockquote>{data['text'] || data['title']}</blockquote>
//               <p className={style['author-name']}>{auname}</p>
//             </div>
//             <div className={`${style['quote-icon']} ${style['rt-bt']}`}>
//               <QuoteIcon />
//             </div>
//           </section>
//         </div>
//       </>
//     );
//   }
// }
 
// export default QuotesWidget;
 