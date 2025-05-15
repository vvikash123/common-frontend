
import style from './LearnMore.module.scss';
import { SpriteIcon } from '../Svg/SpriteIcon';
import ContainerBox from '../ContainerBox/ContainerBox';
import NextImage from "@/utils/NextImage"

const LearnMore = (props) => {

  const { langConstant = {}, translations, addLangPath, lang, marginBottom=16, isMobile=false } = props;

  return (
    <>
      {isMobile ?
        <section style={{ marginBottom: `${marginBottom}px` }}>
          <div className={`${style['learn-box']}`}>
            <div className={`${style['left-box']}`}>
              <div className={`${style['gallery']}`}>
                <img src="https://picsum.photos/id/104/400/400" alt="a dream catcher" />
                <img src="https://picsum.photos/id/1082/400/400" alt="a piano" />
                <img src="https://picsum.photos/id/158/400/400" alt="a live concert" />
                <img src="https://picsum.photos/id/234/400/400" alt="Paris" />
              </div>
            </div>
            <div className={`${style['center-box']}`}>
              <a className={`${style['text']}`} href={'/info/about-us'} >
                Authentic information <strong>reviewed by 100+ experts!</strong>
              </a>
            </div>
            <div className={`${style['right-box']}`}>
              <a type="type" className={`${style['learn-more-btn']}`} href={'/info/about-us'}>
                <SpriteIcon IconName="whiteRightArrow" />
              </a>
            </div>
          </div>
        </section> :
        <section style={{ marginBottom: `${marginBottom}px` }}>
          <ContainerBox>
            <div className={`${style['learn-box']}`}>
              <div className={`${style['left-box']}`}>
                <div className={`${style['gallery']}`}>
                  <img src="https://picsum.photos/id/104/400/400" alt="a dream catcher" />
                  <img src="https://picsum.photos/id/1082/400/400" alt="a piano" />
                  <img src="https://picsum.photos/id/158/400/400" alt="a live concert" />
                  <img src="https://picsum.photos/id/234/400/400" alt="Paris" />
                </div>
              </div>
              <div className={`${style['center-box']}`}>
                <p className={`${style['text']}`}>
                  Authentic information <strong>reviewed by 100+ experts!</strong>
                </p>
              </div>
              <div className={`${style['right-box']}`}>
                <a type="type" className={`${style['learn-more-btn']}`} href={'/info/about-us'}>
                  Learn more about our process <SpriteIcon IconName="whiteRightArrow" />
                </a>
              </div>
            </div>
          </ContainerBox>
        </section>
      }
    </>
  );
};


export default LearnMore;
