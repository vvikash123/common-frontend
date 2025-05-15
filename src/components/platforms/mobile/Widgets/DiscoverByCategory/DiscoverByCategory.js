
import React from 'react';
import style from './DiscoverByCategory.module.scss';
//import VisualTagLink from '@/components/common/Health/VisualTagLink/VisualTagLink';
import TitleComponent from '@/components/common/TitleComponent/TitleComponent';
import TrendingTags from '@/components/common/TrendingTags/TrendingTags';
import CommonGridBox from '@/components/common/CommonGridBox/CommonGridBox';
import ContainerBox from '@/components/common/ContainerBox/ContainerBox';
import WhatsAppWellness from '@/components/common/WhatsAppWellness/WhatsAppWellness';
import { getCategoryNameWithSeoPath, getNewImageUrl, generateUrlPath } from '@/utils/common';

let exploreList = [{ name: 'Mental Health', icon: '/assets/icons/health/MentalHealth.svg' },
{ name: 'Diet & Nutrition', icon: '/assets/icons/health/Nutrition.svg' },
{ name: 'Yoga & Asanas', icon: '/assets/icons/health/Asanas.svg' },
{ name: 'Skin & Hair', icon: '/assets/icons/health/MentalHealth.svg' },
{ name: 'Heart Health', icon: '/assets/icons/health/MentalHealth.svg' }]
const DiscoverByCategory = (props) => {

  const { marginBottom = 30, componentData, data } = props;

  return (data?.length > 0 &&
    <>
      <section className={`${style['ExploreCategories']}`} style={{ marginBottom: `${marginBottom}px` }} key={props.key}>
        <ContainerBox>
          <TitleComponent
            titleType={componentData?.headingType || 'h2'}
            moreButtonLink={componentData?.data?.seeMore?.link || ''}
            titleText={componentData?.data?.title || 'Explore by Categories'}
            boldText={['Categories']}
          />
          <CommonGridBox gridType={'flexBox'} changeStyle={'ExploreCategories'}>
            {componentData?.data?.children?.map((item, index) => (
              <li key={`trending${index}_${props.key}_${index}`}>
                <TrendingTags
                  isConditionalRendering={true}
                  type={'bigIconWithTextInCircle'}
                  textValue={item.title}
                  icons={item.icon}
                  overridelink={item.overridelink}
                  changeStyle={'explore_by_categories'}
                  imgUrl={item?.imgUrl ?
                    item?.imgUrl :
                    getNewImageUrl({
                      msid: item?.msid || null,
                      imageSize: item?.imageSize || item?.thumbsize || '',
                      imgWidth: item?.imageWidth || null,
                      imgHeight: 203,
                      is1x1Img: false,
                      isArticleBanner: false,
                      updatedAt: item?.updatedate ? item?.updatedate : '',
                    })}
                    wrapper={"anchor"}
                />                
              </li>
            ))}
          </CommonGridBox>
        </ContainerBox>
      </section>
      {/* <WhatsAppWellness/> */}
    </>
  );
};


export default DiscoverByCategory