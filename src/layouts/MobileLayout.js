import BreadCrumb from "@/components/common/BreadCrumb/BreadCrumb";
import MobileFooter from "@/components/platforms/mobile/Footer/Footer";
import MobileHeader from "@/components/platforms/mobile/Header/Header";

const MobileLayout = ({
  children,
  data,
  breadCrumbData,
  customSchema = false,
  showLernMore,
  isMobile,
}) => {
  const LernMore = showLernMore ? showLernMore : false;

  return (
    <div>
      <MobileHeader headerData={data.headerData} isMobile={isMobile} />
      {!LernMore && (
        <>
          <BreadCrumb
            BreadCrumbData={breadCrumbData}
            isShowPage={true}
            customSchema={customSchema}
          />
        </>
      )}
      <>{children}</>
     
      <MobileFooter footerData={data?.footerData || {}} />
    </div>
  );
};

export default MobileLayout;
