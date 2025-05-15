import React from 'react';
import style from './SeasonalHealthCareHub.module.scss';
import ContainerBox from '@/components/common/ContainerBox/ContainerBox';
import TitleComponent from '@/components/common/TitleComponent/TitleComponent';
import Typography from '@/components/common/Typography/Typography';
import CustomSlideBox from '@/components/common/CustomSlideBox/CustomSlideBox';
import TrendingTags from '@/components/common/TrendingTags/TrendingTags';
import WidgetCard from '@/components/common/WidgetCard/WidgetCard';
import SymptomsChecker from '@/components/common/SymptomsChecker/SymptomsChecker';
import CommonGridBox from '@/components/common/CommonGridBox/CommonGridBox';
import { commonProperties } from '@/constants';
import WhatsAppWellness from '@/components/common/WhatsAppWellness/WhatsAppWellness';
import { generateUrlPath } from '@/utils/common';


const verticalList = [
  {
    titleText: "COVID, Flu, and RSV: What you need to know right now",
    imgUrl: "/assets/health-images/images/img2.png",
  },
  {
    titleText: "COVID, Flu, and RSV: What you need to know right now",
    imgUrl: "/assets/health-images/images/img2.png",
  },
  {
    titleText: "COVID, Flu, and RSV: What you need to know right now",
    imgUrl: "/assets/health-images/images/img2.png",
  },
];


const SeasonalHealthCareHub = (props) => {

  const { marginBottom=60, componentData, data, isMobile } = props;  

  return (data?.length > 0 &&
    <>
      <section className={style['SeasonalHealthCare']} style={{ marginBottom: `${marginBottom}px` }} key={props.key}>
        <ContainerBox>
          <div className={`${style['grid-layout']}`}>
            <div className={`${style['grid-lhs']}`}>
              <TitleComponent
                titleType={componentData?.headingType || 'h2'}
                moreButtonLink={componentData?.data?.seopath || ''}
                titleText={componentData?.data?.title || 'Seasonal Health Care'}
                boldText={['Seasonal']}
                // marginBottom={28}
              />
              <Typography
                elementType={'p'}
                textValue={'COMMON SEASONAL CONDITIONS'}
                changeStyle={'health-search-key'}
                marginBottom={12}
              />
              <CustomSlideBox>
                {componentData?.trending?.children?.length && componentData?.trending?.children?.map((data, idx) => (
                  <TrendingTags
                    key={idx}
                    isConditionalRendering={true}
                    bulletNumbers={idx + 1}
                    type={'strongText'}
                    textValue={data?.title}
                    seopath={generateUrlPath(data)}
                    changeStyle={'bg-white-color'}
                    wrapper={'anchor'}
                  />
                ))}
              </CustomSlideBox>
              <CommonGridBox gridType={'gridBox'} changeStyle={'grid-4'} yGap={20}>
                <WidgetCard
                  isConditionalRendering={true}
                  cardSettingData={
                    [
                      // { ...commonProperties, type: 'small', widgetCardType: 'leadCard' ,widgetLayout: 'vertical', elementClass: 'small', lineClamp : 'inherit', marginBottom: 6, elementType: 'p' },
                      { ...commonProperties, type: 'title', widgetCardType: 'leadCard', widgetLayout: 'vertical', elementClass: 'v-title', lineClamp: 2, marginBottom: 24, elementType: 'p' },
                      // { ...commonProperties, type: 'para', widgetCardType: 'listCard' ,widgetLayout: 'horizontal', elementClass: 'para', lineClamp : 2, marginBottom: 16, elementType: 'p' },
                    ]
                  }
                  widgetCardType={'leadCard'}
                  verticalList={data?.length > 1 ? data.slice(0, 4) : []}
                  cardStyleV={'seasonal-health-care'}
                  titleMarginBottomV={24}
                  inLineStyleV={'default'}
                />
              </CommonGridBox>
            </div>
            {/* <div className={`${style['grid-rhs']}`}>
            <SymptomsChecker isMobile={isMobile} />
          </div> */}
          </div>
        </ContainerBox>
      </section>

      <WhatsAppWellness />
      <br/>
      <br/>      
    </>

  );
};


export default SeasonalHealthCareHub;
