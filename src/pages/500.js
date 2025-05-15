import { useEffect, useState } from 'react';
import Layout from "@/layouts/CustomLayout";
import { default as Error500Desktop } from "@/components/platforms/desktop/Error500/500.js";
import { default as Error500Mobile } from "@/components/platforms/mobile/Error500/500.js";
import { ERROR_NAVIGATION_ITEM, ERROR_FOOTER } from "@/constants";
import DynamicMetasLinks from '@/helpers/seo/DynamicMetasLinks';

const Custom404 = () => {
  const [isMobile, setIsMobile] = useState(false);
  const data = {
    headerData: ERROR_NAVIGATION_ITEM,
    footerData: ERROR_FOOTER,
    errorPage:true,
  };
  // utils/isMobileClient.js
 const getDeviceTypeClient = () => {
  const userAgent = navigator.userAgent || '';
  const isMobile = /Mobile|Android|BlackBerry|IEMobile|Silk/.test(userAgent);
  return isMobile ? 'mobile' : 'desktop';
};


  useEffect(() => {
    const deviceType = getDeviceTypeClient();
    setIsMobile(deviceType === 'mobile');
  }, []);

  return (
    <>
    <DynamicMetasLinks seoData={data} />

    <Layout data={data} isMobile={isMobile}>
      {isMobile ? <Error500Mobile /> : <Error500Desktop />}
    </Layout>
    </>
  );
};

export default Custom404;
