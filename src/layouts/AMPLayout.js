// shared/layouts/MobileLayout.js
import AmpHeader from "@/components/platforms/amp/Header/AmpHeader";
import AmpFooter from "@/components/platforms/amp/Footer/AmpFooter";
import BreadCrumb from '@/components/platforms/amp/Widgets/BreadCrumb/BreadCrumb';
import TopProgressBar from "@/components/platforms/amp/Widgets/TopProgressBar/TopProgressBar";
import LearnMore from "@/components/common/LearnMore/LearnMore";


const AMPLayout = ({ children, data, breadCrumbData, showLernMore, isMobile }) => {
  const LernMore = showLernMore ? showLernMore : false;

  return (
    <div>
      <AmpHeader headerData={data.headerData} />
     
        {data?.errorPage !== true && (
        <>
          {!LernMore && <BreadCrumb
            BreadCrumbData={breadCrumbData}
            isShowPage={true}
          />
          }
        </>
      )}

      <>{children}</>
    
      <AmpFooter footerData={data?.footerData || {}} />
    </div>
  );
};

export default AMPLayout;