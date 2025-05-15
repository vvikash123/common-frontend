import React, { useState, useCallback } from 'react';
import VideoShow from '@/components/platforms/amp/Widgets/VideoShowAmp/VideoShow';

const VideoShowComponent = ({ responseData, loadVideoShowDataFn, params, navigation, seo, seopath, getMSID }) => {
  const [msid, setMsid] = useState(0);
  const [breadNavigation, setBreadNavigation] = useState({});
  const [breadSeopath, setBreadSeopath] = useState('/');

  const sections = responseData?.sections || [];
  // const sections = featured || [];


  const Widgets = {
    detail: VideoShow,
  };

  const onLoadMore = useCallback(
    (msid) => {
      if (!msid) return null;

      loadVideoShowDataFn(params, msid, true);
      setMsid(msid);
    },
    [loadVideoShowDataFn, params]
  );

  const updateNavigation = (value) => {
    setBreadNavigation(value || {});
  };

  const updateSeo = (value) => {
    setBreadSeopath(value?.seopath ? value.seopath : '/videos');
  };

  const setHandlePageTargetingDataFun = (data) => {
    // Handle page targeting data function can be implemented here if needed
  };

  const componentRenderer = (componentData , componentConfig) => {
    const { widgetType } = componentData;
    const Widget = Widgets[widgetType];
    if (!Widget) {
      return null;
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
             msid={componentData.msid ? componentData.msid : msid}
            //  breadNavigation={this.updateNavigation}
            //  breadSeopath={this.updateSeo}
             nextmsid={componentData?.nextmsid}
             navigation={navigation}
            //  onLoadMore={this.onLoadMore}
             commonWidgets={componentData?.commonWidgets}
             dataLoading={componentData?.dataLoading}
            //  {...componentData}
             seoDataInfo={componentData?.seoDataInfo}
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
    </>
  );
};


export default VideoShowComponent;
