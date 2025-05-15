import React, { useState, useEffect, useCallback } from 'react';
import styles from './Offline.module.scss';
import { OFFLINE_MESSAGE, ONLINE_MESSAGE } from '@/constants/index';
import { OfflineIcon, OnlineIcon } from '@/components/common/Svg/Svg';

const OfflineComponent = () => {
  const [active, setActive] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const handleNetworkChange = useCallback(() => {
    setActive(true);
    setIsOnline(navigator.onLine);

    setTimeout(() => {
      setActive(false);
    }, 6000);
  }, []);

  useEffect(() => {
    // Check if window and navigator are available
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      setIsOnline(navigator.onLine);

      window.addEventListener('online', handleNetworkChange);
      window.addEventListener('offline', handleNetworkChange);

      return () => {
        window.removeEventListener('online', handleNetworkChange);
        window.removeEventListener('offline', handleNetworkChange);
      };
    }
  }, [handleNetworkChange]);

  if (!active) {
    return null;
  }

  return (
    <>
      {isOnline ? (
        <div className={`${styles.message_tab} ${styles.sucess}`} id="offline_msg" key="offline_desktop">
          <div className={styles.message_sub_tab}>
            <div className={styles.mess_icon}>
              <OnlineIcon />
            </div>
            <div className={styles.mess_txt}>
              <span>{ONLINE_MESSAGE}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${styles.message_tab} ${styles.error}`} id="offline_msg" key="offline_desktop">
          <div className={styles.message_sub_tab}>
            <div className={styles.mess_icon}>
              <OfflineIcon />
            </div>
            <div className={styles.mess_txt}>
              <span>{OFFLINE_MESSAGE}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OfflineComponent;
