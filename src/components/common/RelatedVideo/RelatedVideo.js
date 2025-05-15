import Image from "next/image";
import ContainerBox from "../ContainerBox/ContainerBox";
import SpriteIcon from "../Svg/SpriteIcon";
import style from "./RelatedVideo.module.scss"

const RelatedVideo = () => {
    return (
        <div className={style['RelatedVideo']}>
            <ContainerBox>
                <h3 className={style['Heading']}>RELATED videos</h3>
                <div className={style['RelatedVideoRow']}>
                 <div className={style['RelatedVideoBOx']}>
                    <a href="#">
                 <Image src="/assets/health-images/images/img1.png" layout="responsive" alt="Logo" width={260} height={146}/>  
                 <h3> <SpriteIcon IconName="whiteRoundPlayIcon" /> Whats Really Causing Your Allergy Symptoms? (And How To Fix Them!)</h3>
                 </a>
                 </div>
                 <div className={style['RelatedVideoBOx']}>
                 <a href="#">
                 <Image src="/assets/health-images/images/img2.png" layout="responsive" alt="Logo" width={260} height={146}/>  
                 <h3> <SpriteIcon IconName="whiteRoundPlayIcon" /> Whats Really Causing Your Allergy Symptoms? (And How To Fix Them!)</h3>
                 </a>
                 </div>
                 <div className={style['RelatedVideoBOx']}>
                 <a href="#">
                 <Image src="/assets/health-images/images/img3.png" layout="responsive" alt="Logo" width={260} height={146}/>  
                 <h3> <SpriteIcon IconName="whiteRoundPlayIcon" /> Whats Really Causing Your Allergy Symptoms? (And How To Fix Them!)</h3>
                 </a>
                 </div>
                 <div className={style['RelatedVideoBOx']}>
                 <a href="#">
                 <Image src="/assets/health-images/images/img4.png" layout="responsive" alt="Logo" width={260} height={146}/>  
                 <h3> <SpriteIcon IconName="whiteRoundPlayIcon" /> Whats Really Causing Your Allergy Symptoms? (And How To Fix Them!)</h3>
                 </a>
                 </div>
                 <div className={style['RelatedVideoBOx']}>
                    <a href="#">
                 <Image src="/assets/health-images/images/img2.png" layout="responsive" alt="Logo" width={260} height={146}/>  
                 <h3> <SpriteIcon IconName="whiteRoundPlayIcon" /> Whats Really Causing Your Allergy Symptoms? (And How To Fix Them!)</h3>
                 </a>
                 </div>
                 
                </div>
            </ContainerBox>

        </div>
    )
}

export default RelatedVideo;