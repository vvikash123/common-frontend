import ShortStories from '@/components/platforms/desktop/Widgets/ShortStories/ShortStories';
import HealthAtoZ from '@/components/platforms/desktop/Widgets/HealthAtoZ/HealthAtoZ';
import VideoShow from '@/components/platforms/desktop/Widgets/VideoShow/VideoShow';
import VideoLeadStory from '../Widgets/VideoLeadStory/VideoLeadStory';

const VideoShowComponent = ({ responseData, params, getMSID }) => {
  const sections = responseData?.sections || [];
  const data = sections?.featured?.data?.slice(0, 1)[0] || []
  const dataArray = sections?.featured?.data?.filter((item) => item.cmstype === "MEDIAVIDEO")  || []
  const Widgets = {
    detail: VideoShow,
    SHORT_STORY_LIST: ShortStories,
    HealthAtoZ: HealthAtoZ,
  };


  const componentRenderer = (componentData, componentConfig) => {
    const { widgetType } = componentData;
    const Widget = Widgets[widgetType];
    if (!Widget) {
      return process.env.NODE_ENV === 'production' ? null : (
        <div key={componentData.msid}>{`component for ${componentData.widgetType} to come here`}</div>
      );
    }
    if (Widget == VideoShow) {
      return (
        <>
          {data && (
            <div key={`lead_story_${sections?.widgetType}`}>
              <VideoLeadStory
                key={`widget_lead_${sections?.widgetType}`}
                params={sections?.params}
                componentData={sections || {}}
                data={[data] || []}
                isConditionalRendering={true}
                getMSID={sections?.getMSID}
                sectionIndex={0}
                nextVideo={dataArray}
                pagetype={'show'}
              />
            </div>
          )}
        </>
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
            componentRenderer(sections[section], section)
          )}
        </div>
      </section>
    </>
  );
};



export default VideoShowComponent;
