import PhotoShow from '@/components/platforms/amp/Widgets/PhotoShow/PhotoShow';

const PhotoShowComponent = ({ responseData, params, navigation, seo, seopath, getMSID , isMobile }) => {

  const sections = responseData?.sections || [];

  const Widgets = {
    photo_show: PhotoShow,
  };

  const componentRenderer = (componentData , msid) => {
    const { widgetType } = componentData;
    const Widget = Widgets[widgetType];
    if (!Widget) {
      return process.env.NODE_ENV === 'production' ? null : (
        <div key={componentData?.msid}>{`component for ${componentData?.widgetType} to come here`}</div>
      );
    }

    return (
        <div>
         <Widget
          key={`widget_${componentData?.widgetType}`}
          params={params}
          componentData={componentData || {}}
          data={componentData?.data || []}
          isConditionalRendering={true}
          msid={msid}
          isMobile={isMobile}
        

        />
        </div>
    );
  };
  const msid =responseData?.seo?.msid;
  return (
   
    <>
      <section>
        <div>
          {Object.keys(sections)?.map((section, index) =>
            componentRenderer(sections[section] , msid)
          )}
        </div>
      </section>
    </>
  );
};

export default PhotoShowComponent;
