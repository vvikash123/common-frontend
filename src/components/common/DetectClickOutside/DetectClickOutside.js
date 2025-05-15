import React, { useRef, useEffect, useState } from 'react';
import history from '../../../utils/history';

function useOutsideAlerter(ref, props) {
  const { isSeachResult } = props;
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {            
      // if (ref.current && !ref.current.contains(event.target)) {
      //   console.log('00000');
      //   if (event.target.className === 'Drawer-tnn__drawer-container-1SsNK') {
      //     console.log('1111');
      //     document.querySelector('#close-modal-by-id')?.click();
      //   } else {
      //     console.log('2222');
      //     if (props.children.props.isSeachResult) {
      //       document.querySelector('#search-close-btn-new-invisible')?.click();
      //     } else if (props.children.props.isSeachResult == false) {
      //       document.querySelector('#search-close-btn')?.click();
      //     }
      //   }
      // }
      props.setIsOpen(false);
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
export const DetectClickOutside = (props) => {

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props);
  return <div ref={wrapperRef}>{props.children}</div>;
};
