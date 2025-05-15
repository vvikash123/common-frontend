import React from 'react';
import styles from './Accordion.module.scss'; // Use CSS Modules in Next.js
import { getTargetURL, isFirstPhase } from 'utils/common';
import { isAMPRequest } from 'utils/serverUtils';
import {
  MAIN_CATEGORY_L2_NAV_HIDE,
  MAIN_CATEGORY_NAV_HIDE,
  MAIN_CATEGORY_L3_NAV_HIDE,
  SHOW_ACTIVE_HAMBURGER,
} from 'constants/index';

const Accordion = ({
  data,
  getMSID,
  closeDrawerHandler,
  NavigationData,
  handleToggle,
  closeR,
  translations,
  addLangPath,
}) => {
  const renderKey = (item) =>
    item?.seopath && (
      <a
        href={getTargetURL({
          ...(item?.overridelink && {
            overrideString: item?.overridelink || '',
          }),
          normalString: `${item?.seopath}`,
        })}
      >
        <a
          className={`${
            item?.seopath?.split('/').pop() == NavigationData['category'] ||
            (NavigationData['sub_category'] &&
              item.seopath.split('/').pop() == NavigationData['sub_category'] &&
              item.seopath.split('/').pop() == NavigationData['activeItemId'])
              ? styles['f-bold']
              : ''
          }`}
          onClick={() => {
            closeR.current.click();
            closeDrawerHandler();
            getMSID(
              item.msid,
              item?.title?.toLowerCase() === 'featured' ||
                (item.child && item.child.length)
                ? 'CL'
                : 'AL',
            );
          }}
          title={item?.title}
        >
          {item?.title}
        </a>
      </a>
    );

  const getItemTreeMenu = (treeData) => {
    return treeData
      ?.filter(
        (item) =>
          item.title.toLowerCase() != 'featured' &&
          !MAIN_CATEGORY_NAV_HIDE.includes(item.title.toLowerCase()),
      )
      .map((item) => {
        return (
          <React.Fragment key={item.title}>
            {item.child &&
            item.child.length &&
            !MAIN_CATEGORY_L2_NAV_HIDE.includes(item.title.toLowerCase()) ? (
              <>
                <li
                  className={`${
                    item?.seopath?.split('/').pop() ==
                    NavigationData['category']
                      ? styles['active'] + ' ' + styles['shadow']
                      : ''
                  }`}
                >
                  {renderKey(item)}
                  {!isAMPRequest() ? (
                    <img
                      width="15"
                      height="10"
                      src={`${
                        item?.seopath?.split('/').pop() ==
                        NavigationData['category']
                          ? '/assets/icons/svg/cross.svg'
                          : '/assets/icons/svg/open.svg'
                      }`}
                      alt="expand-icon"
                      onClick={(e) => handleToggle(e)}
                    />
                  ) : (
                    ''
                  )}
                </li>
                <li
                  className={`${styles['sub-menu']}`}
                  style={{
                    display: `${
                      item?.seopath?.split('/').pop() ==
                        NavigationData['category'] || isAMPRequest()
                        ? 'block'
                        : 'none'
                    }`,
                  }}
                >
                  <ul>{getItemTreeMenuChild(item.child)}</ul>
                </li>
              </>
            ) : (
              <li
                className={`${
                  item?.seopath?.split('/').pop() ==
                  NavigationData['category']
                    ? styles['active'] + ' ' + styles['shadow']
                    : ''
                }`}
              >
                {renderKey(item)}
              </li>
            )}
          </React.Fragment>
        );
      });
  };

  const isSubCategoryActive = (title) => {
    return SHOW_ACTIVE_HAMBURGER.some((i) => i === title);
  };

  const getItemTreeMenuChild = (treeData) => {
    return treeData
      .filter(
        (item) =>
          item.title.toLowerCase() != 'featured' &&
          !MAIN_CATEGORY_NAV_HIDE.includes(item.title.toLowerCase()),
      )
      .map((item) => {
        return (
          <React.Fragment key={item.title}>
            {!MAIN_CATEGORY_L3_NAV_HIDE.includes(item.title.toLowerCase()) ? (
              <li
                style={{
                  fontWeight: !isSubCategoryActive(item.title) ? 'normal' : '500',
                }}
                className={`${
                  item?.seopath?.split('/').pop() == NavigationData['category']
                    ? styles['active'] + ' ' + styles['shadow']
                    : ''
                }`}
              >
                {renderKey(item)}
              </li>
            ) : null}
          </React.Fragment>
        );
      });
  };

  return (
    <div id="ac-list" className={styles['list']}>
      <ul>
        <li
          className={`${
            NavigationData['activeItemId'] == 'home'
              ? styles['active'] + ' ' + styles['shadow']
              : ''
          }`}
        >
          <a href={addLangPath('/')}>
            <a
              onClick={() => {
                closeR.current.click();
                closeDrawerHandler();
              }}
              className={`${
                NavigationData['activeItemId'] == 'home' ? styles['f-bold'] : ''
              }`}
              title="Home"
            >
              {translations['HOME']}
            </a>
          </a>
        </li>
        {getItemTreeMenu(data)}
      </ul>
    </div>
  );
};

export default Accordion;
