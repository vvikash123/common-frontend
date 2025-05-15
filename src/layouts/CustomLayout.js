import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";

export default function Layout({
  children,
  data,
  breadCrumbData,
  customSchema = false,
  showLernMore,
  isMobile,
}) {
  return isMobile ? (
    <MobileLayout
      data={data}
      customSchema={customSchema}
      breadCrumbData={breadCrumbData}
      showLernMore={showLernMore}
      isMobile={isMobile}
    >
      {children}
    </MobileLayout>
  ) : (
    <DesktopLayout
      data={data}
      breadCrumbData={breadCrumbData}
      customSchema={customSchema}
      showLernMore={showLernMore}
      isMobile={isMobile}
    >
      {children}
    </DesktopLayout>
  );
}
