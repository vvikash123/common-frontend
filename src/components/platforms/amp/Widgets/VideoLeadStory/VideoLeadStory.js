import React from 'react'
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import WithConditionaWrapper from 'hoc/withConditionalWrapper';
import WidgetCard from '@/components/common/WidgetCard/WidgetCard';
import style from './VideoLeadStory.module.scss';
import { removeHtmlTags, getNewImageUrl, displayTime } from '@/utils/common';
import { commonProperties, MIN_VIDEO_LENGTH } from '@/constants/index';
import ContainerBox from '@/components/common/ContainerBox/ContainerBox';

const VideoLeadStory = (props) => {

    const { langConstant = {}, translations, addLangPath, lang, marginTop, marginBottom, componentData,key ,  data, imageWidth } = props;

    const calculateTime = (item = {}) => {
        if (item?.media?.durationms > MIN_VIDEO_LENGTH) {
            return displayTime(item.media.durationms);
        }
    }

    return (data?.length > 0 &&
        <>
            <section className={style['VideoLeadStory']} style={{ marginBottom: `${marginBottom}px` }} key={key}>
                <ContainerBox>
                    {data && data.slice(0, 1).map((item, index) => (
                        <div className={`${style['lead-story-col']}`} key={index}>
                            {/* <a
                                key={`${item?.msid}`}
                                href={`${item?.seopath}-video-${item?.msid}`}
                                title={`${removeHtmlTags(`${item?.title}`)}`}
                            > */}
                                <WidgetCard
                                    isConditionalRendering={true}
                                    widgetCardType={'leadCard'}
                                    isMoreButtonsV={true}
                                    buttonTypeV={'text'}
                                    buttonTextV={'Health News'}
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
                                    marginBottom={30}
                                    data={data}
                                />
                            {/* </a> */}
                        </div>
                    ))}
                </ContainerBox>

                {/* <ContainerBox>
                    <div className={style['position-relative']}>
                        <div className={style['head-section']}>
                            <TitleComponent
                                titleType={'h2'}
                                changeStyle={'up-next-title'}
                                moreButtonLink={''}
                                boldText={['Next']}
                                titleText={'Up Next'}
                                marginBottom={0}
                            />
                            <ToggleSwitchButton />
                        </div>

                        <CustomSlideBox changeStyle={'videos-up-nex-box'} gridGap={15} marginBottom={0}>
                            {componentData?.data?.children && componentData?.data?.children.slice(0, 15).map((item, index) => (
                                <div className={`${style['col']}`} key={index}>
                                    <a
                                        key={`${item?.msid}`}
                                        to={`${item?.seopath}`}
                                        title={`${removeHtmlTags(`${item?.title}`)}`}
                                    >
                                        <WidgetCard
                                            isConditionalRendering={true}
                                            widgetCardType={'leadCard'}
                                            cardSettingData={
                                                [
                                                    { ...commonProperties, type: 'title', widgetCardType: 'leadCard', widgetLayout: 'vertical', elementClass: 'videos-black-bg-caption', lineClamp: 2, marginBottom: 4, elementType: 'p', textIcon: 'blackRoundPlayIcon' },
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
                                                    time: calculateTime(item)
                                                }
                                            ]}
                                            cardStyleV={'video-card'}
                                            VerticalCardOrder={'videos'}
                                        />
                                    </a>
                                </div>
                            ))}
                        </CustomSlideBox>
                    </div>
                </ContainerBox> */}
            </section>
        </>
    )
}

VideoLeadStory.defaultProps = {
    marginBottom: 20,
    imageWidth: 300,
};

export default VideoLeadStory;
