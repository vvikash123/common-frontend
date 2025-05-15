import { generateUrlPath } from "@/utils/common"

const RelatedTopic = (props) => {
  const { componentData  , heading} = props
  const siteURL = process.env.NEXT_PUBLIC_WEBAPP_BASE_URL;
    return (
        <> 
        <div className={'RelatedTopicWidget'}>
           <span className={'relatedHead'}>{heading || "Related Article"}</span>       
           <div className={'RelatedTopicRow'}>
            {componentData?.data?.map((item, index) => {
              const urlParam = item?.seopath?.split('/')[0]
              return (<div className={'RelatedTopic'} key={index}>
                <a href={siteURL + '/' + urlParam}><span>{urlParam}</span></a>
                <a href={generateUrlPath(item)} ><h3>{item?.title}</h3></a>
              </div>
              )
            })}
          </div>   
        </div>
        <style jsx global>
      {`
   
   .RelatedTopicWidget {
    background-color: #21409a0d;
    padding: 20px;
  }
  .RelatedTopicWidget .RelatedTopicRow {
    display: flex;
    white-space: nowrap;
    overflow: auto;
  }
  .RelatedTopicWidget .relatedHead {
    color: #586489;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1.4px;
    line-height: 18px;
    text-transform: uppercase;
    padding-bottom: 14px;
    display: block;
  }
  .RelatedTopicWidget .RelatedTopic {
    background-color: #fff;
    width: 100%;
    padding: 12px;
    border-radius: 12px;
    margin-bottom: 12px;
    white-space: normal;
    min-width: 90%;
    margin-right: 10px;
  }
  .RelatedTopicWidget .RelatedTopic:last-child {
    margin-bottom: 0;
  }
  .RelatedTopicWidget .RelatedTopic span {
    color: #1f4ccd;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    padding-bottom: 4px;
    display: block;
  }
  .RelatedTopicWidget .RelatedTopic h3 {
    color: #0f2f4f;
    font-size: 14px;
    font-weight: 900;
    line-height: 22px;
  }
  
  
      `}
    </style>
        </>
    )
}

export default RelatedTopic;