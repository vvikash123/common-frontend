import React from 'react';
import style from './ShortStories.module.scss';
import { getTextReplace } from '@/utils/common';
import ContainerBox from '@/components/common/ContainerBox/ContainerBox';
import CustomSlideBox from '@/components/common/CustomSlideBox/CustomSlideBox';
import Typography from '@/components/common/Typography/Typography';
import PhotoVideoCard from '@/components/common/PhotoVideoCard/PhotoVideoCard';
import { getNewImageUrl } from '@/utils/common';


const ShortStories = (props) => {

  const {  componentData, marginBottom=30, data, imageWidth=300 } = props;
  const nextAvailablePage = componentData?.data?.pg?.np || false
  const loadMorePageLimit = componentData?.loadMore?.pageLimit || ''
  const seeMoreLink = componentData?.seeMore?.link || ''
  let headingReplaceText = componentData?.seeMore?.text
    ? getTextReplace(componentData?.seeMore?.text, ' ', '-')
    : '';
  let moreLink;
  let moreText;

  if (nextAvailablePage && loadMorePageLimit >= nextAvailablePage) {
    moreLink = '/';
    moreText = componentData?.loadMore?.text || ''
  } else if (seeMoreLink) {
    moreLink = seeMoreLink;
    moreText = componentData?.seeMore?.text || ''
  }

  return ( componentData?.data?.children?.length > 0 && 
    <section className={style['FeaturedMonth']} style={{ marginBottom: `${marginBottom}px` }} key={props.key}>
      <ContainerBox>
        <Typography
          elementType={componentData?.headingType || 'h2'}
          moreButtonLink={componentData?.data?.seopath || ''}
          textValue={componentData?.data?.title || ''}
          smallTextIcon={'greenDoublePlayIcon'}
          changeStyle={'short-stories-title'}
          lineClamp={'inherit'}
          marginBottom={24}
        />
        <CustomSlideBox gridGap={15} changeStyle={'short-stories-box'} marginBottom={0} elementType ={'divBox'}>
        {componentData?.data?.children?.map((item, index) => (
            <div className={`${style['col']}`} key={`shortstory_${props.key}_${index}`}>
              <PhotoVideoCard
                isConditionalRendering={true}
                cardType={'shorts'}
                imgUrl={getNewImageUrl({
                  msid: item?.msid || null,
                  imageSize: item?.imageSize || item?.thumbsize || '',
                  imgWidth: imageWidth || null,
                  imgHeight: 203,
                  is1x1Img: false,
                  isArticleBanner: false,
                  updatedAt: item?.updatedate ? item?.updatedate : '',
                })}
                titleText={item?.title}
                seopath={item?.seopath || ''}
                msid= {item?.msid || null}

              />
            </div>
          ))}

          {/* <ShortStoryList
            key={componentData.msid}
            data={_get(componentData, 'data.children')}
            ad={_get(componentData, 'ad')}
            dataKey={componentData?.widgetType}
            heading={
              componentData?.categoryName
                ? {
                  text: componentData?.seeMore?.text,
                  replacetext: headingReplaceText,
                  type: componentData.headingType,
                  link: componentData?.seeMore?.link,
                }
                : null
            }

            moreButtonText={moreText}
            moreButtonLink={moreLink}
            category_msid={_get(componentData, 'data.msid', '')}
            redirect_to_component_type={'CL'} // this is Home page listing, so it will redirect to CL of category listing.
            dataLoading={_get(componentData, 'dataLoading')}
            gacat={'WEB-IN-HP'}
            {...componentData?.props}
            isHome={true}
          /> */}
        </CustomSlideBox>
      </ContainerBox>
    </section>
  );
};

export default ShortStories;