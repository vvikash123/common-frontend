import dynamic from "next/dynamic";
import { useAmp } from 'next/amp';
import { fetchHomeData } from "../api";
import getCommonServerSideProps from "@/utils/dataFetching";
import ThemeToggle from "@/helpers/Theme/ThemeToggle";

// Dynamically import RecursiveRender with SSR enabled
const RecursiveRenderWrapper = dynamic(() => import("@/helpers/RenderWegdet/recursiveRender"), { ssr: true });

const Home = ({ isMobile, PageData, seo }) => {
  const isAmp = useAmp();
  const customEvent = { page_template: "Home" };
  return (
    <>
  <ThemeToggle />

        <RecursiveRenderWrapper  nodes={PageData?.response?.data} globalProps={{ seo, isMobile }} />
    </>
  );
};

export async function getServerSideProps(context) {
  const [commonProps, homeResponse] = await Promise.all([
    getCommonServerSideProps(context),
    fetchHomeData(), // This must return `{ response: { data, seo } }`
  ]);

  return {
    props: {
      ...commonProps.props,
      PageData: homeResponse?.data || [],
      seo: homeResponse?.response?.seo || {},
    },
  };
}

// Enable hybrid AMP mode
export const config = { amp: 'hybrid' };

export default Home;
