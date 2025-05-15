
import style from './SpriteIcon.module.scss';

export function SpriteIcon({ IconName='', size='icon-md', ColorTheme='light', width, height }) {
  const svgStyle = { width: `${width}px`, height: `${height}px` };
  return (
    <svg className={`${style[size]}`} style={svgStyle != '' ? svgStyle : ''}>
      <use xlinkHref={`/assets/icons/svg/sprite-tnhealthv1.svg#${IconName}`}></use>
    </svg>
  );
}
export default SpriteIcon;