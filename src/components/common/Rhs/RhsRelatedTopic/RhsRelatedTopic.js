import style from "./RhsRelatedTopic.module.scss";
import SpriteIcon from "@/components/common/Svg/SpriteIcon";
import { generateUrlPath, removeHtmlTags } from "@/utils/common";

const RhsRelatedTopic = ({ data = [], heading='RELATED TOPICS' }) => {
  const siteUrl = process.env.NEXT_PUBLIC_WEBAPP_BASE_URL;
  return data && data.length > 0 ? (
    <div className={style["RelatesTopics"]}>
      <p className={style["Heading"]}>{heading}</p>
      <ul>
        {data.slice(0, 3).map((item, index) => {
          const authors = item?.authors?.length > 0 ? item?.authors[0] : {};
          return (
            <li key={index}>
              <a href={generateUrlPath(item)} title={item?.title || ''}>
                {removeHtmlTags(item?.title || '')}
              </a>
              {heading === 'RELATED TOPICS'? (
                <span>
                {/*<SpriteIcon IconName="blueRightCheck" />*/}
                <strong><a href={`${siteUrl}/author/${authors?.seoname}-${authors?.id}`} title={authors?.name || ''}>{authors?.name || ''}</a></strong>
              </span>
              ) : (
               <span className={style['lastCat']}>
                <strong><a href={siteUrl + '/' + item?.seopath?.split('/')[0]}>{item?.seopath?.split('/')[0]}</a></strong>
              </span>
              ) }
              
            </li>
          );
        })}
      </ul>
    </div>
  ) : null;
};

export default RhsRelatedTopic;
