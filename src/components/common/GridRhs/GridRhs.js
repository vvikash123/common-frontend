import style from "./GridRhs.module.scss";

const GridRhs = ({ children, className }) => {
  return (
    <div className={`${style["grid-rhs"]} ${className === "grid-rhs2" ? style["grid-rhs2"] : ''}`}>
      {children}
    </div>
  );
};

export default GridRhs;
