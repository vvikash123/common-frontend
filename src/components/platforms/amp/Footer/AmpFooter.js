import CommonGridBox from "@/components/common/CommonGridBox/CommonGridBox";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import SpriteIcon from "@/components/common/Svg/SpriteIcon";
import { getTargetURL } from "@/utils/common";
import { useRouter } from "next/router"; // Import useRouter from Next.js

const MobileFooter = (props) => {
  const router = useRouter(); 
  const LOGO_URL =
    process.env.NEXT_PUBLIC_WEBAPP_BASE_URL + "/assets/logo/logo.svg" || "/default-logo.svg";
  const { footerData } = props;
  const data = footerData?.response?.[0];

  return (
    <>
      {/* Subscribe Section */}
      <div className="subscribenow">
        <div className="subscribeRow">
          <div className="left">
            <p>Learn More, Grow Faster </p>
            <span>Get Updates Straight to Your Inbox!</span>
            <form
  method="post"
  action-xhr="/subscribe"
  target="_top"
  className="input"
>
  <input
    name="email"
    type="email"
    placeholder="Enter your email address"
    required
  />
   <a href={router.asPath.replace('/amp', '')} on="tap:AMP.navigateTo(url=router.asPath.replace('/amp', ''))">
   SUBSCRIBE NOW
            </a>
  <div submit-success>
    <template type="amp-mustache">
      Subscription successful! Thank you for subscribing.
    </template>
  </div>
  <div submit-error>
    <template type="amp-mustache">
      Something went wrong. Please try again later.
    </template>
  </div>
</form>

          </div>
          <div className="right">
            <amp-img
              src="https://static.tnn.in/photo/113698732.cms"
              alt="Stay Tuned"
              layout="responsive"
              width="500"
              height="300"
            ></amp-img>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <ContainerBox>
          {/* Footer Logo and Social Icons */}
          <div className="FooterLogo">
            <i>
              <amp-img
                src={LOGO_URL}
                alt="Logo"
                width="150"
                height="50"
                layout="intrinsic"
              ></amp-img>
            </i>
            <ul className="socialIcon">
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
            </ul>
          </div>

          {/* Footer Links with AMP Accordion */}
          {data?.data?.footerlinks?.map((footerlink, index) => (
            <amp-accordion key={index}>
              <section>
                <h4>{footerlink?.title}</h4>
                <ul className="FooterLinks">
                {footerlink?.children?.map((child, childIndex) => {
                    const linkUrl =
                      child?.cmstype !== "SECTION"
                        ? getTargetURL({
                            ...(child?.overridelink && {
                              overrideString: child?.overridelink || "",
                            }),
                            normalString: `${child?.seopath}-${child?.cmstype}-${child?.msid}`,
                            storyType: child?.cmstype,
                            msid: child?.msid,
                            seoPath: child?.seopath,
                          })
                        : `/${child?.seopath}`;

                    return (
                      <li key={childIndex}>
                        <a href={linkUrl}>{child?.title || "Untitled"}</a>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </amp-accordion>
          ))}
        </ContainerBox>

        {/* Sub Footer */}
        <div className="SubFooter">
          <ContainerBox>
            <CommonGridBox
              gridType={"gridBox"}
              changeStyle={"grid-1"}
              yGap={4}
              xGap={1}
            >
              <ul>
                {data?.data?.children?.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={`/info${link?.seopath || ""}`}
                      rel="noopener noreferrer"
                    >
                      {link?.title || "Untitled"}
                    </a>
                  </li>
                ))}
              </ul>
              <p>© 2024 Bennett, Coleman & Company Limited</p>
            </CommonGridBox>
          </ContainerBox>
        </div>
      </footer>

      {/* Inline AMP-Compatible Styles */}
      <style jsx>
        {`
          .footer {
            width: 100%;
            background: #dbdbdb;
            padding: 20px;
          }
.footer h4{
    color: #000000;
    font-size: 16px;
    font-weight: 600;
    padding-bottom: 6px;
    position: relative;
    border-bottom: 1px rgba(217, 217, 217, 0.3019607843) solid;
    padding: 14px 15px;
        background-color: #fff;
}


.footer section  ul{
   background: #fff;
    padding: 14px 15px;
}
    .footer h4:after{
              content: "";
    width: 10px;
    height: 10px;
    border-bottom: #4F536C solid 2px;
    border-left: #4F536C solid 2px;
    transform: rotate(-45deg);
    position: absolute;
    right: 20px;
    top: 16px;
    }
          .FooterLogo {
            padding: 0 0 20px;
          }

          .FooterLogo i{
              margin-bottom: 10px;
            display: block;
          }

          .socialIcon {
            display: flex;
            align-items: center;
            padding-top: 4px;
          }

          .socialIcon li {
            list-style-type: none;
          }

          .socialIcon li a {
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
                overflow: hidden;
    height: 30px;
    display: flex;
    align-items: baseline;
          }
          .socialIcon li a svg{
              height: 20px;
          }
          .SubFooter {
            width: 100%;
            padding: 4px 0 10px;
          }
.FooterLinks {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

          .FooterLinks li {
          list-style-type: none;
          padding: 0 0px 10px;
          position: relative;
          }

          .FooterLinks li a {
            color: #4f536c;
            text-decoration: none;
            font-size: 16px;
            font-weight: 500;
          }

          .subscribenow {
            width: 100%;
            background: #000000;
            padding: 20px;
            border-bottom: 4px #224099 solid;
          }

          .subscribenow .left p {
            color: #ffffff;
            font-weight: 600;
            font-size: 28px;
          }

          .subscribenow .left span {
            color: #ffffff;
            font-size: 16px;
          }

          .subscribenow .input input[type="email"] {
            width: 100%;
            height: 40px;
            border: 0;
            padding: 0 20px;
            border-radius: 4px;
            margin: 10px 0;
          }

          .subscribenow .input a  {
              background: #224099;
              color: #fff;
              height: 40px;
              width: 100%;
              font-size: 14px;
              font-weight: 700;
              cursor: pointer;
              border: none;
              border-radius: 4px;
              margin: 0px 0 20px;
              box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1607843137);
              display: flex;
              align-items: center;
              justify-content: center;
              text-decoration: none;
          }
              .SubFooter {
  width: 100%;
  padding: 4px 0 10px;
}

.SubFooter ul {
  display: flex;
  align-items: center;
  padding: 7px 0;
  justify-content: center;
  flex-wrap: wrap;
}

.SubFooter ul li {
  list-style-type: none;
  padding: 0 14px;
  position: relative;
}

.SubFooter ul li:first-of-type {
  padding-left: 0;
}

.SubFooter ul li:first-of-type::after {
  display: none;
}

.SubFooter ul li::after {
  background-color: #5C5F66;
  width: 4px;
  height: 4px;
  border-radius: 100px;
  content: "";
  position: absolute;
  top: 10px;
  left: -1px;
}

.SubFooter ul li a {
  font-size: 14px;
      text-decoration: none;
  color: #5C5F66;
}

.SubFooter p {
  font-size: 14px;
  color: #5C5F66;
  text-align: center;
  display: block;
}

        `}
      </style>
    </>
  );
};

export default MobileFooter;
