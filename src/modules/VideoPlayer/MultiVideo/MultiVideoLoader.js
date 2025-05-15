import React, { useEffect } from 'react';
import SlikePlayer from './MultiVideo';

const VideoPlayerLoader = ({ dataIndex, videoCount, isVideoStarted, nextVideo,
  onVideoStarted ,
  onVideoResumed,
  onVideoPaused,
  onVideoEnded,
  onVideoCompleted,
}) => {
  useEffect(() => {
    // SlikeLoaderScript();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      {dataIndex === videoCount && (
        <SlikePlayer
          isVideoStarted={isVideoStarted}
          nextVideo={nextVideo}
          onVideoStarted ={onVideoStarted}
          onVideoResumed={onVideoResumed}
          onVideoPaused={onVideoPaused}
          onVideoEnded={onVideoEnded}
          onVideoCompleted={onVideoCompleted}
        />
      )}
    </>
  );
};

export default VideoPlayerLoader;
