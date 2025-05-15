import React, { useState, useEffect } from 'react';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './ShortVideosComponet.module.scss';

const Progressbar = ({ mediaId }) => {
  const [duration, setDuration] = useState('');
  const [totalDuration, settotalDuration] = useState('');

  const updateDurationHandler = () => {
    try {
      setDuration(window?.['player' + mediaId]?.store?.video?.currentTime);
      settotalDuration(window?.['player' + mediaId]?.store?.video?.duration);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (window?.['player' + mediaId]?.store?.video?.paused !== true) {
      setInterval(() => {
        updateDurationHandler();
      });
    }
  });
  let progressPointer = (duration / totalDuration) * 100 + '%';

  return (
    <div className={style['w-100']}>
      <div className={style['range-slider']}>
        <div
          style={{ width: progressPointer }}
          className={style['duration']}
        ></div>
        {/* <div
          style={{ left: progressPointer }}
          className={style['sv-pointer']}
        ></div> */}
      </div>
    </div>
  );
};

export default Progressbar;
