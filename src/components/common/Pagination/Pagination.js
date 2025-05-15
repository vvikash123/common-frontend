import SpriteIcon from "../Svg/SpriteIcon";
import styles from "./Pagination.module.scss";

const Pagination = ({ margin, state, dispatch, totalRecords, limit = 10 }) => {
  const minPages = 1,
    maxPages = Math.ceil(totalRecords / limit);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scrolling
      });
    };

  //state next button handler
  const handleNextClick = () => {
    const list = state?.pagination?.list?.map((item) => item + 1);
    if (
      state?.pagination?.activeTab === maxPages ||
      list?.slice(0, maxPages)?.at(-1) - 1 === maxPages
    ) {
      return;
    }
    dispatch({ type: "UPDATE_PAGINATION", value: list, key: "pagination" });
    // scrollToTop(); // Scroll to top on next click
  };

  //state previous button handler
  const handlePreviousClick = () => {
    const list = state?.pagination?.list?.map((item) => item - 1);
    if (list[0] + 1 === minPages) {
      return;
    }
    dispatch({ type: "UPDATE_PAGINATION", value: list, key: "pagination" });
    // scrollToTop(); // Scroll to top on previous click
  };

  //state page click handler
  const handlePageClick = (page) => {
    if (page === state?.pagination?.activeTab) {
      return;
    }
    dispatch({ type: "UPDATE_PAGE", value: page, key: "pagination" });
    scrollToTop(); // Scroll to top on page click
  };

  if (totalRecords === 0) return <p>No college data found</p>;

  return (
    <div className={styles.pagination} style={{ margin }}>
      <ul>
        <li onClick={handlePreviousClick} disabled={true}>
          <SpriteIcon IconName="arrowleft" />
        </li>
        {state?.pagination?.list?.slice(0, maxPages)?.map((page, index) => (
          <li onClick={() => handlePageClick(page)} key={`pagination-${index}`}>
            <a
              className={`${styles.active} ${
                page === +state?.pagination?.activeTab ? styles.next : ""
              }`}
            >
              {page}
            </a>
          </li>
        ))}
        {maxPages > 4 && (
          <li>
            <a className={styles.active} style={{ color: "gray" }}>
              {maxPages}
            </a>
          </li>
        )}
        <li onClick={handleNextClick}>
          <SpriteIcon IconName="arrowright" />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
