import { fetchHeaderData, fetchFooterData } from '@/pages/api';
import { getDeviceType } from './isMobile';
import { logger } from '../../logger';

const getCommonServerSideProps = async (context) => {
    try {
      const { req } = context;
      const headerData = await fetchHeaderData('desktop');
      const footerData = await fetchFooterData();
      const data = { headerData, footerData };      
      const deviceType = getDeviceType(req.headers);
      const isMobile = deviceType === 'mobile';
  
      logger.info("Common data fetching called");
  
      return {
        props: {
          data,
          isMobile,
          deviceType,
        },
      };
    } catch (err) {
      return {
        props: {
          error: err.message,
        },
      };
    }
  };
  
  export default getCommonServerSideProps;
