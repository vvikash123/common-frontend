import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import s from './StaticPage.module.scss';
import GridLayout from "@/components/common/GridLayout/GridLayout";
import GridLhs from "@/components/common/GridLhs/GridLhs";
import { useRouter } from 'next/router';
//import Advertisement from '@/components/ads/ads'
import Tags from "@/components/common/Rhs/RhsTags/Tags";
import NewsletterWidget from "../Widgets/NewsletterWidget/NewsletterWidget";
const StaticPage = (props) => {
  const { responseData } = props;
  const sections = responseData?.sections || [];
  const router = useRouter();
    const { static_page } = router.query;
    const rhsWidget = sections?.article_show?.data[0]?.rhs_widget || {}
    // console.log('addd' , sections )
return (
    <div>
        <div className={`${s['HeroSection']}`}>
        <ContainerBox>
        <h1>{sections?.article_show?.data[0]?.title || static_page}</h1>

        </ContainerBox>
        </div>
        <ContainerBox>
        <GridLayout>
          <GridLhs>
          <div className={`${s["AboutusContent"]}`} dangerouslySetInnerHTML={{ __html: sections?.article_show?.data[0]?.text }}></div>

          {/* <div className={`${s['AboutusContent']}`}>
            <p>Bennett, Coleman & Company Limited – through Television Division respects the privacy of its users and is committed to protect it in all respects. With a view to offer enriching internet experience to its users BCCL offers a vast repository of channels and a variety of services. You may read &apos;About Us&apos; to know more about BCCL. Times Now is owned and operated by BCCL.</p>
            <h2>User Consent</h2>
            <p>By using BCCL&apos;s sites and Services, you signify your acceptance of this Privacy Policy. If you do not agree or are not comfortable with any policy described in this Privacy statement, your only remedy is to discontinue use of BCCL sites. We reserve the right, to modify this Privacy Policy at any time. In some cases, particularly if you reside in a country governed by a data protection regulation, we may ask you to provide explicit consent to access our services before proceeding for further operations.</p>
            <h3>What data is collected</h3>
            <p>&apos;Personal Information&apos; or &apos;PII&apos; is defined as any information that identifies (whether directly or indirectly) to a particular individual or natural person, such as the individual&apos;s name, postal address, email address, mobile number and any other identifier indicating to that particular person. When anonymous information is directly or indirectly associated with personal information, the resulting information also is treated as personal information.</p>
            <h3>Consent to use Cookies</h3>
            <p>When you visit Website for the first time, a banner informs you of the use of cookies and provides a direct link to this information page. If you confirm your acceptance of cookies, or if you continue to browse the Website, your consent is considered as obtained. The cookie acceptance banner will no longer display on your screen.</p>

          </div> */}
          </GridLhs>

        
        </GridLayout>
        {/* <NewsletterWidget />
        {responseData?.ads && 
          <Advertisement src={ responseData?.ads.atf} />

            } */}

{/* <Tags title={rhsWidget?.title || ''}  data={rhsWidget?.children || []} /> */}
        </ContainerBox>
      </div>
)
}

export default StaticPage;