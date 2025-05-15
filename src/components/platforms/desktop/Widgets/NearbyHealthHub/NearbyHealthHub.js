import React from 'react';
import style from './NearbyHealthHub.scss';
import { isMobile } from '@/utils/isMobile';
import ContainerBox from '@/components/common/ContainerBox/ContainerBox';
import Typography from '@/components/common/Typography/Typography';
import TitleComponent from '@/components/common/TitleComponent/TitleComponent';
import CommonGridBox from '@/components/common/CommonGridBox/CommonGridBox';
import TrendingTags from '@/components/common/TrendingTags/TrendingTags';
import Maps from '@/components/common/Maps/Maps';
import NewSearchBar from '@/components/common/SearchBar/NewSearchBar';
import history from '@/utils/history';
import InputTextBox from '@/components/common/InputTextBox/InputTextBox';

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
  const { marginBottom, setSearchStringFn, getMSID } = props;
  return (
    <section className={`${style['NearbyHealthHub']}`} style={{ marginBottom: `${marginBottom}px` }}>
      <ContainerBox>
        <div className={`${style['grid-box']}`}>
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
             {/*
              <NewSearchBar
                history={history}
                toggleSearchBarFn={() => { }}
                toggleHamBurgerFn={() => { }}
                isSeachResult={true}
                searchBarPropDrillingFlag="from-header"
                isHamburgerRender={true}
                isHamburgerOpen={true}
                isHamburgerVisible={true}
                getMSID={getMSID}
                searchedString=""
                setSearchStringFn={setSearchStringFn}
                isTrending={() => { }}
                changeStyle={'with-grey-bg'}
                marginTop={0}
                marginBottom={0}
              />
             */}
            </div>

            <Typography
              elementType={'p'}
              textValue={'TRENDING SEARCHES'}
              smallTextIcon={'greenStockArrow'}
              changeStyle={'trending-search'}
              marginBottom={24}
            />

            <CommonGridBox xGap={8} yGap={8} changeStyle={'trending-search'} flexWrap={'wrap'}>
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
            </CommonGridBox>
          </div>
          <div>
            <Maps isConditionalRendering={true} />
          </div>
        </div>
      </ContainerBox>
    </section>
  )
}

NearbyHealthHub.defaultProps = {
  marginBottom: 60,
  placeHolderText: 'Search conditions, doctors, clinics,...',
};

/*const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  setSearchStringFn: (searchedValue) => {
    dispatch(setSearchString(searchedValue));
  },
});
*/
export default NearbyHealthHub;