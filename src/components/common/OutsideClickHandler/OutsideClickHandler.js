import React, { useEffect, useRef } from 'react';

function OutsideClickHandler({ onOutsideClick, children }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Function to handle the click event
    function handleClickOutside(event) {
      // Check if the click is outside the wrapperRef element
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onOutsideClick();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onOutsideClick]);

  return <div ref={wrapperRef}>{children}</div>;
}

export default OutsideClickHandler;
