import style from './NavLink.module.scss';
import SpriteIcon from '../Svg/SpriteIcon';
import LinkWrapper from '../LinkWrapper/LinkWrapper';

function NavLink({
  elementType='default',
  text,
  isActive,
  buttonUrl,
  changeStyle,
  onClick,
  setActive,
}) {
  return (
    <>
      {elementType === 'button' && (
        <button
          id={`navlinksbutton${text}`}
          onClick={() => {
            const selectedElement = document.getElementById(
              `navlinksbutton${text}`,
            );
            onClick(selectedElement);
            setActive();
          }}
          className={`${style['link-button']} ${style[changeStyle]} ${isActive && style['active']}`}
        >
          {text}
        </button>
      )}
      {elementType === 'default' && (
        <LinkWrapper
          condition={buttonUrl}
          wrapper={(child) => (
            <a
              href={buttonUrl}
              className={`${style['link']} ${style[changeStyle]} ${isActive && style['active']}`}
            >
              {child}
            </a>
          )}
        >
          {text}
        </LinkWrapper>
      )}
      {elementType === 'footer-link' && (
        <p className={`${style['footer-link']}`}>
          <SpriteIcon IconName="rightArrowBlackIcon" />
          <LinkWrapper
            condition={buttonUrl}
            wrapper={(child) => (
              <a
                href={buttonUrl}
                className={`${style['link']} ${style[changeStyle]} ${isActive && style['active']}`}
              >
                {child}
              </a>
            )}
          >
            {text}
          </LinkWrapper>
        </p>
      )}
    </>
  );
}

export default NavLink;
