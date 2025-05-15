import VideoLeadStory from '@/components/platforms/mobile/Widgets/VideoLeadStory/VideoLeadStory';
import VideoListing from '@/components/platforms/mobile/Widgets/VideoListing/VideoListing';
import ShortStories from '@/components/platforms/mobile/Widgets/ShortStories/ShortStories';
import HealthAtoZ from '@/components/platforms/mobile/Widgets/HealthAtoZ/HealthAtoZ';
import style from './VideosLisComponent.module.scss';
import { GOOGLE_AD_DESK } from '@/constants/index';
import Advertisement from '@/components/ads/ads';
import ContainerBox from '@/components/common/ContainerBox/ContainerBox';

const VideosLisComponent = ({ responseData , isMobile }) => {
  const sections = responseData?.sections || {};

  // Extract the leadStorySection data
  const leadStorySectionKey = Object.keys(sections)?.find(key => sections[key].widgetType === 'FEATURED');
  const leadStorySection = sections[leadStorySectionKey];
  // Slice the first child for VideoLeadStory and the rest for VideoListing
  const leadStoryData = leadStorySection?.data?.children.slice(0, 1)[0];
  const listingData = leadStorySection?.data?.children.slice(1);
  // console.log('leadStoryData' , leadStoryData)
  // console.log('listingData' , listingData)

  const Widgets = {
    SHORT_STORY_LIST: ShortStories,
    HealthAtoZ: HealthAtoZ,
  };

  const componentRenderer = (componentData, sectionIndex) => {
    const { widgetType } = componentData;
    const Widget = Widgets[widgetType];
    const { params, getMSID } = componentData;

    if (!Widget) {
      return (
        <div>{`Component for ${componentData.widgetType} to come here`}</div>
      );
    }

    return (
      <div
        id="checkview"
        data-title={componentData?.seeMore?.text}
        key={`article_list_widget_${componentData.widgetType}_${sectionIndex}`}
      >
        <Widget
          key={`widget_${componentData.widgetType}_${sectionIndex}`}
          params={params}
          componentData={componentData || {}}
          data={componentData?.data?.children || []}
          isConditionalRendering={true}
          getMSID={getMSID}
          sectionIndex={sectionIndex}
          marginBottom={0}

        />
        {componentData.midAd ? ( // Ads
          <div className={`${style.atfAd}`} id="btf1">
            <Advertisement src={componentData?.midAd || GOOGLE_AD_DESK['about_us']['btf']} />
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <section>
      <div>

        {leadStoryData && (
          <div key={`lead_story_${leadStorySection.widgetType}`}>
              <ContainerBox>
              <h1 className={style['h1Heading']} >Videos</h1>
              </ContainerBox>
            <VideoLeadStory
              key={`widget_lead_${leadStorySection.widgetType}`}
              params={leadStorySection.params}
              componentData={leadStorySection || {}}
              data={[leadStoryData] || []}
              isConditionalRendering={true}
              getMSID={leadStorySection.getMSID}
              sectionIndex={0}
              isMobile={isMobile}
            />
            {leadStorySection?.midAd ? ( // Ads
              <div className={`${style.atfAd}`} id="btf1">
                <Advertisement src={leadStorySection?.midAd || GOOGLE_AD_DESK['about_us']['btf']} />
              </div>
            ) : null}
          </div>
        )}
        {listingData?.length > 0 && (
          <div key={`listing_${leadStorySection.widgetType}`}>
            <VideoListing
              key={`widget_listing_${leadStorySection.widgetType}`}
              params={leadStorySection.params}
              componentData={leadStorySection || {}}
              data={listingData || []}
              isConditionalRendering={true}
              getMSID={leadStorySection.getMSID}
              sectionIndex={1}
              total_records={leadStorySection?.data?.childcount -1 }


            />
            {leadStorySection?.midAd ? ( // Ads
              <div className={`${style.atfAd}`} id="btf1">
                <Advertisement src={leadStorySection?.midAd || GOOGLE_AD_DESK['about_us']['btf']} />
              </div>
            ) : null}
          </div>
        )}
      </div>
      <div>
        {Object.keys(sections).filter(key => key !== leadStorySectionKey).map((sectionKey, index) =>
          componentRenderer(sections[sectionKey], index + 2)
        )}
      </div>
    </section>
  );
};

export default VideosLisComponent;
