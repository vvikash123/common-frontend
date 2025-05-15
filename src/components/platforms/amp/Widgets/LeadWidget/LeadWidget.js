
import React from 'react';
import style from './LeadWidget.module.scss';
import ContainerBox from '@/components/common/ContainerBox/ContainerBox';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import CommonGridBox from '@/components/common/CommonGridBox/CommonGridBox';
import WidgetCard from '@/components/common/WidgetCard/WidgetCard';
import FeaturedWidget from '@/components/common/FeaturedWidget/FeaturedWidget';
import { commonProperties } from '@/constants';


const LeadWidget = (props) => {

  const { marginTop=0, marginBottom=60, componentData, data } = props;

  return (
    <section className={style['FeaturedMonth']} style={{ marginTop: `${marginTop}px`, marginBottom: `${marginBottom}px` }} key={props.key}>
      <ContainerBox>
        <div className={`${style['grid-layout']}`}>
          <SearchBar
            placeHolderText={'Search conditions, doctors...'}
            isConditionalRendering={true}
            trendingTags={componentData?.trending?.children?.length ? componentData?.trending?.children : []}
            marginBottom={30}
          />
          <FeaturedWidget
            isConditionalRendering={true}
            verticalList={data.length > 5 ? data.slice(4, data.length) : []}
            cardStyleV={'health-milestone'}
            smallElementStyleV={'health-milestones-key'}
            marginTop={20}
          />
          <CommonGridBox gridType={'gridBox'} changeStyle={'grid-1'} yGap={20}>
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
              horizontalList={data ? data.slice(0, 4) : []}
              titleElementStyleH={'list-card-title'}
              inLineStyleH={''}
              titleMarginBottomH={0}
              titleLineClampV={2}
              marginTop={20}
            />

            {/* <LeadFooterCards
              isConditionalRendering={true}
              cardType={'AyurvedaHerbals'}
              title={'Ayurveda & Herbals'}
              para={'Explore the  eastern way of medicinal treatments'}
              icons={'upArrowIconWhiteBg'}
            />

            <LeadFooterCards
              isConditionalRendering={true}
              cardType={'CommunityHub'}
              title={'Community Hub'}
              para={'Connect with like-minded individuals & health experts'}
              icons={'upArrowIconWhiteBg1'}
            /> */}

          </CommonGridBox>
        </div>
      </ContainerBox>
    </section>
  );
};


export default LeadWidget;
