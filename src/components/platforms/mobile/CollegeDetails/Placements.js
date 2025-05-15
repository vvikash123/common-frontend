import CollageDetailInfo from "@/components/common/CollageDetailInfo/CollageDetailInfo";

const Placements = (props) => {
  const { isMobile, data } = props;
  const placementInfo = data?.result?.placementInfo || ""
  return (
    <>
      <CollageDetailInfo
        margin="0px 0 20px"
        title={`About ${data?.result?.collegeShortName}`}
        description={placementInfo}
      />
    </>
  );
};

export default Placements;
