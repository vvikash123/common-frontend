import React from 'react';
import style from './TrendingTopicHub.module.scss';
import TitleComponent from '@/components/common/TitleComponent/TitleComponent';
import TrendingTags from '@/components/common/TrendingTags/TrendingTags';
import Typography from '@/components/common/Typography/Typography';
import CustomSlideBox from '@/components/common/CustomSlideBox/CustomSlideBox';
import ContainerBox from '@/components/common/ContainerBox/ContainerBox';
import WidgetCard from '@/components/common/WidgetCard/WidgetCard';
import { commonProperties } from '@/constants';
import { generateUrlPath } from '@/utils/common';


const TrendingTopicHub = (props) => {

  const { marginTop=0, marginBottom=30, componentData, data } = props;

  return ( data?.length> 0 && 
    <section className={style['TrendingTopicHub']} style={{ marginTop: `${marginTop}px`, marginBottom: `${marginBottom}px` }} key={props.key}>
      <ContainerBox>
        <TitleComponent
          titleType={'h2'}
          moreButtonLink={''}
          boldText={['Trending']}
          titleText={'Trending Topics'}
        />

        <Typography
          elementType={'p'}
          textValue={'top searches in india'}
          changeStyle={'search-key'}
          marginBottom={12}
        />

        <CustomSlideBox>
          {componentData?.trending?.children?.length && componentData?.trending?.children?.map((data, idx) => (
            <TrendingTags
              key={idx}
              isConditionalRendering={true}
              bulletNumbers={idx + 1}
              type={'bulletTextWithText'}
              textValue={data?.title}
              // seopath={data?.seopath}
              seopath={generateUrlPath(data) || ''}   
              changeStyle={'green-color'}
              wrapper={'anchor'}
            />
          ))}
        </CustomSlideBox>

        <WidgetCard
          isConditionalRendering={true}
          cardSettingData={
            [
              { ...commonProperties, type: 'small', widgetCardType: 'listCard', widgetLayout: 'horizontal', elementClass: 'small', lineClamp: 'inherit', marginBottom: 6, elementType: 'p' },
              { ...commonProperties, type: 'title', widgetCardType: 'listCard', widgetLayout: 'horizontal', elementClass: 'trending-topics-v-title', lineClamp: 2, marginBottom: 8, elementType: 'p' },
              { ...commonProperties, type: 'para', widgetCardType: 'listCard', widgetLayout: 'horizontal', elementClass: 'trending-topics-para', lineClamp: 2, marginBottom: 16, elementType: 'p' },
            ]
          }
          widgetCardType={'listCard'}
          horizontalList={data?.length ? data.slice(0, 1) : []}
          cardStyleH={'trending-topics-widget'}
          inLineStyleH={'default'}
          isMoreButtonsH={true}
          widgetListingStyleH={''}
          marginBottom={25}
          objectFit={'inherit'}
        />

        <CustomSlideBox gridGap={15} changeStyle={'slide-100-60'} marginBottom={0}>
          <WidgetCard
            isConditionalRendering={true}
            cardSettingData={
              [
                { ...commonProperties, type: 'small', widgetCardType: 'listCard', widgetLayout: 'vertical', elementClass: 'small', lineClamp: 'inherit', marginBottom: 6, elementType: 'p' },
                { ...commonProperties, type: 'title', widgetCardType: 'listCard', widgetLayout: 'vertical', elementClass: 'trending-topics-list-v-title', lineClamp: 2, marginBottom: 8, elementType: 'p' },
                // { ...commonProperties, type: 'para', widgetCardType: 'listCard' ,widgetLayout: 'horizontal', elementClass: 'para', lineClamp : 2, marginBottom: 16, elementType: 'p' },
              ]
            }
            widgetCardType={'leadCard'}
            verticalList={data?.length > 1 ? data.slice(1, 5) : []}
            cardStyleV={'vertical-image'}
            inLineStyleV={'default'}
          />
        </CustomSlideBox>

      </ContainerBox>
    </section>
  );
};

export default TrendingTopicHub