
import React from 'react';
import style from './ToolTrackHub.module.scss';
import ContainerBox from '@/components/common/ContainerBox/ContainerBox';
import TitleComponent from '@/components/common/TitleComponent/TitleComponent';
import CommonGridBox from '@/components/common/CommonGridBox/CommonGridBox';
import TrendingTags from '@/components/common/TrendingTags/TrendingTags';


const dataList = [
  {
    name: "Symptoms Checker",
    icons: "/assets/health-images/tools-trackers/Symptoms.png",
  },
  {
    name: "BMI Calculator",
    icons: "/assets/health-images/tools-trackers/bmi.png",
  },
  {
    name: "BMR Calculator",
    icons: "/assets/health-images/tools-trackers/bmr.png",
  },
  {
    name: "Ovulation Calculator",
    icons: "/assets/health-images/tools-trackers/Ovulation.png",
  },
  {
    name: "Medicine Identifier",
    icons: "/assets/health-images/tools-trackers/Medicine.png",
  },
  {
    name: "Medication Reminder",
    icons: "/assets/health-images/tools-trackers/Medication.png",
  },
  {
    name: "Nutrient Calculator",
    icons: "/assets/health-images/tools-trackers/Nutrient.png",
  },
];

const ToolTrackHub = (props) => {

  const { marginBottom } = props;

  return (
    <>
      <section className={`${style['ToolsTrackers']}`} style={{ marginBottom: `${marginBottom}px` }}>
        <ContainerBox>
          <TitleComponent
            titleType={'h1'}
            moreButtonLink={'/'}
            boldText={['Tools']}
            titleText={'Tools & Trackers'}
            marginBottom={40}
          />
          <CommonGridBox gridType={'flexBox'} changeStyle={'ToolsTrackersList'}>
            {dataList.map((data, idx) => (
              <li key={idx}>
                <TrendingTags
                  isConditionalRendering={true}
                  type={'bigIconWithTextInCircle'}
                  icons={data.icons}
                  textValue={data.name}
                  changeStyle={'tools-tracker'}
                />
              </li>
            ))}
          </CommonGridBox>
        </ContainerBox>
      </section>
    </>
  );
};

ToolTrackHub.defaultProps = {
  marginBottom: 60,
};

export default ToolTrackHub;
