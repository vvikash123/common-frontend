import React from 'react';
import style from './TrendingTopicHub.module.scss';
import ContainerBox from '@/components/common/ContainerBox/ContainerBox';
import TitleComponent from '@/components/common/TitleComponent/TitleComponent';
import Typography from '@/components/common/Typography/Typography';
import CustomSlideBox from '@/components/common/CustomSlideBox/CustomSlideBox';
import TrendingTags from '@/components/common/TrendingTags/TrendingTags';
import CommonGridBox from '@/components/common/CommonGridBox/CommonGridBox';
import WidgetCard from '@/components/common/WidgetCard/WidgetCard';
import { commonProperties } from '@/constants';
import { generateUrlPath } from '@/utils/common';



const TrendingTopicHub = (props) => {

  const { marginBottom=60, componentData, data, showAds=false, pageType="" } = props;
   
  return ( data?.length > 0 && 
    <section className={style['TrendingTopicHub']} style={{ marginBottom: `${marginBottom}px` }} key={props.key}>
      <ContainerBox>
        <TitleComponent
          titleType={componentData?.headingType || 'h2'}
          moreButtonLink={componentData?.data?.seopath || ''}
          titleText={componentData?.data?.title || ''}
          boldText={['Trending']}
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
              textValue={data?.title || ''}
              seopath={generateUrlPath(data) || ''}              
              changeStyle={'green-color'}
              wrapper={'anchor'}
            />
          ))}
        </CustomSlideBox>

        <CommonGridBox gridType={'gridBox'} xGap={24}>

          <div className={`${style['grid-2']}`}>
            <WidgetCard
              isConditionalRendering={true}
              cardSettingData={
                [
                    { ...commonProperties, type: 'small', widgetCardType: 'listCard' ,widgetLayout: 'horizontal', elementClass: 'small', lineClamp : 'inherit', marginBottom: 6, elementType: 'p' },
                    { ...commonProperties, type: 'title', widgetCardType: 'listCard' ,widgetLayout: 'horizontal', elementClass: 'v-title', lineClamp : 2, marginBottom: 8, elementType: 'p' },
                    { ...commonProperties, type: 'para', widgetCardType: 'listCard' ,widgetLayout: 'horizontal', elementClass: 'para', lineClamp : 2, marginBottom: 16, elementType: 'p' },
                ]
            }
              widgetCardType={'listCard'}
              horizontalList={data?.length ? data.slice(0,1) : []}
              cardStyleH={'horizontal-image'}
              inLineStyleH={'default'}
              isMoreButtonsH={true}
              widgetListingStyleH={''}
              objectFit={'cover'}
            />

           <WidgetCard
              isConditionalRendering={true}
              cardSettingData={
                [
                    { ...commonProperties, type: 'small', widgetCardType: 'listCard' ,widgetLayout: 'vertical', elementClass: 'small', lineClamp : 'inherit', marginBottom: 6, elementType: 'p' },
                    { ...commonProperties, type: 'title', widgetCardType: 'listCard' ,widgetLayout: 'vertical', elementClass: 'v-title', lineClamp : 2, marginBottom: 8, elementType: 'p' },
                    // { ...commonProperties, type: 'para', widgetCardType: 'listCard' ,widgetLayout: 'horizontal', elementClass: 'para', lineClamp : 2, marginBottom: 16, elementType: 'p' },
                ]
            }
              widgetCardType={'leadCard'}
              verticalList={data?.length>1 ? data.slice(1,2) : []}
              cardStyleV={'vertical-image'}
              inLineStyleV={'default'}
              CustomClass={true}
            />

           {/* {showAds && (
              <div className={`${style['grid-col']}`}>
               <AdCaller /> 
            </div>
            )}  */}
           
          </div>
          <CommonGridBox gridType={'gridBox'} changeStyle={'grid-4'} yGap={24}>
            <WidgetCard
              isConditionalRendering={true}
              cardSettingData={
                [
                    { ...commonProperties, type: 'small', widgetCardType: 'listCard' ,widgetLayout: 'vertical', elementClass: 'small', lineClamp : 'inherit', marginBottom: 6, elementType: 'p' },
                    { ...commonProperties, type: 'title', widgetCardType: 'listCard' ,widgetLayout: 'vertical', elementClass: 'v-title', lineClamp : 2, marginBottom: 8, elementType: 'p' },
                    // { ...commonProperties, type: 'para', widgetCardType: 'listCard' ,widgetLayout: 'horizontal', elementClass: 'para', lineClamp : 2, marginBottom: 16, elementType: 'p' },
                ]
            }
              widgetCardType={'leadCard'}
              verticalList={data?.length>1 ? data.slice(2,7) : []}
              cardStyleV={'vertical-image'}
              inLineStyleV={'default'}
            />
          </CommonGridBox>
        </CommonGridBox>
      </ContainerBox>
    </section>
  );
};

export default TrendingTopicHub
