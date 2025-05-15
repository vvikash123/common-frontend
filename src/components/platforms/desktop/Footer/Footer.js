import CommonGridBox from "@/components/common/CommonGridBox/CommonGridBox";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import StayTuned from "@/components/common/StayTuned/StayTuned";
import SpriteIcon from "@/components/common/Svg/SpriteIcon";
import { getSlug, getTargetURL } from "@/utils/common";
import Image from "next/image";
import s from "./Footer.module.scss";
import { COPYRIGHT } from "@/constants";

const DesktopFooter = (props) => {
  const { footerData } = props;
  const data = footerData?.response?.[0];
  const LOGO_URL = "/assets/logo/logo.svg";

  return (
    <>
      <StayTuned />
      <footer className={`${s["footer"]}`} style={{ minHeight: "393px" }}>
        <ContainerBox>
          <div className={s["footerRow"]}>
            <div className={s["row"]}>
              <i>
              <a href="/">
                <Image
                  src={LOGO_URL}
                  priority
                  alt="Logo"
                  width={150}
                  height={42}
                />
              </a>
              </i>
              <p>{data?.description}</p>
              <ul className={s["socialIcon"]}>
                <li>
                  <a href="https://www.facebook.com/unilist.in/" target="_blank" rel="noopener noreferrer">
                    <SpriteIcon IconName="fb" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/unilist.in" target="_blank" rel="noopener noreferrer">
                    <SpriteIcon IconName="insta" />
                  </a>
                </li>
                <li>
                  <a href="https://x.com/UnilistIn" target="_blank" rel="noopener noreferrer">
                    <SpriteIcon IconName="twitter" />
                  </a>
                </li>
                {/* <li>
                  <a href="#">
                    <SpriteIcon IconName="linkedin" />
                  </a>
                </li> */}
              </ul>
            </div>
            {data?.data?.footerlinks?.map((footerlink, index) => (
              <div className={s["row"]} key={index}>
                <p className={s["Heading"]}>{footerlink?.title}</p>
                {footerlink?.children?.length > 0 && (
                  <ul className={s["FooterLinks"]}>
                    {footerlink?.children?.map((item, id) => {
                      if (!item?.seopath) return null; // Skip items without `seopath`

                      const linkUrl =
                        item?.cmstype !== "SECTION"
                          ? getTargetURL({
                              ...(item?.overridelink && {
                                overrideString: item?.overridelink || "",
                              }),
                              normalString: `${item?.seopath}-${getSlug(
                                item?.cmstype
                              )}-${item?.msid}`,
                              storyType: item?.cmstype,
                              msid: item?.msid,
                              seoPath: item?.seopath,
                            })
                          : `/${item?.seopath}`;

                      return (
                        <li key={id}>
                          <a
                            href={linkUrl}
                            className={s.icon_button}
                            // target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item?.title}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </ContainerBox>
        <div className={s["SubFooter"]}>
          <ContainerBox>
            <CommonGridBox
              gridType={"gridBox"}
              changeStyle={"grid-2"}
              yGap={24}
              xGap={16}
            >
              <ul>
                {data?.data?.children?.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={`/info${link?.seopath || ""}`}>{link?.title}</a>
                  </li>
                ))}
              </ul>
              <p>{COPYRIGHT}</p>

            </CommonGridBox>
          </ContainerBox>
        </div>
      </footer>
    </>
  );
};

export default DesktopFooter;
