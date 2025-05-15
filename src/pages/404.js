import { useEffect, useState } from 'react';
import Layout from "@/layouts/CustomLayout";
import { default as NotFound404Desktop } from "@/components/platforms/desktop/NotFound/404";
import { default as NotFound404Mobile } from "@/components/platforms/mobile/NotFound/404";
import { ERROR_NAVIGATION_ITEM, ERROR_FOOTER } from "@/constants";
import DynamicMetasLinks from '@/helpers/seo/DynamicMetasLinks';

const Custom404 = () => {
  const [isMobile, setIsMobile] = useState(false);
  const data = {
    headerData: ERROR_NAVIGATION_ITEM,
    footerData: ERROR_FOOTER,
    errorPage:true,
    seo:{
      msid:151002052,
      title:'404 Page'
    }
  };
  // utils/isMobileClient.js
 const getDeviceTypeClient = () => {
  const userAgent = navigator.userAgent || '';
  const isMobile = /Mobile|Android|BlackBerry|IEMobile|Silk/.test(userAgent);
  return isMobile ? 'mobile' : 'desktop';
};
const breadCrumbData = data?.seopath || "404 Page";


  useEffect(() => {
    const deviceType = getDeviceTypeClient();
    setIsMobile(deviceType === 'mobile');
  }, []);
  return (
    <>
    <DynamicMetasLinks seoData={data} />

    <Layout data={data}  isMobile={isMobile} breadCrumbData={breadCrumbData}>
      {isMobile ? <NotFound404Mobile /> : <NotFound404Desktop />}
    </Layout>
    </>
  );
};

export default Custom404;
