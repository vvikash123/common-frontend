// shared/layouts/DesktopLayout.js
import DesktopHeader from "@/components/platforms/desktop/Header/Header";
import DesktopFooter from "@/components/platforms/desktop/Footer/Footer";
import BreadCrumb from "@/components/common/BreadCrumb/BreadCrumb";
import TopProgressBar from "@/components/common/TopProgressBar/TopProgressBar";
import LearnMore from "@/components/common/LearnMore/LearnMore";
//import s from './desktopLayout.module.scss';

const DesktopLayout = ({
  children,
  data,
  breadCrumbData,
  customSchema = false,
  showLernMore,
}) => {
  const LernMore = showLernMore ? showLernMore : false;
  return (
    <>
      <DesktopHeader headerData={data?.headerData} />
      {!LernMore && (
        <BreadCrumb
          BreadCrumbData={breadCrumbData}
          customSchema={customSchema}
          isShowPage={true}
        />
      )}
      <>{children}</>

      <DesktopFooter footerData={data?.footerData} />
    </>
  );
};

export default DesktopLayout;
