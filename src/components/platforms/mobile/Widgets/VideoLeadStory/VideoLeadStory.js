import WidgetCard from '@/components/common/WidgetCard/WidgetCard';
import style from './VideoLeadStory.module.scss';
import { getNewImageUrl, displayTime } from '@/utils/common';
import { commonProperties, MIN_VIDEO_LENGTH } from '@/constants/index';
import ContainerBox from '@/components/common/ContainerBox/ContainerBox';

const VideoLeadStory = (props) => {

    const {  marginBottom, key,  data, imageWidth , isMobile } = props;

    const calculateTime = (item = {}) => {
        if (item?.media?.durationms > MIN_VIDEO_LENGTH) {
            return displayTime(item?.media?.durationms);
        }
    }

    return (data?.length > 0 &&
        <>
            <section className={style['VideoLeadStory']} style={{ marginBottom: `${marginBottom}px` }} key={key}>
                <ContainerBox>
                    {data && data?.slice(0, 1)?.map((item, index) => (
                        <div className={`${style['lead-story-col']}`} key={index}>
                                <WidgetCard
                                    isConditionalRendering={true}
                                    widgetCardType={'leadCard'}
                                    isMoreButtonsV={true}
                                    buttonTypeV={'text'}
                                    buttonTextV={ data?.[0]?.keywords?.[0]?.name || 'Health News'}
                                    buttonTextSeo={data?.[0]?.keywords?.[0]?.keywordseo}
                                    changeButtonStyleV={'video-lead-story-button'}
                                    cardSettingData={
                                        [
                                            { ...commonProperties, type: 'title', widgetCardType: 'leadCard', widgetLayout: 'vertical', elementClass: 'videos-caption', lineClamp: 3, marginBottom: 8, elementType: 'p' },
                                            { ...commonProperties, type: 'para', widgetCardType: 'leadCard', widgetLayout: 'vertical', elementClass: 'videos-para', lineClamp: 3, marginBottom: 15, elementType: 'p', textValue: 'Heart Health: Blood-thinning foods are necessary for the treatment or prevention of certain medical conditions that increase the risk of blood clots.' },
                                            // { ...commonProperties, type: 'small', widgetCardType: 'leadCard', widgetLayout: 'vertical', elementClass: 'videos-small-tag', lineClamp: 'inherit', marginBottom: 0, elementType: 'p' },
                                        ]
                                    }
                                    verticalList={[
                                        {
                                            title: `${item?.title}`,
                                            imgUrl: getNewImageUrl({
                                                msid: item?.msid || null,
                                                imageSize: item?.imageSize || item?.thumbsize || '',
                                                imgWidth: imageWidth || null,
                                                imgHeight: 203,
                                                is1x1Img: false,
                                                isArticleBanner: false,
                                                updatedAt: item?.updatedate ? item?.updatedate : '',
                                            }),
                                            time: calculateTime(item),
                                            synopsis:item?.synopsis,
                                            smallText:item?.smallText,
                                        }
                                    ]}
                                    cardStyleV={'video-lead-card'}
                                    VerticalCardOrder={'leadVideo'}
                                    marginBottom={0}
                                    data={data}
                                    isMobile={true}
                                />
                        </div>
                    ))}
                </ContainerBox>
            </section>
        </>
    )
}

VideoLeadStory.defaultProps = {
    marginBottom: 20,
    imageWidth: 300,
};

export default VideoLeadStory;
