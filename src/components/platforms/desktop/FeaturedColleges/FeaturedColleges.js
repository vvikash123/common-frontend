import React from "react";
import s from "./FeaturedColleges.module.scss";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import TitleComponent from "@/components/common/TitleComponent/TitleComponent";
import SlickSlideWrapper from "@/components/common/SlickSlideWrapper/SlickSlideWrapper";
import FeaturedCollegesWidget from "@/components/common/FeaturedCollegesWidget/FeaturedCollegesWidget";
import { getNewImageUrl, isMobile } from "@/utils/common";

const FeaturedColleges = (props) => {
  const { isMobile, data  , componentData} = props;
  // Only show the slider if there are more than 3 items in the data
  const showdata=data.slice(0, 3)

  const showSlider = showdata?.length > 3;
  return (
    <div className={s['FeaturedColleges']}>
      <ContainerBox changeStyle="Rightgutter">
        <TitleComponent
      title={ componentData?.seeMore?.text ??  "Featured Colleges"}
      link={ componentData?.seeMore?.link }   
          margin="0px 0 20px 0"
          headingLevel="h2"
        />

        {/* Conditionally render the slider if there are more than 3 items */}
        {showSlider ? (
          <SlickSlideWrapper
            arrows={true}
            dots={false}
            slidesToShow={isMobile ? 1.1 : 3}
            infinite={false}
            changeBodyStyle={"TopStreamsBox"}
            marginBottom={0}
          >   
            {showdata?.map((college, index) => (
               <div key={college?.msid || index}>
               <FeaturedCollegesWidget 
                 title={college?.title} 
                 location={college.collegeLoc?.city} 
                 highestPackage={college?.highestPackage} 
                 averageFees={college?.averageFees} 
                 college_info={college?.college_info}
                 link={college.seopath} 
                 msid={college.msid} 
                 brochureMsid={college?.brochureMsid}
                 brouchureThumSize={college?.broucherThumbSize}
                 collegeName={college?.title}
                 collegeDiscipline={college?.collegeDiscipline}
                 iconUrl={getNewImageUrl({
                   msid: college?.msid,
                   imageSize: college?.leadImage?.thumbsize || '',
                   imgWidth: 200, 
                   imgHeight: 600,
                   is1x1Img: false,
                   isArticleBanner: false,
                 })}

               />
             </div>
            ))}
          </SlickSlideWrapper>
        ) : (
          // If there are 3 or fewer items, show them without the slider
          <div className={s['NoSlider']}>
            {showdata?.map((college, index) => (
                <div key={college?.msid || index}>
                <FeaturedCollegesWidget 
                  title={college?.title} 
                  location={college.collegeLoc?.city} 
                  highestPackage={college?.highestPackage} 
                  averageFees={college?.averageFees} 
                  college_info={college?.college_info}
                  link={college.seopath} 
                  msid={college.msid} 
                  brochureMsid={college?.brochureMsid}
                  brouchureThumSize={college?.broucherThumbSize}
                  collegeName={college?.title}
                 collegeDiscipline={college?.collegeDiscipline}

                  iconUrl={getNewImageUrl({
                    msid: college?.msid,
                    imageSize: college?.leadImage?.thumbsize || '',
                    imgWidth: 200, 
                    imgHeight: 600,
                    is1x1Img: false,
                    isArticleBanner: false,
                  })}
                />
              </div>
            ))}
          </div>
        )}

      </ContainerBox>
    </div>
  );
};

export default FeaturedColleges;
