import ContainerBox from '@/components/common/ContainerBox/ContainerBox';
import TitleComponent from '@/components/common/TitleComponent/TitleComponent';
import PhotoVideoCard from '../PhotoVideoCard/PhotoVideoCard'
import { getTextReplace, getNewImageUrl } from '@/utils/common';


const QuickStories = (props) => {

  const { componentData, getMSID, marginBottom=60, data, imageWidth=300 } = props;  

  const nextAvailablePage = componentData?.data?.pg?.np || false;
  const loadMorePageLimit = componentData?.loadMore?.pageLimit || ''
  const seeMoreLink = componentData?.seeMore?.link || false
  let headingReplaceText = componentData?.seeMore?.text || ''
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
  


return(

  <>
    <section className='FeaturedMonth' style={{ marginBottom: `${marginBottom}px` }} key={props.key}>
      <ContainerBox>
        <TitleComponent
          titleType={componentData?.headingType ||  'h2'}
          moreButtonLink={componentData?.seeMore?.link || '/web-stories'}
          boldText={['Stories']}
          titleText={componentData?.data?.title ||  'Quick Stories'}
          marginBottom={0}
        />
        <div className='FeaturedMonthRow'>
          {componentData?.data?.items?.map((item, index) => (
            <div className={`col`} key={`${props.key}_${index}`}>
              <PhotoVideoCard
                isConditionalRendering={true}
                cardType={'stories'}
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
                msid={item?.msid}
              />                            
            </div>
          ))}
        </div>
      </ContainerBox>
    </section>
    <style jsx global>
      
      {`
   
   .FeaturedMonthRow {
    display: flex;
    white-space: nowrap;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    list-style: none;
   
}

.FeaturedMonthRow div {
    min-width: 132px;
    white-space: normal;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    margin-right: 10px;
}

.FeaturedMonthRow div img {
    width: 100%;
    display: block;
    border-radius: 12px;
}

.FeaturedMonthRow ul {
    list-style: none;
}

.FeaturedMonthRow figcaption {
    font-size: 0.875rem;
    color: #000000;
    font-style: normal;
    font-weight: 700;
    text-decoration: none;
    margin-top: 7px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}


.FeaturedMonth h2 {
  color: #0f2f4f;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 110%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0 12px;
  text-decoration: none;
  margin-bottom: 20px;
}

.FeaturedMonth h2 span {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background: #21409a;
  display: flex;
  align-items: center;
  justify-content: center;
}

.FeaturedMonth h2 span svg {
  width: 15px;
  height: 17px;
}

.FeaturedMonth {
  padding-left: 20px;
}
  

      `}
    </style>
    </>
  );
  
};


export default QuickStories;