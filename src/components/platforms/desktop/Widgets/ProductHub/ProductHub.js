import React from 'react';
import style from './ProductHub.module.scss';
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
    name: "Dry & Sensitive Skin"
  },
  {
    name: "Acne Prone"
  },
  {
    name: "Tracking Baby’s"
  },
];


const ProductHub = (props) => {

  const { marginBottom, componentData, data } = props;

  return (data?.length > 0 &&
    <section className={style['SeasonalHealthCare']} style={{ marginBottom: `${marginBottom}px` }} key={props.key}>
      <ContainerBox>
        <TitleComponent
          titleType={componentData?.headingType || 'h2'}
          moreButtonLink={componentData?.data?.seopath || ''}
          titleText={componentData?.data?.title || 'Product Comparison & Reviews'}
          boldText={['Product']}
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
              type={'iconWithText'}
              icons={'/assets/icons/health/product-logo.png'}
              textValue={data?.name}
              seopath={data?.seopath}
              changeStyle={'bg-grey-color-with-icon'}
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
                    { ...commonProperties, type: 'title', widgetCardType: 'leadCard', widgetLayout: 'vertical', elementClass: 'product-hub-v-title', lineClamp: 2, marginBottom: 10, elementType: 'p' },
                    { ...commonProperties, type: 'small', widgetCardType: 'leadCard', widgetLayout: 'vertical', elementClass: 'recommended-for', lineClamp: 'inherit', marginBottom: 6, elementType: 'p' },
                    // { ...commonProperties, type: 'para', widgetCardType: 'listCard' ,widgetLayout: 'horizontal', elementClass: 'para', lineClamp : 2, marginBottom: 16, elementType: 'p' },
                  ]
                }
                widgetCardType={'leadCard'}
                verticalList={data?.length > 1 ? data.slice(1, 4) : []}
                cardStyleV={'product-hub-widget'}
                inLineStyleV={'default'}
                productLogoV={'/assets/health-images/images/himalaya-logo.png'}
                featuredListV={featuredList}
                featuredListStyleV={'product-hub-featured-list'}
                featuredListTypeV={'normalText'}
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

ProductHub.defaultProps = {
  marginBottom: 60,
};

export default ProductHub;