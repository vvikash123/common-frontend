import { getNewImageUrl } from "@/utils/common";
import Image from "next/image";
import s from "./TopTenWidgetRhs.module.scss"; // Assuming this is your SCSS file

const TopTenWidgetRhs = ({data}) => {
  return (
    <div className={s['rhsWidget']}>
      <div className={s['rhsWidgetTop']}>
        {/* <i><SpriteIcon IconName="newsIcon" /></i> */}
        {/* <p><span>SRM Institute of Science and Technology</span> News & Updates</p> */}
        <p>Top Colleges</p>
      </div>

      <ul className={s['filter']}>
        {/* <li className={s['active']}>Latest</li> */}
        {/* <li>Popular</li> */}
        {/* <li>Top 10</li> */}
      </ul> 

      <ul className={s['NewsUpdates']}>
       {data && data.length > 0 ? 
       data.map((item, index) => <li key={`${index}_rhs_article`}>
          <a href={`${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}/${item?.seopath}`}>
            <Image 
              src={getNewImageUrl({
                          msid: item?.msid || null,
                          imageSize: item?.imageSize || item?.thumbsize || "",
                          imgWidth: 200,
                          imgHeight: 200,
                          is1x1Img: false,
                          isArticleBanner: false,
                          updatedAt: item?.updatedate ? item?.updatedate : "",
                        })}
                        width={200}
                        height={200}
              alt="news"
            />
            <div className={s['Newsinfo']}>
              <h3>{item?.collegeName}</h3>
              <span>{item?.collegeLocation?.city}, {item?.collegeLocation?.state}</span>
            </div>
          </a>
        </li> ) 
        : ''
        }
      </ul>

      {/* <a href="#" className={s['btn']}>View All Updates</a> */}
    </div>
  );
};

export default TopTenWidgetRhs;
