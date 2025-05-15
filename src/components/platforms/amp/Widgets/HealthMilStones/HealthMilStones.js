import React from 'react';
import style from './HealthMilStones.module.scss';
import TitleComponent from '@/components/common/TitleComponent/TitleComponent';
import Typography from '@/components/common/Typography/Typography';
import CustomSlideBox from '@/components/common/CustomSlideBox/CustomSlideBox';
import TrendingTags from '@/components/common/TrendingTags/TrendingTags';
import ContainerBox from '@/components/common/ContainerBox/ContainerBox';
import WidgetCard from '@/components/common/WidgetCard/WidgetCard';
import { commonProperties } from '@/constants'; 


const featuredList = [
  {
    name: "Vaccinations in 1st Month"
  },
  {
    name: "5 Precautions for 1 Month Old"
  },
  {
    name: "Tracking Baby’s Sleep Cycle"
  },
];

const HealthMilStones = (props) => {

  const { marginBottom=60, componentData, data } = props;

  return ( data?.length > 0 && 
    <section className={style['HealthMilStones']} style={{ marginBottom: `${marginBottom}px` }} key={props.key}>
      <ContainerBox>
        <div className={`${style['body-pannel']}`}>
          <TitleComponent
            titleType={componentData?.headingType ||  'h2'}
            moreButtonLink={componentData?.data?.seopath || '/'}
            boldText={['Milestones']}
            titleText={componentData?.data?.title || ''}
            marginBottom={32}
          />
          <Typography
            elementType={'p'}
            textValue={'EXPLORE BY AGE GROUP'}
            changeStyle={'health-search-key'}
            marginBottom={16}
          />
          <CustomSlideBox marginBottom={25}>
            {componentData?.headers?.length > 0 && componentData?.headers?.map((data, idx) => (
              <TrendingTags
              key={idx}
              isConditionalRendering={true}
              type={'firstTextBold'}
              textValue={data?.name || ''}
              secondTextValue={data?.years || ''}
              changeStyle={'bg-grey-color'}
              isActive={data?.active || ''}
              seopath={data?.seopath}
              wrapper={'anchor'}
              />
            ))}
          </CustomSlideBox>

          <CustomSlideBox gridGap={15} changeStyle={'slide-100-60'} marginBottom={0}>
            <WidgetCard
              isConditionalRendering={true}
              cardSettingData={
                [
                  { ...commonProperties, type: 'small', widgetCardType: 'leadCard', widgetLayout: 'vertical', elementClass: 'health-milestones-key', lineClamp: 'inherit', marginBottom: 6, elementType: 'p', textIcon: 'blackStarIcon' },
                  // { ...commonProperties, type: 'title', widgetCardType: 'leadCard' ,widgetLayout: 'vertical', elementClass: 'v-title', lineClamp : 2, marginBottom: 8, elementType: 'p' },
                  // { ...commonProperties, type: 'para', widgetCardType: 'listCard' ,widgetLayout: 'horizontal', elementClass: 'para', lineClamp : 2, marginBottom: 16, elementType: 'p' },
                ]
              }
              widgetCardType={'leadCard'}
              widgetListingStyleV={'milestones'}
              cardStyleV={'health-milestone'}
              VerticalCardOrder={'reverse'}
              verticalList={data || []}
              featuredListV={featuredList}
              smallElementStyleV={'health-milestones-key'}
              smallTextIconV={'blackStarIcon'}
            />
          </CustomSlideBox>
          
        </div>
        <div className={`${style['ads-body']}`}>
          {/* <AdCaller /> */}
        </div>
      </ContainerBox>
    </section>
  );
};

export default HealthMilStones;