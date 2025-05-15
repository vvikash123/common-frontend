import React, { useState } from 'react';
import ShortStories from '@/components/platforms/amp/Widgets/ShortStories/ShortStories';
import HealthAtoZ from '@/components/platforms/amp/Widgets/HealthAtoZ/HealthAtoZ';
import VideoShow from '@/components/platforms/amp/Widgets/VideoShow/VideoShow';

const VideoShowComponent = ({ responseData, params, navigation,getMSID,isMobile }) => {
  const [msid, setMsid] = useState(0);
  const sections = responseData?.sections || [];
  // const sections = featured || [];


  const Widgets = {
    detail: VideoShow,
    SHORT_STORY_LIST: ShortStories,
    HealthAtoZ: HealthAtoZ,
  };

  const componentRenderer = (componentData , componentConfig) => {
    const { widgetType } = componentData;
    const Widget = Widgets[widgetType];
    if (!Widget) {
      return process.env.NODE_ENV === 'production' ? null : (
        <div key={componentData?.msid}>{`component for ${componentData.widgetType} to come here`}</div>
      );
    }
if(Widget == VideoShow ){
  return (
  <div>
     <Widget
             key={`widget_${componentData.widgetType}`}
             params={params}
             componentData={componentData || {}}
             data={componentData || []}
             isConditionalRendering={true}
             getMSID={getMSID}
             sectionIndex={componentConfig}
             ads={componentData?.ads}
             seo={componentData?.seo}
             ad={componentData?.ad}
             SubNavigation={componentData?.headers}
             dataKey={componentConfig?.dataKey}
             inserts={componentConfig}
             ShowNavigation={componentConfig?.ShowNavigation}
             seopath={componentData?.seopath}
             heading={
               componentConfig.title
                 ? {
                     text: componentConfig.title,
                     type: componentConfig.headingType,
                     link: componentConfig.link,
                   }
                 : undefined
             }
            //  dataGA={{
            //    label: 'Widget',
            //    ...dataConfig.ga,
            //    ...componentGA,
            //  }}
             userInfo={{
               firstName: 'Unknown',
               lastName: 'Pal',
               primaryEmail: 'raj.niet.mca@gmail.com',
               ssoid: '7vpvap14gcjyuio2oqkyjbep7',
               uid: '',
             }}
             msid={componentData?.data?.[0]?.msid ? componentData?.data?.[0]?.msid : msid}

            //  breadNavigation={this.updateNavigation}
            //  breadSeopath={this.updateSeo} 
             nextmsid={componentData?.nextmsid}
             navigation={navigation}
            //  onLoadMore={this.onLoadMore}
             commonWidgets={componentData?.commonWidgets}
             dataLoading={componentData?.dataLoading}
            //  {...componentData}
             seoDataInfo={componentData?.seoDataInfo}
             isMobile={isMobile}
            //  setHandlePageTargetingDataFn={this.setHandlePageTargetingDataFun}
          />
  </div>
  )
}
    return (
        <div>
         <Widget
          key={`widget_${componentData.widgetType}`}
          params={params}
          componentData={componentData || {}}
          data={componentData?.data?.children || []}
          isConditionalRendering={true}
          getMSID={getMSID}
          sectionIndex={componentConfig}
        

        />
        </div>
    );
  };

  return (
    <>
      <section>
        <div>
          {Object.keys(sections).map((section, index) =>
            componentRenderer(sections[section] , section)
          )}
        </div>
      </section>
      <style jsx global>
      
      {`
      
  .video-headingwrap{
    font-size: 1.25rem;
    line-height: 1.5;
    font-family: Georgia, serif;
    color: #1a1818;
    padding: 0 15px 10px;
  }
  .first__synopsis_color{
    font-size: 14px;
    line-height: 1.57;
    letter-spacing: normal;
    color: #121010;
    font-weight: 400;
    padding: 0 15px;
  }

      `}
    </style>
    </>
  );
};

export default VideoShowComponent;
