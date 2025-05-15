import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import s from './ErrorPage.module.scss';
const Error500Desktop = () => {
return (
    <div className={`${s['my-60']}`}>
        <ContainerBox>
          <div className={`${s['notfound']}`}>
           <p>500</p>

            <div className={`${s['not_found_text']}`}>
              <p>Bennett, Coleman & Company Limited – through Television Division respects the privacy of its users and is committed to protect it in all respects. </p>
            </div>
          </div>
          <div className={`${s['back__button']}`}>
            <a href='/' className={`${s['back-link']}`}>
              {`Go to Homepage`}
            </a>
          </div>
        </ContainerBox>        
      </div>
)
}

export default Error500Desktop;