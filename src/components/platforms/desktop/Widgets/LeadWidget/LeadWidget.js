import React from 'react';
import style from './LeadWidget.module.scss';
import { commonProperties } from 'constants';
import ContainerBox from '@/components/common/ContainerBox/ContainerBox';
import CommonGridBox from '@/components/common/CommonGridBox/CommonGridBox';
import WidgetCard from '@/components/common/WidgetCard/WidgetCard';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import FeaturedWidget from '@/components/common/FeaturedWidget/FeaturedWidget';



const LeadWidget = (props) => {
  const { marginBottom = 60, componentData, data, getMSID, deviceType, isMobile } = props;
  //const trendingTags = componentData?.trending?.length
  return (
    <section className={style['FeaturedMonth']} style={{ marginBottom: `${marginBottom}px` }}>
      <ContainerBox>
        <div className={`${style['grid-layout']}`}>
          <div className={`${style['grid-lhs']}`}>

            <SearchBar
              isConditionalRendering={true}
              trendingTags={componentData?.trending?.children?.length ? componentData?.trending?.children : []}
              getMSID={getMSID}
              deviceType={deviceType}
              isMobile={isMobile}
            />
            <h1></h1>

            <CommonGridBox gridType={'gridBox'} changeStyle={'grid-2'} yGap={20}>
              <WidgetCard
                isConditionalRendering={true}
                widgetCardType={'listCard'}
                cardStyleH={'list-card'}
                cardSettingData={
                  [
                    { ...commonProperties, type: 'small', widgetCardType: 'leadCard', widgetLayout: 'horizontal', elementClass: 'small', lineClamp: 'inherit', marginBottom: 6, elementType: 'p' },
                    { ...commonProperties, type: 'title', widgetCardType: 'leadCard', widgetLayout: 'horizontal', elementClass: 'list-card-title', lineClamp: 2, marginBottom: 0, elementType: 'p' },
                    // { ...commonProperties, type: 'para', widgetCardType: 'leadCard' ,widgetLayout: 'vertical', elementClass: 'para', lineClamp : 2, marginBottom: 16, elementType: 'p' },
                  ]
                }
                horizontalList={data ? data?.slice(3, data?.length) : []}
                titleElementStyleH={'list-card-title'}
                inLineStyleH={''}
                titleMarginBottomH={0}
                titleLineClampV={2}
                marginTop={20}
              />

            </CommonGridBox>

          </div>

          <div className={`${style['grid-rhs']}`}>
            <FeaturedWidget
              isConditionalRendering={true}
              verticalList={data?.length > 5 ? data?.slice(0, 3) : []}
              cardStyleV={'health-milestone'}
              smallElementStyleV={'health-milestones-key'}
              marginTop={20}
            />
          </div>
        </div>
      </ContainerBox>
    </section>
  );
};

export default LeadWidget;
