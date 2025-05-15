import React from 'react';
import style from './EmergencyFirstAid.module.scss';
import TitleComponent from '@/components/common/TitleComponent/TitleComponent';
import Typography from '@/components/common/Typography/Typography';
import CustomSlideBox from '@/components/common/CustomSlideBox/CustomSlideBox';
import TrendingTags from '@/components/common/TrendingTags/TrendingTags';
import WidgetCard from '@/components/common/WidgetCard/WidgetCard';
import ContainerBox from '@/components/common/ContainerBox/ContainerBox';
import CommonGridBox from '@/components/common/CommonGridBox/CommonGridBox';
import { commonProperties } from '@/constants'; 

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

const featuredList = [
  {
    name: "12 Videos",
    icon: 'darkVideoIcon'
  },
  {
    name: "3 Article",
    icon: 'darkArticleIcon'
  },
  {
    name: "Tracking Baby’s",
    icon: 'darkArticleIcon'
  },
];


const EmergencyFirstAid = (props) => {

  const { langConstant = {}, translations, addLangPath, lang, marginBottom, componentData, data } = props;

  return (data?.length > 0 &&
    <section className={style['SeasonalHealthCare']} style={{ marginBottom: `${marginBottom}px` }} key={props.key}>
      <ContainerBox>
        <TitleComponent
          titleType={componentData?.headingType || 'h2'}
          moreButtonLink={componentData?.data?.seopath || ''}
          titleText={componentData?.data?.title || 'Emergency First Aid'}
          boldText={['First', 'Aid']}
          marginBottom={28}
        />
        <Typography
          elementType={'p'}
          textValue={'EXPLORE BY TOP BRANDS'}
          changeStyle={'product-hub'}
          marginBottom={12}
        />
        <CustomSlideBox>
          {componentData?.headers?.length && componentData?.headers?.map((data, idx) => (
            <TrendingTags
              key={idx}
              isConditionalRendering={true}
              bulletNumbers={idx + 1}
              type={'strongText'}
              textValue={data?.name}
              seopath={data?.seopath}
              changeStyle={'bg-grey-color-2'}
              wrapper={'anchor'}
            />
          ))}
        </CustomSlideBox>
        <div className={`${style['grid-layout']}`}>
          <div className={`${style['grid-lhs']}`}>
            <CommonGridBox gridType={'gridBox'} changeStyle={'grid-3'} yGap={20}>
              <WidgetCard
                isConditionalRendering={true}
                cardSettingData={
                  [
                    // { ...commonProperties, type: 'small', widgetCardType: 'leadCard' ,widgetLayout: 'vertical', elementClass: 'small', lineClamp : 'inherit', marginBottom: 6, elementType: 'p' },
                    { ...commonProperties, type: 'title', widgetCardType: 'leadCard', widgetLayout: 'vertical', elementClass: 'emergency-first-aid-v-title', lineClamp: 2, marginBottom: 24, elementType: 'p' },
                    // { ...commonProperties, type: 'para', widgetCardType: 'listCard' ,widgetLayout: 'horizontal', elementClass: 'para', lineClamp : 2, marginBottom: 16, elementType: 'p' },
                  ]
                }
                widgetCardType={'leadCard'}
                verticalList={data?.length > 1 ? data.slice(1, 4) : []}
                cardStyleV={'product-hub-widget'}
                titleMarginBottomV={24}
                inLineStyleV={'default'}
                featuredListV={featuredList}
                featuredListStyleV={'emergency-first-aid-featured-list'}
                featuredListTypeV={'spriteIconWithText'}
              />
            </CommonGridBox>
          </div>
          <div className={`${style['grid-rhs']}`}>
            {/* <AdCaller /> */}
          </div>
        </div>
      </ContainerBox>
    </section>
  );
};

EmergencyFirstAid.defaultProps = {
  marginBottom: 60,
};

export default EmergencyFirstAid;