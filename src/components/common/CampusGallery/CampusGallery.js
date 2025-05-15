import React, { useState } from "react";
import s from "./CampusGallery.module.scss";
import TitleComponent from "../TitleComponent/TitleComponent";
import CommonGridBox from "../CommonGridBox/CommonGridBox";
import SpriteIcon from "../Svg/SpriteIcon";

const CampusGallery = ({ margin = "0px", isMobile }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    "https://static.tnn.in/thumb/msid-114113471,thumbsize-193196,width-1280,height-720,resizemode-75/114113471.jpg?quality=100",
    "https://static.tnn.in/thumb/msid-114113471,thumbsize-193196,width-1280,height-720,resizemode-75/114113471.jpg?quality=100",
    "https://static.tnn.in/thumb/msid-114113471,thumbsize-193196,width-1280,height-720,resizemode-75/114113471.jpg?quality=100",
    "https://static.tnn.in/thumb/msid-114113471,thumbsize-193196,width-1280,height-720,resizemode-75/114113471.jpg?quality=100",
    "https://static.tnn.in/thumb/msid-114113471,thumbsize-193196,width-1280,height-720,resizemode-75/114113471.jpg?quality=100",
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={s['CampusGallery']} style={{ margin }}>
      <TitleComponent
        title="SRM Campus Gallery"
        margin="0px 0 20px 0"
        headingLevel="h3"
      />
      <span className={s['TotalNo']}>Total {images.length} Photos</span>
      <CommonGridBox gridType={'gridBox'} changeStyle={ isMobile ? 'grid-2' : 'grid-3'} yGap={10} xGap={10}>
        {images.map((image, index) => (
          <div className={s['CampusGalleryImg']} key={index} onClick={() => handleImageClick(image)}>
           <i> <SpriteIcon IconName="VideoIcon" /></i>
            <img src={image} alt={`Campus Gallery Image ${index + 1}`} />
          </div>
        ))}
      </CommonGridBox>

      {/* Modal for image popup */}
      {selectedImage && (
        <div className={s['modal']} onClick={closeModal}>
          <span className={s['close']} onClick={closeModal}>&times;</span>
          <img className={s['modalContent']} src={selectedImage} alt="Selected Campus Image" />
        </div>
      )}
    </div>
  );
};

export default CampusGallery;
