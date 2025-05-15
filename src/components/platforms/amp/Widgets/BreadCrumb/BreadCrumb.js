
import { getTargetURL, isExternalLink, toCamelCase } from '@/utils/common';
//import BreadCrumbSchema from '@/helpers/seo/schemas/BreadcrumbSchema';
import s from './BreadCrumb.module.scss';
import ContainerBox from '@/components/common/ContainerBox/ContainerBox';
import BreadCrumbSchema from '@/helpers/seo/schemas/BreadcrumbSchema';

const BreadCrumb = ({
  BreadCrumbData,
  getMSID,
  type,
  title=undefined,
  isTrim=false,
  isShowPage,
  customSchema,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_WEBAPP_BASE_URL;
  let dataParts = [];
  let msid = false
  let pageSlug = false
  let cmsType =''

  if(Array.isArray(BreadCrumbData)){
    msid = BreadCrumbData[0]?.msid
    pageSlug = BreadCrumbData[0]?.pageSlug
    cmsType = BreadCrumbData[0]?.cmsType
    BreadCrumbData = BreadCrumbData[0]?.seopath
  }

  //console.log('BreadCrumbData....',BreadCrumbData)

  if (BreadCrumbData?.includes('/')) {
    dataParts = BreadCrumbData?.split('/');

    if (Number.isInteger(Number(dataParts.at(-1)))) {
      dataParts.splice(-3, 3, dataParts.slice(-3).join('/'));
    }
  } else {
    dataParts = [BreadCrumbData];
  }

  const data = {};

  if (dataParts) {
    if (dataParts.length >= 1) {
      data.category = dataParts[0];
    }

    if (dataParts.length >= 2) {
      data.sub_category = dataParts[1];
    }

    if (dataParts.length >= 3) {
      data.sub_sub_category = dataParts[2];
    }
  }

  const list = [];

  const getItem = (item, index, getMSID, length, isShowPage) => {
    let label = item?.label?.split('/')[0];
    let target = '',
      rel = '';
    if (isExternalLink(item.link)) {
      rel = 'nofollow';
      target = '_blank';
    }
    const updatedSeoPath = () => {
      const originalUrl = item.link;
      const urlParts = originalUrl?.split(baseUrl);
      const modifiedUrl = urlParts?.join('');
      return modifiedUrl;
    };

    return (
      <li key={item.id}>
        {item.link && label && length != index ? (
          <a
            href={`${getTargetURL({
              normalString: updatedSeoPath(),
            })}`}
            itemProp="item"
            className={length === index ? `${s['disabled']}` : ''}
            rel={rel}
            target={target || '_self'}
          >
            {typeof label === 'string'
              ? toCamelCase(label)
              : ''}
          </a>
        ) : index !== 0 ? (
          <>
            {typeof label === 'string'
              ? toCamelCase(label)
              : ''}
          </>
        ) : (
          <a
            href={`${getTargetURL({
              normalString: updatedSeoPath(),
            })}`}
            itemProp="item"
            className={
              length === index && !isShowPage
                ? `${s['disabled']}`
                : `${s['disabled']} ${s['activePointer']}`
            }
            rel={rel}
            target={target || '_self'}
          >
            {typeof label === 'string'
              ? toCamelCase(label)
              : ''}
          </a>
        )}
        {typeof index !== 'undefined' && (
          <meta content={index + 1} itemProp="position" />
        )}
      </li>
    );
  };

  let breadcrumbs = [
    {
      id: 'home',
      link: baseUrl,
      label: 'Home',
    },
  ];

  const titleItem = {
    label: title,
  };

  // CATEGORY
  data && data['category']
    ? list.push({
        id: data['category'],
        link: baseUrl + '/' + data['category'],
        label: data['category'].replace(/-/gi, ' '),
      })
    : '';

  // SUB CATEGORY
  data && data['sub_category']
    ? list.push({
        id: data['sub_category'],
        link: baseUrl + '/' + data['category'] + '/' + data['sub_category'],
        label: isTrim
          ? data['category']
              .replace(/-/gi, ' ')
              .split(' ')
              .slice(
                0,
                data['category'].replace(/-/gi, ' ').split(' ').length - 2,
              )
              .join(' ')
          : data['sub_category'].replace(/-horoscope/gi, ' '),
      })
    : '';

  // SUB SUB CATEGORY
  data && data['sub_sub_category']
    ? list.push({
        id: data['sub_sub_category'],
        link:
          baseUrl +
          '/' +
          data['category'] +
          '/' +
          data['sub_category'] +
          '/' +
          data['sub_sub_category'],
        label: isTrim
          ? data['sub_category']
              .replace(/-/gi, ' ')
              .split(' ')
              .slice(
                0,
                data['sub_category'].replace(/-/gi, ' ').split(' ').length - 2,
              )
              .join(' ')
          : data['sub_sub_category'].replace(/-/gi, ' '),
      })
    : '';

  if (list instanceof Array && list.length >= 1) {
    breadcrumbs = type
      ? breadcrumbs.concat([...list.slice(0, -1)])
      : breadcrumbs.concat([...list]);
  }

  if (msid && cmsType) {
    breadcrumbs[breadcrumbs.length - 1].link = baseUrl + (pageSlug ? '/' + pageSlug : '') + '/' + BreadCrumbData + '-' + cmsType + '-' + msid;
  } else if (msid) {
    breadcrumbs[breadcrumbs.length - 1].link = baseUrl + (pageSlug ? '/' + pageSlug : '') + '/' + BreadCrumbData + '-' + msid;
  }

  if (customSchema && breadcrumbs.length > 0) {
    breadcrumbs = [
      ...breadcrumbs.slice(0, breadcrumbs.length - 1),
      ...customSchema,
    ];
  }
  return (    

<>

    <ContainerBox>
       <BreadCrumbSchema data={breadcrumbs} />
    <div className='breadcrumb'>
      {/* <BreadCrumbSchema data={breadcrumbs} /> */}
      <ul>
        {breadcrumbs.map((item, index) =>
          getItem(item, index, getMSID, breadcrumbs.length - 1, isShowPage),
        )}
        {titleItem.label &&
          getItem(
            titleItem,
            breadcrumbs && breadcrumbs.length ? breadcrumbs.length : 1,
            getMSID,
            isShowPage,
          )}
      </ul>
    </div>
    </ContainerBox>
    <style jsx global>
      {`
    .breadcrumb{
      border-top: 1px solid #EFF0F4;
      clear: both;
      margin-top: auto;
      padding-right: 15px;
      padding-left: 15px;
    }

    .breadcrumb ul{
      display: flex;
      white-space: nowrap;
      overflow: auto;
      margin: 10px 0;
    }
    .breadcrumb ul li{
      display: inline-block;
      text-transform: none;
      line-height: 20px;
      font-size: 12px;
    }
    .breadcrumb ul li a{
      text-transform: capitalize;
      text-decoration: none;
      display: inline-block;
      position: relative;
      line-height: 16px;
      margin-right: 15px;
      padding-right: 8px;
      border-radius: 4px;
      font-weight: 600;
      color: #000;
    }
    
    .breadcrumb ul li a:after {
      border-bottom-style: solid;
      border-bottom-width: 1px;
      border-right-style: solid;
      border-right-width: 1px;
      content: "";
      display: inline-block;
      height: 8px;
      width: 8px;
      position: absolute;
      top: 5px;
      right: -5px;
      border-color: #8797a7;
      transform: rotate(315deg);
  }
      `}
    </style>
    </>
  );
};
export default BreadCrumb;
