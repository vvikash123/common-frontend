import styles from "@/styles/widgets/FooterWidget.module.scss";

const FooterWidget = ({ data }) => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.links}>
        {data?.props?.links?.map((link, idx) => (
          <li key={idx}>{link}</li>
        ))}
      </ul>
      <p className={styles.copy}>{data.props.copyright}</p>
    </footer>
  );
};

export default FooterWidget;
