import React from 'react';
import style from './FeaturedMonth.module.scss';
import ContainerBox from '@/components/common/ContainerBox/ContainerBox';
import TitleComponent from '@/components/common/TitleComponent/TitleComponent';
import WidgetCard from '@/components/common/WidgetCard/WidgetCard';
import NewsLetter from '@/components/common/NewsLetter/NewsLetter';
import { commonProperties } from '@/constants';



const FeaturedMonth = (props) => {

  const {  marginBottom=60, componentData, data } = props;

  return ( data?.length > 0 &&
    <section className={style['FeaturedMonth']} style={{ marginBottom: `${marginBottom}px` }}>
      <ContainerBox>

        <div className={`${style['grid-layout']}`}>
          <div className={`${style['grid-lhs']}`}>
            <TitleComponent
              titleType={'h2'}
              moreButtonLink={componentData?.seeMore?.link ? componentData?.data?.link : ''}
              boldText={componentData?.seeMore?.text && componentData?.seeMore?.text.split(' ').length > 0 ? [componentData?.seeMore?.text.split(' ')[0]] : ''}
              titleText={componentData?.seeMore?.text ? componentData?.seeMore?.text : ''}
            />
            <div className={`${style['grid-2']}`}>
              <div className={`${style['grid-col']}`}>
                <WidgetCard
                  isConditionalRendering={true}
                  cardSettingData={
                    [
                      { ...commonProperties, type: 'small', widgetCardType: 'listCard', widgetLayout: 'vertical', elementClass: 'small', lineClamp: 'inherit', marginBottom: 6, elementType: 'p' },
                      { ...commonProperties, type: 'title', widgetCardType: 'leadCard', widgetLayout: 'vertical', elementClass: 'months-title', lineClamp: 2, marginBottom: 8, elementType: 'p' },
                      { ...commonProperties, type: 'para', widgetCardType: 'leadCard', widgetLayout: 'vertical', elementClass: 'months-para', lineClamp: 3, marginBottom: 16, elementType: 'p' },
                    ]
                  }
                  widgetCardType={'leadCard'}
                  cardStyleV={'v-month-picks'}
                  verticalList={data?.length ? data.slice(0, 1) : []}
                  titleElementStyleV={'months-title'}
                  paraElementStyleV={'months-para'}
                  titleLineClampV={3}
                  inLineStyleV={'default'}
                />
              </div>
              <WidgetCard
                isConditionalRendering={true}
                widgetCardType={'listCard'}
                cardSettingData={
                  [
                    { ...commonProperties, type: 'small', widgetCardType: 'listCard', widgetLayout: 'horizontal', elementClass: 'small', lineClamp: 'inherit', marginBottom: 4, elementType: 'p' },
                    { ...commonProperties, type: 'title', widgetCardType: 'listCard', widgetLayout: 'horizontal', elementClass: 'v-title', lineClamp: 2, marginBottom: 8, elementType: 'p' },
                    // { ...commonProperties, type: 'para', widgetCardType: 'listCard' ,widgetLayout: 'horizontal', elementClass: 'months-para', lineClamp : 3, marginBottom: 16, elementType: 'p' },
                  ]
                }
                cardStyleH={'month-picks'}
                widgetListingStyleH={''}
                horizontalList={data?.length ? data.slice(1, 4) : []}
                inLineStyleH={'inline-display'}
                smallMarginBottomH={4}
                titleMarginBottomH={8}
              />
            </div>
          </div>
          <div className={`${style['grid-rhs']}`}>
            <NewsLetter />
          </div>
        </div>
      </ContainerBox>
    </section>
  );
};

export default FeaturedMonth
