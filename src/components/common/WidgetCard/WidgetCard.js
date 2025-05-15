import style from './WidgetCard.module.scss';
import VerticalCard from '../VerticalCard/VerticalCard';
import HorizontalCard from '../HorizontalCard/HorizontalCard';
import { getCategoryNameWithSeoPath, getNewImageUrl } from '@/utils/common';
// import { authorElementProperties } from '@/constants';

const WidgetCard = (props) => {

  const {
    widgetCardType='',
    widgetListingStyleH='h-card',
    cardStyleH='months-picks',
    inLineStyleH,
    isMoreButtonsH=false,
    widgetListingStyleV='v-card',
    cardStyleV='v-month-picks',
    featuredListV=[],
    featuredListStyleV='health-milestone',
    featuredListTypeV='normalText',
    inLineStyleV,
    isMoreButtonsV=false,
    buttonTypeV='text',
    buttonTextV='Dummy Text',
    changeButtonStyleV='read-more',
    VerticalCardOrder,
    horizontalList=[{}],
    verticalList=[{}],
    cardSettingData=[{}],
    imageWidth=300,
    marginTop=0,
    marginBottom=0,
    productLogoV='',
    data,
    fromHealthMilestones,
    buttonTextSeo,
    keywords,
    objectFit,
    isLazzy = false,
    nextVideo=[],
    isMobile=false,
    isHealthMile=false,
    onVideoStarted ,
    onVideoResumed,
    onVideoPaused,
    onVideoEnded,
    onVideoCompleted,
    autoplay,
    playerListData,
    showNextVideocondition,
    CustomClass=false
  } = props;
  const getAuthorInfo = (authors=[], displayType) => {
    if(authors.length > 0){
      let authorsItem= authors[0]
      return { ...authorElementProperties, authorName: authorsItem?.name, approvedBy: authorsItem?.approvedBy, displayType: displayType, authorId: authorsItem?.id, authorSeoName: authorsItem?.seoname}
    }
    return { ...authorElementProperties };
}



  return (
    <>
      {widgetCardType === 'leadCard' &&
        verticalList.map((item, index) => (
          <div className={`${style[widgetListingStyleV]}`} key={`vertical_widget_${index}`} style={{ marginTop: `${marginTop}px`, marginBottom: `${marginBottom}px` }}>
              <VerticalCard
                changeStyle={cardStyleV}
                cardSettingData={cardSettingData}
                defaultTextValues={{
                  small: item?.smallText || getCategoryNameWithSeoPath(item?.seopath),
                  title: item?.title || 'Health & Me',
                  para: item?.synopsis || 'Health & Me',
                }}
                imgUrl={item?.imgUrl ?
                  item?.imgUrl :
                  getNewImageUrl({
                    msid: item?.msid || null,
                    imageSize: item?.imageSize || item?.thumbsize || '',
                    imgWidth: imageWidth || null,
                    imgHeight: 203,
                    is1x1Img: false,
                    isArticleBanner: false,
                    updatedAt: item?.updatedate ? item?.updatedate : '',
                    isArticleBanner:isHealthMile
                  })}
                // author={getAuthorInfo(item?.authors, inLineStyleV)}
                isMoreButtons={isMoreButtonsV}
                buttonType={buttonTypeV}
                buttonText={buttonTextV}
                buttonTextSeo={buttonTextSeo}
                changeButtonStyle={changeButtonStyleV}
                time={item?.time || ''}
                featuredList={fromHealthMilestones ? item?.children :featuredListV}
                featuredListStyle={featuredListStyleV}
                featuredListType={featuredListTypeV}
                VerticalCardOrder={VerticalCardOrder}
                seopath={item?.seopath}
                productLogo={productLogoV}
                data={data}
                keywords={keywords?.[0]}
                item={item}
                fromHealthMilestones={fromHealthMilestones}
                isLazzy={isLazzy}
                nextVideoData={nextVideo}  
                isMobile={isMobile} 
                onVideoStarted ={onVideoStarted}
                onVideoResumed={onVideoResumed}
                onVideoPaused={onVideoPaused}
                onVideoEnded={onVideoEnded}
                onVideoCompleted={onVideoCompleted}  
                autoplay={autoplay}  
                playerListData={playerListData}  
                showNextVideocondition={showNextVideocondition}
                CustomClass={CustomClass}

              />
          </div>
        ))
      }
      {widgetCardType === 'listCard' &&
        horizontalList.map((item, index) => (
          <div className={`${style[widgetListingStyleH]}`} key={`horizontal_widget_${index}`} style={{ marginTop: `${marginTop}px`, marginBottom: `${marginBottom}px` }}>
           
              <HorizontalCard
                item={item}
                changeStyle={cardStyleH}
                cardSettingData={cardSettingData}
                defaultTextValues={{
                  small: item?.smallText || getCategoryNameWithSeoPath(item?.seopath),
                  title: item?.title || 'Title',
                  para: item?.synopsis || "",
                }}
                imgUrl={item?.imgUrl ?
                  item?.imgUrl :
                  getNewImageUrl({
                    msid: item?.msid || null,
                    imageSize: item?.imageSize || item?.thumbsize || '',
                    imgWidth: imageWidth || null,
                    imgHeight: 203,
                    is1x1Img: false,
                    isArticleBanner: false,
                    updatedAt: item?.updatedate ? item?.updatedate : '',
                  })}
                // author={getAuthorInfo(item?.authors, inLineStyleH)}
                isMoreButtons={isMoreButtonsH}
                seopath={item?.seopath ? item?.seopath : ''}
                objectFit={objectFit}
                isLazzy={isLazzy}
                nextVideo={nextVideo}                
              />
           
          </div>
        ))
      }
    </>
  );
};

export default WidgetCard
