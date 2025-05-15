import style from "./RhsRelatedTopic.module.scss";
import SpriteIcon from "@/components/common/Svg/SpriteIcon";
import { generateUrlPath, removeHtmlTags } from "@/utils/common";

const RhsRelatedTopic = ({ data = [] }) => {
  const siteUrl = process.env.NEXT_PUBLIC_WEBAPP_BASE_URL;
  return data && data.length > 0 ? (
    <div className="RelatesTopics">
      <p className="Heading">RELATED TOPICS</p>
      <ul>
        {data.slice(0, 3).map((item, index) => {
          const authors = item?.authors?.length > 0 ? item?.authors[0] : {};
          return (
            <li key={index}>
              <a href={generateUrlPath(item)} title={item?.title || ''}>
                {removeHtmlTags(item?.title || '')}
              </a>
              <span>
                {/*<SpriteIcon IconName="blueRightCheck" />*/} 
                <strong><a href={`${siteUrl}/author/${authors?.seoname}-${authors?.id}`} title={authors?.name || ''}>{authors?.name || ''}</a></strong>
              </span>
            </li>
          );
        })}
      </ul>
      <style jsx global>
      {`
   
   .RelatesTopics {
    width: 100%;
    padding: 0 15px;
 }
  .RelatesTopics .Heading {
    opacity: 0.6;
    color: rgba(15, 47, 79, 1);
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 10px;
 }
  .RelatesTopics ul {
    list-style-type: none;
 }
  .RelatesTopics ul li {
    width: 100%;
    background: #f5f5f8;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 12px;
 }
  .RelatesTopics ul li > a {
    color: #21409a;
    font-size: 16px;
    font-weight: 900;
    display: block;
 }
  .RelatesTopics ul li span {
    font-size: 12px;
    color: #586489;
    padding: 10px 0 0 0;
    display: flex;
    align-items: center;
 }
  .RelatesTopics ul li span svg {
    width: 14px;
    height: 14px;
    margin-right: 4px;
 }
  .RelatesTopics ul li span strong {
    margin-left: 4px;
 }
  .RelatesTopics ul li span strong a {
    color: #586489;
 }
  
      `}
    </style>
    </div>
  ) : null;
};

export default RhsRelatedTopic;
