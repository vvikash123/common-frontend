import "@/styles/globals.scss";
import { AppProvider, useAppContext } from "@/context/AppContext";
import StaticMetasLinks from '@/helpers/seo/StaticMetasLinks';

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <ThemeWrapper>
        <StaticMetasLinks />
        <Component {...pageProps} />
      </ThemeWrapper>
    </AppProvider>
  );
}

const ThemeWrapper = ({ children }) => {
  const { theme } = useAppContext();

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      {children}
    </div>
  );
};

export default MyApp;
