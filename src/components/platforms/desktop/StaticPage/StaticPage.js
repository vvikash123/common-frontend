import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import s from './StaticPage.module.scss';
import GridLayout from "@/components/common/GridLayout/GridLayout";
import GridLhs from "@/components/common/GridLhs/GridLhs";
import GridRhs from "@/components/common/GridRhs/GridRhs";
import { useRouter } from 'next/router';
//import Advertisement from '@/components/ads/ads'
import NewsletterWidget from "../../mobile/Widgets/NewsletterWidget/NewsletterWidget";
import Tags from "@/components/common/Rhs/RhsTags/Tags";
const StaticPage = (props) => {
  const { responseData } = props;
  const sections = responseData?.sections || [];
  const router = useRouter();
    const { static_page } = router.query;
    const rhsWidget = sections?.article_show?.data[0]?.rhs_widget || {}
    const title = sections?.article_show?.data[0]?.title
    const titleClass = title?.replaceAll(' ', '-').toLowerCase();
return (
    <div>
        <div className={`${s['HeroSection']} ${s[titleClass]}`}>
        <div className={`${s['container']}` }>
          <h1>{title || static_page}</h1>
        </div>
        </div>
        <ContainerBox>
        <GridLayout>
          <GridLhs>
          <div className={`${s["AboutusContent"]}`} dangerouslySetInnerHTML={{ __html: sections?.article_show?.data[0]?.text }}></div>

          </GridLhs>

          {/* <GridRhs>
          <Tags title={rhsWidget?.title || ''}  data={rhsWidget?.children || []} />
            <NewsletterWidget />
            {responseData?.ads && 
          <Advertisement src={ responseData?.ads.atf} />

            }
          </GridRhs> */}

        </GridLayout>
        
        </ContainerBox>
      </div>
)
}

export default StaticPage;