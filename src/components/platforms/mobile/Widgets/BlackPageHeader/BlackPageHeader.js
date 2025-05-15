import dynamic from "next/dynamic";
import style from "./BlackPageHeader.module.scss";
import history from "@/utils/history";
import SpriteIcon from "@/components/common/Svg/SpriteIcon";
import AuthorInfo from "./AuthorInfo";
import DoctorInfo from "./DoctorInfo";
import { getAuthorImageUrl } from "@/utils/common";
import NextImage from "@/utils/NextImage";
const TitleComponent = dynamic(
  () => import("@/components/common/TitleComponent/TitleComponent"),
  { ssr: true }
);
const TopicSearchBar = dynamic(
  () => import("@/components/common/SearchBar/TopicsSearchBar"),
  { ssr: false }
);

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
      <div className={style.BlackPageHeader}>
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
                  {/* <i>
                    {" "}
                    <SpriteIcon IconName="blueRightCheck" />
                  </i> */}
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
                </div>
              </div>
            ) : (
              !fromAuthor && (
                <TitleComponent
                  titleType={"h1"}
                  moreButtonLink={""}
                  changeStyle={"white-title"}
                  marginBottom={14}
                  titleBreak={`a-z-header-br`}
                  titleText={textTitle}
                  boldText={boldText}
                />
              )
            )}

            {showSearchbar && (
              <div className={`${style.Inputsearch}`}>
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
                  changeStyle={""}
                  marginTop={0}
                  marginBottom={isMobile ? 0 : 34}
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
