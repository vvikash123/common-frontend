import styles from "@/styles/widgets/RHSWidget.module.scss";

const RHSWidget = ({ data }) => {

  return (
    <aside className={styles.rhsWidget}>
      <h3 className={styles.title}>{data?.props?.heading}</h3>
      <ul className={styles.list}>
        {data?.props?.items?.map((item, idx) => (
          <li key={idx} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default RHSWidget;
