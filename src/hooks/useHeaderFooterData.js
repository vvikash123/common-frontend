// useHeaderFooterData.js
import { useEffect, useState } from 'react';
import { fetchHeaderData, fetchFooterData } from '../api/home';

export function useHeaderFooterData() {
  const [headerData, setHeaderData] = useState(null);
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const header = await fetchHeaderData('desktop');
        const footer = await fetchFooterData();
        setHeaderData(header);
        setFooterData(footer);
      } catch (error) {
        console.error('Error fetching header and footer data:', error);
      }
    };

    fetchData();

    // Optionally, you can add cleanup logic here if needed
  }, []);

  return { headerData, footerData };
}
