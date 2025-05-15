import styles from './Tags.module.scss'; // Corrected import to match the filename
import SpriteIcon from '../../Svg/SpriteIcon';
import { generateUrlPath } from '@/utils/common';

const Tags = ({ data = [], title = '' }) => {
  return (
    data.length > 0 && (
      <div className={styles.Topconditions}>
        <p className={styles.Heading}><SpriteIcon IconName="greenStockArrow" /> {title}</p>
        <ul>
          {data.slice(0, 10).map((item, idx) => (
            <li key={`tags-${idx}`}>
              <a href={generateUrlPath(item)} title={item?.title}>
                <p>{item?.title}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Tags;
