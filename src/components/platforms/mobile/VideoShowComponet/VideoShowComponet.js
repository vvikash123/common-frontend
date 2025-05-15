import ShortStories from '@/components/platforms/mobile/Widgets/ShortStories/ShortStories';
import HealthAtoZ from '@/components/platforms/mobile/Widgets/HealthAtoZ/HealthAtoZ';
import VideoShow from '@/components/platforms/mobile/Widgets/VideoShow/VideoShow';

const VideoShowComponent = ({ responseData, params, navigation,getMSID,isMobile }) => {
  const msid=0; 
  const sections = responseData?.sections || [];
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
        <div key={componentData.msid}>{`component for ${componentData.widgetType} to come here`}</div>
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
            //  setHandlePageTargetingDataFn={this.setHandlePageTargetingDataFun}
            isMobile={isMobile}

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
          marginBottom={0}

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
