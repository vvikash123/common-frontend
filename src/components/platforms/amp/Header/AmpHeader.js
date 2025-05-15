import SiteNavigationElement from "@/helpers/seo/schemas/SiteNavigationElement";
import { useAmp } from "next/amp";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router"; // Import useRouter from Next.js
import SpriteIcon from "../Widgets/Svg/SpriteIcon";

const AmpHeader = (props) => {
  const isAmp = useAmp();
  const router = useRouter(); // Initialize the router
  const { headerData } = props;
  const navMenu = headerData?.response?.data || [];
  const LOGO_URL = process.env.NEXT_PUBLIC_WEBAPP_BASE_URL + '/assets/logo/logo.svg';
  const headerNavData = navMenu?.filter(
    (obj) => obj.title !== undefined && obj.title !== ''
  );


  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SiteNavigationElement data={headerNavData} category="home" />
      <header id="Header">
        <div className="ContainerBox">
          <div className="header">
            <div className="headerLeft">
              <div className="nav" role="button" tabIndex="0" on="tap:sidebar.toggle">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="logo">
                <a href="/">
                  <Image
                    src={LOGO_URL}
                    alt="Logo"
                    width={100}
                    height={50}
                  />
                </a>
              </div>
            </div>
            <div className="HeaderRight">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* Search Icon */}
                <a href={router.asPath.replace('/amp', '')} on="tap:AMP.navigateTo(url=router.asPath.replace('/amp', ''))">
              <SpriteIcon IconName="search" width={30} height={14} />
            </a>
            <a href={router.asPath.replace('/amp', '')} on="tap:AMP.navigateTo(url=router.asPath.replace('/amp', ''))">
              <SpriteIcon IconName="userIcon" width={30} height={14} />
            </a>
              
              </div>
            </div>
          </div>
        </div>
      </header>

      {isAmp && (
        <amp-sidebar id="sidebar" layout="nodisplay" side="left">
          <div className="SidenavTop">
            <button on="tap:sidebar.toggle" className="CloseIcon"></button>
          </div>
          <ul className="Sidenava">
            {navMenu.map((data, idx) => (
              <li key={`header_${idx}_desktop`}>
                <a href={`/${data.seopath}`}>{data.title}</a>
              </li>
            ))}
          </ul>
        </amp-sidebar>
      )}

      <style jsx global>{`
        @font-face {
          font-family: 'Manrope';
          font-style: normal;
          font-weight: 200 800;
          src: url('https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggexSvfedN4.woff2') format('woff2');
        }

        body {
          font-family: 'Manrope', sans-serif;
        }

        header#Header {
          width: 100%;
          position: sticky;
          top: 0;
          background: #fff;
          z-index: 99;
              box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1607843137);
        }

        .ContainerBox {
          width: 100%;
          padding: 4px 15px;
        }
* {
    box-sizing: border-box;
}
        .header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .HeaderRight i svg{
              width: 20px;
    height: 20px;
        }
        .logo img {
          display: block;
          object-fit: contain;
          width: 103px;
        }

        .nav {
          width: 16px;
          margin-right: 15px;
        }

        .nav span {
          background: #224099;
          height: 2px;
          width: 100%;
          display: block;
          margin-bottom: 3px;
        }

        .headerLeft {
          display: flex;
          align-items: center;
        }

        ul.SubNav {
          display: flex;
          list-style: none;
          justify-content: flex-start;
          white-space: nowrap;
          overflow: auto;
          margin: 0;
          padding: 12px 0;
          border-bottom: 1px #eff0f4 solid;
        }

        .Sidenav {
          position: fixed;
          overflow-y: auto;
          flex-direction: column;
          -webkit-overflow-scrolling: touch;
          box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
            0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
          background: #fff;
          top: 0;
          bottom: 0;
          left: -350px;
          width: 300px;
          padding: 15px 0;
          z-index: 999;
          transition: 0.5s;
        }

        .SidenavTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        button.CloseIcon {
          opacity: 0.2;
          position: relative;
          width: 23px;
          height: 23px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          margin-right: 20px;
        }

        button.CloseIcon:after,
        button.CloseIcon:before {
          position: absolute;
          left: 15px;
          content: '';
          height: 23px;
          width: 2px;
          background-color: #333;
          top: 0;
        }

        .CloseIcon:after {
          transform: rotate(-45deg);
        }

        .CloseIcon:before {
          transform: rotate(45deg);
        }

        ul.Sidenava {
          padding: 0;
          margin: 0;
          list-style: none;
          list-style-type: none;
          padding: 30px 15px 0;
          width: 100%;
        }
          amp-sidebar {
    background: #fff;
    padding: 15px;
    width: 300px;
}

ul.Sidenava li {
    padding: 16px 0;
    position: relative;
}

.Sidenava li a {
    color: #000;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
}
      `}</style>
    </>
  );
};

export default AmpHeader;

export const config = { amp: true };
