import React from 'react';
import style from './NearbyHealthHub.module.scss';
import ContainerBox from '@/components/common/ContainerBox/ContainerBox';
import Typography from '@/components/common/Typography/Typography';
import TitleComponent from '@/components/common/TitleComponent/TitleComponent';
import TrendingTags from '@/components/common/TrendingTags/TrendingTags';
import Maps from '@/components/common/Maps/Maps';
import NewSearchBar from '@/components/common/SearchBar/NewSearchBar';
import history from '@/utils/history';
import InputTextBox from '@/components/common/InputTextBox/InputTextBox';
import CustomSlideBox from '@/components/common/CustomSlideBox/CustomSlideBox';

const dataList = [
  {
    name: "Breast Cancer",
  },
  {
    name: "BMI Calculator",
  },
  {
    name: "BMR Calculator",
  },
  {
    name: "Ovulation Calculator",
  },
  {
    name: "Medicine Identifier",
  },
  {
    name: "Medication Reminder",
  },
  {
    name: "Nutrient Calculator",
  },
  {
    name: "BMI Calculator",
  },
  {
    name: "BMR Calculator",
  },
  {
    name: "Ovulation Calculator",
  },
  {
    name: "Medicine Identifier",
  },
  {
    name: "Medication Reminder",
  },
  {
    name: "Nutrient Calculator",
  },
  {
    name: "BMI Calculator",
  },
  {
    name: "BMR Calculator",
  },
  {
    name: "Ovulation Calculator",
  },
  {
    name: "Medicine Identifier",
  },
  {
    name: "Medication Reminder",
  },
  {
    name: "Nutrient Calculator",
  },
];
function NearbyHealthHub(props) {
  const { langConstant = {}, translations, addLangPath, lang, marginBottom, setSearchStringFn, getMSID } = props;
  return (
    <section className={`${style['NearbyHealthHub']}`} style={{ marginBottom: `${marginBottom}px` }}>
      <ContainerBox>
        <div>
          <Typography
            elementType={'p'}
            textValue={'NEARBY CLINICS & LABS'}
            changeStyle={'near-by-health-hub-small'}
            marginBottom={15}
          />

          <TitleComponent
            titleType={'h2'}
            titleText={'Explore 240+ doctors, clinics & labs near you!'}
            boldText={['near', 'you!']}
            marginBottom={20}
            changeStyle={'near-by-health-hub-title'}
          />

          <div className={`${style['search-bar']}`}>
            <InputTextBox
              iconName={'locationMarkIcon'}
              iconWidth={16}
              iconHeight={16}
              elementType={'selectBox'}
              changeStyle={'with-grey-bg'}
              marginTop={0}
              marginBottom={0}
            />
            <NewSearchBar
              history={history}
              toggleSearchBarFn={ () => { }}
              toggleHamBurgerFn={ () => { } }
              isSeachResult={true}
              searchBarPropDrillingFlag="from-header"
              isHamburgerRender={true}
              isHamburgerOpen={true}
              isHamburgerVisible={true}
              getMSID={getMSID}
              searchedString=""
              isTrending={ () => {  }}
              changeStyle={'with-grey-bg'}
              marginTop={0}
              marginBottom={0}
            />
          </div>

          <Typography
            elementType={'p'}
            textValue={'TRENDING SEARCHES'}
            smallTextIcon={'greenStockArrow'}
            changeStyle={'trending-search'}
            marginBottom={10}
          />

          {/* <CommonGridBox xGap={8} yGap={8} changeStyle={'trending-search'} flexWrap={'wrap'}> */}
          <CustomSlideBox>
            {dataList.map((data, idx) => (
              <li key={idx}>
                <TrendingTags
                  isConditionalRendering={true}
                  type={'strongText'}
                  textValue={data.name}
                  changeStyle={'bg-grey-color-2'}
                />
              </li>
            ))}
          </CustomSlideBox>
          {/* </CommonGridBox> */}
        </div>
        <div>
          <Maps isConditionalRendering={true} />
        </div>
      </ContainerBox>
    </section>
  )
}

NearbyHealthHub.defaultProps = {
  marginBottom: 60,
  placeHolderText: 'Search conditions, doctors, clinics,...',
};

export default NearbyHealthHub