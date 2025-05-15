import { useRouter } from 'next/router';
import MultiVideoPlayer from '@/components/common/MultiVideoPlayer/MultiVideoPlayer';

const ShowEmbedVideo = () => {
  const router = useRouter();
  const { id, msid, hostid } = router.query;
  return (
    <div className='abc'>
      <MultiVideoPlayer
        data={{
          media: {
            id: id,
            msid: msid,
          },
        }}
        index={0}
        idx={0}
        style={{}}
        articleLength={1}
        mainData={{}}
        msid={msid}
        hostId={hostid}
        categoryType={null}
        videoCount={1}
        channelTitle={id}
        isAutoplay={true}
      />
    </div>
  );
};

export default ShowEmbedVideo;
