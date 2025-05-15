'use client';
import React, { useState } from 'react';
import SideBarNav from '@/components/common/SideBarNav/SideBarNav';
import SpriteIcon from '@/components/common/Svg/SpriteIcon';

export const HamburgerButton = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDiv = async () => {    
    setIsOpen(!isOpen);    
  };

  const onOutsideClick = () => {
    setIsOpen(false);
  };

  return (
    <>      
      <button
        style={{
          background: 'none',
          border: 'none',
          padding: '10px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}
        id={'open_burger_icon'}
        onClick={() => { toggleDiv(); }}
        type="button"
        aria-label="Hamburger Button"
      >
        <SpriteIcon IconName="menuIcon" />
      </button>      

      <SideBarNav
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setSearchStringFn={() => {}}
        getMSID={'12234'}
        headerData={props.headerData}
        onIncrement={toggleDiv}
      />
      
      <style jsx global>{`
        body {
          font-family: sans-serif;
        }

        .menu-button {
          background: none;
          border: none;
          padding: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .menu-button:focus {
          outline: none;
        }
      `}</style>
    </>
  );
};
