import React, { useEffect } from 'react';

const DynamicFormLoader = ({ scriptSrc, formContainerId }) => {
  useEffect(async () => {
    const scriptElement = document.createElement('script');
    scriptElement.src = scriptSrc;
    scriptElement.type = 'text/javascript';
    scriptElement.async = true;
    document.head.appendChild(scriptElement);

    // scriptElement.onload = () => {
    //   let brand_name = '';
    //   window?.location?.href
    //     .split('/')[3]
    //     .split('-')
    //     .forEach((elm, ind) => {
    //       if (ind === 0) {
    //         brand_name = brand_name + elm[0].toUpperCase() + elm.slice(1);
    //       } else {
    //         brand_name = brand_name + ' ' + elm[0].toUpperCase() + elm.slice(1);
    //       }
    //     });
    //   if (brand_name === 'Mg' || brand_name === 'Bmw' || brand_name === 'Byd') {
    //     brand_name = brand_name.toUpperCase();
    //   }
    //   window?.changeDropdownValue('Brand', brand_name);
    //   window?.disableField('Brand');      
    //   window?.changeSuccessImage(imageProps);
    // };
  }, []);

  return (
    <div>
      <div id={formContainerId} className="dynamic-form-container"></div>
    </div>
  );
};

export default DynamicFormLoader;
