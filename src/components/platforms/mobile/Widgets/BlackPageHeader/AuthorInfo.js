import NextImage from "@/utils/NextImage";
import style from "./BlackPageHeader.module.scss";
import { getAuthorImageUrl } from "@/utils/common";
const AuthorInfo = ({ authorData }) => {
  const siteUrl = process.env.NEXT_PUBLIC_WEBAPP_BASE_URL;
  const authorlinks = authorData?.authorlinks?.aulinksxml?.links?.link || null;

  return (
    <div className={style.AuthorWidget}>
      <div className={style.Left}>
        <i>
          <NextImage
            // changeStyle={changeStyle}
            src={getAuthorImageUrl({
              msid: authorData?.id || null,
            })}
            // src={getNewImageUrl({
            //   msid: '151000461',
            // })}

            // priority={true}
          />
        </i>
        <div>
          <h1>{authorData?.name}</h1>
          <p>{authorData?.desc}</p>
        </div>
      </div>
      <div className={style.Right}>
        <span>Follow us</span>
        <ul className={style.ul}>
          {authorlinks?.twitter && (
            <li>
              <a href={`${authorlinks?.twitter || "#"}`}>
                <NextImage
                  src={`${siteUrl}/assets/health-images/images/twitter.svg`}
                  alt="heart-healthy-food"
                  layout="fixed"
                  width={30}
                  height={30}
                />
              </a>
            </li>
          )}

          {authorlinks?.instagram && (
            <li>
              <a href={`${authorlinks?.instagram || "#"}`}>
                <NextImage
                  src={`${siteUrl}/assets/health-images/images/linkIcon.svg`}
                  alt="heart-healthy-food"
                  layout="fixed"
                  width={30}
                  height={30}
                />
              </a>
            </li>
          )}

          {authorlinks?.youtube && (
            <li>
              <a href="#">
                <NextImage
                  src={`${siteUrl}/assets/health-images/images/linkedin.svg`}
                  alt="heart-healthy-food"
                  layout="fixed"
                  width={30}
                  height={30}
                />
              </a>
            </li>
          )}

          {authorlinks?.facebook && (
            <li>
              <a href={`${authorlinks?.facebook || "#"}`}>
                <NextImage
                  src={`${siteUrl}/assets/health-images/images/fbIcon.svg`}
                  alt="heart-healthy-food"
                  layout="fixed"
                  width={30}
                  height={30}
                />
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AuthorInfo;
