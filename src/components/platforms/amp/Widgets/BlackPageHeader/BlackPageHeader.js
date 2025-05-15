import TopicSearchBar from "@/components/common/SearchBar/TopicsSearchBar";
import style from "./BlackPageHeader.module.scss"
import TitleComponent from "@/components/common/TitleComponent/TitleComponent";
import history from "@/utils/history";
import NextImage from "@/utils/NextImage";
import { getAuthorImageUrl } from "@/utils/common";
import SpriteIcon from "@/components/common/Svg/SpriteIcon";

const BlackPageHeader = (props) => {
  const { marginBottom = 0, getMSID = "", isMobile, textTitle = '', showSearchbar = false, boldText, fromAuthor, fromDoctor, responseData, showAuthor=false, authorInfo={} } = props;
  const siteUrl = process.env.NEXT_PUBLIC_WEBAPP_BASE_URL
  return (
    <>
      <div className={style.BlackPageHeader}>
        <div className={style.container}>
          <div className={style.BlackPageRow}>

            {
              fromDoctor && <div className={style.AuthorWidget}>
                Doctor Profile Banner
              </div>
            }

            {
              fromAuthor && <div className={style.AuthorWidget}>
                <div className={style.Left}>
                  <i>
                    <NextImage
                      // changeStyle={changeStyle}
                      src={getAuthorImageUrl({
                        msid: responseData?.sections?.author_show?.data?.id || null,
                      })}
                    // src={getNewImageUrl({
                    //   msid: '151000461',                                                                    
                    // })}

                    // priority={true}
                    />
                  </i>
                  <div>
                    <h2>{responseData?.sections?.author_show?.data?.name}</h2>
                    <p>{responseData?.sections?.author_show?.data?.desc}</p>
                  </div>
                </div>
                <div className={style.Right}>
                  <span>Follow us</span>
                  <ul className={style.ul}>
                    <li>
                      <a href="#">
                        <NextImage
                          src={`${siteUrl}/assets/health-images/images/linkIcon.svg`}
                          alt="heart-healthy-food"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <NextImage
                          src={`${siteUrl}/assets/health-images/images/twitter.svg`}
                          alt="heart-healthy-food"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <NextImage
                          src={`${siteUrl}/assets/health-images/images/fbIcon.svg`}
                          alt="heart-healthy-food"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <NextImage
                          src={`${siteUrl}/assets/health-images/images/linkedin.svg`}
                          alt="heart-healthy-food"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <NextImage
                          src={`${siteUrl}/assets/health-images/images/whatsapp-icon.svg`}
                          alt="heart-healthy-food"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            }


{showAuthor ? (
  <div className={style.showAuthor}>
  <h1>{textTitle}</h1>
  <div className={style.showAuthorInfo}>
    {/*<i>  <SpriteIcon IconName="blueRightCheck" /></i>*/}
    <p> <strong>{authorInfo.name}</strong></p>
  </div>
</div>
) : (
  <TitleComponent
  titleType={"h2"}
  moreButtonLink={""}
  changeStyle={'white-title'}
  marginBottom={14}
  titleBreak={`a-z-header-br`}
  titleText={textTitle}
  boldText={boldText}

/>
)} 
            
            {showSearchbar && (
              <div className={`${style.Inputsearch}`}>
                <TopicSearchBar
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
                  isTrending={() => { }}
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
  )
}


export default BlackPageHeader;