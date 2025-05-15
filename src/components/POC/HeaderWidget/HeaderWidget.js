import styles from "@/styles/widgets/HeaderWidget.module.scss";

const HeaderWidget = ({ data }) => {

  return (
    <header className={styles.header}>
      <img src={data?.props?.logo} alt="Logo" className={styles.logo} />
      <nav>
        <ul className={styles.menu}>
          {data?.props?.menu.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default HeaderWidget;
