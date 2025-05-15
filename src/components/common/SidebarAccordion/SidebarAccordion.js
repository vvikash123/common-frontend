import React, { useState } from 'react';
import style from './SidebarAccordion.module.scss';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import NavLink from '../NavLink/NavLink';
import { getTargetURL } from '../../../utils/common';
// import WithConditionaWrapper from 'hoc/withConditionalWrapper';
// import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';


const SidebarAccordion = ({ data }) => {
  const [openItem, setOpenItem] = useState(null);

  const handleClick = (itemId) => {
    setOpenItem(openItem === itemId ? null : itemId);
  };

  return (
    // <ErrorBoundary key={'accordion'}>
      <ul className={`${style['navigation']}`}>
        {data.length > 0 &&
          data?.map((item, idx) => {
            let urlParent = getTargetURL({
              ...(item?.overridelink && {
                overrideString: item?.overridelink,
              }),
              normalString: `${item?.seopath}`,
              storyType: item?.cmstype,
              msid: item?.msid,
              seoPath: item?.seopath,
            });
            return (
              <li key={`parent_${idx}`}>
                {(
                  <NavLink
                    text={item.title}
                    isActive={item.acitve}
                    buttonUrl={urlParent}
                  />
                )}
                {/* {item.child && (
                  <>
                    <NavLink
                      text={item.title}
                      isActive={item.acitve}
                      buttonUrl={urlParent}
                    />
                    <button
                      onClick={() => handleClick(item.msid)}
                      className={`accordion-button ${openItem === item.msid ? style['navOpen'] : style['navClose']}`}
                    ></button>
                  </>
                )} */}
                {/* {openItem === item.msid && item.child && (
                  <ul className={`${style['navigation']}`}>
                    {item.child.map((childItem, childIdx) => {
                      let url = getTargetURL({
                        ...(childItem?.overridelink && {
                          overrideString: childItem?.overridelink,
                        }),
                        normalString: `${childItem?.seopath}`,
                        storyType: childItem?.cmstype,
                        msid: childItem?.msid,
                        seoPath: childItem?.seopath,
                      });
                      return (
                        <li key={`child_${childIdx}`}>
                          <NavLink
                            text={childItem.title}
                            isActive={childItem.acitve}
                            buttonUrl={url}
                          />                          
                        </li>
                      );
                    })}
                  </ul>
                )} */}
              </li>
            );
          })}
      </ul>
    // </ErrorBoundary>
  );
};

export default SidebarAccordion;
