
import MultiVideoPlayer from "@/components/common/MultiVideoPlayer/MultiVideoPlayer";
const VideoShow = ({msid, img}) => {
  return <MultiVideoPlayer
  data={{
    media: {
      id: msid,
      msid: '',
    },
  }}
  index={11}
  idx={11}
  articleLength={1}
  videoCount={1}
  channelTitle={msid || ''}
  mainData={{}}
  thumbImg={img}
  style={''}
  msid={msid}
  isMobile={true}
/>
}

export async function getServerSideProps(context) {

  const { req,query } = context;
        const msid = query.id; 
        const img = query?.img || ''
    
    return {
    props: {
      msid,
      img,
    },
  };
}
 
export default VideoShow;