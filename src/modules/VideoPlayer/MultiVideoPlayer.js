import React, { useEffect, useState } from 'react';
import VideoPlayer from 'modules/VideoPlayer/VideoPlayerLoader';
import LeadVideoStory from '../../components/mobile/Story/LeadVideoStory';
import { CATEGORY_TYPE_LIVE_BLOG_EMBED } from '../../constants/index';

function MultiVideoPlayer(props) {
  const [clickedId, setClickedId] = useState();

  function handleClick(id) {
    localStorage.setItem('isClKId', id);
    props.setSlkId(id);
    props.handleClick('SLK', 0);
  }
  useEffect(() => {
    if (
      localStorage.getItem('isClKId') != null ||
      localStorage.getItem('isClKId') != undefined
    ) {
      setClickedId(localStorage.getItem('isClKId'));
    }
  });

  function startTimeAfterPaused(data) {
    let videoObj =
      localStorage.getItem('isVideoPlayed') &&
      JSON.parse(localStorage.getItem('isVideoPlayed'));
    let abc = {};
    let isObj =
      videoObj &&
      Object.values(videoObj).filter((item) => item.slikeId === data.media.id);
    if (isObj && isObj[0] && isObj[0].slikeId === data.media.id) {
      abc = {
        id: data.media.id,
        startTime: isObj[0] && isObj[0].startTime,
      };
    } else {
      abc = { id: data.media.id, startTime: 0 };
    }
    return abc;
  }

  return (
    <>
      {props && props.videoData && props.videoData.slikeId != clickedId ? (
        props.isYTPlay != true ? (
          <>
            <div onClick={() => handleClick(props.slkId)}>
              <LeadVideoStory
                firstCard={false}
                data={props.data}
                leadStory={false}
                blogCard={true}
                imagePosition={'bg'}
                getMSID={props.data.msid}
                layout={'horizontal'}
                fullHeightcard={props.fullHeightcard}
              />
            </div>
          </>
        ) : (
          <>
            <div onClick={() => handleClick(props.slkId)}>
              <LeadVideoStory
                firstCard={false}
                data={props.data}
                leadStory={false}
                blogCard={true}
                imagePosition={'bg'}
                getMSID={props.data.msid}
                layout={'horizontal'}
                fullHeightcard={props.fullHeightcard}
              />
            </div>
          </>
        )
      ) : (
        <>
          <VideoPlayer
            videoId={startTimeAfterPaused(props.data)}
            categoryType={CATEGORY_TYPE_LIVE_BLOG_EMBED}
            msid={props.msid}
            isPlay={false}
            isVideoStart={true}
            youTubePlayerClose={props.youTubePlayerClose}
            handleClick={props.handleClick}
          />
        </>
      )}
    </>
  );
}
export default MultiVideoPlayer;
