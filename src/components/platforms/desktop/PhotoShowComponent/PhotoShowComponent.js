import PhotoShow from '@/components/platforms/desktop/Widgets/PhotoShow/PhotoShow';
import HealthAtoZ from '../Widgets/HealthAtoZ/HealthAtoZ';
import QuickStories from '../Widgets/QuickStories/QuickStories';

const VideoShowComponent = ({ responseData, loadVideoShowDataFn, params, navigation, seo, seopath, getMSID , isMobile }) => {

  const sections = responseData?.sections || [];

  const Widgets = {
    photo_show: PhotoShow,
    quick_stories : QuickStories,
    HealthAtoZ: HealthAtoZ
  };

  const componentRenderer = (componentData , msid) => {
    const { widgetType } = componentData;
    const Widget = Widgets[widgetType];
    if (!Widget) {
      return process.env.NODE_ENV === 'production' ? null : (
        <div key={componentData.msid}>{`component for ${componentData.widgetType} to come here`}</div>
      );
    }

    return (
        <div>
         <Widget
          key={`widget_${componentData.widgetType}`}
          params={params}
          componentData={componentData || {}}
          data={componentData?.data || []}
          isConditionalRendering={true}
          msid={msid}
          isMobile={isMobile}
          marginBottom={0}

        />
        </div>
    );
  };
  const msid =responseData?.seo?.msid;
  return (
   
    <>
      <section>
        <div>
          {Object.keys(sections).map((section, index) =>
            componentRenderer(sections[section] , msid)
          )}
        </div>
      </section>
    </>
  );
};
export default VideoShowComponent;
