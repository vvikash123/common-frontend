import React from 'react';
import style from './FeaturedMonth.module.scss';
import ContainerBox from '@/components/common/ContainerBox/ContainerBox';
import TitleComponent from '@/components/common/TitleComponent/TitleComponent';
import WidgetCard from '@/components/common/WidgetCard/WidgetCard';
import { commonProperties } from '@/constants'; 
import CustomSlideBox from '@/components/common/CustomSlideBox/CustomSlideBox';
// import NewsLetter from '@/components/common/NewsLetter/NewsLetter';
import NewsletterWidget from '../NewsletterWidget/NewsletterWidget';


const FeaturedMonth = (props) => {

  const { marginBottom=60, componentData, data } = props;

  return ( data?.length > 0 && 
    <section className={style['FeaturedMonth']} style={{ marginBottom: `${marginBottom}px` }}>
      <ContainerBox>
        <div className={`${style['body-pannel']}`}>
          <TitleComponent
            titleType={'h2'}
            moreButtonLink={componentData?.data?.seopath ? componentData?.data?.seopath : ''}
            boldText={componentData?.data?.title && componentData?.data?.title.split(' ').length > 0 ? [componentData?.data?.title.split(' ')[0]] : ''}
            titleText={componentData?.data?.title ? componentData?.data?.title : ''}
          />

          <WidgetCard
            isConditionalRendering={true}
            cardSettingData={
              [
                { ...commonProperties, type: 'small', widgetCardType: 'listCard', widgetLayout: 'vertical', elementClass: 'small', lineClamp: 'inherit', marginBottom: 6, elementType: 'p' },
                { ...commonProperties, type: 'title', widgetCardType: 'leadCard', widgetLayout: 'vertical', elementClass: 'months-title', lineClamp: 3, marginBottom: 8, elementType: 'p' },
                { ...commonProperties, type: 'para', widgetCardType: 'leadCard', widgetLayout: 'vertical', elementClass: 'months-para', lineClamp: 2, marginBottom: 16, elementType: 'p' },
              ]
            }
            widgetCardType={'leadCard'}
            cardStyleV={'v-month-picks'}
            verticalList={data?.length ? data.slice(0, 1) : []}
            titleElementStyleV={'months-title'}
            paraElementStyleV={'months-para'}
            titleLineClampV={3}
            inLineStyleV={'default'}
            marginBottom={20}
          />

          <CustomSlideBox gridGap={15} changeStyle={'slide-100-60'} marginBottom={30}>
            <WidgetCard
              isConditionalRendering={true}
              widgetCardType={'leadCard'}
              cardSettingData={
                [
                  { ...commonProperties, type: 'small', widgetCardType: 'listCard', widgetLayout: 'vertical', elementClass: 'small', lineClamp: 'inherit', marginBottom: 4, elementType: 'p' },
                  { ...commonProperties, type: 'title', widgetCardType: 'listCard', widgetLayout: 'vertical', elementClass: 'month-picks-v-title', lineClamp: 2, marginBottom: 8, elementType: 'p' },
                  // { ...commonProperties, type: 'para', widgetCardType: 'listCard' ,widgetLayout: 'horizontal', elementClass: 'months-para', lineClamp : 3, marginBottom: 16, elementType: 'p' },
                ]
              }
              // cardStyleH={'month-picks'}
              verticalList={data?.length ? data.slice(1, 4) : []}
              cardStyleV={'vertical-image'}
              inLineStyleV={'default'}
            />
          </CustomSlideBox>
          {/* <NewsLetter /> */}
          <NewsletterWidget/>
        </div>
      </ContainerBox>
    </section>
  );
};

export default FeaturedMonth;