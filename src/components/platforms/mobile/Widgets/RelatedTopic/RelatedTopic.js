import { generateUrlPath } from "@/utils/common";
import style from "./RelatedTopic.module.scss"

const RelatedTopic = (props) => {
  const { componentData, heading='Related Article' } = props
  const siteURL = process.env.NEXT_PUBLIC_WEBAPP_BASE_URL;

    return (
        <> 
        <div className={style.RelatedTopicWidget}>
           <span className={style.relatedHead}>{heading}</span>  
           <div className={style.RelatedTopicRow}>
            {componentData?.data?.map((item, index) => {
              const urlParam = item?.seopath?.split('/')[0]
              return (<div className={style.RelatedTopic} key={index}>
                <a href={siteURL + '/' + urlParam}><span>{urlParam}</span></a>
                <a href={generateUrlPath(item)} ><h3>{item?.title}</h3></a>
              </div>
              )
            })}

          </div>     
        </div>
        </>
    )
}

export default RelatedTopic;