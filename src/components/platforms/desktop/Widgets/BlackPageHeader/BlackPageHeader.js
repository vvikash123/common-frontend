import style from "./BlackPageHeader.module.scss";
import history from "@/utils/history";
import TopicSearchBar from "@/components/common/SearchBar/TopicsSearchBar";
import TitleComponent from "@/components/common/TitleComponent/TitleComponent";
import SpriteIcon from "@/components/common/Svg/SpriteIcon";
import AuthorInfo from "./AuthorInfo";
import DoctorInfo from "./DoctorInfo";
import { getAuthorImageUrl } from "@/utils/common";
import NextImage from "@/utils/NextImage";

const BlackPageHeader = (props) => {
  const {
    marginBottom = 0,
    getMSID = "",
    isMobile,
    textTitle = "",
    showSearchbar = false,
    boldText,
    fromAuthor = false,
    fromDoctor = false,
    responseData,
    showAuthor = false,
    authorInfo = {},
  } = props;

  const siteUrl = process.env.NEXT_PUBLIC_WEBAPP_BASE_URL;
  return (
    <>
      <div
        className={style.BlackPageHeader}
        style={{ marginBottom: `${marginBottom}px` }}
      >
        <div className={style.container}>
          <div className={style.BlackPageRow}>
            {fromAuthor &&
              (fromDoctor ? (
                <DoctorInfo
                  doctorData={responseData?.sections?.author_show?.data || null}
                />
              ) : (
                <AuthorInfo
                  authorData={responseData?.sections?.author_show?.data || null}
                />
              ))}

            {showAuthor ? (
              <div className={style.showAuthor}>
                <h1>{textTitle}</h1>
                <div className={style.showAuthorInfo}>
                  
                  <p>
                  {
                authorInfo?.id ? (
                  <a
                  href={`${siteUrl}/author/${authorInfo?.seoname}-${authorInfo?.id}`}
                    title={authorInfo?.name}
                >
                      <i>
                      <NextImage
                    src={getAuthorImageUrl({
                      msid:  authorInfo?.id || null,
                    })}
                  />
                  {/*<SpriteIcon IconName="blueRightCheck" />*/}
                </i>
                
                 
                <strong>{authorInfo?.name}</strong>

                </a>
                  ) : (
                    <>
                    <NextImage
                    src={`${process.env.NEXT_PUBLIC_PHOTO_API}/authorthumb/${authorInfo?.id}.cms?width=70&height=70&hid=1005' alt='author-${authorInfo?.id}`}
                  />
                <strong>{authorInfo?.name}</strong>
                </>
                  )
                  }
                  </p>
                  {/* <i>
                    <SpriteIcon IconName="blueRightCheck" />
                  </i>
                  <p>
                    MEDICALLY REVIEWED BY{" "}
                    <a
                      href={`${siteUrl}/author/${authorInfo?.seoname}-${authorInfo?.id}`}
                      title={authorInfo?.name}
                    >
                      <strong>{authorInfo?.name}</strong>
                    </a>
                  </p> */}
                </div>
              </div>
            ) : (
              !fromAuthor && (
                <TitleComponent
                  titleType={"h1"}
                  moreButtonLink={""}
                  titleText={textTitle}
                  boldText={boldText}
                  marginBottom={0}
                  changeStyle={"white-title"}
                  titleBreak={`a-z-header-br`}
                />
              )
            )}

            {showSearchbar && (
              <div className={style.Inputsearch}>
                <TopicSearchBar
                  history={history}
                  toggleSearchBarFn={() => {}}
                  toggleHamBurgerFn={() => {}}
                  isSeachResult={true}
                  searchBarPropDrillingFlag="from-header"
                  isHamburgerRender={true}
                  isHamburgerOpen={true}
                  isHamburgerVisible={true}
                  getMSID={getMSID}
                  searchedString=""
                  isTrending={() => {}}
                  changeStyle={`a-z-header`}
                  marginTop={0}
                  marginBottom={isMobile ? 0 : 0}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlackPageHeader;
