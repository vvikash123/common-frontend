import Typography from '../Typography/Typography';
import WidgetCard from '../WidgetCard/WidgetCard';
import CommonGridBox from '../CommonGridBox/CommonGridBox';
import { commonProperties } from '@/constants';


function FeaturedWidget(props) {
    const {
        marginTop=0,
        marginBottom=0,
        verticalList
    } = props;
    return (
        <div>
            <Typography
                elementType={'p'}
                textValue={'FEATURED ARTICLES'}
                smallTextIcon={'greenStarIcon'}
                changeStyle={'featured-article'}
                lineClamp={'inherit'}
                marginBottom={10}
            />
            <WidgetCard
                isConditionalRendering={true}
                widgetCardType={'leadCard'}
                cardSettingData={
                    [
                        { ...commonProperties, type: 'small', widgetCardType: 'leadCard', widgetLayout: 'vertical', elementClass: 'small', lineClamp: 'inherit', marginBottom: 6, elementType: 'p' },
                        { ...commonProperties, type: 'title', widgetCardType: 'leadCard', widgetLayout: 'vertical', elementClass: 'months-title', lineClamp: 2, marginBottom: 10, elementType: 'p' },
                        // { ...commonProperties, type: 'para', widgetCardType: 'leadCard' ,widgetLayout: 'vertical', elementClass: 'para', lineClamp : 2, marginBottom: 16, elementType: 'p' },
                    ]
                }
                verticalList={verticalList?.length ? verticalList.slice(0, 1) : []}
                titleElementStyleV={'months-title'}
                inLineStyleV={'inline-with-font-size-14'}
                titleMarginBottomV={10}
                titleLineClampV={2}
                isLazzy={true}
            />
            <CommonGridBox gridType={'gridBox'} changeStyle={'list-with-border'}>
                <WidgetCard
                    isConditionalRendering={true}
                    widgetCardType={'listCard'}
                    cardSettingData={
                        [
                            { ...commonProperties, type: 'small', widgetCardType: 'listCard', widgetLayout: 'horizontal', elementClass: 'small', lineClamp: 'inherit', marginBottom: 6, elementType: 'p' },
                            { ...commonProperties, type: 'title', widgetCardType: 'listCard', widgetLayout: 'horizontal', elementClass: 'list-card-title', lineClamp: 2, marginBottom: 0, elementType: 'p' },
                        ]
                    }
                    cardStyleH={'list-card'}
                    horizontalList={verticalList?.length ? verticalList.slice(1, 3) : []}
                    titleElementStyleH={'list-card-title'}
                    inLineStyleH={''}
                    titleMarginBottomH={0}
                    titleLineClampV={2}
                    marginTop={marginTop}
                    marginBottom={marginBottom}
                    isLazzy={true}
                />
            </CommonGridBox>
        </div>
    )
}


export default FeaturedWidget;
