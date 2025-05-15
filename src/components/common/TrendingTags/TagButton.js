
import { tagReturnFromType } from "@/utils/common";

const TagButton = (props) => {
  const {
    style,
    type,
    textValue,
    secondTextValue,
    icons,
    bulletNumbers,
    isActive,
    loadSubNavigationDataFn,
    changeStyle,
    imgUrl
  } = props;

  const getSubNavigationData = () => {
    /*if (tab?.isTabView) {
      let params = {
        id: msid,
        widgetType: tab?.widgetType,
        sectionIndex: tab?.sectionIndex,
      };*/
      loadSubNavigationDataFn(props);
   // }
  };

  return (
    <button
      className={`${style["default"]} ${style[isActive]} ${style[changeStyle]}`}
      onClick={getSubNavigationData}
    >
      {tagReturnFromType(
        type,
        textValue,
        secondTextValue,
        icons,
        style,
        bulletNumbers,
        isActive,
        imgUrl
      )}
    </button>
  );
};

export default TagButton;
