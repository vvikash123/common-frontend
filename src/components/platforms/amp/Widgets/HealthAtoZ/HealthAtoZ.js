import React from "react";
import style from "./HealthAtoZ.module.scss";
import TrendingTags from "@/components/common/TrendingTags/TrendingTags";
import TitleComponent from "@/components/common/TitleComponent/TitleComponent";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import { generateUrlPath } from "@/utils/common";

const HealthAtoZ = (props) => {
  const { marginTop = 0, marginBottom = 0, componentData, topic } = props;
  return (
    componentData?.data?.children?.length > 0 && (
      <>

        <section
          className='HealthConditions'
          style={{
            marginTop: `${marginTop}px`,
            marginBottom: `${marginBottom}px`, 
          }}
          key={props.key}
        >
          <ContainerBox>
            <div className={`${style["row"]}`}>
              <div className={`${style["left"]}`}>
                <div className="AMpTitle">
                <TitleComponent
                  titleType={componentData?.headingType || "h2"}
                  // moreButtonLink={componentData?.data?.seopath || ""}
                  titleText={componentData?.data?.title?.slice(0,6) || ""}
                  fromHealthMobile={true}
                  // boldText={["Conditions", "A-Z"]}
                />                
                <TitleComponent
                  titleType={componentData?.headingType || "h2"}
                  moreButtonLink={`/${componentData?.data?.seopath || ""}`}
                  titleText={componentData?.data?.title?.slice(6,componentData?.data?.title?.length)|| ""}
                  boldText={["Conditions", "A-Z"]}
                />
                </div>
                <div className="ulBox">
                  {componentData?.data?.children?.map((item, index) => (
                    <li key={`trendingtag1_${props.key}_${index}`}>
                      <TrendingTags
                        // className={item?.title == "A" ? "activeAZ"  : ""}
                        key={index}
                        isConditionalRendering={true}
                        type={"normalText"}
                        seopath={item.seopath}
                        textValue={item.title}
                        changeStyle={""}
                        fromAtoZ={true}
                        wrapper={"anchor"}
                        isActive={item?.title == "A" ? "activeAZ"  : ""}
                        fromAmp={true}
                      />                      
                    </li>
                  ))}
                </div>
              </div>
              <ul className='ampAtoZ'>
                {componentData?.data?.terms?.children?.map((item, index) => (
                  <li
                    className={`${style[item.active]}`}
                    key={`trendingtag2_${props.key}_${index}`}
                  >
                    <TrendingTags
                      isConditionalRendering={true}
                      wrapper={"anchor"}
                      type={"normalText"}
                      textValue={item.title}
                      changeStyle={""}
                      seopath={generateUrlPath(item)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </ContainerBox>
        </section>
        <style jsx global>
      {`
  
 
  .AMpTitle h2 {
    color: #0f2f4f;
    font-size: 2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 110%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0 12px;
    text-decoration: none;
  }
  
  .AMpTitle h2 span {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background: #21409a;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .AMpTitle h2 span svg {
    width: 15px;
    height: 17px;
  }

 

  .HealthConditions {
    width: 100%;
    background: #21409a0d;
    padding: 30px 15px;
}

.ulBox {
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  list-style: none;
}

.ulBox li {
  margin: 0 13px 16px 0px;
}

.ulBox li button {
  border: 1px solid #0f2f4f40;
  width: 40px;
  height: 40px;
  border-radius: 100px;
  line-height: 40px;
  text-align: center;
  color: #0f2f4f;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  justify-content: center;
}


.ulBox li a {
  border: 1px solid #0f2f4f40;
  width: 40px;
  height: 40px;
  border-radius: 100px;
  line-height: 40px;
  text-align: center;
  color: #0f2f4f;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  justify-content: center;
  display: block;
}

ul.ampAtoZ li {
  border-bottom: 1px solid #e1e4e9;
  display: flex;
  border-top: 1px solid #e1e4e9;
  align-items: center;
  padding: 18px 0;
}

ul.ampAtoZ {
  width: 100%;
  display: flex;
  flex-direction: column;
  list-style: none;
}

ul.ampAtoZ li a {
  color: #0f2f4f;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  padding-left: 23px;
  display: inline-block;
  text-align: left;
  line-height: 110%;
  background-image: url(/assets/icons/health/arrow-icon-dark.svg);
  background-repeat: no-repeat;
  background-position: left center;
}

.ulBox li a.activeAZ{
  background: #00274e;
  color: #fff;
}
  
`}
    </style>
      </>
    )
  );
};

export default HealthAtoZ;
